use crate::contract::{execute, query};
use crate::denom;
use crate::denom::{MsgCreateDenom, MsgMint};
use crate::error::ContractError;
use crate::helpers::get_ash_denom;
use crate::msg::ExecuteMsg::UpdateConfig;
use crate::msg::{ExecuteMsg, FuelsResponse, LeaderboardResponse, QueryMsg};
use crate::state::{Config, FuelConfig, LEADERBOARD};
use crate::tests::helpers::init;
use cosmwasm_std::testing::{mock_env, mock_info, MOCK_CONTRACT_ADDR};
use cosmwasm_std::{
    attr, coin, coins, from_json, Addr, BankMsg, Binary, CosmosMsg, ReplyOn, SubMsg, Uint128,
};
use cw_utils::PaymentError;
use prost::Message;

pub const NATIVE_DENOM: &str = "uwhale";
pub const IBC_DENOM: &str = "ibc/FA7112322CE7656DC84D441E49BAEAB9DC0AB3C7618A178A212CDE8B3F17C70B";
pub const DENOM: &str =
    "factory/migaloo1erul6xyq0gk6ws98ncj7lnq9l4jn4gnnu9we73gdz78yyl2lr7qqrvcgup/ash";
pub const SUBDENOM: &str = "inj";

#[cfg(test)]
mod tests {}

#[test]
fn test_update_config_works() {
    let (mut deps, env) = init();

    let info = mock_info("owner", &[]);

    let config: Config =
        from_json(&query(deps.as_ref(), mock_env(), QueryMsg::Config {}).unwrap()).unwrap();
    assert_eq!(config.owner, Addr::unchecked("owner"));

    let update_config_message = UpdateConfig {
        owner: Some("new_owner".to_string()),
        mint_cost: Some(Uint128::zero()),
    };

    // change owner to new_owner
    let res = execute(
        deps.as_mut(),
        env.clone(),
        info,
        update_config_message.clone(),
    )
    .unwrap();
    assert_eq!(
        res.attributes,
        vec![
            ("action", "update_config"),
            ("owner", "new_owner"),
            ("mint_cost", "0")
        ]
    );
    assert_eq!(res.messages.len(), 0);

    // confirm contract owner is changed.
    let config: Config =
        from_json(&query(deps.as_ref(), mock_env(), QueryMsg::Config {}).unwrap()).unwrap();
    assert_eq!(config.owner, Addr::unchecked("new_owner"));
    assert_eq!(config.mint_cost, Uint128::zero());
}

#[test]
fn test_update_config_should_fail() {
    let (mut deps, env) = init();

    let update_config_message = UpdateConfig {
        owner: Some("new_owner".to_string()),
        mint_cost: Some(Uint128::new(100)),
    };

    // if funds are sent
    let mut info = mock_info("owner", &coins(100, DENOM));
    let res = execute(
        deps.as_mut(),
        env.clone(),
        info,
        update_config_message.clone(),
    )
    .unwrap_err();
    assert_eq!(
        res,
        ContractError::PaymentError(PaymentError::NonPayable {})
    );

    // if caller is not owner
    info = mock_info("not_owner", &[]);

    let res = execute(
        deps.as_mut(),
        env.clone(),
        info,
        update_config_message.clone(),
    )
    .unwrap_err();
    assert_eq!(res, ContractError::Unauthorized {});
}

