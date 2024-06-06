use cosmwasm_std::{
    attr, coins,
    testing::{mock_dependencies, mock_env, mock_info, MockApi, MockQuerier},
    Env, MemoryStorage, OwnedDeps, Uint128,
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
