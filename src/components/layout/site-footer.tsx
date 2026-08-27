import { SocialLinks } from "#/components/layout/social-links.tsx";
import { ThemeToggle } from "#/components/layout/theme-toggle.tsx";

export function SiteFooter() {
	return (
		<div className="flex min-w-0 flex-col gap-2">
			<ThemeToggle />
			<SocialLinks />
		</div>
	);
}
