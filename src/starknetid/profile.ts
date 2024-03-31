import { normalize } from '$src/address.js';
import { Reader } from '$src/client/index.js';
import { toFelt } from '$src/codec.js';
import { ChainID } from '$src/network/network.js';
import { HexString } from '$src/types.js';
import { fromHexString } from '$src/utilities/buffer.js';
import { refine } from '$src/utilities/hex.js';
import { Deployment, StarknetID } from './deployment.js';

type Client = Reader<ChainID, Deployment>;
export type NFT = { contract: HexString; id: [string, string] };

const enum Field {
	PFPContract = '573230680222261453661213444620247924', //toShortString('nft_pp_contract')
	PFPID = '2036524478733744040292', //toShortString('nft_pp_id')
	Twitter = '32782392107492722', //toShortString('twitter')
	GitHub = '113702622229858', //toShortString('github')
	Discord = '28263441981469284' //toShortString('discord')
}

export async function nft(client: Client, ids: string[]) {
	const contract = client.lookup[StarknetID].identity;
	if (!contract) throw new Error('Starknet ID contract not found');

	const verifier = toFelt(client.lookup[StarknetID].verifier.pfp);
	if (!verifier) throw new Error('Starknet ID verifier not found');

	try {
		const calls = Array(ids.length * 2);
		for (let i = 0; i < ids.length; i++) {
			const id = toFelt(ids[i]);
			calls[i] = {
				to: contract,
				method: 'get_verifier_data',
				data: [id, Field.PFPContract, verifier, '0']
			};
			calls[i + 1] = {
				to: contract,
				method: 'get_extended_verifier_data',
				data: [id, Field.PFPID, '2', verifier, '0']
			};
		}

		const { result } = await client.multicall(calls);
		if (!result) throw Error('Could not get nft contract for ids');
		const nfts = new Array<NFT>(ids.length);

		for (let i = 2, j = 0; j < nfts.length; i += 5, j += 1) {
			nfts[j] = {
				contract: normalize(result[i + 1]),
				id: [result[i + 4], result[i + 5]]
			};
		}

		return nfts;
	} catch (e) {
		throw Error('Could not get nft contract for ids');
	}
}

const DECODER = new TextDecoder();
export async function uri(client: Client, nfts: NFT[]) {
	try {
		const calls = Array(nfts.length);
		for (let i = 0; i < nfts.length; i++) {
			calls[i] = {
				to: nfts[i].contract,
				method: 'tokenURI',
				data: [toFelt(nfts[i].id[0]), toFelt(nfts[i].id[1])]
			};
		}

		const { result } = await client.multicall(calls);

		if (!result) throw Error('Could not get uri contract for nft id');
		const uris = new Array<string>(nfts.length);

		for (let i = 2, j = 0; j < nfts.length; i += 2, j += 1) {
			let concated = '';
			const length = Number(BigInt(result[i + 1]));
			for (let k = 0; k < length; k++, i++) concated += refine(result[i + 2]);
			uris[j] = DECODER.decode(fromHexString(concated));
		}
		return uris;
	} catch (e) {
		console.log(e);
		throw Error('Could not get nft contract for ids');
	}
}

export async function image(url: string) {
	try {
		const response = await fetch(url);
		if (!response.ok) throw Error('Network response was not ok');
		const data = await response.json();
		if (!data.image) throw Error('Image is not set');
		return data.image as string;
	} catch (error) {
		console.error('There was a problem fetching the image URL:', error);
	}
	return;
}
