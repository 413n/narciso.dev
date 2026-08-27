export const person = {
	name: "Alessandro Narciso",
	role: "Design Engineer",
	location: "Switzerland",
	about:
		"I'm passionate about cutting-edge frontend technologies and tools that improve DX. Nonetheless I also love web design and UX. I constantly seek opportunities to learn, evolve, and refine both my technical and personal skills. I always try to keep an eye out on how the web is changing and evolving, especially in the JavaScript ecosystem. Fun fact: I’m older than I look!",
} as const;

export const featuredSkills = [
	"React",
	"Node",
	"TypeScript",
	"UI",
	"UX",
	"Figma",
] as const;

export const featuredSkillIcons = {
	React: "/images/skills/react.svg",
	Node: "/images/skills/nodedotjs.svg",
	TypeScript: "/images/skills/typescript.svg",
	UI: "/images/skills/spark.svg",
	UX: "/images/skills/accessibility.svg",
	Figma: "/images/skills/figma.svg",
} satisfies Record<(typeof featuredSkills)[number], string>;

export const skillGroups = [
	{
		category: "Frontend",
		skills: [
			"HTML",
			"CSS / SCSS",
			"JavaScript",
			"Vue",
			"Tailwind CSS",
			"TanStack",
		],
	},
	{
		category: "Backend",
		skills: ["PHP", "Laravel", "SQL", "Node.js", "C#", "Convex"],
	},
	{
		category: "Cloud",
		skills: ["AWS", "Cloudflare"],
	},
] as const;

export const skills = [
	...featuredSkills,
	...skillGroups.flatMap((group) => group.skills),
] as const;

export const socials = [
	{
		label: "Email",
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
