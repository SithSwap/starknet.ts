import { BigIntish } from '$src/types.js';

export function refine(input: BigIntish) {
	input = BigInt(input).toString(16);
	return input.length % 2 === 0 ? input : `0${input}`;
}

export function concat(...input: BigIntish[]) {
	let output = '';
	for (let i = 0; i < input.length; i++) output = `${output}${refine(input[i])}`;
	return output;
}
