type Point = {
	x: number;
	y: number;
};

type Rect = {
	left: number;
	top: number;
	right: number;
	bottom: number;
};

export function isPointInRect(
	point: Point | undefined,
	rect: Rect | undefined,
) {
	if (!point || !rect) {
		return false;
	}

	return (
		point.x >= rect.left &&
		point.x <= rect.right &&
		point.y >= rect.top &&
		point.y <= rect.bottom
	);
}

export function cueOpacity(
	pointer: Point | undefined,
	rect: Rect | undefined,
	range: number,
) {
	if (!pointer || !rect || range <= 0) {
		return 0;
	}

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

export function reelCueOpacity(
	pointer: Point | undefined,
	button: Rect | undefined,
	range: number,
	card: Rect | undefined,
) {
	if (isPointInRect(pointer, card)) {
		return 1;
	}

	return cueOpacity(pointer, button, range);
}
