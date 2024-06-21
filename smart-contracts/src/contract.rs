use crate::error::ContractError;
use crate::execute::{
    execute_add_fuel, execute_burn, execute_update_config, execute_update_fuel_config,
};
use crate::helpers::validate_fee_rate;
use crate::msg::{ExecuteMsg, InstantiateMsg, MigrateMsg, QueryMsg};
use crate::query::{query_config, query_fuels, query_leaderboard};
use crate::state::{Config, CONFIG};
use cosmwasm_schema::cw_serde;
#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{
    to_json_binary, Addr, Binary, Deps, DepsMut, Env, MessageInfo, Response, Uint128,
};
use cw2::{get_contract_version, set_contract_version};
use cw_storage_plus::Item;
use semver::Version;
use white_whale_std::migrate_guards::check_contract_name;

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
        default_fuel_fee_recipient: deps.api.addr_validate(&msg.default_fuel_fee_recipient)?,
        default_fuel_fee_rate: validate_fee_rate(msg.default_fuel_fee_rate)?,
        default_ash_fee_recipient: deps.api.addr_validate(&msg.default_ash_fee_recipient)?,
        default_ash_fee_rate: validate_fee_rate(msg.default_ash_fee_rate)?,
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
        ExecuteMsg::AddFuel { subdenom, denom } => {
            execute_add_fuel(deps, env, info, subdenom, denom)
        }
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
pub fn migrate(deps: DepsMut, _env: Env, msg: MigrateMsg) -> Result<Response, ContractError> {
    check_contract_name(deps.storage, CONTRACT_NAME.to_string())?;
    let version: Version = CONTRACT_VERSION.parse()?;
    let storage_version: Version = get_contract_version(deps.storage)?.version.parse()?;

    if storage_version >= version {
        return Err(ContractError::MigrateInvalidVersion {
            current_version: storage_version,
            new_version: version,
        });
    }

    if storage_version < Version::parse("0.2.1")? {
        #[cw_serde]
        struct OldConfig {
            pub owner: Addr,
            pub mint_cost: Uint128,
            pub native_denom: String,
        }

        const OLD_CONFIG: Item<OldConfig> = Item::new("config");
        let old_config: OldConfig = OLD_CONFIG.load(deps.storage)?;

        let config = Config {
            owner: old_config.owner,
            mint_cost: old_config.mint_cost,
            native_denom: old_config.native_denom,
            default_fuel_fee_recipient: deps.api.addr_validate(&msg.default_fuel_fee_recipient)?,
            default_fuel_fee_rate: validate_fee_rate(msg.default_fuel_fee_rate)?,
            default_ash_fee_recipient: deps.api.addr_validate(&msg.default_ash_fee_recipient)?,
            default_ash_fee_rate: validate_fee_rate(msg.default_ash_fee_rate)?,
        };

        CONFIG.save(deps.storage, &config)?;
    }

    set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;

    Ok(Response::default())
}
