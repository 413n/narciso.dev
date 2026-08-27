import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeftIcon, ArrowUpRightIcon } from "lucide-react";

import { StageMain } from "#/components/layout/site-shell.tsx";
import { ProjectGallery } from "#/components/project/project-gallery.tsx";
import { ProjectLogo } from "#/components/project/project-logo.tsx";
import { Badge } from "#/components/ui/badge.tsx";
import { Button } from "#/components/ui/button.tsx";
import { Separator } from "#/components/ui/separator.tsx";
import { getAdjacentProjects, getProjectBySlug } from "#/data/projects.ts";
import { person } from "#/data/site.ts";

export const Route = createFileRoute("/projects/$slug")({
	loader: ({ params }) => {
		const project = getProjectBySlug(params.slug);

		if (!project) {
			throw notFound();
		}

		return {
			project,
			adjacent: getAdjacentProjects(project.slug),
		};
	},
	head: ({ loaderData }) => {
		if (!loaderData) {
			return {
				meta: [{ title: `${person.name} — Project` }],
			};
		}

		return {
			meta: [
				{ title: `${loaderData.project.name} — ${person.name}` },
				{
					name: "description",
					content: loaderData.project.lede,
				},
			],
		};
	},
	component: ProjectDetailPage,
});

function ProjectDetailPage() {
	const { project, adjacent } = Route.useLoaderData();

	return (
		<StageMain>
			<article className="flex h-full min-h-0 flex-col overflow-auto rounded-lg bg-card text-card-foreground shadow-[0_7px_14px_rgb(50_50_93_/_0.1),0_3px_6px_rgb(0_0_0_/_0.07)]">
				<div className="flex flex-col gap-6 p-5 sm:p-8">
					<div className="flex flex-col gap-3">
						<Button
							asChild
							variant="ghost"
							className="self-start rounded-full px-0 hover:bg-transparent"
						>
							<Link to="/" search={{ project: project.slug }} viewTransition>
								<ArrowLeftIcon />
								All projects
							</Link>
						</Button>
						<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
							{project.category} · {project.year}
						</p>
						<div className="flex items-center gap-3">
							{project.logo ? (
								<ProjectLogo
									src={project.logo}
									name={project.name}
									className="size-12 rounded-lg sm:size-14"
								/>
							) : null}
							<h1
								className="font-display text-4xl font-bold tracking-tight sm:text-5xl"
								style={{ viewTransitionName: `project-title-${project.slug}` }}
							>
								{project.name}
							</h1>
						</div>
						<p className="max-w-2xl text-lg text-muted-foreground">
							{project.lede}
						</p>
					</div>

					<div className="flex flex-wrap gap-2">
						{project.languages.map((language) => (
							<Badge key={language} variant="secondary">
								{language}
							</Badge>
						))}
					</div>

					<ProjectGallery project={project} />

					<Separator />

					<div className="flex flex-col gap-4 text-base leading-relaxed">
						{project.story.map((paragraph) => (
							<p key={paragraph}>{paragraph}</p>
						))}
					</div>

					<ul className="flex flex-col gap-2">
						{project.highlights.map((highlight) => (
							<li key={highlight} className="flex gap-2 text-sm">
								<span className="mt-2 size-1 shrink-0 rounded-full bg-foreground/40" />
								<span>{highlight}</span>
							</li>
						))}
					</ul>

					<div className="flex flex-wrap gap-2">
						<Button asChild className="rounded-full">
							<a href={project.href} target="_blank" rel="noreferrer">
								Visit site
								<ArrowUpRightIcon />
							</a>
						</Button>
						{adjacent?.previous ? (
							<Button asChild variant="outline" className="rounded-full">
								<Link
									to="/projects/$slug"
									params={{ slug: adjacent.previous.slug }}
									viewTransition
								>
									{adjacent.previous.name}
								</Link>
							</Button>
						) : null}
						{adjacent?.next ? (
							<Button asChild variant="outline" className="rounded-full">
								<Link
									to="/projects/$slug"
									params={{ slug: adjacent.next.slug }}
									viewTransition
								>
									{adjacent.next.name}
								</Link>
							</Button>
						) : null}
					</div>
				</div>
			</article>
		</StageMain>
	);
}
