use cosmwasm_schema::cw_serde;
use cosmwasm_std::{Addr, Decimal, Uint128};
use cw_storage_plus::{Item, Map};

#[cw_serde]
pub struct Config {
    pub owner: Addr,
    pub mint_cost: Uint128,
    pub native_denom: String,
}

#[cw_serde]
pub struct FuelConfig {
    /// Human readable name of the fuel. i.e. `uwhale`
    pub subdenom: String,
    /// The denom that will be accepted as fuel.
    pub denom: String,
    /// The address that will receive part of the burned token as fees.
    pub fuel_fee_recipient: Addr,
    /// The fee rate that will be charged for burning the fuel token.
    pub fuel_fee_rate: Decimal,
    /// The address that will receive the newly minted ash token fees.
    pub ash_fee_recipient: Addr,
    /// The fee rate that will be charged for minting the ash token.
    pub ash_fee_rate: Decimal,
}

/// Stores the contract's configuration
pub const CONFIG: Item<Config> = Item::new("config");
/// Map of the fuel denoms the contract accepts to their respective configuration
/// key: fuel_denom -> value: FuelConfig
pub const FUEL_CONFIG: Map<String, FuelConfig> = Map::new("fuel_config");
/// Leaderboard Map of fuel denom & user address to total tokens burned
/// key: (fuel_denom, address) -> value: totalburned
pub const LEADERBOARD: Map<(String, &Addr), Uint128> = Map::new("leaderboard");
