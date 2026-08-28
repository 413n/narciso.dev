import type { ReactNode } from "react";

import { ContactMailButton } from "#/components/contact/protected-email.tsx";
import { type SocialKind, socials } from "#/data/site.ts";

function BrandMark({
	className,
	children,
}: {
	className?: string;
	children: ReactNode;
}) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			className={className}
		>
			{children}
		</svg>
	);
}

function GithubMark({ className }: { className?: string }) {
	return (
		<BrandMark className={className}>
			<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
			<path d="M9 18c-4.51 2-5-2-7-2" />
		</BrandMark>
	);
}

function LinkedinMark({ className }: { className?: string }) {
	return (
		<BrandMark className={className}>
			<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
			<rect width="4" height="12" x="2" y="9" />
			<circle cx="4" cy="4" r="2" />
		</BrandMark>
	);
}

function InstagramMark({ className }: { className?: string }) {
	return (
		<BrandMark className={className}>
			<rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
			<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
			<line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
		</BrandMark>
	);
}

function DribbbleMark({ className }: { className?: string }) {
	return (
		<BrandMark className={className}>
			<circle cx="12" cy="12" r="10" />
			<path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
			<path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
			<path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
		</BrandMark>
	);
}

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
	(props: { className?: string }) => ReactNode
> = {
	linkedin: LinkedinMark,
	github: GithubMark,
	twitter: TwitterMark,
	instagram: InstagramMark,
	dribbble: DribbbleMark,
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
