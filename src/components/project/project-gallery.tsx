"use client";

import {
	ChevronLeftIcon,
	ChevronRightIcon,
	PlayIcon,
	XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "#/components/ui/button.tsx";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "#/components/ui/dialog.tsx";
import {
	getProjectGallery,
	type Project,
	type ProjectMedia,
} from "#/data/projects.ts";
import { cn } from "#/lib/utils.ts";

export function ProjectGallery({ project }: { project: Project }) {
	const [activeIndex, setActiveIndex] = useState<number>();
	const gallery = getProjectGallery(project);
	const active = activeIndex === undefined ? undefined : gallery[activeIndex];

	useEffect(() => {
		if (activeIndex === undefined) {
			return;
		}

		function onKeyDown(event: KeyboardEvent) {
			if (event.key === "ArrowLeft") {
				event.preventDefault();
				setActiveIndex((index) => stepIndex(index, gallery.length, -1));
			}

			if (event.key === "ArrowRight") {
				event.preventDefault();
				setActiveIndex((index) => stepIndex(index, gallery.length, 1));
			}
		}

		window.addEventListener("keydown", onKeyDown);

		return () => {
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [activeIndex, gallery.length]);

	if (gallery.length === 0) {
		return null;
	}

	return (
		<section className="flex flex-col gap-3">
			<h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
				Gallery
			</h2>
			<ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
				{gallery.map((media, index) => (
					<li key={media.id}>
						<button
							type="button"
							onClick={() => {
								setActiveIndex(index);
							}}
							className={cn(
								"group relative block aspect-[4/3] w-full overflow-hidden rounded-lg",
								"bg-muted shadow-[0_7px_14px_rgb(50_50_93_/_0.1),0_3px_6px_rgb(0_0_0_/_0.07)]",
								"outline-none ring-offset-background",
								"focus-visible:ring-[3px] focus-visible:ring-ring/50",
							)}
						>
							<GalleryPreview media={media} />
							{media.kind === "video" ? (
								<span className="absolute inset-0 flex items-center justify-center">
									<span className="flex size-10 items-center justify-center rounded-full bg-black/55 text-white">
										<PlayIcon className="size-4 fill-current" />
									</span>
								</span>
							) : null}
							<span className="sr-only">Open {media.alt}</span>
						</button>
					</li>
				))}
			</ul>

			<Dialog
				open={activeIndex !== undefined}
				onOpenChange={(open) => {
					if (!open) {
						setActiveIndex(undefined);
					}
				}}
			>
				<DialogContent
					showCloseButton={false}
					className={cn(
						"fixed inset-0 top-0 left-0 z-50 flex h-dvh w-screen max-w-none translate-x-0 translate-y-0 flex-col gap-0 rounded-none border-0 bg-black p-0 shadow-none",
						"data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100",
					)}
				>
					<DialogTitle className="sr-only">
						{active?.alt ?? `${project.name} gallery`}
					</DialogTitle>
					<DialogDescription className="sr-only">
						{gallery.length > 1
							? "Use the arrow keys or buttons to move through the images and videos."
							: active?.alt}
					</DialogDescription>

					<div className="flex shrink-0 items-center justify-between gap-3 px-4 py-3 text-white">
						<p className="font-mono text-xs tracking-wider uppercase">
							{activeIndex === undefined
								? null
								: `${activeIndex + 1} / ${gallery.length}`}
						</p>
						<DialogClose asChild>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								className="rounded-full text-white hover:bg-white/10 hover:text-white"
							>
								<XIcon />
								<span className="sr-only">Close gallery</span>
							</Button>
						</DialogClose>
					</div>

					<div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-16">
						{gallery.length > 1 ? (
							<Button
								type="button"
								variant="ghost"
								size="icon-lg"
								className="absolute left-2 z-10 rounded-full text-white hover:bg-white/10 hover:text-white sm:left-4"
								onClick={() => {
									setActiveIndex((index) =>
										stepIndex(index, gallery.length, -1),
									);
								}}
							>
								<ChevronLeftIcon />
								<span className="sr-only">Previous</span>
							</Button>
						) : null}

						{active ? <LightboxMedia media={active} /> : null}

						{gallery.length > 1 ? (
							<Button
								type="button"
								variant="ghost"
								size="icon-lg"
								className="absolute right-2 z-10 rounded-full text-white hover:bg-white/10 hover:text-white sm:right-4"
								onClick={() => {
									setActiveIndex((index) =>
										stepIndex(index, gallery.length, 1),
									);
								}}
							>
								<ChevronRightIcon />
								<span className="sr-only">Next</span>
							</Button>
						) : null}
					</div>

					{active ? (
						<p className="shrink-0 px-4 pb-5 text-center text-sm text-white/70">
							{active.alt}
						</p>
					) : null}
				</DialogContent>
			</Dialog>
		</section>
	);
}

function GalleryPreview({ media }: { media: ProjectMedia }) {
	if (media.kind === "video") {
		return (
			<video
				src={media.src}
				poster={media.poster}
				muted
				playsInline
				preload="metadata"
				className="size-full object-cover object-top"
			/>
		);
	}

	return (
		<img
			src={media.src}
			alt=""
			className="size-full object-cover object-top transition duration-300 group-hover:scale-[1.03]"
		/>
	);
}

function LightboxMedia({ media }: { media: ProjectMedia }) {
	if (media.kind === "video") {
		return (
			// biome-ignore lint/a11y/useMediaCaption: project videos are silent UI captures
			<video
				key={media.id}
				src={media.src}
				poster={media.poster}
				controls
				autoPlay
				playsInline
				className="max-h-full max-w-full rounded-sm"
			/>
		);
	}

	return (
		<img
			key={media.id}
			src={media.src}
			alt={media.alt}
			className="max-h-full max-w-full object-contain"
		/>
	);
}

function stepIndex(index: number | undefined, length: number, delta: number) {
	if (index === undefined || length === 0) {
		return index;
	}

	return (index + delta + length) % length;
}
