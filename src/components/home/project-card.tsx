import { Link } from "@tanstack/react-router";
import { ArrowUpRightIcon, LockIcon } from "lucide-react";
import type { CSSProperties } from "react";

import { ProjectLogo } from "#/components/project/project-logo.tsx";
import { ProjectPoster } from "#/components/project/project-poster.tsx";
import type { Project } from "#/data/projects.ts";
import { cn } from "#/lib/utils.ts";

export function ProjectCard({ project }: { project: Project }) {
	return (
		<article
			className={cn(
				"col-span-full grid h-full min-h-0 overflow-hidden rounded-lg bg-card text-card-foreground",
				"grid-cols-subgrid grid-rows-[26px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,3.25fr)]",
				"shadow-[0_7px_14px_rgb(50_50_93_/_0.1),0_3px_6px_rgb(0_0_0_/_0.07)]",
				"max-md:grid-cols-[6px_minmax(0,1fr)] max-md:grid-rows-[26px_minmax(140px,0.9fr)_minmax(0,1.6fr)_auto]",
			)}
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
					"col-start-1 row-start-1 flex items-center gap-1.5 bg-[var(--url-bar)] pr-1.5 pl-[calc(6px+0.375rem)] font-mono text-[13px] text-white no-underline transition-[filter] hover:brightness-125",
					"max-md:col-start-2 max-md:pl-1.5",
				)}
				href={project.href}
				target="_blank"
				rel="noreferrer"
			>
				<LockIcon className="size-3.5 shrink-0 text-emerald-300" />
				<span className="min-w-0 flex-1 truncate">
					<span className="text-emerald-300 max-md:hidden">https://</span>
					{project.url}
				</span>
				<ArrowUpRightIcon className="size-3.5 shrink-0 opacity-70" />
			</a>

			<div
				className={cn(
					"col-start-1 row-span-3 row-start-2 flex min-h-0 flex-col gap-4 overflow-hidden",
					"max-md:col-start-2 max-md:row-span-2 max-md:row-start-3",
				)}
			>
				<div className="flex min-h-0 flex-[1.5] items-center gap-3 px-8 pt-8 max-md:px-4 max-md:pt-4">
					{project.logo ? (
						<ProjectLogo
							src={project.logo}
							name={project.name}
							className="size-12 rounded-lg max-md:size-10"
						/>
					) : null}
					<h2
						className="line-clamp-2 font-display text-[clamp(1.75rem,3.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em] max-md:text-[clamp(1.5rem,8vw,2.5rem)]"
						style={{ viewTransitionName: `project-title-${project.slug}` }}
					>
						{project.name}
					</h2>
				</div>

				<dl className="flex min-h-0 flex-[2.25] items-center gap-4 px-8 max-md:px-4">
					<div className="flex min-w-0 flex-1 flex-col">
						<dt className="text-[1.0625rem] max-md:text-base">Category</dt>
						<dd
							className="text-[1.125rem] max-md:text-[1.0625rem]"
							style={{ color: project.colors.secondary }}
						>
							{project.category}
						</dd>
					</div>
					<div className="flex min-w-0 flex-1 flex-col">
						<dt className="text-[1.0625rem] max-md:text-base">Year</dt>
						<dd
							className="text-[1.125rem] max-md:text-[1.0625rem]"
							style={{ color: project.colors.secondary }}
						>
							{project.year}
						</dd>
					</div>
				</dl>

				<Link
					to="/projects/$slug"
					params={{ slug: project.slug }}
					viewTransition
					className={cn(
						"group relative flex h-12 w-full shrink-0 items-center justify-center gap-2 overflow-hidden",
						"text-sm font-medium no-underline outline-none",
						"focus-visible:ring-[3px] focus-visible:ring-ring/50",
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
			</div>

			<div
				className={cn(
					"col-start-2 row-span-4 row-start-1 min-h-0 [container-type:size]",
					"max-md:col-start-2 max-md:row-span-1 max-md:row-start-2 max-md:min-h-[140px]",
				)}
			>
				<ProjectPoster project={project} />
			</div>
		</article>
	);
}
