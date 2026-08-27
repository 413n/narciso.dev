import { Link, useRouterState } from "@tanstack/react-router";

import { AuthorBlock } from "#/components/home/author-block.tsx";
import { SiteLogo } from "#/components/layout/site-logo.tsx";
import { buttonVariants } from "#/components/ui/button.tsx";
import { resolveProjectSlug } from "#/data/projects.ts";
import { cn } from "#/lib/utils.ts";

const links = [
	{ label: "Projects", to: "/", active: "projects" },
	{ label: "About", to: "/about", active: "about" },
	{ label: "CV", to: "/cv", active: "cv" },
] as const;

function activeFromPath(pathname: string) {
	if (pathname === "/about") {
		return "about" as const;
	}

	if (pathname === "/cv") {
		return "cv" as const;
	}

	if (pathname === "/" || pathname.startsWith("/projects/")) {
		return "projects" as const;
	}

	return undefined;
}

function homeSearchFromLocation(pathname: string, search: unknown) {
	if (
		pathname === "/" &&
		typeof search === "object" &&
		search !== null &&
		"project" in search &&
		typeof search.project === "string"
	) {
		return { project: resolveProjectSlug(search.project) };
	}

	if (pathname.startsWith("/projects/")) {
		return {
			project: resolveProjectSlug(pathname.slice("/projects/".length)),
		};
	}

	return { project: resolveProjectSlug(undefined) };
}

export function TopNav() {
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
		"rounded-full font-sans text-[13px] font-medium uppercase tracking-[0.16em]",
	);

	return (
		<div className="flex items-start gap-3">
			<Link
				to="/"
				search={homeSearch}
				viewTransition
				aria-label="Home"
				activeOptions={{ includeSearch: false }}
				className="no-print flex size-14 shrink-0 items-center justify-center text-foreground"
			>
				<SiteLogo />
			</Link>

			<div className="flex min-w-0 flex-col items-start gap-2">
				<AuthorBlock />
				<nav className="no-print -ml-3 flex items-center">
					{links.map((link) => {
						if (link.to === "/") {
							return (
								<Link
									key={link.to}
									to="/"
									search={homeSearch}
									viewTransition
									activeOptions={{ includeSearch: false }}
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
			</div>
		</div>
	);
}
