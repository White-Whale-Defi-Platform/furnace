use cosmwasm_std::{
    attr, coins,
    testing::{mock_dependencies, mock_env, mock_info, MockApi, MockQuerier},
    Decimal, Env, MemoryStorage, OwnedDeps, Uint128,
};

use crate::tests::test::NATIVE_DENOM;
use crate::{contract::instantiate, msg::InstantiateMsg};

pub fn init() -> (OwnedDeps<MemoryStorage, MockApi, MockQuerier>, Env) {
    let mut deps = mock_dependencies();
    let env = mock_env();
    let info = mock_info("instantiator", &coins(100, NATIVE_DENOM));
    let msg = InstantiateMsg {
        owner: "owner".to_string(),
        mint_cost: Uint128::new(50_000_000),
        native_denom: NATIVE_DENOM.to_string(),
        default_fuel_fee_recipient: "bob".to_string(),
        default_fuel_fee_rate: Decimal::percent(10),
        default_ash_fee_recipient: "marley".to_string(),
        default_ash_fee_rate: Decimal::percent(5),
    };
    let res = instantiate(deps.as_mut(), env.clone(), info, msg).unwrap();

    assert_eq!(
        res.attributes,
        vec![
            attr("action", "instantiate"),
            attr("owner", "owner"),
            attr("mint_cost", "50000000"),
            attr("native_denom", NATIVE_DENOM),
        ]
    );

    (deps, env)
}
