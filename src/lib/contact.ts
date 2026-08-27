const MASK_SOURCE = "syne-ink";

function maskAt(index: number) {
	return MASK_SOURCE.charCodeAt(index % MASK_SOURCE.length);
}

function decodeBytes(bytes: readonly number[]) {
	let value = "";

	for (const [index, byte] of bytes.entries()) {
		value += String.fromCharCode(byte ^ maskAt(index));
	}

	return value;
}

const LOCAL_BYTES = [18, 21, 11, 22, 94, 8, 0, 15, 1, 22] as const;
const HOST_BYTES = [29, 24, 28, 6, 68, 26, 1, 69, 23, 28, 24] as const;

const DECOY_ALPHABET = "bcdfghjkmnpqrstvwxyz";

function createDecoyChunk(length: number, seed: number) {
	let value = seed >>> 0;
	let chunk = "";

	for (let index = 0; index < length; index += 1) {
		value = (Math.imul(value, 1664525) + 1013904223) >>> 0;
		chunk += DECOY_ALPHABET[value % DECOY_ALPHABET.length];
	}

	return chunk;
}

export const contactDecoy = `${createDecoyChunk(10, 413)}\u00B7${createDecoyChunk(11, 1024)}`;

export function decodeContact() {
	return `${decodeBytes(LOCAL_BYTES)}\u0040${decodeBytes(HOST_BYTES)}`;
}

export function contactMailtoHref() {
	return `mailto:${decodeContact()}`;
}

export function bindContactMailto(anchor: HTMLAnchorElement) {
	if (anchor.protocol !== "mailto:") {
		anchor.href = contactMailtoHref();
	}
}
