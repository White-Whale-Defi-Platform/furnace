use crate::{
    contract::MIN_AMOUNT_TO_BURN,
    denom::{Coin, MsgCreateDenom, MsgMint},
    error::ContractError,
    helpers::{assert_owner, get_ash_denom, validate_fee_rate, validate_subdenom},
    state::{Config, FuelConfig, CONFIG, FUEL_CONFIG, LEADERBOARD},
};
use cosmwasm_std::{
    coins, BankMsg, CosmosMsg, Decimal, DepsMut, Env, MessageInfo, Response, Uint128,
};
use cw_utils::{must_pay, nonpayable, one_coin};

pub fn execute_update_config(
    deps: DepsMut,
    info: MessageInfo,
    owner: Option<String>,
    mint_cost: Option<Uint128>,
) -> Result<Response, ContractError> {
    nonpayable(&info)?;

    let mut config: Config = CONFIG.load(deps.storage)?;
    if config.owner != info.sender {
        return Err(ContractError::Unauthorized {});
    }
    if let Some(owner) = owner {
        config.owner = deps.api.addr_validate(&owner)?;
    }
    if let Some(mint_cost) = mint_cost {
        config.mint_cost = mint_cost;
    }

    CONFIG.save(deps.storage, &config)?;
    Ok(Response::default()
        .add_attribute("action", "update_config")
        .add_attribute("owner", config.owner.as_str())
        .add_attribute("mint_cost", config.mint_cost.to_string()))
}

#[allow(clippy::too_many_arguments)]
pub fn execute_add_fuel(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    subdenom: String,
    denom: String,
) -> Result<Response, ContractError> {
    let config = CONFIG.load(deps.storage)?;

    if !config.mint_cost.is_zero() {
        let amount = must_pay(&info, &config.native_denom)?;
        if amount < config.mint_cost {
            return Err(ContractError::InsufficientFunds {});
        }
    } else {
        nonpayable(&info)?;
    }

    validate_subdenom(&subdenom)?;

    FUEL_CONFIG.update(deps.storage, denom.clone(), |old| match old {
        Some(_) => Err(ContractError::FuelAlreadyExists {}),
        None => Ok(FuelConfig {
            subdenom: subdenom.clone(),
            denom: denom.clone(),
            fuel_fee_recipient: config.default_fuel_fee_recipient.clone(),
            fuel_fee_rate: config.default_fuel_fee_rate.clone(),
            ash_fee_recipient: config.default_ash_fee_recipient.clone(),
            ash_fee_rate: config.default_ash_fee_rate.clone(),
        }),
    })?;

    let mut messages: Vec<CosmosMsg> = vec![];

    // create the factory ASH token `<subdenom>.ASH`
    messages.push(<MsgCreateDenom as Into<CosmosMsg>>::into(MsgCreateDenom {
        sender: env.contract.address.to_string(),
        subdenom: format!("{}.ash", subdenom),
    }));

    Ok(Response::default()
        .add_messages(messages)
        .add_attribute("action", "add_fuel".to_string())
        .add_attribute("subdenom", subdenom)
        .add_attribute("denom", denom)
        .add_attribute(
            "fuel_fee_recipient",
            config.default_fuel_fee_recipient.to_string(),
        )
        .add_attribute("fuel_fee_rate", config.default_fuel_fee_rate.to_string())
        .add_attribute(
            "ash_fee_recipient",
            config.default_ash_fee_recipient.to_string(),
        )
        .add_attribute("ash_fee_rate", config.default_ash_fee_rate.to_string()))
}

pub fn execute_update_fuel_config(
    deps: DepsMut,
    info: MessageInfo,
    denom: String,
    fuel_fee_recipient: Option<String>,
    fuel_fee_rate: Option<Decimal>,
    ash_fee_recipient: Option<String>,
    ash_fee_rate: Option<Decimal>,
) -> Result<Response, ContractError> {
    nonpayable(&info)?;
    assert_owner(deps.as_ref(), &info.sender)?;

    let mut config = FUEL_CONFIG
        .may_load(deps.storage, denom.clone())?
        .ok_or(ContractError::FuelDoesNotExist {})?;

    if let Some(fuel_fee_recipient) = fuel_fee_recipient {
        config.fuel_fee_recipient = deps.api.addr_validate(&fuel_fee_recipient)?;
    }

    if let Some(fuel_fee_rate) = fuel_fee_rate {
        config.fuel_fee_rate = validate_fee_rate(fuel_fee_rate)?;
    }

    if let Some(ash_fee_recipient) = ash_fee_recipient {
        config.ash_fee_recipient = deps.api.addr_validate(&ash_fee_recipient)?;
    }

    if let Some(ash_fee_rate) = ash_fee_rate {
        config.ash_fee_rate = validate_fee_rate(ash_fee_rate)?;
    }

    FUEL_CONFIG.save(deps.storage, denom.clone(), &config)?;

    Ok(Response::default()
        .add_attribute("action", "update_fuel_config")
        .add_attribute("subdenom", config.subdenom)
        .add_attribute("denom", config.denom)
        .add_attribute("fuel_fee_recipient", config.fuel_fee_recipient.to_string())
        .add_attribute("fuel_fee_rate", config.fuel_fee_rate.to_string())
        .add_attribute("ash_fee_recipient", config.ash_fee_recipient.to_string())
        .add_attribute("ash_fee_rate", config.ash_fee_rate.to_string()))
}

