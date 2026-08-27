import { cn } from "#/lib/utils.ts";

export function SiteLogo({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 1024 1024"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={cn("size-14 text-foreground", className)}
			aria-hidden="true"
		>
			<path
				d="M210 210V814H331.533V528.308L521.664 814L683.536 814L281.622 210H210Z"
				fill="currentColor"
			/>
			<path
				d="M814 814V210L692.467 210V495.692L502.336 210L340.464 210L742.378 814L814 814Z"
				fill="currentColor"
			/>
		</svg>
	);
}
