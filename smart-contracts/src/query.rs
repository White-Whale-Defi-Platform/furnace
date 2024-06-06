use cosmwasm_std::{Addr, Deps, Order, StdResult, Uint128};
use cw_storage_plus::Bound;

use crate::{
    error::ContractError,
    helpers::calc_range_start,
    msg::{ConfigResponse, FuelsResponse, LeaderboardResponse},
    state::{FuelConfig, CONFIG, FUEL_CONFIG, LEADERBOARD},
};

// settings for pagination
const MAX_LIMIT: u32 = 30;
const DEFAULT_LIMIT: u32 = 10;

/// Queries the [Config], which contains the owner, and minting denom
pub fn query_config(deps: Deps) -> Result<ConfigResponse, ContractError> {
    let config = CONFIG.load(deps.storage)?;
    Ok(config)
}

// Queries the leaderboard, unsorted
pub fn query_leaderboard(
    deps: Deps,
    fuel_denom: String,
    start_after: Option<Addr>,
    limit: Option<u32>,
) -> StdResult<LeaderboardResponse> {
    let limit = limit.unwrap_or(DEFAULT_LIMIT).min(MAX_LIMIT) as usize;
    let start = calc_range_start(start_after).map(Bound::ExclusiveRaw);

    let leaderboard = LEADERBOARD
        .prefix(fuel_denom.clone())
        .range(deps.storage, start, None, Order::Ascending)
        .take(limit)
        .collect::<StdResult<Vec<(Addr, Uint128)>>>()?;

    Ok(LeaderboardResponse {
        fuel_denom,
        leaderboard,
    })
}

// Queries the list of fuels, unsorted.
// If fuel_denom is provided, it will return only that fuel config.
pub fn query_fuels(
    deps: Deps,
    start_after: Option<Addr>,
    limit: Option<u32>,
    fuel_denom: Option<String>,
) -> StdResult<FuelsResponse> {
    if fuel_denom.is_some() {
        let fuel = FUEL_CONFIG.load(deps.storage, fuel_denom.unwrap())?;
        return Ok(FuelsResponse { fuels: vec![fuel] });
    }

    let limit = limit.unwrap_or(DEFAULT_LIMIT).min(MAX_LIMIT) as usize;
    let start = calc_range_start(start_after).map(Bound::ExclusiveRaw);

    let fuels = FUEL_CONFIG
        .range(deps.storage, start, None, Order::Ascending)
        .take(limit)
        .map(|item| Ok(item?.1))
        .collect::<StdResult<Vec<FuelConfig>>>()?;

    Ok(FuelsResponse { fuels })
}
