import { ChainID } from './network.js';

export default {
	[ChainID.Mainnet]: [
		`https://rpc.starknet.lava.build`,
		`https://starknet-mainnet.public.blastapi.io`
	],
	[ChainID.Goerli]: [
		`https://rpc.starknet-testnet.lava.build`,
		`https://starknet-testnet.public.blastapi.io`
	],
	[ChainID.Sepolia]: [`https://starknet-sepolia.public.blastapi.io`]
} as Record<ChainID, string[]>;
