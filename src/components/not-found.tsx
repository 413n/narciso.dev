import { Link } from "@tanstack/react-router";

import { StageMain } from "#/components/layout/site-shell.tsx";
import { Button } from "#/components/ui/button.tsx";
import { defaultProjectSlug } from "#/data/projects.ts";

export function NotFoundPage() {
	return (
		<StageMain>
			<div className="flex h-full min-h-0 flex-col justify-center gap-4 rounded-lg bg-card p-8 text-card-foreground">
				<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
					404
				</p>
				<h1 className="font-display text-4xl font-bold">
					This page is not here.
				</h1>
				<p className="max-w-md text-muted-foreground">
					The project or path you asked for does not exist. Head back to the
					projects, or read the CV.
				</p>
				<div className="flex flex-wrap gap-2">
					<Button asChild className="rounded-full">
						<Link
							to="/"
							search={{ project: defaultProjectSlug }}
							viewTransition
						>
							View projects
						</Link>
					</Button>
					<Button asChild variant="outline" className="rounded-full">
						<Link to="/cv" viewTransition>
							Read CV
						</Link>
					</Button>
				</div>
			</div>
		</StageMain>
	);
}
