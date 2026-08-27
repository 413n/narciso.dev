import { createFileRoute, Outlet } from "@tanstack/react-router";

import { noindexRobots } from "#/lib/robots.ts";

export const Route = createFileRoute("/cv")({
	headers: () => ({
		"X-Robots-Tag": noindexRobots,
	}),
	head: () => ({
		meta: [{ name: "robots", content: noindexRobots }],
	}),
	component: CvLayout,
});

function CvLayout() {
	return <Outlet />;
}
