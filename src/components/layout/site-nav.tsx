import { Link, useRouterState } from "@tanstack/react-router";

import {
	activeFromPath,
	homeSearchFromLocation,
	navLinks,
} from "#/components/layout/nav.ts";
import { buttonVariants } from "#/components/ui/button.tsx";
import { cn } from "#/lib/utils.ts";

export function SiteNav({
	onNavigate,
	className,
}: {
	onNavigate?: () => void;
	className?: string;
}) {
	const { pathname, search } = useRouterState({
		select: (state) => ({
			pathname: state.location.pathname,
			search: state.location.search,
		}),
	});
	const active = activeFromPath(pathname);
	const homeSearch = homeSearchFromLocation(pathname, search);
	const itemClassName = cn(
		buttonVariants({ variant: "ghost", size: "sm" }),
		"justify-start rounded-full px-0 font-sans text-base font-normal leading-none",
	);

	return (
		<nav className={cn("flex flex-col items-start", className)}>
			{navLinks.map((link) => {
				if (link.to === "/") {
					return (
						<Link
							key={link.to}
							to="/"
							search={homeSearch}
							viewTransition
							activeOptions={{ includeSearch: false }}
							onClick={onNavigate}
							className={cn(
								itemClassName,
								active === link.active
									? "text-foreground"
									: "text-muted-foreground",
							)}
						>
							{link.label}
						</Link>
					);
				}

				return (
					<Link
						key={link.to}
						to={link.to}
						viewTransition
						onClick={onNavigate}
						className={cn(
							itemClassName,
							active === link.active
								? "text-foreground"
								: "text-muted-foreground",
						)}
					>
						{link.label}
					</Link>
				);
			})}
		</nav>
	);
}