#[test]
fn add_fuel_works() {
    let (mut deps, env) = init();

    let info = mock_info("owner", &coins(50_000_000, NATIVE_DENOM));
    let msg = ExecuteMsg::AddFuel {
        subdenom: SUBDENOM.to_string(),
        denom: DENOM.to_string(),
    };

    // check that the message is executed successfully and attributes are correct
    let res = execute(deps.as_mut(), env.clone(), info, msg).unwrap();
    assert_eq!(
        res.attributes,
        vec![
            attr("action", "add_fuel"),
            attr("subdenom", SUBDENOM),
            attr("denom", DENOM),
            attr("fuel_fee_recipient", "bob"),
            attr("fuel_fee_rate", "0.1"),
            attr("ash_fee_recipient", "marley"),
            attr("ash_fee_rate", "0.05"),
        ]
    );

    let contract_addr = env.contract.address.to_string();

    // check that the Stargaze message for creating a new denom is correct
    assert_eq!(
        res.messages,
        vec![SubMsg {
            id: 0,
            msg: CosmosMsg::Stargate {
                type_url: "/osmosis.tokenfactory.v1beta1.MsgCreateDenom".to_string(),
                value: {
                    let msg = MsgCreateDenom {
                        sender: contract_addr.clone(),
                        subdenom: format!("{}.ash", SUBDENOM),
                    };
                    Binary(msg.encode_to_vec())
                },
            },
            gas_limit: None,
            reply_on: ReplyOn::Never,
        }]
    );

    // add a second fuel
    let info = mock_info("another_user", &coins(50_000_000, NATIVE_DENOM));
    let msg = ExecuteMsg::AddFuel {
        subdenom: "uatom".to_string(),
        denom: "uatom".to_string(),
    };

    execute(deps.as_mut(), env.clone(), info, msg).unwrap();

    // query fuels should return the newly added fuel
    let query_msg = QueryMsg::Fuels {
        start_after: None,
        limit: None,
        fuel_denom: None,
    };

    let res: FuelsResponse =
        from_json(query(deps.as_ref(), env.clone(), query_msg).unwrap()).unwrap();
    assert_eq!(
        res.fuels,
        vec![
            FuelConfig {
                subdenom: SUBDENOM.to_string(),
                denom: DENOM.to_string(),
                fuel_fee_recipient: Addr::unchecked("bob"),
                fuel_fee_rate: "0.1".parse().unwrap(),
                ash_fee_recipient: Addr::unchecked("marley"),
                ash_fee_rate: "0.05".parse().unwrap(),
            },
            FuelConfig {
                subdenom: "uatom".to_string(),
                denom: "uatom".to_string(),
                fuel_fee_recipient: Addr::unchecked("bob"),
                fuel_fee_rate: "0.1".parse().unwrap(),
                ash_fee_recipient: Addr::unchecked("marley"),
                ash_fee_rate: "0.05".parse().unwrap(),
            }
        ]
    );
}

#[test]
fn add_fuel_should_fail() {
    let (mut deps, env) = init();

    // if not enough funds are sent
    let mut info = mock_info("owner", &coins(100, DENOM));
    let msg = ExecuteMsg::AddFuel {
        subdenom: SUBDENOM.to_string(),
        denom: DENOM.to_string(),
    };

    let res = execute(deps.as_mut(), env.clone(), info, msg.clone());
    match res {
        Ok(_) => panic!("should throw an error"),
        Err(error) => assert_eq!(
            error,
            ContractError::PaymentError(PaymentError::MissingDenom {
                0: "uwhale".to_string()
            })
        ),
    }

    info = mock_info(
        "anyone",
        &[coin(50_000_000, IBC_DENOM), coin(50_000_000, NATIVE_DENOM)],
    );
    let res = execute(deps.as_mut(), env.clone(), info, msg.clone());

    match res {
        Ok(_) => panic!("should throw an error"),
        Err(error) => assert_eq!(
            error,
            ContractError::PaymentError {
                0: PaymentError::MultipleDenoms {}
            }
        ),
    }

    info = mock_info("anyone", &[coin(50_000_000, NATIVE_DENOM)]);
    let res = execute(
        deps.as_mut(),
        env.clone(),
        info,
        ExecuteMsg::AddFuel {
            subdenom: SUBDENOM.to_string(),
            denom: IBC_DENOM.to_string(),
        },
    );

    match res {
        Ok(_) => panic!("should throw an error"),
        Err(error) => assert_eq!(error, ContractError::InvalidIBCFuel {}),
    }

    // if subdenom is invalid
    info = mock_info("owner", &coins(50_000_000, NATIVE_DENOM));
    let msg = ExecuteMsg::AddFuel {
        subdenom: "{invalid_subdenom!".to_string(),
        denom: DENOM.to_string(),
    };
    assert!(execute(deps.as_mut(), env.clone(), info.clone(), msg).is_err());

    // if denom already exists
    let info = mock_info("owner", &coins(50_000_000, NATIVE_DENOM));
    let msg = ExecuteMsg::AddFuel {
        subdenom: SUBDENOM.to_string(),
        denom: DENOM.to_string(),
    };
    assert!(execute(deps.as_mut(), env.clone(), info.clone(), msg.clone()).is_ok());

    let res = execute(deps.as_mut(), env, info, msg);
    match res {
        Ok(_) => panic!("should throw an error"),
        Err(error) => assert_eq!(error, ContractError::FuelAlreadyExists {}),
    }
}

