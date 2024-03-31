import { ChainID } from '$src/network/index.js';
import { HexString } from '$src/types.js';
import { ProviderInterface } from 'starknet';
import { Block, Call, toExecuteCalldata } from './call.js';

export const Multicall = Symbol('Multicall');

export type Deployment = { [Multicall]: HexString };

export default {
	[ChainID.Mainnet]: '0x05754af3760f3356da99aea5c3ec39ccac7783d925a19666ebbeca58ff0087f4',
	[ChainID.Goerli]: '0x05754af3760f3356da99aea5c3ec39ccac7783d925a19666ebbeca58ff0087f4'
} as const;

export function multicall(
	provider: ProviderInterface,
	contract: HexString,
	calls: Call[],
	block?: Block
) {
	return provider.callContract(
		{
			entrypoint: 'aggregate',
			contractAddress: contract,
			calldata: toExecuteCalldata(calls)
		},
		block
	);
}
