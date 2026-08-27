import type { CSSProperties } from "react";

import { cn } from "#/lib/utils.ts";

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
				src.endsWith(".svg") && "dark:invert",
				className,
			)}
		/>
	);
}
