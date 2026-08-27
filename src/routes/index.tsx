import { createFileRoute, redirect } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { ProjectCard } from "#/components/home/project-card.tsx";
import { ProjectReelCues } from "#/components/home/project-reel-cues.tsx";
import { ProjectScrubber } from "#/components/home/project-scrubber.tsx";
import { StageMain } from "#/components/layout/site-shell.tsx";
import {
	defaultProject,
	getProjectBySlug,
	getProjectIndex,
	projects,
	resolveProjectSlug,
} from "#/data/projects.ts";
import { person } from "#/data/site.ts";
import { useProjectCycle } from "#/hooks/use-project-cycle.ts";

const slideTransition = {
	duration: 0.55,
	ease: [0.22, 1, 0.36, 1] as const,
};

const slideVariants = {
	enter: (dir: 1 | -1) => ({
		y: dir > 0 ? "100dvh" : "-100dvh",
	}),
	center: {
		y: 0,
	},
	exit: (dir: 1 | -1) => ({
		y: dir > 0 ? "-100dvh" : "100dvh",
	}),
};

function projectSearchFromUnknown(search: Record<string, unknown>) {
	return {
		project: resolveProjectSlug(
			typeof search.project === "string" ? search.project : undefined,
		),
	};
}

export const Route = createFileRoute("/")({
	validateSearch: projectSearchFromUnknown,
	loaderDeps: ({ search }) => ({ project: search.project }),
	beforeLoad: ({ search, location }) => {
		if (!new URLSearchParams(location.searchStr).has("project")) {
			throw redirect({
				to: "/",
				search: { project: search.project },
				replace: true,
			});
		}
	},
	loader: ({ deps }) => {
		const project = getProjectBySlug(deps.project) ?? defaultProject;

		return { project };
	},
	head: ({ loaderData }) => {
		const projectName = loaderData?.project.name;

		return {
			meta: [
				{
					title: projectName
						? `${projectName} — ${person.name}`
						: `${person.name} — ${person.role}`,
				},
				{
					name: "description",
					content: loaderData?.project.lede ?? person.about,
				},
			],
		};
	},
	component: HomePage,
});

function HomePage() {
	const reduceMotion = useReducedMotion();
	const navigate = Route.useNavigate();
	const { project } = Route.useLoaderData();
	const index = getProjectIndex(project.slug);
	const { direction, next, prev, goTo } = useProjectCycle({
		length: projects.length,
		index,
		onChange: (nextIndex) => {
			const nextProject = projects[nextIndex];

			if (!nextProject) {
				return;
			}

			void navigate({
				search: { project: nextProject.slug },
				replace: true,
				resetScroll: false,
				viewTransition: false,
			});
		},
	});

	return (
		<>
			<StageMain>
				<div className="stage-frame">
					<AnimatePresence initial={false} custom={direction}>
						<motion.div
							key={project.slug}
							className="project-slide"
							custom={direction}
							initial={reduceMotion ? false : "enter"}
							animate="center"
							exit="exit"
							variants={slideVariants}
							transition={reduceMotion ? { duration: 0 } : slideTransition}
						>
							<ProjectCard project={project} />
						</motion.div>
					</AnimatePresence>
				</div>
			</StageMain>

			<ProjectReelCues onPrev={prev} onNext={next} />

			<ProjectScrubber
				projects={projects}
				activeIndex={index}
				onSelect={goTo}
			/>
		</>
	);
}
