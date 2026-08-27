import type { LucideIcon } from "lucide-react";
import {
	DribbbleIcon,
	GithubIcon,
	InstagramIcon,
	LinkedinIcon,
} from "lucide-react";

import { ContactMailButton } from "#/components/contact/protected-email.tsx";
import { type SocialKind, socials } from "#/data/site.ts";

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

const icons: Record<
	Exclude<SocialKind, "email">,
	LucideIcon | typeof TwitterMark
> = {
	linkedin: LinkedinIcon,
	github: GithubIcon,
	twitter: TwitterMark,
	instagram: InstagramIcon,
	dribbble: DribbbleIcon,
};

export function SocialLinks() {
	return (
		<div className="flex flex-wrap items-center gap-2">
			{socials.map((social) => {
				if (social.kind === "email") {
					return <ContactMailButton key={social.kind} />;
				}

				const Icon = icons[social.kind];

				return (
					<a
						key={social.href}
						href={social.href}
						target="_blank"
						rel="noreferrer"
						aria-label={social.label}
						className="inline-flex size-8 items-center justify-center rounded-full text-foreground/80 transition hover:bg-foreground/8 hover:text-foreground"
					>
						<Icon className="size-4" />
					</a>
				);
			})}
		</div>
	);
}
