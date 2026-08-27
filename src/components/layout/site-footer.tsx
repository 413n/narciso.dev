import type { LucideIcon } from "lucide-react";
import {
	DribbbleIcon,
	GithubIcon,
	InstagramIcon,
	LinkedinIcon,
	MailIcon,
} from "lucide-react";

import { ThemeToggle } from "#/components/layout/theme-toggle.tsx";
import { person, type SocialKind, socials } from "#/data/site.ts";
import { cn } from "#/lib/utils.ts";

function TwitterMark({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
			<path
				fill="currentColor"
				d="M18.244 2H21l-6.51 7.44L22 22h-6.79l-4.32-6.01L6.2 22H3.44l7.02-8.02L2 2h6.93l3.9 5.52L18.244 2Zm-1.19 18.2h1.88L7.03 3.69H5.02l12.034 16.51Z"
			/>
		</svg>
	);
}

const icons: Record<SocialKind, LucideIcon | typeof TwitterMark> = {
	email: MailIcon,
	linkedin: LinkedinIcon,
	github: GithubIcon,
	twitter: TwitterMark,
	instagram: InstagramIcon,
	dribbble: DribbbleIcon,
};

export function SiteFooter() {
	return (
		<div className="flex min-w-0 flex-col gap-2">
			<ThemeToggle />
			<p className="text-sm text-muted-foreground">
				Want to work together?{" "}
				<a
					href={`mailto:${person.email}`}
					className="group relative inline-flex font-medium text-foreground no-underline"
				>
					Get in touch
					<span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground transition-transform duration-300 group-hover:scale-x-100" />
				</a>
			</p>
			<div className="flex flex-wrap items-center gap-2">
				{socials.map((social) => {
					const Icon = icons[social.kind];

					return (
						<a
							key={social.href}
							href={social.href}
							target={social.kind === "email" ? undefined : "_blank"}
							rel={social.kind === "email" ? undefined : "noreferrer"}
							aria-label={social.label}
							className={cn(
								"inline-flex size-8 items-center justify-center rounded-full text-foreground/80 transition hover:bg-foreground/8 hover:text-foreground",
								social.kind === "email" && "sm:hidden",
							)}
						>
							<Icon className="size-4" />
						</a>
					);
				})}
			</div>
		</div>
	);
}
