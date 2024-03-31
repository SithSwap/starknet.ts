import type { Deployment as GenericDeployment } from '$src/client/index.js';
import type { Deployment as MulticallDeployment } from '$src/call/multicall.js';
import type { Deployment as StarknetIDDeployment } from '$src/starknetid/deployment.js';

import { RpcProvider } from 'starknet';
import { ChainID } from '$src/network/index.js';
import RPCs from '$src/network/rpc.js';
import { reader } from '$src/client/index.js';

import MulticallContracts, { Multicall } from '$src/call/multicall.js';
import StarknetIDContracts, { StarknetID } from '$src/starknetid/deployment.js';

const Supported = [ChainID.Goerli, ChainID.Mainnet];
type Supported = (typeof Supported)[number];

type Deployment = GenericDeployment & MulticallDeployment & StarknetIDDeployment;
export function getReader(chain: Supported) {
	const rpc = RPCs[chain][0];
	if (!rpc) throw new Error(`no RPC provided for selected network [${chain}]`);
	const deployment = {
		[Multicall]: MulticallContracts[chain],
		[StarknetID]: StarknetIDContracts[chain]
	};
	const provider = new RpcProvider({ nodeUrl: rpc });
	return reader<Supported, Deployment>({ chain, provider }, deployment);
}
