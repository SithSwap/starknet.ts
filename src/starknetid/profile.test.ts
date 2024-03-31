import { ChainID } from '$src/network/network.js';
import { getReader } from '$tests/utilities/starknet.js';
import { NFT, image, nft, uri } from './profile.js';

describe('Profile', () => {
	const client = getReader(ChainID.Mainnet);

	it('gets nft contracts from ids from domains', async () => {
		const ids = ['0x00000000000000000000000000000000000000000000000000000072f728d70c'];
		const addresses = await nft(client, ids);

		console.log(addresses);
	});

	it.only('gets uri', async () => {
		const nfts = [
			{
				contract: '0x03ab1124ef9ec3a2f2b1d9838f9066f9a894483d40b33390dda8d85c01a315a3',
				id: ['0x1b9c', '0x0']
			}
		] as NFT[];
		const uris = await uri(client, nfts);

		console.log(uris);

		const img = await Promise.all(uris.map(image));
		console.log(img);
	});
});
