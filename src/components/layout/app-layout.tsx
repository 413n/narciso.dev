import { Outlet, useRouterState } from "@tanstack/react-router";

import { SiteFooter } from "#/components/layout/site-footer.tsx";
import {
	SiteShell,
	StageFooter,
	StageNav,
} from "#/components/layout/site-shell.tsx";
import { TopNav } from "#/components/layout/top-nav.tsx";
import { getStageColors } from "#/lib/stage-theme.tsx";

export function AppLayout() {
	const { pathname, search } = useRouterState({
		select: (state) => ({
			pathname: state.location.pathname,
			search: state.location.search,
		}),
	});
	const colors = getStageColors(pathname, search);

	return (
		<SiteShell
			layout={pathname === "/" ? "reel" : "page"}
			primary={colors.primary}
			secondary={colors.secondary}
		>
			<StageNav>
				<TopNav />
			</StageNav>

			<Outlet />

			<StageFooter>
				<SiteFooter />
			</StageFooter>
		</SiteShell>
	);
}
