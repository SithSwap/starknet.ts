import { ChainID } from '$src/network/index.js';
import { normalize } from '$src/address.js';

import { getReader } from '$tests/utilities/starknet.js';


import { from, to, id } from './name.js';
describe.concurrent('StarknetID', () => {
	const client = getReader(ChainID.Mainnet);

	it.each([
		[0n, ''],
		['0x43812817b20b2e237017b4197f83b3bf196dc4e075f02804b6e9d2d46f7c4ae', ''],
		['0x056acc7ff24ab31c30c2404cefac4a65f2381348439ba3363db0fc9cd40a8403', ''],
		['0x05e5f42000cb2630d67ec7466111d8ffa8887fa61091a59dc793a28407375dc1', 'world.stark']
	])('gets name for address "%s" -> "%s"', async (address, expected) => {
		const [domain] = await to(client, [address]);
		expect(domain).toBe(expected);
	});

	// it('gets multiple names at once', async () => {
	// 	const addresses = [
	// 		0n,
	// 		'0x066a42988594da2e3fff03ba835eefe489d1ae909087a959c31b278c487a4b9a',
	// 		'0x0060b56b67e1b4dd1909376496b0e867f165f31c5eac7902d9ff48112f16ef9b',
	// 		'0x5ff6e65cc6c1f8b33b8c80f43784a2ca6a95f7f2de51b30f9d5b90189b226f4'
	// 	];

	// 	const domains = await to(client, addresses);
	// 	console.log(addresses, domains, ['', 'sithswap.stark', 'gold.stark', ''])
	// 	expect(domains).toEqual(['', 'sithswap.stark', 'gold.stark', '']);
	// });

	it.each([
		['gold.stark', '0x0060b56b67e1b4dd1909376496b0e867f165f31c5eac7902d9ff48112f16ef9b'],
		['hello.stark', '0x054f109173319c3596ba693a1b72ca6398477a54c04ed90df0cd53736ff01835'],
		['my.stark', '0x00c9f4a923dc3d629895e3a3fba7dc7c0a775d481e4b05e93bc29d0b6400ca68'],
		['world.stark', '0x05e5f42000cb2630d67ec7466111d8ffa8887fa61091a59dc793a28407375dc1'],
		['sithswap.stark', '0x066a42988594da2e3fff03ba835eefe489d1ae909087a959c31b278c487a4b9a']
	])('gets address from domain %s', async (domain, expected) => {
		const [address] = await from(client, [domain]);
		expect(BigInt(address)).toBe(BigInt(expected));
	});

	it('gets address from multiple domains', async () => {
		const domains = ['gold.stark', 'hello.stark', 'my.stark', 'world.stark', 'sithswap.stark'];
		const addresses = await from(client, domains);
		
		expect(addresses.map(normalize)).toEqual([
			'0x0060b56b67e1b4dd1909376496b0e867f165f31c5eac7902d9ff48112f16ef9b',
			'0x054f109173319c3596ba693a1b72ca6398477a54c04ed90df0cd53736ff01835',
			'0x00c9f4a923dc3d629895e3a3fba7dc7c0a775d481e4b05e93bc29d0b6400ca68',
			'0x05e5f42000cb2630d67ec7466111d8ffa8887fa61091a59dc793a28407375dc1',
			'0x066a42988594da2e3fff03ba835eefe489d1ae909087a959c31b278c487a4b9a'
		].map(normalize));
	});

	it('gets id from domains', async () => {
		const domains = ['gold.stark', 'hello.stark', 'my.stark', 'world.stark', 'sithswap.stark'];
		const ids = await id(client, domains);

		console.log(ids);
	});
});
