import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { type Ref, useRef, useState } from "react";

import { cn } from "#/lib/utils.ts";

export function ProjectReelCues({
	onPrev,
	onNext,
}: {
	onPrev: () => void;
	onNext: () => void;
}) {
	const navRef = useRef<HTMLElement>(null);
	const upRef = useRef<HTMLButtonElement>(null);
	const downRef = useRef<HTMLButtonElement>(null);
	const [pointer, setPointer] = useState<{ x: number; y: number }>();

	const fadeRange =
		(navRef.current?.getBoundingClientRect().height ?? 0) * 0.55;

	return (
		<nav
			ref={navRef}
			aria-label="Project reel"
			className="stage-reel-cues no-print max-lg:hidden"
			onMouseLeave={() => {
				setPointer(undefined);
			}}
			onMouseMove={(event) => {
				setPointer({ x: event.clientX, y: event.clientY });
			}}
		>
			<CueButton
				ref={upRef}
				direction="up"
				opacity={cueOpacity(pointer, upRef.current, fadeRange)}
				onClick={onPrev}
			/>
			<CueButton
				ref={downRef}
				direction="down"
				opacity={cueOpacity(pointer, downRef.current, fadeRange)}
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

function cueOpacity(
	pointer: { x: number; y: number } | undefined,
	button: HTMLElement | null,
	range: number,
) {
	if (!pointer || !button || range <= 0) {
		return 0;
	}

	const rect = button.getBoundingClientRect();
	const dx = Math.max(rect.left - pointer.x, 0, pointer.x - rect.right);
	const dy = Math.max(rect.top - pointer.y, 0, pointer.y - rect.bottom);
	const distance = Math.hypot(dx, dy);

	if (distance === 0) {
		return 1;
	}

	if (distance >= range) {
		return 0;
	}

	const t = 1 - distance / range;

	return t * t;
}
