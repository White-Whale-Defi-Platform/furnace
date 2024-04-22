/**
* This file was automatically generated by @cosmwasm/ts-codegen@1.8.1.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { Coin, StdFee } from "@cosmjs/amino";
import { Uint128, InstantiateMsg, ExecuteMsg, Decimal, QueryMsg, Addr, Config, FuelsResponse, FuelConfig, LeaderboardResponse } from "./Furnace.types";
export interface FurnaceReadOnlyInterface {
  contractAddress: string;
  config: () => Promise<Config>;
  fuels: ({
    fuelDenom,
    limit,
    startAfter
  }: {
    fuelDenom?: string;
    limit?: number;
    startAfter?: Addr;
  }) => Promise<FuelsResponse>;
  leaderboard: ({
    fuelDenom,
    limit,
    startAfter
  }: {
    fuelDenom: string;
    limit?: number;
    startAfter?: Addr;
  }) => Promise<LeaderboardResponse>;
}
export class FurnaceQueryClient implements FurnaceReadOnlyInterface {
  client: CosmWasmClient;
  contractAddress: string;
  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.config = this.config.bind(this);
    this.fuels = this.fuels.bind(this);
    this.leaderboard = this.leaderboard.bind(this);
  }
  config = async (): Promise<Config> => {
    return this.client.queryContractSmart(this.contractAddress, {
      config: {}
    });
  };
  fuels = async ({
    fuelDenom,
    limit,
    startAfter
  }: {
    fuelDenom?: string;
    limit?: number;
    startAfter?: Addr;
  }): Promise<FuelsResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      fuels: {
        fuel_denom: fuelDenom,
        limit,
        start_after: startAfter
      }
    });
  };
  leaderboard = async ({
    fuelDenom,
    limit,
    startAfter
  }: {
    fuelDenom: string;
    limit?: number;
    startAfter?: Addr;
  }): Promise<LeaderboardResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      leaderboard: {
        fuel_denom: fuelDenom,
        limit,
        start_after: startAfter
      }
    });
  };
}
export interface FurnaceInterface extends FurnaceReadOnlyInterface {
  contractAddress: string;
  sender: string;
  updateConfig: ({
    mintCost,
    owner
  }: {
    mintCost?: Uint128;
    owner?: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  burn: (fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  addFuel: ({
    ashFeeRate,
    ashFeeRecipient,
    denom,
    fuelFeeRate,
    fuelFeeRecipient,
    subdenom
  }: {
    ashFeeRate: Decimal;
    ashFeeRecipient: string;
    denom: string;
    fuelFeeRate: Decimal;
    fuelFeeRecipient: string;
    subdenom: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  updateFuelConfig: ({
    ashFeeRate,
    ashFeeRecipient,
    fuelDenom,
    fuelFeeRate,
    fuelFeeRecipient
  }: {
    ashFeeRate?: Decimal;
    ashFeeRecipient?: string;
    fuelDenom: string;
    fuelFeeRate?: Decimal;
    fuelFeeRecipient?: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
}
export class FurnaceClient extends FurnaceQueryClient implements FurnaceInterface {
  client: SigningCosmWasmClient;
  sender: string;
  contractAddress: string;
  constructor(client: SigningCosmWasmClient, sender: string, contractAddress: string) {
    super(client, contractAddress);
    this.client = client;
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.updateConfig = this.updateConfig.bind(this);
    this.burn = this.burn.bind(this);
    this.addFuel = this.addFuel.bind(this);
    this.updateFuelConfig = this.updateFuelConfig.bind(this);
  }
  updateConfig = async ({
    mintCost,
    owner
  }: {
    mintCost?: Uint128;
    owner?: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_config: {
        mint_cost: mintCost,
        owner
      }
    }, fee, memo, _funds);
  };
  burn = async (fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      burn: {}
    }, fee, memo, _funds);
  };
  addFuel = async ({
    ashFeeRate,
    ashFeeRecipient,
    denom,
    fuelFeeRate,
    fuelFeeRecipient,
    subdenom
  }: {
    ashFeeRate: Decimal;
    ashFeeRecipient: string;
    denom: string;
    fuelFeeRate: Decimal;
    fuelFeeRecipient: string;
    subdenom: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      add_fuel: {
        ash_fee_rate: ashFeeRate,
        ash_fee_recipient: ashFeeRecipient,
        denom,
        fuel_fee_rate: fuelFeeRate,
        fuel_fee_recipient: fuelFeeRecipient,
        subdenom
      }
    }, fee, memo, _funds);
  };
  updateFuelConfig = async ({
    ashFeeRate,
    ashFeeRecipient,
    fuelDenom,
    fuelFeeRate,
    fuelFeeRecipient
  }: {
    ashFeeRate?: Decimal;
    ashFeeRecipient?: string;
    fuelDenom: string;
    fuelFeeRate?: Decimal;
    fuelFeeRecipient?: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_fuel_config: {
        ash_fee_rate: ashFeeRate,
        ash_fee_recipient: ashFeeRecipient,
        fuel_denom: fuelDenom,
        fuel_fee_rate: fuelFeeRate,
        fuel_fee_recipient: fuelFeeRecipient
      }
    }, fee, memo, _funds);
  };
}