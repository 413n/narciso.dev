import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { type Ref, type RefObject, useEffect, useRef, useState } from "react";

import { reelCueOpacity } from "#/lib/reel-cues.ts";
import { cn } from "#/lib/utils.ts";

export function ProjectReelCues({
	cardRef,
	onPrev,
	onNext,
}: {
	cardRef?: RefObject<HTMLElement | null>;
	onPrev: () => void;
	onNext: () => void;
}) {
	const navRef = useRef<HTMLElement>(null);
	const upRef = useRef<HTMLButtonElement>(null);
	const downRef = useRef<HTMLButtonElement>(null);
	const [pointer, setPointer] = useState<{ x: number; y: number }>();

	useEffect(() => {
		function onMove(event: MouseEvent) {
			setPointer({ x: event.clientX, y: event.clientY });
		}

		function onLeave() {
			setPointer(undefined);
		}

		window.addEventListener("mousemove", onMove);
		document.documentElement.addEventListener("mouseleave", onLeave);

		return () => {
			window.removeEventListener("mousemove", onMove);
			document.documentElement.removeEventListener("mouseleave", onLeave);
		};
	}, []);

	const fadeRange =
		(navRef.current?.getBoundingClientRect().height ?? 0) * 0.55;
	const card = cardRef?.current?.getBoundingClientRect();

	return (
		<nav
			ref={navRef}
			aria-label="Project reel"
			className="stage-reel-cues no-print max-lg:hidden"
		>
			<CueButton
				ref={upRef}
				direction="up"
				opacity={reelCueOpacity(
					pointer,
					upRef.current?.getBoundingClientRect(),
					fadeRange,
					card,
				)}
				onClick={onPrev}
			/>
			<CueButton
				ref={downRef}
				direction="down"
				opacity={reelCueOpacity(
					pointer,
					downRef.current?.getBoundingClientRect(),
					fadeRange,
					card,
				)}
				onClick={onNext}
			/>
		</nav>
	);
}

function CueButton({
	ref,
	direction,
	opacity,
	onClick,
}: {
	ref: Ref<HTMLButtonElement>;
	direction: "up" | "down";
	opacity: number;
	onClick: () => void;
}) {
	const Icon = direction === "up" ? ChevronUpIcon : ChevronDownIcon;
	const present = opacity > 0;

	return (
		<button
			ref={ref}
			type="button"
			tabIndex={present ? 0 : -1}
			aria-hidden={!present}
			aria-label={direction === "up" ? "Previous project" : "Next project"}
			onClick={onClick}
			className={cn(
				"flex w-full items-center justify-center text-white",
				"h-[calc(var(--pad)+11rem)]",
				present ? undefined : "pointer-events-none",
			)}
			style={{ opacity }}
		>
			<Icon className="size-24 drop-shadow-[0_4px_18px_rgb(0_0_0_/_0.45)]" />
		</button>
	);
}