//test burn message
#[test]
fn test_burn_works() {
    // check that the ash denom is correct
    let ash_denom: String;
    if SUBDENOM == "whale" {
        ash_denom = format!("factory/{}/ash", MOCK_CONTRACT_ADDR);
    } else {
        ash_denom = format!("factory/{}/{}.ash", MOCK_CONTRACT_ADDR, SUBDENOM);
    }
    assert_eq!(
        ash_denom,
        get_ash_denom(&SUBDENOM.to_string(), &Addr::unchecked(MOCK_CONTRACT_ADDR)).unwrap()
    );

    let (mut deps, env) = init();

    let info = mock_info("owner", &coins(50_000_000, NATIVE_DENOM));
    let msg = ExecuteMsg::AddFuel {
        subdenom: SUBDENOM.to_string(),
        denom: DENOM.to_string(),
    };
    execute(deps.as_mut(), env.clone(), info.clone(), msg.clone()).unwrap();

    let info = mock_info("anyone", &coins(1_000, DENOM));

    let msg = ExecuteMsg::Burn {};
    let res = execute(deps.as_mut(), env.clone(), info, msg.clone()).unwrap();

    assert_eq!(res.messages.len(), 5);
    let bank_send_fuel_fee_msg = res.messages[0].msg.clone();
    let burn_whale_msg = res.messages[1].msg.clone();
    let mint_msg = res.messages[2].msg.clone();
    let bank_send_ash_fee_msg = res.messages[3].msg.clone();
    let bank_send_ash_msg = res.messages[4].msg.clone();

    let expected_bank_send_fuel_fee_msg = CosmosMsg::Bank(BankMsg::Send {
        to_address: "bob".to_string(),
        amount: coins(100, DENOM),
    });

    let burn_whale_msg_expected = CosmosMsg::Bank(BankMsg::Burn {
        amount: vec![coin(1_000 - 100, DENOM.to_string())],
    });

    let mint_msg_expected = <MsgMint as Into<CosmosMsg>>::into(MsgMint {
        sender: MOCK_CONTRACT_ADDR.to_string(),
        amount: Some(denom::Coin {
            denom: ash_denom.clone(),
            amount: (1_000 + 50).to_string(),
        }),
    });

    let bank_send_ash_fee_msg_expected: CosmosMsg<_> = CosmosMsg::Bank(BankMsg::Send {
        to_address: "marley".to_string(),
        amount: coins(50, ash_denom.clone()),
    });

    let bank_send_ash_msg_expected: CosmosMsg<_> = CosmosMsg::Bank(BankMsg::Send {
        to_address: "anyone".to_string(),
        amount: coins(1_000, ash_denom.clone()),
    });

    assert_eq!(burn_whale_msg, burn_whale_msg_expected);
    assert_eq!(mint_msg, mint_msg_expected);
    assert_eq!(bank_send_fuel_fee_msg, expected_bank_send_fuel_fee_msg);
    assert_eq!(bank_send_ash_fee_msg, bank_send_ash_fee_msg_expected);
    assert_eq!(bank_send_ash_msg, bank_send_ash_msg_expected);

    assert_eq!(
        res.attributes,
        vec![
            attr("action", "burn"),
            attr("denom", DENOM),
            attr("amount", "1000")
        ]
    );

    // check leaderboard
    let leaderboard: LeaderboardResponse = from_json(
        &query(
            deps.as_ref(),
            mock_env(),
            QueryMsg::Leaderboard {
                fuel_denom: DENOM.to_string(),
                start_after: None,
                limit: None,
            },
        )
        .unwrap(),
    )
    .unwrap();

    assert_eq!(
        leaderboard.leaderboard,
        vec![(Addr::unchecked("anyone"), Uint128::new(1_000))]
    );

    // burn again from different addresses
    let info = mock_info("alice", &coins(10_000, DENOM));
    let _ = execute(deps.as_mut(), env.clone(), info, msg.clone()).unwrap();

    let info = mock_info("mark", &coins(123, DENOM));
    let _ = execute(deps.as_mut(), env.clone(), info, msg.clone()).unwrap();

    let info = mock_info("anyone", &coins(5_000, DENOM));
    let _ = execute(deps.as_mut(), env.clone(), info, msg.clone()).unwrap();

    // check leaderboard again
    let leaderboard: LeaderboardResponse = from_json(
        &query(
            deps.as_ref(),
            mock_env(),
            QueryMsg::Leaderboard {
                fuel_denom: DENOM.to_string(),
                start_after: None,
                limit: None,
            },
        )
        .unwrap(),
    )
    .unwrap();

    assert_eq!(
        leaderboard.leaderboard,
        vec![
            (Addr::unchecked("alice"), Uint128::new(10_000)),
            (Addr::unchecked("anyone"), Uint128::new(1_000 + 5_000)),
            (Addr::unchecked("mark"), Uint128::new(123))
        ]
    );
}

