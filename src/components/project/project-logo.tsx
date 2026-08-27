import { cn } from "#/lib/utils.ts";

export function ProjectLogo({
	src,
	name,
	className,
}: {
	src: string;
	name: string;
	className?: string;
}) {
	return (
		<img
			src={src}
			alt={`${name} logo`}
			className={cn("shrink-0 object-contain", className)}
		/>
	);
}
