import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeftIcon, ArrowUpRightIcon, CloudOffIcon } from "lucide-react";

import { StageMain } from "#/components/layout/site-shell.tsx";
import { ProjectGallery } from "#/components/project/project-gallery.tsx";
import { ProjectLogo } from "#/components/project/project-logo.tsx";
import { ProjectPoster } from "#/components/project/project-poster.tsx";
import { Badge } from "#/components/ui/badge.tsx";
import { Button } from "#/components/ui/button.tsx";
import { getProjectBySlug } from "#/data/projects.ts";
import { person } from "#/data/site.ts";
import {
	projectViewTransition,
	projectViewTransitionStyle,
} from "#/lib/view-transition.ts";

export const Route = createFileRoute("/projects/$slug")({
	loader: ({ params }) => {
		const project = getProjectBySlug(params.slug);

		if (!project) {
			throw notFound();
		}

		return { project };
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
	const { project } = Route.useLoaderData();

	return (
		<StageMain>
			<article
				className="vt-project-card flex h-full min-h-0 flex-col overflow-hidden rounded-lg bg-card text-card-foreground shadow-[0_7px_14px_rgb(50_50_93_/_0.1),0_3px_6px_rgb(0_0_0_/_0.07)]"
				style={projectViewTransitionStyle("card", project.slug)}
			>
				<div className="flex min-h-0 flex-1 flex-col gap-6 overflow-auto p-5 sm:p-8">
					<div className="flex flex-col gap-3">
						<Button
							asChild
							variant="ghost"
							className="self-start rounded-full px-0 hover:bg-transparent"
						>
							<Link
								to="/"
								search={{ project: project.slug }}
								viewTransition={projectViewTransition}
							>
								<ArrowLeftIcon />
								All projects
							</Link>
						</Button>
						<div className="flex items-center justify-between gap-3">
							<h1
								className="vt-project-title w-fit font-display text-4xl font-bold tracking-tight sm:text-5xl"
								style={projectViewTransitionStyle("title", project.slug)}
							>
								{project.name}
							</h1>
							{project.logo ? (
								<ProjectLogo
									src={project.logo}
									name={project.name}
									className="vt-project-logo size-12 rounded-lg sm:size-14"
									style={projectViewTransitionStyle("logo", project.slug)}
								/>
							) : null}
						</div>
					</div>

					<div className="h-52 overflow-hidden rounded-lg sm:h-80">
						<ProjectPoster project={project} />
					</div>

					<ProjectGallery project={project} />

					<div className="flex flex-col gap-4 text-lg leading-relaxed">
						<p>{project.lede}</p>
						{project.story.map((paragraph) => (
							<p key={paragraph}>{paragraph}</p>
						))}
					</div>

					<ul className="flex flex-col gap-2 text-lg leading-relaxed">
						{project.highlights.map((highlight) => (
							<li key={highlight} className="flex gap-2">
								<span className="mt-2.5 size-1 shrink-0 rounded-full bg-foreground/40" />
								<span>{highlight}</span>
							</li>
						))}
					</ul>

					<div className="flex flex-wrap gap-2">
						{project.languages.map((language) => (
							<Badge key={language} variant="secondary">
								{language}
							</Badge>
						))}
					</div>
				</div>

				<div className="shrink-0 border-t bg-card p-5 sm:px-8 sm:py-5">
					{project.online ? (
						<Button asChild className="rounded-full">
							<a href={project.href} target="_blank" rel="noreferrer">
								Visit site
								<ArrowUpRightIcon />
							</a>
						</Button>
					) : (
						<Button disabled className="rounded-full">
							Site offline
							<CloudOffIcon />
						</Button>
					)}
				</div>
			</article>
		</StageMain>
	);
}
