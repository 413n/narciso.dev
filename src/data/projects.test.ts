import { describe, expect, test } from "vitest";

import {
	defaultProject,
	defaultProjectSlug,
	getChildProjects,
	getHighlightedProjects,
	getParentProject,
	getProjectBySlug,
	projectSearch,
	projects,
} from "./projects.ts";

describe("projects", () => {
	test("lists the most recent families first, parent then children", () => {
		expect(projects.map((project) => project.slug)).toEqual([
			"n6-studio",
			"notes",
			"epicparty",
			"epicparty-pro",
			"epicparty-tools",
			"gs-wedding",
			"fanta-irwin",
			"cyrus-yung",
			"descrudes",
		]);
	});

	test("keeps EpicParty as the default project even when it is not first", () => {
		expect(defaultProjectSlug).toBe("epicparty");
		expect(defaultProject.slug).toBe("epicparty");
		expect(projects[0]?.slug).not.toBe("epicparty");
	});

	test("omits the default project from home search params", () => {
		expect(projectSearch("epicparty")).toEqual({});
		expect(projectSearch(undefined)).toEqual({});
		expect(projectSearch("unknown")).toEqual({});
		expect(projectSearch("descrudes")).toEqual({ project: "descrudes" });
	});

	test("marks live public sites as online", () => {
		expect(
			projects
				.filter((project) => project.online)
				.map((project) => project.slug),
		).toEqual(["n6-studio", "notes", "epicparty"]);
	});
});

describe("getHighlightedProjects", () => {
	test("returns only projects marked as highlighted", () => {
		const highlighted = getHighlightedProjects();

		expect(highlighted.map((project) => project.slug)).toEqual(["epicparty"]);
	});
});

describe("project family", () => {
	test("links Notes to N6 Studio", () => {
		const notes = getProjectBySlug("notes");

		expect(notes?.parentSlug).toBe("n6-studio");
		expect(notes && getParentProject(notes)?.slug).toBe("n6-studio");
		expect(
			getChildProjects("n6-studio").map((project) => project.slug),
		).toEqual(["notes"]);
	});

	test("links EpicParty Pro and Tools to EpicParty", () => {
		const pro = getProjectBySlug("epicparty-pro");
		const tools = getProjectBySlug("epicparty-tools");

		expect(pro && getParentProject(pro)?.slug).toBe("epicparty");
		expect(tools && getParentProject(tools)?.slug).toBe("epicparty");
		expect(
			getChildProjects("epicparty").map((project) => project.slug),
		).toEqual(["epicparty-pro", "epicparty-tools"]);
	});

	test("returns nothing for a project without a parent", () => {
		const fantaIrwin = getProjectBySlug("fanta-irwin");

		expect(fantaIrwin && getParentProject(fantaIrwin)).toBeUndefined();
		expect(getChildProjects("gs-wedding")).toEqual([]);
	});
});
