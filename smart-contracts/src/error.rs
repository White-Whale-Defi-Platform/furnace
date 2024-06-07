use cosmwasm_std::{OverflowError, StdError, Uint128};
use cw_utils::PaymentError;
use thiserror::Error;

use crate::contract::MIN_AMOUNT_TO_BURN;

#[derive(Error, Debug, PartialEq)]
pub enum ContractError {
    #[error("{0}")]
    Std(#[from] StdError),

    #[error("Unauthorized")]
    Unauthorized {},

    #[error("Fuel already exists")]
    FuelAlreadyExists {},

    #[error("Fuel does not exist")]
    FuelDoesNotExist {},

    #[error("Invalid subdenom")]
    InvalidSubDenom {},

    #[error("Invalid fee rate")]
    InvalidFeeRate {},

    #[error("{0}")]
    OverflowError(#[from] OverflowError),

    #[error("{0}")]
    PaymentError(#[from] PaymentError),

    #[error(
        "Need to burn at least {} fuel tokens. {} tokens sent",
        MIN_AMOUNT_TO_BURN,
        amount
    )]
    NotEnoughFuelTokensToBurn { amount: Uint128 },

    #[error("Insufficient funds")]
    InsufficientFunds {},
}