/// Burns the fuel token and mints the same amount of ASH tokens.
/// Fuel has to be previously added to the contract in order to be burned.
pub fn execute_burn(deps: DepsMut, env: Env, info: MessageInfo) -> Result<Response, ContractError> {
    // validate that only one coin is sent & amount is greater than minimum
    let fuel_coin = one_coin(&info)?;
    if fuel_coin.amount < MIN_AMOUNT_TO_BURN.into() {
        return Err(ContractError::NotEnoughFuelTokensToBurn {
            amount: fuel_coin.amount,
        });
    }

    let fuel_config = FUEL_CONFIG
        .may_load(deps.storage, fuel_coin.denom.to_string())?
        .ok_or(ContractError::FuelDoesNotExist {})?;

    let mut messages: Vec<CosmosMsg> = vec![];

    // fuel_coin.amount - fuel_fee = fuel_to_burn => (100 - 1 = 99 fuel to burn)
    let fuel_fee = Decimal::from_ratio(fuel_coin.amount, Uint128::one())
        .checked_mul(fuel_config.fuel_fee_rate)?
        .to_uint_floor();

    // send fuel fee to `fuel_fee_recipient` if amount not zero
    if fuel_fee > Uint128::zero() {
        messages.push(CosmosMsg::from(BankMsg::Send {
            to_address: fuel_config.fuel_fee_recipient.to_string(),
            amount: coins(fuel_fee.u128(), fuel_coin.denom.clone()),
        }));
    }

    let fuel_to_burn = fuel_coin.amount.checked_sub(fuel_fee)?;
    messages.push(CosmosMsg::from(BankMsg::Burn {
        amount: coins(fuel_to_burn.u128(), fuel_coin.denom.clone()),
    }));

    // fuel_coin.amount + ash_fee = ash_to_mint => (100 + 1 = 101 ash to mint)
    let ash_fee = Decimal::from_ratio(fuel_coin.amount, Uint128::one())
        .checked_mul(fuel_config.ash_fee_rate)?
        .to_uint_floor();

    let ash_to_mint = fuel_coin.amount.checked_add(ash_fee)?;
    let ash_denom = get_ash_denom(&fuel_config.subdenom, &env.contract.address)?;

    messages.push(<MsgMint as Into<CosmosMsg>>::into(MsgMint {
        sender: env.contract.address.to_string(),
        amount: Some(Coin {
            denom: ash_denom.clone(),
            amount: ash_to_mint.to_string(),
        }),
    }));

    // send ash fee to `ash_fee_recipient` if amount not zero
    if ash_fee > Uint128::zero() {
        let ash_fee_coins = coins(ash_fee.u128(), ash_denom.clone());
        messages.push(CosmosMsg::Bank(BankMsg::Send {
            to_address: fuel_config.ash_fee_recipient.to_string(),
            amount: ash_fee_coins.clone(),
        }));
    }

    // send remaining ash to sender (1:1 of received funds)
    let ash_remaining_coins = coins(fuel_coin.amount.into(), ash_denom.clone());
    messages.push(CosmosMsg::Bank(BankMsg::Send {
        to_address: info.sender.to_string(),
        amount: ash_remaining_coins,
    }));

    // add leaderboard entry taking into account possible previous entries
    LEADERBOARD.update::<_, ContractError>(
        deps.storage,
        (fuel_coin.denom.clone(), &info.sender),
        |old| match old {
            Some(old) => Ok(old.checked_add(fuel_coin.amount)?),
            None => Ok(fuel_coin.amount),
        },
    )?;

    Ok(Response::default()
        .add_messages(messages)
        .add_attribute("action", "burn".to_string())
        .add_attribute("denom", fuel_coin.denom)
        .add_attribute("amount", fuel_coin.amount.to_string()))
}
