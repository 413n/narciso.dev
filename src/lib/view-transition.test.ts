import { describe, expect, test } from "vitest";

import {
	isProjectDetailPath,
	projectViewTransitionStyle,
	viewTransitionTypes,
} from "./view-transition.ts";

describe("isProjectDetailPath", () => {
	test("matches project detail routes only", () => {
		expect(isProjectDetailPath("/projects/descrudes")).toBe(true);
		expect(isProjectDetailPath("/projects/cyrus-yung")).toBe(true);
		expect(isProjectDetailPath("/")).toBe(false);
		expect(isProjectDetailPath("/about")).toBe(false);
		expect(isProjectDetailPath("/cv")).toBe(false);
	});
});

describe("viewTransitionTypes", () => {
	test("marks opening a project from the reel", () => {
		expect(
			viewTransitionTypes({
				fromLocation: { pathname: "/" },
				toLocation: { pathname: "/projects/descrudes" },
			}),
		).toEqual(["project-open"]);
	});

	test("marks returning from a project to the reel", () => {
		expect(
			viewTransitionTypes({
				fromLocation: { pathname: "/projects/descrudes" },
				toLocation: { pathname: "/" },
			}),
		).toEqual(["project-close"]);
	});

	test("marks leaving a project for another page as a close", () => {
		expect(
			viewTransitionTypes({
				fromLocation: { pathname: "/projects/epicparty" },
				toLocation: { pathname: "/about" },
			}),
		).toEqual(["project-close"]);
	});

	test("skips typed names for unrelated navigations", () => {
		expect(
			viewTransitionTypes({
				fromLocation: { pathname: "/" },
				toLocation: { pathname: "/about" },
			}),
		).toEqual([]);
		expect(
			viewTransitionTypes({
				fromLocation: { pathname: "/projects/descrudes" },
				toLocation: { pathname: "/projects/epicparty" },
			}),
		).toEqual([]);
		expect(
			viewTransitionTypes({
				toLocation: { pathname: "/projects/descrudes" },
			}),
		).toEqual(["project-open"]);
	});
});

describe("projectViewTransitionStyle", () => {
	test("writes a unique ident per part and slug", () => {
		expect(projectViewTransitionStyle("title", "cyrus-yung")).toEqual({
			viewTransitionName: "project-title-cyrus-yung",
		});
		expect(projectViewTransitionStyle("poster", "epicparty")).toEqual({
			viewTransitionName: "project-poster-epicparty",
		});
	});
});
