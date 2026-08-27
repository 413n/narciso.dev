import { Link } from "@tanstack/react-router";
import { ArrowUpRightIcon, LockIcon } from "lucide-react";
import type { CSSProperties } from "react";

import { ProjectLogo } from "#/components/project/project-logo.tsx";
import { ProjectPoster } from "#/components/project/project-poster.tsx";
import { formatProjectYear, type Project } from "#/data/projects.ts";
import { cn } from "#/lib/utils.ts";
import {
	projectViewTransition,
	projectViewTransitionStyle,
} from "#/lib/view-transition.ts";

export function ProjectCard({ project }: { project: Project }) {
	return (
		<article
			className={cn(
				"vt-project-card col-span-full grid h-full min-h-0 overflow-hidden rounded-lg bg-card text-card-foreground",
				"grid-cols-subgrid grid-rows-[26px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,3.25fr)]",
				"shadow-[0_7px_14px_rgb(50_50_93_/_0.1),0_3px_6px_rgb(0_0_0_/_0.07)]",
				"max-md:grid-cols-[6px_minmax(0,1fr)] max-md:grid-rows-[26px_minmax(0,1fr)_auto]",
			)}
			style={projectViewTransitionStyle("card", project.slug)}
		>
			<div
				className={cn(
					"z-[1] col-start-1 row-span-2 row-start-1 w-1.5 justify-self-start",
					"max-md:w-auto max-md:justify-self-stretch",
				)}
				style={{ background: project.colors.primary }}
			/>
			<div
				className={cn(
					"z-[1] col-start-1 row-start-3 w-1.5 justify-self-start",
					"max-md:w-auto max-md:justify-self-stretch",
				)}
				style={{ background: project.colors.secondary }}
			/>

			<a
				className={cn(
					"col-start-1 row-start-1 flex items-center gap-1.5 bg-foreground pr-1.5 pl-[calc(6px+0.375rem)] font-mono text-xs text-background no-underline transition-[filter] hover:brightness-125 dark:bg-background dark:text-foreground",
					"max-md:col-start-2 max-md:pl-1.5",
				)}
				href={project.href}
				target="_blank"
				rel="noreferrer"
			>
				<LockIcon className="size-3.5 shrink-0 text-emerald-300" />
				<span className="min-w-0 flex-1 truncate">
					<span className="text-emerald-300">
						<span className="max-md:hidden">https:</span>
						{"//"}
					</span>
					{project.url}
				</span>
				<ArrowUpRightIcon className="size-3.5 shrink-0 opacity-70" />
			</a>

			<div
				className={cn(
					"contents",
					"max-md:col-start-2 max-md:row-start-2 max-md:flex max-md:flex-col max-md:gap-6 max-md:px-4 max-md:pt-4",
				)}
			>
				<div className="col-start-1 row-start-2 flex items-end px-8 max-md:px-0">
					{project.logo ? (
						<ProjectLogo
							src={project.logo}
							name={project.name}
							className="vt-project-logo size-12 rounded-lg max-md:size-10"
							style={projectViewTransitionStyle("logo", project.slug)}
						/>
					) : null}
				</div>

				<div className="col-start-1 row-start-3 flex min-w-0 flex-col gap-3 self-start px-8 pt-6 max-md:px-0 max-md:pt-0">
					<h2
						className="vt-project-title w-fit font-display text-3xl font-bold leading-tight tracking-tight text-pretty md:text-4xl lg:text-5xl"
						style={projectViewTransitionStyle("title", project.slug)}
					>
						{project.name}
					</h2>
					<div className="flex min-w-0 flex-col gap-4">
						<p className="text-sm text-muted-foreground">
							<span style={{ color: project.colors.secondary }}>
								{project.category}
							</span>
							{" · "}
							{formatProjectYear(project.year)}
						</p>
						<p className="line-clamp-4 text-base leading-relaxed text-muted-foreground">
							{project.lede}
						</p>
					</div>
				</div>
			</div>

			<Link
				to="/projects/$slug"
				params={{ slug: project.slug }}
				viewTransition={projectViewTransition}
				className={cn(
					"group relative col-start-1 row-start-4 flex h-12 w-full items-center justify-center gap-2 self-end overflow-hidden",
					"text-sm font-medium no-underline outline-none",
					"focus-visible:ring-[3px] focus-visible:ring-ring/50",
					"max-md:col-start-2 max-md:row-start-3",
				)}
			>
				<span
					aria-hidden
					className="project-cta-glow"
					style={
						{
							"--cta-from": project.colors.primary,
							"--cta-to": project.colors.secondary,
						} as CSSProperties
					}
				>
					<span className="project-cta-glow-track" />
				</span>
				<span className="relative">See project</span>
				<ArrowUpRightIcon className="relative size-4" />
			</Link>

			<div
				className={cn(
					"col-start-2 row-span-4 row-start-1 min-h-0 [container-type:size]",
					"max-md:hidden",
				)}
			>
				<ProjectPoster project={project} />
			</div>
		</article>
	);
}
