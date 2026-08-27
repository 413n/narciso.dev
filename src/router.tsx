import { createRouter as createTanStackRouter } from "@tanstack/react-router";

import { viewTransitionTypes } from "#/lib/view-transition.ts";

import { routeTree } from "./routeTree.gen";

export function getRouter() {
	const router = createTanStackRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		defaultViewTransition: {
			types: viewTransitionTypes,
		},
	});

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
