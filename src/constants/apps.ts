// import type { AppInfo } from '@/types'

// export enum Teams {
//   MigalooFoundation = 'Migaloo Foundation',
//   ErisProtocol = 'Eris Protocol',
//   BackboneLabs = 'Backbone Labs',
//   RacoonSupply = 'Racoon Supply',
//   Ginkou = 'Ginkou',
//   Community = 'Community',
// }

// export enum AppCategories {
//   All = 'All',
//   DeFi = 'DeFi',
//   NFT = 'NFT',
//   Games = 'Games',
//   Governance = 'Governance'
// }

// export enum AppNames {
//   // Community
//   Furnace = 'Furnace',
//   // Eris Protocol
//   Amplifier = 'Amplifier',
//   AmplifiedArbitrage = 'AmpArb',
//   AmplifiedGovernance = 'AmpGov',
//   // Backbone Labs
//   Gravedigger = 'Gravedigger',
//   Necropolis = 'Necropolis',
//   NFTSwitch = 'NFT-Switch',
//   // Ginkou
//   Ginkou = 'Ginkou',
//   // Racoon Supply
//   RacoonBet = 'Racoon Bet',
//   SharkProtocol = 'Shark Protocol',
//   // Migaloo Foundatin
//   PixelWars = 'Pixel Wars',
//   WhiteWhale = 'White Whale',
// }

// export const Apps = new Map<AppNames, AppInfo>([
//   [AppNames.Furnace, {
//     name: AppNames.Furnace,
//     creator: Teams.Community,
//     logo: '/apps/community/furnace/avatar.svg',
//     banner: '/apps/community/furnace/banner.png',
//     description: 'Burn Whale & Receive Ash',
//     category: AppCategories.DeFi,
//     href: {
//       internal: '/apps/community/furnace',
//       external: 'https://whale.burn.community'
//     }
//   }],
//   [AppNames.Amplifier, {
//     name: AppNames.Amplifier,
//     creator: Teams.ErisProtocol,
//     logo: '/apps/eris-protocol/amplifier/avatar.jpg',
//     banner: '/apps/eris-protocol/amplifier/banner.png',
//     description: 'Hyper-Performant Liquid Staking',
//     category: AppCategories.DeFi,
//     href: {
//       internal: '/apps/eris-protocol/amplifier',
//       external: 'https://www.erisprotocol.com/migaloo/amplifier'
//     }
//   }],
//   [AppNames.Gravedigger, {
//     name: AppNames.Gravedigger,
//     creator: Teams.BackboneLabs,
//     logo: '/apps/backbone-labs/gravedigger/avatar.png',
//     banner: '/apps/backbone-labs/gravedigger/banner.png',
//     description: 'Community-Owned Liquid Staking',
//     category: AppCategories.DeFi,
//     href: {
//       internal: '/apps/backbone-labs/gravedigger',
//       external: 'https://migaloo.gravedigger.zone/'
//     }
//   }],
//   [AppNames.PixelWars, {
//     name: AppNames.PixelWars,
//     creator: Teams.MigalooFoundation,
//     logo: '/apps/migaloo-foundation/pixel-wars/avatar.svg',
//     banner: '/apps/migaloo-foundation/pixel-wars/banner.png',
//     description: 'Creativity Unleashed',
//     category: AppCategories.Games,
//     href: {
//       internal: '',
//       external: 'https://paint.migaloo.zone'
//     }
//   }],
//   [AppNames.Ginkou, {
//     name: AppNames.Ginkou,
//     creator: Teams.Ginkou,
//     logo: '/apps/ginkou/avatar.jpg',
//     banner: '/apps/ginkou/banner.png',
//     description: 'Money Markets Reimagined',
//     category: AppCategories.DeFi,
//     href: {
//       internal: '',
//       external: 'https://ginkou.io'
//     }
//   }],
//   [AppNames.RacoonBet, {
//     name: AppNames.RacoonBet,
//     creator: Teams.RacoonSupply,
//     logo: '/apps/racoon-supply/racoon-bet/avatar.png',
//     banner: '/apps/racoon-supply/racoon-bet/banner.png',
//     description: 'Play 2 Win',
//     category: AppCategories.Games,
//     href: {
//       internal: '',
//       external: 'https://www.racoon.bet/'
//     }
//   }],
//   [AppNames.SharkProtocol, {
//     name: AppNames.SharkProtocol,
//     creator: Teams.RacoonSupply,
//     logo: '/apps/racoon-supply/shark-protocol/avatar.jpg',
//     banner: '/apps/racoon-supply/shark-protocol/banner.png',
//     description: 'Predict Movements & Earn Prices',
//     category: AppCategories.DeFi,
//     href: {
//       internal: '',
//       external: 'https://www.sharkprotocol.bet'
//     }
//   }],
//   [AppNames.Necropolis, {
//     name: AppNames.Necropolis,
//     creator: Teams.BackboneLabs,
//     logo: '/apps/backbone-labs/necropolis/avatar.png',
//     banner: '/apps/backbone-labs/necropolis/banner.png',
//     description: 'Everything NFT',
//     category: AppCategories.NFT,
//     href: {
//       internal: '',
//       external: 'https://necropolisnft.io'
//     }
//   }],
//   [AppNames.NFTSwitch, {
//     name: AppNames.NFTSwitch,
//     creator: Teams.BackboneLabs,
//     logo: '/apps/backbone-labs/nft-switch/avatar.jpg',
//     banner: '/apps/backbone-labs/nft-switch/banner.png',
//     description: 'P2P NFT Trading',
//     category: AppCategories.NFT,
//     href: {
//       internal: '',
//       external: 'https://dapp.nftswitch.xyz/'
//     }
//   }],
//   [AppNames.AmplifiedArbitrage, {
//     name: AppNames.AmplifiedArbitrage,
//     creator: Teams.ErisProtocol,
//     logo: '/apps/eris-protocol/arbitrage-vaults/avatar.jpg',
//     banner: '/apps/eris-protocol/arbitrage-vaults/banner.png',
//     description: 'Stabilze Prices & Earn Yield',
//     category: AppCategories.DeFi,
//     href: {
//       internal: '',
//       external: 'https://www.erisprotocol.com/migaloo/arb-vault'
//     }
//   }],
//   [AppNames.WhiteWhale, {
//     name: AppNames.WhiteWhale,
//     creator: Teams.MigalooFoundation,
//     logo: '/apps/migaloo-foundation/white-whale/avatar.svg',
//     banner: '/apps/migaloo-foundation/white-whale/banner.png',
//     description: 'Trade, Flash Loan, Earn & More',
//     category: AppCategories.DeFi,
//     href: {
//       internal: '',
//       external: 'https://app.whitewhale.money'
//     }
//   }],
//   [AppNames.AmplifiedGovernance, {
//     name: AppNames.AmplifiedGovernance,
//     creator: Teams.ErisProtocol,
//     logo: '/apps/eris-protocol/amplified-governance/avatar.jpg',
//     banner: '/apps/eris-protocol/amplified-governance/banner.png',
//     description: 'Trade, Flash Loan, Earn & More',
//     category: AppCategories.Governance,
//     href: {
//       internal: '',
//       external: 'https://www.erisprotocol.com/migaloo/amp-governance'
//     }
//   }]
// ])
