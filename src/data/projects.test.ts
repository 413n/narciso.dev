import { describe, expect, test } from "vitest";

import {
	defaultProject,
	defaultProjectSlug,
	formatParentAttribution,
	getChildProjects,
	getHighlightedProjects,
	getParentProject,
	getProjectBySlug,
	hasPublicUrl,
	projectSearch,
	projects,
	projectUrlLabel,
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
		).toEqual([
			"n6-studio",
			"notes",
			"epicparty",
			"epicparty-pro",
			"epicparty-tools",
		]);
	});

	test("keeps G&S Wedding without a public URL", () => {
		const wedding = getProjectBySlug("gs-wedding");

		expect(wedding?.url).toBeUndefined();
		expect(wedding?.href).toBeUndefined();
		expect(wedding && hasPublicUrl(wedding)).toBe(false);
	});

	test("keeps projects without a public URL offline", () => {
		expect(
			projects
				.filter((project) => !hasPublicUrl(project))
				.every((project) => !project.online),
		).toBe(true);
	});

	test("uses a product logo when the original project has one", () => {
		expect(
			Object.fromEntries(
				projects.map((project) => [project.slug, project.logo]),
			),
		).toEqual({
			"n6-studio": "/images/projects/n6-studio/logo.svg",
			notes: "/images/projects/notes/logo.svg",
			epicparty: "/images/projects/epicparty/logo.svg",
			"epicparty-pro": "/images/projects/epicparty-pro/logo.svg",
			"epicparty-tools": "/images/projects/epicparty-tools/logo.svg",
			"gs-wedding": "/images/projects/gs-wedding/logo.png",
			"fanta-irwin": "/images/projects/fanta-irwin/logo.png",
			"cyrus-yung": "/images/projects/cyrus-yung/logo.svg",
			descrudes: "/images/projects/descrudes/logo.svg",
		});
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

	test("names studio children as projects and product children as products", () => {
		const studio = getProjectBySlug("n6-studio");
		const epicparty = getProjectBySlug("epicparty");

		expect(studio && formatParentAttribution(studio)).toBe(
			"Project of N6 Studio",
		);
		expect(epicparty && formatParentAttribution(epicparty)).toBe(
			"Product of EpicParty",
		);
	});
});

describe("projectUrlLabel", () => {
	test("returns the public host when the project has a URL", () => {
		const epicparty = getProjectBySlug("epicparty");

		expect(epicparty && projectUrlLabel(epicparty)).toBe("epicparty.gg");
	});

	test("returns <hidden> when the project has no URL", () => {
		const wedding = getProjectBySlug("gs-wedding");

		expect(wedding && projectUrlLabel(wedding)).toBe("<hidden>");
	});
});
