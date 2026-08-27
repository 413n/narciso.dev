import { useCallback, useEffect, useRef, useState } from "react";

import { useMinWidth } from "#/hooks/use-min-width.ts";

const CYCLE_LOCK_MS = 580;
const WHEEL_THRESHOLD = 72;
const SWIPE_THRESHOLD = 48;
export const REEL_SCROLL_MIN_WIDTH = 768;

export function canCaptureReelScroll(width: number) {
	return width >= REEL_SCROLL_MIN_WIDTH;
}

export function useProjectCycle({
	length,
	index,
	onChange,
}: {
	length: number;
	index: number;
	onChange: (index: number, direction: 1 | -1) => void;
}) {
	const [direction, setDirection] = useState<1 | -1>(1);
	const locked = useRef(false);
	const timer = useRef(0);
	const indexRef = useRef(index);
	const onChangeRef = useRef(onChange);
	const wheelDelta = useRef(0);
	const touchStartY = useRef<number | undefined>(undefined);

	const captureScroll = useMinWidth(REEL_SCROLL_MIN_WIDTH);

	indexRef.current = index;
	onChangeRef.current = onChange;

	const unlock = useCallback(() => {
		locked.current = false;
		wheelDelta.current = 0;
	}, []);

	const go = useCallback(
		(dir: 1 | -1) => {
			if (locked.current || length < 2) {
				return;
			}

			locked.current = true;
			setDirection(dir);

			const nextIndex = (indexRef.current + dir + length) % length;
			onChangeRef.current(nextIndex, dir);

			window.clearTimeout(timer.current);
			timer.current = window.setTimeout(unlock, CYCLE_LOCK_MS);
		},
		[length, unlock],
	);

	const goTo = useCallback(
		(nextIndex: number) => {
			if (locked.current || nextIndex < 0 || nextIndex >= length) {
				return;
			}

			const current = indexRef.current;

			if (nextIndex === current) {
				return;
			}

			const dir: 1 | -1 = nextIndex > current ? 1 : -1;

			locked.current = true;
			setDirection(dir);
			onChangeRef.current(nextIndex, dir);

			window.clearTimeout(timer.current);
			timer.current = window.setTimeout(unlock, CYCLE_LOCK_MS);
		},
		[length, unlock],
	);

	useEffect(() => {
		if (!captureScroll) {
			return;
		}

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "ArrowDown" || event.key === "PageDown") {
				event.preventDefault();
				go(1);
			}

			if (event.key === "ArrowUp" || event.key === "PageUp") {
				event.preventDefault();
				go(-1);
			}
		};

		const onWheel = (event: WheelEvent) => {
			event.preventDefault();

			if (locked.current) {
				return;
			}

			wheelDelta.current += event.deltaY;

			if (Math.abs(wheelDelta.current) < WHEEL_THRESHOLD) {
				return;
			}

			go(wheelDelta.current > 0 ? 1 : -1);
			wheelDelta.current = 0;
		};

		const onTouchStart = (event: TouchEvent) => {
			touchStartY.current = event.touches[0]?.clientY;
		};

		const onTouchEnd = (event: TouchEvent) => {
			const startY = touchStartY.current;
			const endY = event.changedTouches[0]?.clientY;
			touchStartY.current = undefined;

			if (startY === undefined || endY === undefined) {
				return;
			}

			const delta = startY - endY;

			if (Math.abs(delta) < SWIPE_THRESHOLD) {
				return;
			}

			go(delta > 0 ? 1 : -1);
		};

		window.addEventListener("keydown", onKeyDown);
		window.addEventListener("wheel", onWheel, { passive: false });
		window.addEventListener("touchstart", onTouchStart, { passive: true });
		window.addEventListener("touchend", onTouchEnd);

		return () => {
			window.removeEventListener("keydown", onKeyDown);
			window.removeEventListener("wheel", onWheel);
			window.removeEventListener("touchstart", onTouchStart);
			window.removeEventListener("touchend", onTouchEnd);
			window.clearTimeout(timer.current);
		};
	}, [captureScroll, go]);

	return {
		direction,
		next: () => {
			go(1);
		},
		prev: () => {
			go(-1);
		},
		goTo,
	};
}
