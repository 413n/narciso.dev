import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "#/components/ui/tooltip.tsx";
import { formatProjectYear, type Project } from "#/data/projects.ts";
import { useMinWidth } from "#/hooks/use-min-width.ts";
import { cn } from "#/lib/utils.ts";

export function ProjectScrubber({
	projects,
	activeIndex,
	onSelect,
	onPrev,
	onNext,
}: {
	projects: readonly Project[];
	activeIndex: number;
	onSelect: (index: number) => void;
	onPrev: () => void;
	onNext: () => void;
}) {
	const isDesktop = useMinWidth(1024);

	return (
		<nav
			aria-label="Jump to project"
			className={cn(
				"pointer-events-none z-20 flex items-center",
				"max-md:[grid-area:footer] max-md:h-10 md:hidden",
				"lg:fixed lg:inset-x-auto lg:top-1/2 lg:right-1.5 lg:bottom-auto lg:left-auto lg:flex lg:-translate-y-1/2 lg:flex-col",
			)}
		>
			<ScrubberArrow direction="prev" onClick={onPrev} />
			<ul
				className={cn(
					"pointer-events-auto flex flex-1 items-center justify-center",
					"lg:flex-none lg:flex-col lg:items-end",
				)}
			>
				{projects.map((project, index) => {
					const active = index === activeIndex;

					return (
						<li key={project.slug}>
							<Tooltip>
								<TooltipTrigger asChild>
									<button
										type="button"
										aria-label={`${project.name}, ${formatProjectYear(project.year)}`}
										aria-current={active ? "true" : undefined}
										onClick={() => {
											onSelect(index);
										}}
										className={cn(
											"group flex items-center justify-center px-1.5 py-1.5",
											"lg:justify-end lg:py-1.5 lg:pr-0 lg:pl-4",
										)}
									>
										<span
											className={cn(
												"block rounded-full shadow-[0_0_0_1px_rgb(0_0_0_/_0.18)] transition-[width,height,background-color] duration-200",
												active
													? "h-0.5 w-4 bg-white"
													: "h-0.5 w-2.5 bg-white/35 group-hover:w-3.5 group-hover:bg-white/85",
											)}
										/>
									</button>
								</TooltipTrigger>
								<TooltipContent
									side={isDesktop ? "left" : "top"}
									align="center"
									sideOffset={isDesktop ? 12 : 8}
									showArrow={false}
									className={cn(
										"rounded-xl border border-white/12 bg-black/80 px-3 py-2 text-left text-white shadow-[0_10px_28px_rgb(0_0_0_/_0.35)] backdrop-blur-md",
										"zoom-in-95 fade-in-0",
									)}
								>
									<p className="font-medium text-white">{project.name}</p>
									<p className="text-xs text-white/50">
										{formatProjectYear(project.year)} ·{" "}
										<span style={{ color: project.colors.secondary }}>
											{project.category}
										</span>
									</p>
								</TooltipContent>
							</Tooltip>
						</li>
					);
				})}
			</ul>
			<ScrubberArrow direction="next" onClick={onNext} />
		</nav>
	);
}

function ScrubberArrow({
	direction,
	onClick,
}: {
	direction: "prev" | "next";
	onClick: () => void;
}) {
	const Icon = direction === "prev" ? ChevronLeftIcon : ChevronRightIcon;

	return (
		<button
			type="button"
			aria-label={direction === "prev" ? "Previous project" : "Next project"}
			onClick={onClick}
			className="pointer-events-auto flex size-10 shrink-0 items-center justify-center text-white lg:hidden"
		>
			<Icon className="size-7 drop-shadow-[0_1px_3px_rgb(0_0_0_/_0.55)]" />
		</button>
	);
}