#[test]
fn test_burn_should_fail() {
    let (mut deps, env) = init();

    // burn a fuel that has not been added
    let info = mock_info("peter", &coins(100, DENOM));
    let msg = ExecuteMsg::Burn {};
    let res = execute(deps.as_mut(), env.clone(), info.clone(), msg.clone()).unwrap_err();
    assert_eq!(res, ContractError::FuelDoesNotExist {});

    // add fuel
    let info = mock_info("owner", &coins(50_000_000, NATIVE_DENOM));
    let msg = ExecuteMsg::AddFuel {
        subdenom: SUBDENOM.to_string(),
        denom: DENOM.to_string(),
    };
    execute(deps.as_mut(), env.clone(), info.clone(), msg.clone()).unwrap();

    // burn with no funds
    let info = mock_info("anyone", &[]);
    let msg = ExecuteMsg::Burn {};
    let res = execute(deps.as_mut(), env.clone(), info.clone(), msg.clone()).unwrap_err();
    assert_eq!(res, ContractError::PaymentError(PaymentError::NoFunds {}));

    // burn with multiple coins
    let info = mock_info("anyone", &[coin(1_000, DENOM), coin(1_000, "uatom")]);
    let err = execute(deps.as_mut(), env.clone(), info, msg.clone()).unwrap_err();
    assert_eq!(
        err,
        ContractError::PaymentError(PaymentError::MultipleDenoms {})
    );

    // burn not enough fuel tokens
    let info = mock_info("anyone", &coins(9, DENOM));
    let res = execute(deps.as_mut(), env, info, msg).unwrap_err();
    assert_eq!(
        res,
        ContractError::NotEnoughFuelTokensToBurn {
            amount: Uint128::new(9)
        }
    );
}

#[test]
fn test_leaderboard_query() {
    let (mut deps, _env) = init();

    for i in 0..20 {
        let address = "address".to_string() + i.to_string().as_str();
        LEADERBOARD
            .save(
                &mut deps.storage,
                (DENOM.to_string(), &Addr::unchecked(address)),
                &Uint128::new(20 - i),
            )
            .unwrap();
    }

    let leaderboard_1: LeaderboardResponse = from_json(
        &query(
            deps.as_ref(),
            mock_env(),
            QueryMsg::Leaderboard {
                fuel_denom: DENOM.to_string(),
                start_after: None,
                limit: Some(10u32),
            },
        )
        .unwrap(),
    )
    .unwrap();

    assert_eq!(leaderboard_1.leaderboard.len(), 10usize);

    let last = leaderboard_1.leaderboard.last().unwrap().clone().0;

    let leaderboard_2: LeaderboardResponse = from_json(
        &query(
            deps.as_ref(),
            mock_env(),
            QueryMsg::Leaderboard {
                fuel_denom: DENOM.to_string(),
                start_after: Some(last),
                limit: Some(10u32),
            },
        )
        .unwrap(),
    )
    .unwrap();

    assert_eq!(leaderboard_2.leaderboard.len(), 10usize);

    let leaderboard_3: LeaderboardResponse = from_json(
        &query(
            deps.as_ref(),
            mock_env(),
            QueryMsg::Leaderboard {
                fuel_denom: DENOM.to_string(),
                start_after: None,
                limit: Some(30u32),
            },
        )
        .unwrap(),
    )
    .unwrap();

    let merged: Vec<(Addr, Uint128)> = leaderboard_1
        .leaderboard
        .into_iter()
        .chain(leaderboard_2.leaderboard.into_iter())
        .collect();
    assert_eq!(merged, leaderboard_3.leaderboard);
}

