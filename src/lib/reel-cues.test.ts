import { describe, expect, test } from "vitest";

import { cueOpacity, isPointInRect, reelCueOpacity } from "./reel-cues.ts";

const button = {
	left: 800,
	top: 0,
	right: 1000,
	bottom: 200,
};

const card = {
	left: 200,
	top: 120,
	right: 900,
	bottom: 780,
};

describe("isPointInRect", () => {
	test("is false without a point or rect", () => {
		expect(isPointInRect(undefined, card)).toBe(false);
		expect(isPointInRect({ x: 400, y: 400 }, undefined)).toBe(false);
	});

	test("is true for a point inside the card", () => {
		expect(isPointInRect({ x: 400, y: 400 }, card)).toBe(true);
		expect(isPointInRect({ x: 200, y: 120 }, card)).toBe(true);
		expect(isPointInRect({ x: 900, y: 780 }, card)).toBe(true);
	});

	test("is false for a point outside the card", () => {
		expect(isPointInRect({ x: 199, y: 400 }, card)).toBe(false);
		expect(isPointInRect({ x: 400, y: 781 }, card)).toBe(false);
	});
});

describe("cueOpacity", () => {
	test("is hidden without a pointer, target, or range", () => {
		expect(cueOpacity(undefined, button, 400)).toBe(0);
		expect(cueOpacity({ x: 900, y: 100 }, undefined, 400)).toBe(0);
		expect(cueOpacity({ x: 900, y: 100 }, button, 0)).toBe(0);
	});

	test("is fully visible over the button", () => {
		expect(cueOpacity({ x: 900, y: 100 }, button, 400)).toBe(1);
	});

	test("fades out with distance and hides beyond the range", () => {
		expect(cueOpacity({ x: 900, y: 400 }, button, 400)).toBe(0.25);
		expect(cueOpacity({ x: 900, y: 600 }, button, 400)).toBe(0);
	});
});

describe("reelCueOpacity", () => {
	test("is fully visible over the project card even far from the button", () => {
		expect(reelCueOpacity({ x: 400, y: 400 }, button, 400, card)).toBe(1);
	});

	test("still uses proximity when the pointer is off the card", () => {
		expect(reelCueOpacity({ x: 950, y: 100 }, button, 400, card)).toBe(1);
		expect(reelCueOpacity({ x: 950, y: 400 }, button, 400, card)).toBe(0.25);
		expect(reelCueOpacity({ x: 50, y: 400 }, button, 400, card)).toBe(0);
	});
});
