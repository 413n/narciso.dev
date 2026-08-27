import { Link, useRouterState } from "@tanstack/react-router";

import { AuthorBlock } from "#/components/home/author-block.tsx";
import { MobileNav } from "#/components/layout/mobile-nav.tsx";
import { homeSearchFromLocation } from "#/components/layout/nav.ts";
import { SiteLogo } from "#/components/layout/site-logo.tsx";
import { SiteNav } from "#/components/layout/site-nav.tsx";

export function TopNav() {
	const { pathname, search } = useRouterState({
		select: (state) => ({
			pathname: state.location.pathname,
			search: state.location.search,
		}),
	});
	const homeSearch = homeSearchFromLocation(pathname, search);

	return (
		<div className="flex w-full flex-col items-start gap-6">
			<div className="flex w-full items-start justify-between gap-4">
				<div className="flex items-center gap-4">
					<Link
						to="/"
						search={homeSearch}
						viewTransition
						aria-label="Home"
						activeOptions={{ includeSearch: false }}
						className="no-print flex size-10 shrink-0 items-center justify-center text-foreground"
					>
						<SiteLogo />
					</Link>
					<AuthorBlock />
				</div>
				<MobileNav />
			</div>
			<SiteNav className="no-print hidden md:flex" />
		</div>
	);
}
