export const SWIPE_DISTANCE = 80;
export const SWIPE_VELOCITY = 500;

export const slideTransition = {
	duration: 0.55,
	ease: [0.22, 1, 0.36, 1] as const,
};

export const horizontalSlideVariants = {
	enter: (dir: 1 | -1) => ({
		x: dir > 0 ? "100vw" : "-100vw",
		y: 0,
	}),
	center: {
		x: 0,
		y: 0,
	},
	exit: (dir: 1 | -1) => ({
		x: dir > 0 ? "-100vw" : "100vw",
		y: 0,
	}),
};

export const swipeDragConstraints = {
	left: 0,
	right: 0,
};

export const swipeDragElastic = 0.2;

export function swipeDirection(
	offsetX: number,
	velocityX: number,
): 1 | -1 | undefined {
	if (Math.abs(velocityX) >= SWIPE_VELOCITY) {
		if (velocityX < 0) {
			return 1;
		}

		return -1;
	}

	if (Math.abs(offsetX) >= SWIPE_DISTANCE) {
		if (offsetX < 0) {
			return 1;
		}

		return -1;
	}

	return undefined;
}