#[test]
fn test_update_fuel_config_works() {
    let (mut deps, env) = init();

    let info = mock_info("owner", &coins(50_000_000, NATIVE_DENOM));
    let msg = ExecuteMsg::AddFuel {
        subdenom: SUBDENOM.to_string(),
        denom: DENOM.to_string(),
    };

    let _ = execute(deps.as_mut(), env.clone(), info.clone(), msg.clone()).unwrap();

    let info = mock_info("owner", &[]);
    let msg = ExecuteMsg::UpdateFuelConfig {
        fuel_denom: DENOM.to_string(),
        fuel_fee_recipient: Some("nyjah".to_string()),
        fuel_fee_rate: Some("0.2".parse().unwrap()),
        ash_fee_recipient: Some("huston".to_string()),
        ash_fee_rate: Some("0.1".parse().unwrap()),
    };

    let res = execute(deps.as_mut(), env.clone(), info, msg).unwrap();
    assert_eq!(
        res.attributes,
        vec![
            attr("action", "update_fuel_config"),
            attr("subdenom", SUBDENOM),
            attr("denom", DENOM),
            attr("fuel_fee_recipient", "nyjah"),
            attr("fuel_fee_rate", "0.2"),
            attr("ash_fee_recipient", "huston"),
            attr("ash_fee_rate", "0.1")
        ]
    );

    let new_fuel: FuelsResponse = from_json(
        &query(
            deps.as_ref(),
            mock_env(),
            QueryMsg::Fuels {
                start_after: None,
                limit: None,
                fuel_denom: None,
            },
        )
        .unwrap(),
    )
    .unwrap();

    let new_fuel_test: FuelsResponse = from_json(
        &query(
            deps.as_ref(),
            mock_env(),
            QueryMsg::Fuels {
                start_after: None,
                limit: None,
                fuel_denom: Some(DENOM.to_string()),
            },
        )
        .unwrap(),
    )
    .unwrap();

    assert_eq!(new_fuel.fuels, new_fuel_test.fuels);

    assert_eq!(
        new_fuel.fuels[0],
        FuelConfig {
            subdenom: SUBDENOM.to_string(),
            denom: DENOM.to_string(),
            fuel_fee_recipient: Addr::unchecked("nyjah"),
            fuel_fee_rate: "0.2".parse().unwrap(),
            ash_fee_recipient: Addr::unchecked("huston"),
            ash_fee_rate: "0.1".parse().unwrap(),
        }
    );
}

