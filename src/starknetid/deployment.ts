import type { HexString } from '$src/types.js';

import { ChainID } from '$src/network/index.js';

export const StarknetID = Symbol('StarknetID');

export type Deployment = {
	[StarknetID]: {
		name: HexString;
		identity: HexString;
		verifier: { id: HexString; pfp: HexString; pop: HexString };
	};
};

export default {
	[ChainID.Mainnet]: {
		name: '0x06ac597f8116f886fa1c97a23fa4e08299975ecaf6b598873ca6792b9bbfb678',
		identity: '0x05dbdedc203e92749e2e746e2d40a768d966bd243df04a6b712e222bc040a9af',
		verifier: {
			id: '0x0480258f58d43fb73936f803780047a0f6d0a563697d80bd3f95b603f9c8b1c8',
			pfp: '0x070aaa20ec4a46da57c932d9fd89ca5e6bb9ca3188d3df361a32306aff7d59c7',
			pop: '0x0293eb2ba9862f762bd3036586d5755a782bd22e6f5028320f1d0405fd47bff4'
		}
	},
	[ChainID.Goerli]: {
		name: '0x003bab268e932d2cecd1946f100ae67ce3dff9fd234119ea2f6da57d16d29fce',
		identity: '0x0783a9097b26eae0586373b2ce0ed3529ddc44069d1e0fbc4f66d42b69d6850d',
		verifier: {
			id: '0x019e5204152a72891bf8cd0bed8f03593fdb29ceacd14fca587be5d9fcf87c0e',
			pfp: '0x03cac3228b434259734ee0e4ff445f642206ea11adace7e4f45edd2596748698',
			pop: '0x03528caf090179e337931ee669a5b0214041e1bae30d460ff07d2cea2c7a9106'
		}
	},
	[ChainID.Sepolia]: {
		name: '0x0707f09bc576bd7cfee59694846291047e965f4184fe13dac62c56759b3b6fa7',
		identity: '0x070df8b4f5cb2879f8592849fa8f3134da39d25326b8558cc9c8fe8d47ea3a90',
		verifier: {
			id: '0x0182ece8173c216a395f4828e1523541b7e3600bf190cb252e1a1a0ce219d184',
			pfp: '0x058061bb6bdc501ee215172c9f87d557c1e0f466dc498ca81b18f998bf1362b2',
			pop: '0x0023fe3b845ed5665a9eb3792bbb17347b490ee4090f855c1298d03bb5f49b49'
		}
	}
} as const;
