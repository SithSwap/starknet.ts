import { concat } from './hex.js';

describe.concurrent('concat', () => {
	test.each([
		[[], ''],
		[[0n], '00'],
		[[0n, 1n], '0001'],
		[[0n, 1n, 2n], '000102'],
		[[0n, 1n, 2n, 3n], '00010203']
	])('concatenates %o to %s', (input, expected) => {
		expect(concat(...input)).toBe(expected);
	});
});
