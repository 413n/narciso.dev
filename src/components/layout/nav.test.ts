import { describe, expect, test } from "vitest";

import { activeFromPath, homeSearchFromLocation } from "./nav.ts";

describe("activeFromPath", () => {
	test("marks the matching primary section", () => {
		expect(activeFromPath("/")).toBe("projects");
		expect(activeFromPath("/projects/epicparty")).toBe("projects");
		expect(activeFromPath("/about")).toBe("about");
		expect(activeFromPath("/cv")).toBe("cv");
		expect(activeFromPath("/cv/print")).toBe("cv");
	});

	test("returns undefined for unknown paths", () => {
		expect(activeFromPath("/missing")).toBeUndefined();
	});
});

describe("homeSearchFromLocation", () => {
	test("keeps the current home project search", () => {
		expect(homeSearchFromLocation("/", { project: "descrudes" })).toEqual({
			project: "descrudes",
		});
	});

	test("uses the project slug from a detail route", () => {
		expect(homeSearchFromLocation("/projects/cyrus-yung", {})).toEqual({
			project: "cyrus-yung",
		});
	});

	test("strips the default project from home search", () => {
		expect(homeSearchFromLocation("/", { project: "epicparty" })).toEqual({});
		expect(homeSearchFromLocation("/projects/epicparty", {})).toEqual({});
		expect(homeSearchFromLocation("/about", {})).toEqual({});
	});
});
