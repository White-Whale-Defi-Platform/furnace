use crate::state::{Config, FuelConfig};
use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::{Addr, Decimal, Uint128};

#[cw_serde]
pub struct InstantiateMsg {
    /// Owner of the contract.
    pub owner: String,
    /// Cost to mint token factory tokens
    pub mint_cost: Uint128,
    /// Native denom
    pub native_denom: String,
    /// The default address that will receive part of the burned token as fees.
    pub default_fuel_fee_recipient: String,
    /// The default fee rate that will be charged for burning the fuel token.
    pub default_fuel_fee_rate: Decimal,
    /// The default address that will receive the newly minted ash token fees.
    pub default_ash_fee_recipient: String,
    /// The default fee rate that will be charged for minting the ash token.
    pub default_ash_fee_rate: Decimal,
}

#[cw_serde]
pub enum ExecuteMsg {
    /// Updates contract's config. Only the owner can update the config.
    UpdateConfig {
        /// New owner of the contract.
        owner: Option<String>,
        /// New cost to mint token factory tokens.
        mint_cost: Option<Uint128>,
    },
    /// Burns tokens sent to the contract and mints ash tokens to the sender.
    /// Anyone can burn tokens, if the token sent is a fuel token.
    Burn {},
    /// Adds a new denom to the contract with the given fuel and ash fee rates, and fee recipients.
    /// The contract will then be able to accept this denom as fuel. Only the owner can add a new fuel.
    AddFuel {
        /// Human readable name of the fuel. i.e. `uwhale`
        subdenom: String,
        /// The denom that will be accepted as fuel.
        denom: String,
    },
    /// Updates the fuel config. Only the owner can update the fuel config.
    /// If a field is not sent in the message, it will not be updated.
    UpdateFuelConfig {
        /// The denom that will be accepted as fuel.
        fuel_denom: String,
        /// The address that will receive part of the burned token as fees.
        fuel_fee_recipient: Option<String>,
        /// The fee rate that will be charged for burning the fuel token.
        fuel_fee_rate: Option<Decimal>,
        /// The address that will receive the newly minted ash token fees.
        ash_fee_recipient: Option<String>,
        /// The fee rate that will be charged for minting the ash token.
        ash_fee_rate: Option<Decimal>,
    },
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(ConfigResponse)]
    Config {},
    #[returns(FuelsResponse)]
    Fuels {
        /// An optional parameter specifying what address to start searching after.
        start_after: Option<Addr>,
        /// The amount of addresses to return.
        /// If unspecified, will default to a value specified by the contract.
        limit: Option<u32>,
        /// If specified, will return only the fuel config for the given denom.
        fuel_denom: Option<String>,
    },
    #[returns(LeaderboardResponse)]
    Leaderboard {
        /// The denom of the burned tokens. i.e. `uwhale`
        fuel_denom: String,
        /// An optional parameter specifying what address to start searching after.
        start_after: Option<Addr>,
        /// The amount of addresses to return.
        /// If unspecified, will default to a value specified by the contract.
        limit: Option<u32>,
    },
}

#[cw_serde]
pub struct FuelsResponse {
    /// The list of fuel configs.
    pub fuels: Vec<FuelConfig>,
}

#[cw_serde]
pub struct LeaderboardResponse {
    /// The denom of the burned tokens. i.e. `uwhale`
    pub fuel_denom: String,
    /// The list of user addresses and their total burned tokens for the given fuel denom.
    pub leaderboard: Vec<(Addr, Uint128)>,
}

#[cw_serde]
/// To be used in the future for migrating the contract.
pub struct MigrateMsg {
    /// The default address that will receive part of the burned token as fees.
    pub default_fuel_fee_recipient: String,
    /// The default fee rate that will be charged for burning the fuel token.
    pub default_fuel_fee_rate: Decimal,
    /// The default address that will receive the newly minted ash token fees.
    pub default_ash_fee_recipient: String,
    /// The default fee rate that will be charged for minting the ash token.
    pub default_ash_fee_rate: Decimal,
}

pub type ConfigResponse = Config;