#[test]
fn test_update_fuel_config_should_fail() {
    let (mut deps, env) = init();

    let info = mock_info("owner", &&coins(50_000_000, NATIVE_DENOM));
    let msg = ExecuteMsg::AddFuel {
        subdenom: SUBDENOM.to_string(),
        denom: DENOM.to_string(),
    };

    let _ = execute(deps.as_mut(), env.clone(), info.clone(), msg.clone()).unwrap();

    // if caller is not owner
    let info = mock_info("not_owner", &[]);
    let msg = ExecuteMsg::UpdateFuelConfig {
        fuel_denom: DENOM.to_string(),
        fuel_fee_recipient: Some("nyjah".to_string()),
        fuel_fee_rate: Some("0.2".parse().unwrap()),
        ash_fee_recipient: Some("huston".to_string()),
        ash_fee_rate: Some("0.1".parse().unwrap()),
    };
    let res = execute(deps.as_mut(), env.clone(), info, msg).unwrap_err();
    assert_eq!(res, ContractError::Unauthorized {});

    // if fuel does not exist
    let info = mock_info("owner", &[]);
    let msg = ExecuteMsg::UpdateFuelConfig {
        fuel_denom: "invalid_denom".to_string(),
        fuel_fee_recipient: Some("nyjah".to_string()),
        fuel_fee_rate: Some("0.2".parse().unwrap()),
        ash_fee_recipient: Some("huston".to_string()),
        ash_fee_rate: Some("0.1".parse().unwrap()),
    };
    let res = execute(deps.as_mut(), env.clone(), info, msg).unwrap_err();
    assert_eq!(res, ContractError::FuelDoesNotExist {});

    // if fuel fee rate is invalid
    let info = mock_info("owner", &[]);
    let msg = ExecuteMsg::UpdateFuelConfig {
        fuel_denom: DENOM.to_string(),
        fuel_fee_recipient: Some("nyjah".to_string()),
        fuel_fee_rate: Some("1.1".parse().unwrap()),
        ash_fee_recipient: Some("huston".to_string()),
        ash_fee_rate: Some("0.1".parse().unwrap()),
    };

    let res = execute(deps.as_mut(), env.clone(), info.clone(), msg.clone()).unwrap_err();
    assert_eq!(res, ContractError::InvalidFeeRate {});

    // if ash fee rate is invalid
    let msg = ExecuteMsg::UpdateFuelConfig {
        fuel_denom: DENOM.to_string(),
        fuel_fee_recipient: Some("nyjah".to_string()),
        fuel_fee_rate: Some("0.2".parse().unwrap()),
        ash_fee_recipient: Some("huston".to_string()),
        ash_fee_rate: Some("1.1".parse().unwrap()),
    };
    let res = execute(deps.as_mut(), env.clone(), info, msg).unwrap_err();
    assert_eq!(res, ContractError::InvalidFeeRate {});

    // if funds are sent
    let info = mock_info("owner", &coins(100, DENOM));
    let msg = ExecuteMsg::UpdateFuelConfig {
        fuel_denom: DENOM.to_string(),
        fuel_fee_recipient: Some("nyjah".to_string()),
        fuel_fee_rate: Some("0.2".parse().unwrap()),
        ash_fee_recipient: Some("huston".to_string()),
        ash_fee_rate: Some("0.1".parse().unwrap()),
    };
    let res = execute(deps.as_mut(), env.clone(), info, msg).unwrap_err();
    assert_eq!(
        res,
        ContractError::PaymentError(PaymentError::NonPayable {})
    );

    // if all fields are empty it should work but do nothing (for simplicity)
    let info = mock_info("owner", &[]);
    let msg = ExecuteMsg::UpdateFuelConfig {
        fuel_denom: DENOM.to_string(),
        fuel_fee_recipient: None,
        fuel_fee_rate: None,
        ash_fee_recipient: None,
        ash_fee_rate: None,
    };
    let res = execute(deps.as_mut(), env, info, msg).unwrap();
    assert_eq!(
        res.attributes,
        vec![
            attr("action", "update_fuel_config"),
            attr("subdenom", SUBDENOM),
            attr("denom", DENOM),
            attr("fuel_fee_recipient", "bob"),
            attr("fuel_fee_rate", "0.1"),
            attr("ash_fee_recipient", "marley"),
            attr("ash_fee_rate", "0.05")
        ]
    );
}
#[test]
fn test_burn_10_coins() {
    let (mut deps, env) = init();

    let info = mock_info("owner", &coins(50_000_000, NATIVE_DENOM));
    let msg = ExecuteMsg::AddFuel {
        subdenom: SUBDENOM.to_string(),
        denom: DENOM.to_string(),
    };

    let _ = execute(deps.as_mut(), env.clone(), info.clone(), msg.clone()).unwrap();

    let info = mock_info("anyone", &coins(10, DENOM));
    let msg = ExecuteMsg::Burn {};
    let res = execute(deps.as_mut(), env.clone(), info, msg).unwrap();

    assert_eq!(res.messages.len(), 4);
    let bank_send_fuel_fee_msg = res.messages[0].msg.clone();
    let burn_whale_msg = res.messages[1].msg.clone();
    let mint_msg = res.messages[2].msg.clone();
    // let bank_send_ash_fee_msg = res.messages[3].msg.clone();
    let bank_send_ash_msg = res.messages[3].msg.clone();

    let expected_bank_send_fuel_fee_msg: CosmosMsg = CosmosMsg::Bank(BankMsg::Send {
        to_address: "bob".to_string(),
        amount: coins(1, DENOM),
    });

    let burn_whale_msg_expected: CosmosMsg = CosmosMsg::Bank(BankMsg::Burn {
        amount: vec![coin(10 - 1, DENOM.to_string())],
    });

    let ash_denom: String;
    if SUBDENOM == "whale" {
        ash_denom = format!("factory/{}/ash", MOCK_CONTRACT_ADDR);
    } else {
        ash_denom = format!("factory/{}/{}.ash", MOCK_CONTRACT_ADDR, SUBDENOM);
    }
    let mint_msg_expected = <MsgMint as Into<CosmosMsg>>::into(MsgMint {
        sender: MOCK_CONTRACT_ADDR.to_string(),
        amount: Some(denom::Coin {
            denom: ash_denom.clone(),
            amount: 10.to_string(),
        }),
    });

    // cannot send a bank message with 0 coins
    // let bank_send_ash_fee_msg_expected: CosmosMsg = CosmosMsg::Bank(BankMsg::Send {
    //     to_address: "marley".to_string(),
    //     amount: coins(0, ash_denom.clone()),
    // });

    let bank_send_ash_msg_expected: CosmosMsg = CosmosMsg::Bank(BankMsg::Send {
        to_address: "anyone".to_string(),
        amount: coins(10, ash_denom.clone()),
    });

    assert_eq!(burn_whale_msg, burn_whale_msg_expected);
    assert_eq!(mint_msg, mint_msg_expected);
    assert_eq!(bank_send_fuel_fee_msg, expected_bank_send_fuel_fee_msg);
    // assert_eq!(bank_send_ash_fee_msg, bank_send_ash_fee_msg_expected);
    assert_eq!(bank_send_ash_msg, bank_send_ash_msg_expected);
}

