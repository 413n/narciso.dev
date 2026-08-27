import {
	defaultProjectSlug,
	getProjectBySlug,
	signatureColors,
} from "#/data/projects.ts";

export type StageColors = {
	primary: string;
	secondary: string;
};

export function getStageColors(pathname: string, search: unknown): StageColors {
	if (pathname === "/") {
		const slug =
			typeof search === "object" &&
			search !== null &&
			"project" in search &&
			typeof search.project === "string"
				? search.project
				: defaultProjectSlug;

		return getProjectBySlug(slug)?.colors ?? signatureColors;
	}

	if (pathname.startsWith("/projects/")) {
		const slug = pathname.slice("/projects/".length);

		return getProjectBySlug(slug)?.colors ?? signatureColors;
	}

	return signatureColors;
}
