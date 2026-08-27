import { cn } from "#/lib/utils.ts";

export function SiteLogo({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 500 500"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={cn("size-10", className)}
			aria-hidden="true"
		>
			<path
				d="M0 0V500H100.607V263.5L258 500L392 500L59.29 0H0Z"
				fill="currentColor"
			/>
			<path
				d="M500 500V0H399.393V236.5L242 0H108L440.71 500H500Z"
				fill="currentColor"
			/>
		</svg>
	);
}