#[test]
fn test_add_fuel_when_mint_cost_is_zero() {
    let (mut deps, env) = init();

    let info = mock_info("owner", &[]);

    let update_config_message = UpdateConfig {
        owner: None,
        mint_cost: Some(Uint128::zero()),
    };

    // change mint cost to zero
    let _ = execute(
        deps.as_mut(),
        env.clone(),
        info,
        update_config_message.clone(),
    )
    .unwrap();

    let info = mock_info("owner", &coins(50_000_000, NATIVE_DENOM));
    let msg = ExecuteMsg::AddFuel {
        subdenom: SUBDENOM.to_string(),
        denom: DENOM.to_string(),
    };

    // should not let add fuel when mint cost is zero and funds are sent
    let err = execute(deps.as_mut(), env.clone(), info, msg.clone()).unwrap_err();
    assert_eq!(
        err,
        ContractError::PaymentError(PaymentError::NonPayable {})
    );

    // adding fuel should work when no funds are sent
    let info = mock_info("owner", &[]);
    let res = execute(deps.as_mut(), env.clone(), info, msg).unwrap();

    // check that the Stargaze message for creating a new denom is correct
    assert_eq!(
        res.messages,
        vec![SubMsg {
            id: 0,
            msg: CosmosMsg::Stargate {
                type_url: "/osmosis.tokenfactory.v1beta1.MsgCreateDenom".to_string(),
                value: {
                    let msg = MsgCreateDenom {
                        sender: env.contract.address.to_string(),
                        subdenom: format!("{}.ash", SUBDENOM),
                    };
                    Binary(msg.encode_to_vec())
                },
            },
            gas_limit: None,
            reply_on: ReplyOn::Never,
        }]
    );

    // query fuels should return the newly added fuel
    let query_msg = QueryMsg::Fuels {
        start_after: None,
        limit: None,
        fuel_denom: Some(DENOM.to_string()),
    };
    let res: FuelsResponse = from_json(query(deps.as_ref(), env, query_msg).unwrap()).unwrap();
    assert_eq!(
        res.fuels,
        vec![FuelConfig {
            subdenom: SUBDENOM.to_string(),
            denom: DENOM.to_string(),
            fuel_fee_recipient: Addr::unchecked("bob"),
            fuel_fee_rate: "0.1".parse().unwrap(),
            ash_fee_recipient: Addr::unchecked("marley"),
            ash_fee_rate: "0.05".parse().unwrap(),
        }]
    );
}
