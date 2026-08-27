import { describe, expect, test } from "vitest";

import { logoInvertsInDarkMode } from "./project-logo.tsx";

describe("logoInvertsInDarkMode", () => {
	test("inverts monochrome SVG marks in dark mode", () => {
		expect(logoInvertsInDarkMode("/images/projects/n6-studio/logo.svg")).toBe(
			true,
		);
		expect(logoInvertsInDarkMode("/images/projects/notes/logo.svg")).toBe(true);
		expect(logoInvertsInDarkMode("/images/projects/epicparty/logo.svg")).toBe(
			true,
		);
		expect(logoInvertsInDarkMode("/images/projects/cyrus-yung/logo.svg")).toBe(
			true,
		);
	});

	test("leaves branded color marks and rasters alone", () => {
		expect(
			logoInvertsInDarkMode("/images/projects/epicparty-pro/logo.svg"),
		).toBe(false);
		expect(
			logoInvertsInDarkMode("/images/projects/epicparty-tools/logo.svg"),
		).toBe(false);
		expect(logoInvertsInDarkMode("/images/projects/gs-wedding/logo.png")).toBe(
			false,
		);
		expect(logoInvertsInDarkMode("/images/projects/fanta-irwin/logo.png")).toBe(
			false,
		);
	});
});
