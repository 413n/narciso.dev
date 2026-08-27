import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, test } from "vitest";

import { robotsTxt } from "./robots.ts";

describe("robotsTxt", () => {
	test("allows the rest of the site while blocking CV paths", () => {
		expect(robotsTxt()).toBe("User-agent: *\nAllow: /\nDisallow: /cv\n");
	});

	test("stays in sync with the public robots.txt file", () => {
		const fromDisk = readFileSync(
			resolve(import.meta.dirname, "../../public/robots.txt"),
			"utf8",
		);

		expect(fromDisk).toBe(robotsTxt());
	});
});
