use crate::error::ContractError;
use crate::state::CONFIG;
use cosmwasm_std::{ensure, Addr, Decimal, Deps};
use white_whale_std::pool_network::asset::is_ibc_token;

/// This prevents the subdenom to be empty as all assets have a subdenom.
pub const MIN_SUBDENOM_LENGTH: usize = 1;
/// 44 is the max length of a denom, and 4 is the length of ".ASH".
pub const MAX_SUBDENOM_LENGTH: usize = 44 - 4;

/// This function takes the subdenom (i.e. uwhale) and contract address as arguments,
/// creates the ash denom using this format:  `factory/{contract-address}/{subdenom}.ASH`,
/// and returns the ash denom.
pub fn get_ash_denom(subdenom: &String, contract_address: &Addr) -> Result<String, ContractError> {
    // this is to make it backwards compatible with furnace v0.1.0
    if subdenom == "whale" {
        return Ok(format!("factory/{}/ash", contract_address));
    }
    let ash_denom = format!("factory/{}/{}.ash", contract_address, subdenom);
    Ok(ash_denom)
}

/// This function takes a reference of the dependencias and the caller address as arguments,
/// checks if the caller is the owner of the contract, and returns an error if not.
pub fn assert_owner(deps: Deps, caller: &Addr) -> Result<(), ContractError> {
    if CONFIG.load(deps.storage)?.owner != caller {
        Err(ContractError::Unauthorized {})
    } else {
        Ok(())
    }
}

/// This function takes the subdenom as an argument, checks if the subdenom is valid,
/// as per Osmosis token factory docs `Subdenoms can contain [a-zA-Z0-9./].`, and
/// returns an error if invalid.
pub fn validate_subdenom(subdenom: &str) -> Result<(), ContractError> {
    ensure!(!is_ibc_token(&subdenom), ContractError::InvalidIBCFuel {});

    if subdenom.len() > MAX_SUBDENOM_LENGTH
        || subdenom.len() < MIN_SUBDENOM_LENGTH
        || !subdenom
            .chars()
            .all(|c| c.is_ascii_alphanumeric() || c == '.' || c == '/')
    {
        Err(ContractError::InvalidSubDenom {})
    } else {
        Ok(())
    }
}

/// This function takes the fee rate as an argument, checks if the fee rate is
/// between 0% and 100%, and returns an error if invalid.
pub fn validate_fee_rate(fee_rate: Decimal) -> Result<Decimal, ContractError> {
    if fee_rate > Decimal::percent(100) {
        Err(ContractError::InvalidFeeRate {})
    } else {
        Ok(fee_rate)
    }
}

/// This will set the first key after the provided key, by appending a 1 byte
pub fn calc_range_start(start_after: Option<Addr>) -> Option<Vec<u8>> {
    start_after.map(|addr| {
        let mut v = addr.as_bytes().to_vec();
        v.push(1);
        v
    })
}

#[test]
fn test_validate_subdenom() {
    let _valid_subdenom_1 = validate_subdenom(
        &"ibc/FA7112322CE7656DC84D441E49BAEAB9DC0AB3C7618A178A212CDE8B3F17C70B".to_string(),
    )
    .unwrap_err();
    let _valid_subdenom_1 = validate_subdenom(&"uwhale".to_string()).unwrap();
    let _valid_subdenom_2 = validate_subdenom(&"....///".to_string()).unwrap();
    let _valid_subdenom_3 =
        validate_subdenom(&"This.is.as.long.as.this.can.be..........".to_string()).unwrap();

    let _empty_subdenom = validate_subdenom(&"".to_string()).unwrap_err();

    let _exclamation =
        validate_subdenom(&"factory/contract/coin/invalid!".to_string()).unwrap_err();

    let _too_long = validate_subdenom(
        &"factory/migaloo1erul6xyq0gk6ws98ncj7lnq9l4jn4gnnu9we73gdz78yyl2lr7qqrvcgup/ash"
            .to_string(),
    )
    .unwrap_err();
}

#[test]
fn test_into_ash_denom() {
    let contract_address =
        Addr::unchecked("migaloo1c9fkszt5lq34vvvlat3fxj6yv7ejtqapz04e97vtc9m5z9cwnamqsr4n3w");
    let subdenom = "whale".to_string();
    let ash_denom = get_ash_denom(&subdenom, &contract_address).unwrap();
    assert_eq!(
        ash_denom,
        "factory/migaloo1c9fkszt5lq34vvvlat3fxj6yv7ejtqapz04e97vtc9m5z9cwnamqsr4n3w/ash"
    );
}

#[test]
fn test_get_ash_denom_for_inj() {
    let contract_address =
        Addr::unchecked("migaloo1c9fkszt5lq34vvvlat3fxj6yv7ejtqapz04e97vtc9m5z9cwnamqsr4n3w");
    let subdenom = "inj".to_string();
    let ash_denom = get_ash_denom(&subdenom, &contract_address).unwrap();
    assert_eq!(
        ash_denom,
        "factory/migaloo1c9fkszt5lq34vvvlat3fxj6yv7ejtqapz04e97vtc9m5z9cwnamqsr4n3w/inj.ash"
    );
}

#[test]
fn test_validate_fee_rate() {
    let _0pct = validate_fee_rate(Decimal::zero()).unwrap();
    let _0dot5555pct = validate_fee_rate(Decimal::from_atomics(5555u128, 4).unwrap()).unwrap();
    let _100pct = validate_fee_rate(Decimal::one()).unwrap();

    let _101pct = validate_fee_rate(Decimal::percent(101)).unwrap_err();
    let _3dot33 = validate_fee_rate(Decimal::from_atomics(333u128, 2).unwrap()).unwrap_err();
}
