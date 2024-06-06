use crate::error::ContractError;
use crate::execute::{
    execute_add_fuel, execute_burn, execute_update_config, execute_update_fuel_config,
};
use crate::msg::{ExecuteMsg, InstantiateMsg, MigrateMsg, QueryMsg};
use crate::query::{query_config, query_fuels, query_leaderboard};
use crate::state::{Config, CONFIG};
#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{to_json_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response};
use cw2::set_contract_version;

// version info for migration info
const CONTRACT_NAME: &str = "furnace";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

// minimum amount of tokens to burn as fees need to be taken from the burned tokens
pub const MIN_AMOUNT_TO_BURN: u128 = 10;

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;

    let config = Config {
        owner: deps.api.addr_validate(&msg.owner)?,
        mint_cost: msg.mint_cost,
        native_denom: msg.native_denom.to_string(),
    };
    CONFIG.save(deps.storage, &config)?;

    Ok(Response::new()
        .add_attribute("action", "instantiate".to_string())
        .add_attribute("owner", config.owner.to_string())
        .add_attribute("mint_cost", msg.mint_cost.to_string())
        .add_attribute("native_denom", msg.native_denom))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::AddFuel {
            subdenom,
            denom,
            fuel_fee_recipient,
            fuel_fee_rate,
            ash_fee_recipient,
            ash_fee_rate,
        } => execute_add_fuel(
            deps,
            env,
            info,
            subdenom,
            denom,
            fuel_fee_recipient,
            fuel_fee_rate,
            ash_fee_recipient,
            ash_fee_rate,
        ),
        ExecuteMsg::UpdateConfig { owner, mint_cost } => {
            execute_update_config(deps, info, owner, mint_cost)
        }
        ExecuteMsg::UpdateFuelConfig {
            fuel_denom,
            fuel_fee_recipient,
            fuel_fee_rate,
            ash_fee_recipient,
            ash_fee_rate,
        } => execute_update_fuel_config(
            deps,
            info,
            fuel_denom,
            fuel_fee_recipient,
            fuel_fee_rate,
            ash_fee_recipient,
            ash_fee_rate,
        ),
        ExecuteMsg::Burn {} => execute_burn(deps, env, info),
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> Result<Binary, ContractError> {
    match msg {
        QueryMsg::Config {} => Ok(to_json_binary(&query_config(deps)?)?),
        QueryMsg::Leaderboard {
            fuel_denom,
            start_after,
            limit,
        } => Ok(to_json_binary(&query_leaderboard(
            deps,
            fuel_denom,
            start_after,
            limit,
        )?)?),
        QueryMsg::Fuels {
            start_after,
            limit,
            fuel_denom,
        } => Ok(to_json_binary(&query_fuels(
            deps,
            start_after,
            limit,
            fuel_denom,
        )?)?),
    }
}

// This will be used in the future for migrating the contract
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn migrate(_deps: DepsMut, _env: Env, _msg: MigrateMsg) -> Result<Response, ContractError> {
    Ok(Response::default())
}
