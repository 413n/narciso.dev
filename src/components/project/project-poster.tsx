import { getFeaturedMedia, type Project } from "#/data/projects.ts";
import { cn } from "#/lib/utils.ts";
import { projectViewTransitionStyle } from "#/lib/view-transition.ts";

export function ProjectPoster({
	project,
	className,
}: {
	project: Project;
	className?: string;
}) {
	const featured = getFeaturedMedia(project);

	return (
		<div
			className={cn(
				"project-poster vt-project-poster relative h-full min-h-0 overflow-hidden",
				className,
			)}
			style={projectViewTransitionStyle("poster", project.slug)}
		>
			{featured?.kind === "image" ? (
				<img
					src={featured.src}
					alt=""
					className="absolute inset-0 size-full object-cover object-top"
				/>
			) : featured?.kind === "video" ? (
				<video
					src={featured.src}
					poster={featured.poster}
					muted
					playsInline
					preload="metadata"
					className="absolute inset-0 size-full object-cover object-top"
				/>
			) : (
				<>
					<div
						className="absolute inset-0"
						style={{
							background: `linear-gradient(160deg, ${project.colors.primary} 0%, ${project.colors.secondary} 72%)`,
						}}
					/>
					<div
						className="absolute inset-0 opacity-40"
						style={{
							backgroundImage:
								"repeating-linear-gradient(-18deg, transparent 0 18px, rgb(255 255 255 / 0.12) 18px 19px)",
						}}
					/>
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgb(255_255_255_/_0.28),transparent_42%)]" />
					<span
						aria-hidden
						className="pointer-events-none absolute -right-3 -bottom-8 font-display text-9xl leading-none font-extrabold text-white/20 select-none"
					>
						{project.name[0]}
					</span>
				</>
			)}
		</div>
	);
}
