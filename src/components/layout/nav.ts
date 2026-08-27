import { projectSearch } from "#/data/projects.ts";

export const navLinks = [
	{ label: "Projects", to: "/", active: "projects" },
	{ label: "About", to: "/about", active: "about" },
	{ label: "CV", to: "/cv", active: "cv" },
] as const;

export type NavActive = (typeof navLinks)[number]["active"];

export function activeFromPath(pathname: string) {
	if (pathname === "/about") {
		return "about" as const;
	}

	if (pathname === "/cv" || pathname.startsWith("/cv/")) {
		return "cv" as const;
	}

	if (pathname === "/" || pathname.startsWith("/projects/")) {
		return "projects" as const;
	}

	return undefined;
}

export function homeSearchFromLocation(pathname: string, search: unknown) {
	if (
		pathname === "/" &&
		typeof search === "object" &&
		search !== null &&
		"project" in search &&
		typeof search.project === "string"
	) {
		return projectSearch(search.project);
	}

	if (pathname.startsWith("/projects/")) {
		return projectSearch(pathname.slice("/projects/".length));
	}

	return projectSearch(undefined);
}
