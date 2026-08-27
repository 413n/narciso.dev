import type { CSSProperties } from "react";

import { cn } from "#/lib/utils.ts";

const brandedColorLogoDirs = ["/epicparty-pro/", "/epicparty-tools/"];

export function logoInvertsInDarkMode(src: string) {
	if (!src.endsWith(".svg")) {
		return false;
	}

	return !brandedColorLogoDirs.some((dir) => src.includes(dir));
}

export function ProjectLogo({
	src,
	name,
	className,
	style,
}: {
	src: string;
	name: string;
	className?: string;
	style?: CSSProperties;
}) {
	return (
		<img
			src={src}
			alt={`${name} logo`}
			style={style}
			className={cn(
				"shrink-0 object-contain",
				logoInvertsInDarkMode(src) && "dark:invert",
				className,
			)}
		/>
	);
}
