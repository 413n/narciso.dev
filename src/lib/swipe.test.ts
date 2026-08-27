import { describe, expect, test } from "vitest";

import { SWIPE_DISTANCE, SWIPE_VELOCITY, swipeDirection } from "./swipe.ts";

describe("swipeDirection", () => {
	test("ignores a short, slow drag", () => {
		expect(swipeDirection(40, 100)).toBeUndefined();
		expect(swipeDirection(-40, -100)).toBeUndefined();
		expect(
			swipeDirection(SWIPE_DISTANCE - 1, SWIPE_VELOCITY - 1),
		).toBeUndefined();
	});

	test("commits next when dragged left past the distance threshold", () => {
		expect(swipeDirection(-SWIPE_DISTANCE, 0)).toBe(1);
		expect(swipeDirection(-240, 80)).toBe(1);
	});

	test("commits prev when dragged right past the distance threshold", () => {
		expect(swipeDirection(SWIPE_DISTANCE, 0)).toBe(-1);
		expect(swipeDirection(240, -80)).toBe(-1);
	});

	test("commits next on a leftward flick", () => {
		expect(swipeDirection(-20, -SWIPE_VELOCITY)).toBe(1);
	});

	test("commits prev on a rightward flick", () => {
		expect(swipeDirection(20, SWIPE_VELOCITY)).toBe(-1);
	});

	test("lets a reversing flick cancel a long pull", () => {
		expect(swipeDirection(-SWIPE_DISTANCE, SWIPE_VELOCITY)).toBe(-1);
		expect(swipeDirection(SWIPE_DISTANCE, -SWIPE_VELOCITY)).toBe(1);
	});
});
