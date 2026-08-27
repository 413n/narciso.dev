import { describe, expect, test } from "vitest";

import { canCaptureReelScroll } from "./use-project-cycle.ts";

describe("canCaptureReelScroll", () => {
	test("captures wheel and swipe from the md breakpoint up", () => {
		expect(canCaptureReelScroll(767)).toBe(false);
		expect(canCaptureReelScroll(768)).toBe(true);
		expect(canCaptureReelScroll(1440)).toBe(true);
	});
});
