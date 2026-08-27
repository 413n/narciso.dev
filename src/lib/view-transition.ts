import type { CSSProperties } from "react";

type LocationLike = {
	pathname: string;
};

type ProjectViewTransitionPart = "card" | "title" | "logo" | "poster";

export function isProjectDetailPath(pathname: string) {
	return pathname.startsWith("/projects/");
}

export function viewTransitionTypes({
	fromLocation,
	toLocation,
}: {
	fromLocation?: LocationLike;
	toLocation: LocationLike;
}) {
	const fromProject = isProjectDetailPath(fromLocation?.pathname ?? "");
	const toProject = isProjectDetailPath(toLocation.pathname);

	if (!fromProject && toProject) {
		return ["project-open"];
	}

	if (fromProject && !toProject) {
		return ["project-close"];
	}

	return [];
}

export function projectViewTransitionStyle(
	part: ProjectViewTransitionPart,
	slug: string,
) {
	return {
		viewTransitionName: `project-${part}-${slug}`,
	} satisfies CSSProperties;
}

export const projectViewTransition = {
	types: viewTransitionTypes,
} as const;
