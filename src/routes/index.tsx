import {
	createFileRoute,
	redirect,
	type SearchSchemaInput,
	stripSearchParams,
} from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

import { ProjectCard } from "#/components/home/project-card.tsx";
import { ProjectReelCues } from "#/components/home/project-reel-cues.tsx";
import { ProjectScrubber } from "#/components/home/project-scrubber.tsx";
import { StageMain } from "#/components/layout/site-shell.tsx";
import {
	defaultProject,
	defaultProjectSlug,
	getProjectBySlug,
	getProjectIndex,
	projectSearch,
	projects,
	resolveProjectSlug,
} from "#/data/projects.ts";
import { person } from "#/data/site.ts";
import { useMinWidth } from "#/hooks/use-min-width.ts";
import {
	REEL_SCROLL_MIN_WIDTH,
	useProjectCycle,
} from "#/hooks/use-project-cycle.ts";
import {
	horizontalSlideVariants,
	slideTransition,
	swipeDirection,
	swipeDragConstraints,
	swipeDragElastic,
} from "#/lib/swipe.ts";

const verticalSlideVariants = {
	enter: (dir: 1 | -1) => ({
		x: 0,
		y: dir > 0 ? "100dvh" : "-100dvh",
	}),
	center: {
		x: 0,
		y: 0,
	},
	exit: (dir: 1 | -1) => ({
		x: 0,
		y: dir > 0 ? "-100dvh" : "100dvh",
	}),
};

function projectSearchFromUnknown(
	search: { project?: unknown } & SearchSchemaInput,
) {
	return {
		project: resolveProjectSlug(
			typeof search.project === "string" ? search.project : undefined,
		),
	};
}

export const Route = createFileRoute("/")({
	validateSearch: projectSearchFromUnknown,
	search: {
		middlewares: [stripSearchParams({ project: defaultProjectSlug })],
	},
	loaderDeps: ({ search }) => ({ project: search.project }),
	beforeLoad: ({ location }) => {
		if (
			new URLSearchParams(location.searchStr).get("project") ===
			defaultProjectSlug
		) {
			throw redirect({
				to: "/",
				search: {},
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
	const reelReady = useRef(false);
	const cardRef = useRef<HTMLDivElement>(null);
	const navigate = Route.useNavigate();
	const { project } = Route.useLoaderData();
	const index = getProjectIndex(project.slug);
	const isDesktopReel = useMinWidth(REEL_SCROLL_MIN_WIDTH);
	const { direction, next, prev, goTo } = useProjectCycle({
		length: projects.length,
		index,
		onChange: (nextIndex) => {
			const nextProject = projects[nextIndex];

			if (!nextProject) {
				return;
			}

			void navigate({
				search: projectSearch(nextProject.slug),
				replace: true,
				resetScroll: false,
				viewTransition: false,
			});
		},
	});

	const canDragReel = !isDesktopReel && !reduceMotion;

	useEffect(() => {
		reelReady.current = true;
	}, []);

	return (
		<>
			<StageMain>
				<div ref={cardRef} className="stage-frame">
					<AnimatePresence initial={false} custom={direction}>
						<motion.div
							key={project.slug}
							className="project-slide"
							custom={direction}
							initial={reduceMotion || !reelReady.current ? false : "enter"}
							animate="center"
							exit="exit"
							variants={
								isDesktopReel ? verticalSlideVariants : horizontalSlideVariants
							}
							transition={reduceMotion ? { duration: 0 } : slideTransition}
						>
							<motion.div
								className="project-slide-drag"
								drag={canDragReel ? "x" : false}
								dragConstraints={swipeDragConstraints}
								dragElastic={swipeDragElastic}
								dragMomentum={false}
								onDragEnd={(_event, info) => {
									if (!canDragReel) {
										return;
									}

									const dir = swipeDirection(info.offset.x, info.velocity.x);

									if (dir === 1) {
										next();
										return;
									}

									if (dir === -1) {
										prev();
									}
								}}
							>
								<ProjectCard project={project} />
							</motion.div>
						</motion.div>
					</AnimatePresence>
				</div>
			</StageMain>

			<ProjectReelCues cardRef={cardRef} onPrev={prev} onNext={next} />

			<ProjectScrubber
				projects={projects}
				activeIndex={index}
				onSelect={goTo}
				onPrev={prev}
				onNext={next}
			/>
		</>
	);
}
