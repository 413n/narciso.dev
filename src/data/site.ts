export const person = {
	name: "Alessandro Narciso",
	role: "Design Engineer",
	location: "Switzerland",
	email: "alessandro@narciso.dev",
	about:
		"Hi, I'm Alessandro Narciso, a Switzerland-based full stack developer. I care a lot about design and UX, but also about the back-end and its security.",
} as const;

export const skills = [
	{ name: "HTML", level: 95 },
	{ name: "CSS/SCSS", level: 85 },
	{ name: "TypeScript", level: 80 },
	{ name: "JS / React", level: 75 },
	{ name: "Vue", level: 75 },
	{ name: "PHP", level: 85 },
	{ name: "Laravel", level: 80 },
	{ name: "SQL", level: 80 },
	{ name: "AWS", level: 50 },
] as const;

export const socials = [
	{
		label: "Email",
		href: "mailto:alessandro@narciso.dev",
		kind: "email",
	},
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/alessandro-narciso/",
		kind: "linkedin",
	},
	{
		label: "GitHub",
		href: "https://github.com/413n",
		kind: "github",
	},
	{
		label: "Twitter",
		href: "https://twitter.com/narcisodev",
		kind: "twitter",
	},
	{
		label: "Instagram",
		href: "https://www.instagram.com/narciso.dev/",
		kind: "instagram",
	},
	{
		label: "Dribbble",
		href: "https://dribbble.com/narcisodev",
		kind: "dribbble",
	},
] as const;

export type SocialKind = (typeof socials)[number]["kind"];
