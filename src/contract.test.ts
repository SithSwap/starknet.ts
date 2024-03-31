import { ChainID } from '$src/network/index.js';
import { MulticallContracts } from '$src/call/index.js';

import { hash } from './contract.js';
import { getReader } from '$tests/utilities/starknet.js';

describe('Contract Hash', () => {
	const provider = getReader(ChainID.Goerli).provider;
	it('fetch contract hash', async () => {
		const value = await hash(provider, MulticallContracts[ChainID.Goerli]);

		expect(value).toBeDefined();
		expect(value?.startsWith('0x')).toBe(true);
	});
});
