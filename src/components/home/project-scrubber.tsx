import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "#/components/ui/tooltip.tsx";
import type { Project } from "#/data/projects.ts";
import { cn } from "#/lib/utils.ts";

export function ProjectScrubber({
	projects,
	activeIndex,
	onSelect,
}: {
	projects: readonly Project[];
	activeIndex: number;
	onSelect: (index: number) => void;
}) {
	return (
		<nav
			aria-label="Jump to project"
			className="pointer-events-none fixed top-1/2 right-1.5 z-20 hidden -translate-y-1/2 flex-col lg:flex lg:right-3"
		>
			<ul className="pointer-events-auto flex flex-col items-end">
				{projects.map((project, index) => {
					const active = index === activeIndex;

					return (
						<li key={project.slug}>
							<Tooltip>
								<TooltipTrigger asChild>
									<button
										type="button"
										aria-label={`${project.name}, ${project.year}`}
										aria-current={active ? "true" : undefined}
										onClick={() => {
											onSelect(index);
										}}
										className="group flex items-center justify-end py-1.5 pl-4"
									>
										<span
											className={cn(
												"block h-0.5 rounded-full shadow-[0_0_0_1px_rgb(0_0_0_/_0.18)] transition-[width,background-color] duration-200",
												active
													? "w-4 bg-white"
													: "w-2.5 bg-white/35 group-hover:w-3.5 group-hover:bg-white/85",
											)}
										/>
									</button>
								</TooltipTrigger>
								<TooltipContent
									side="left"
									align="center"
									sideOffset={12}
									showArrow={false}
									className={cn(
										"rounded-xl border border-white/12 bg-black/80 px-3 py-2 text-left text-white shadow-[0_10px_28px_rgb(0_0_0_/_0.35)] backdrop-blur-md",
										"zoom-in-95 fade-in-0",
									)}
								>
									<p className="font-medium text-white">{project.name}</p>
									<p className="text-xs text-white/50">
										{project.year} · {project.category}
									</p>
								</TooltipContent>
							</Tooltip>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
