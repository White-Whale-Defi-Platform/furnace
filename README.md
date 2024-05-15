![Furnace](/public/assets/burn.png)


# The Furnace 🔥

The Furnace is a multichain dApp where users can burn tokens in order to receive an `ash` derivative token.

## Run Locally  🚀

Clone the project

```bash
  git clone git@github.com:White-Whale-Defi-Platform/furnace.git
```

Go to the project directory

```bash
  cd furnace
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## FAQ 💡

#### - How to add a new chain's furnace?

Each chain only needs one furnace contract and can support any number of fuel assets. So if you are trying to add an additional fuel asset to a chain that already has the furnace live, view [How to add new tokens](#how-to-add-new-tokens).

- Update the [chain registry](https://github.com/cosmos/chain-registry) with the fuel and mint asset definitions of the new furnace under the correct chain. 
  - [For example](https://github.com/cosmos/chain-registry/pull/4278) when adding GUPPY/gASH we ensured that the Migaloo chain registry had an asset definition for GUPPY and gASH.
- Update the [api.ts](./src/constants/api.ts) with information about the chain that you're adding.
    - For example: 
    ```js
    {
        // chain name from the cosmos chain registry
        osmosis: {
            // List of rpc endpoints
            rpc: ['https://osmosis-rpc.polkachu.com'],
            // List of rest endpoints
            rest: ['https://osmosis-api.polkachu.com'],
            // Furnace address
            contractAddress: 'osmo1svj5kd8kzj7xxtrd6ftjk0856ffpyj4egz7f9pd9dge5wr4kwansmefq07',
            // Block explorer for the chain
            explorerUrl: 'https://ping.pub/osmosis',
            // Color to use for data visualizations 
            chainColor: '#B100CD'
        }
    }
  ```
- Update the chain-registry module to the latest version in [package.json](./package.json#L26).

#### - How to add new tokens?

As long as the front end knows about the chain's furnace already, there is no need to redeploy the front end or do any additional configuration. The main need is to update the contract itself.

- Update the [chain registry](https://github.com/cosmos/chain-registry) with the fuel and mint asset definitions of the new tokens.
  - [For example](https://github.com/cosmos/chain-registry/pull/4278) when adding GUPPY/gASH we ensured that the Migaloo chain registry had an asset definition for GUPPY and gASH. 
- Optionally you may update the chain-registry module to the latest version in [package.json](./package.json#L26).
- Add the new token into the furnace contract.


#### - Why does a token display the ash dao logo instead of the actual token icon?
If a fuel/mint asset does not exist in the chain registry, its logo will automatically be the ash dao logo as a placeholder while its name is displayed in the furnace UI. Please update the chain registry with the fuel and mint asset definitions of the new tokens you are adding.



## Support ☎️

For support, join our [Discord channel](https://discord.com/invite/z5UVQ5jJyb) and follow us on twitter [Twitter](https://twitter.com/_ASH_DAO?t=Dkh38FWTfG1zxuCfOw8KuQ&s=09)