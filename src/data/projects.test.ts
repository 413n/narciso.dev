import { describe, expect, test } from "vitest";

import { getHighlightedProjects, projects } from "./projects.ts";

describe("projects", () => {
	test("lists the most recent project first", () => {
		expect(projects.map((project) => project.slug)).toEqual([
			"epicparty",
			"cyrus-yung",
			"descrudes",
		]);
	});
});

describe("getHighlightedProjects", () => {
	test("returns only projects marked as highlighted", () => {
		const highlighted = getHighlightedProjects();

		expect(highlighted.map((project) => project.slug)).toEqual(["epicparty"]);
	});
});
