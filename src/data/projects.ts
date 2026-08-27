export type ProjectMedia = {
	id: string;
	src: string;
	alt: string;
	kind: "image" | "video";
	featured?: boolean;
	poster?: string;
};

export type ProjectYear = {
	start: number;
	end?: number | "Present";
};

export type ProjectKind = "studio" | "product";

export type Project = {
	slug: string;
	name: string;
	url?: string;
	href?: string;
	year: ProjectYear;
	category: string;
	languages: string[];
	logo?: string;
	colors: {
		primary: string;
		secondary: string;
	};
	lede: string;
	story: string[];
	highlights: string[];
	online: boolean;
	kind?: ProjectKind;
	parentSlug?: string;
	highlighted?: boolean;
	gallery?: ProjectMedia[];
};

export const projects = [
	{
		slug: "n6-studio",
		name: "N6 Studio",
		url: "n6.studio",
		href: "https://n6.studio",
		year: { start: 2026, end: "Present" },
		category: "Studio",
		kind: "studio",
		languages: ["TypeScript", "React", "TanStack"],
		logo: "/images/projects/n6-studio/logo.svg",
		colors: {
			primary: "#111111",
			secondary: "#94a3b8",
		},
		online: true,
		lede: "A studio brand for games, extensions, and tools. Small products share one public site.",
		story: [
			"N6 Studio is the brand behind several small products, not a product itself. The site had to list a Chrome extension, a capture app, and future work without treating them as one thing.",
			"I built the studio site in TanStack Start: a brand kit, product listings, and Polar checkout for paid extensions. The site is dark, quiet, and fast.",
		],
		highlights: [
			"Designed a public brand site for a family of small products",
			"Built the studio site in TanStack Start with Polar checkout",
			"Listed extensions and experiments on one public site",
		],
	},
	{
		slug: "notes",
		name: "Notes",
		url: "notes.n6.studio",
		href: "https://notes.n6.studio",
		year: { start: 2026, end: "Present" },
		category: "Productivity",
		kind: "product",
		parentSlug: "n6-studio",
		languages: ["TypeScript", "React", "Convex"],
		logo: "/images/projects/notes/logo.svg",
		colors: {
			primary: "#0b1220",
			secondary: "#c4b5fd",
		},
		online: true,
		lede: "An open-source app for thoughts, todos, reminders, and bookmarks. Capture once and find it later.",
		story: [
			"Notes is built for capture. Jot a thought, paste a URL, set a reminder, or attach a photo. Everything lands in one inbox and stays in sync.",
			"I built it on TanStack Start with a Convex backend and Better Auth. Anonymous sessions work immediately; Google sign-in is there when you want it.",
		],
		highlights: [
			"Designed a capture-first inbox",
			"Built the app on TanStack Start with a Convex backend",
			"Shipped anonymous sessions so the first note does not wait on a signup",
		],
	},
	{
		slug: "epicparty",
		name: "EpicParty",
		url: "epicparty.gg",
		href: "https://epicparty.gg",
		year: { start: 2021, end: "Present" },
		category: "Gaming",
		kind: "product",
		languages: ["TypeScript", "React", "Node"],
		logo: "/images/projects/epicparty/logo.svg",
		colors: {
			primary: "#6c2cff",
			secondary: "#00e5a8",
		},
		online: true,
		highlighted: true,
		lede: "A pocket game platform for connecting and playing with friends, anywhere and anytime.",
		story: [
			"EpicParty grew out of Fanta Irwin, a betting game made for a graduation night. The product had to travel: friends connecting and playing whenever they want.",
			"I designed the interface around pace: clear turns, readable scores, and a look that stays playful without covering the game. The same brand now covers Pro and Tools: larger Party events, and a toolkit for organizing a Party.",
		],
		highlights: [
			"Designed a pocket platform for playing with friends anywhere",
			"Built the web client around fast sessions and readable match state",
			"Designed a visual system that can support new game modes without a redesign",
		],
	},
	{
		slug: "epicparty-pro",
		name: "EpicParty Pro",
		url: "epicparty.pro",
		href: "https://epicparty.pro",
		year: { start: 2025, end: "Present" },
		category: "Events",
		kind: "product",
		parentSlug: "epicparty",
		languages: ["TypeScript", "React", "Convex"],
		logo: "/images/projects/epicparty-pro/logo.svg",
		colors: {
			primary: "#0040ff",
			secondary: "#7dd3fc",
		},
		online: true,
		lede: "A Party for larger events that need organization. RSVP, teams and solo play, and a media drive for guest photos and videos.",
		story: [
			"Pro is for bigger events that need organization. One Party holds invitations, games, and guest media in a single place. Games can run with teams or with individual players.",
			"I designed Pro around that split: a dashboard for the people running the Party, and a guest app for the people in it. Organizers handle RSVP. Guests can play and upload photos and videos to a shared media drive.",
		],
		highlights: [
			"Designed organizer and guest apps around a single Party",
			"Built RSVP, team, and individual-player flows for larger events",
			"Added a guest media drive for photos and videos",
		],
	},
	{
		slug: "epicparty-tools",
		name: "EpicParty Tools",
		url: "epicparty.tools",
		href: "https://epicparty.tools",
		year: { start: 2025, end: "Present" },
		category: "Productivity",
		kind: "product",
		parentSlug: "epicparty",
		languages: ["TypeScript", "React", "Convex"],
		logo: "/images/projects/epicparty-tools/logo.svg",
		colors: {
			primary: "#7600ff",
			secondary: "#e879f9",
		},
		online: true,
		lede: "A toolkit for organizing a Party, plus simple Party games such as Secret Santa.",
		story: [
			"Tools is a toolkit for organizing a Party. It also hosts simple Party games, starting with Secret Santa for the winter season, with room for more later.",
			"I kept the product small. It stays readable on a phone and can sit next to EpicParty without copying the consumer game.",
		],
		highlights: [
			"Designed a toolkit for organizing a Party",
			"Shipped Secret Santa as a seasonal Party game",
			"Left room for more Party games without growing the product",
		],
	},
	{
		slug: "gs-wedding",
		name: "G&S Wedding",
		year: { start: 2025 },
		category: "Wedding",
		kind: "product",
		languages: ["TypeScript", "React", "Next.js"],
		logo: "/images/projects/gs-wedding/logo.png",
		colors: {
			primary: "#948b5c",
			secondary: "#80744e",
		},
		online: false,
		lede: "A private invitation, RSVP, and wedding-day challenge site for G & S. Guests open their own link.",
		story: [
			"The site had to feel like an invitation: names, date, church, and dinner, then a calm path to yes or no. Guests never landed on a public homepage. Each person opened a private link.",
			"On the day, teams ran challenges with QR check-in and a live ranking. I built it in Next.js with tRPC and Drizzle: RSVP, gifts, and a one-night game that had to work on phones in a crowded room.",
		],
		highlights: [
			"Designed a private RSVP flow that felt like an invitation",
			"Built wedding-day challenges with team ranking and QR check-in",
			"Shipped a stack that had to work the first time, on the day",
		],
	},
	{
		slug: "fanta-irwin",
		name: "Fanta Irwin",
		url: "fanta.irwin.games",
		href: "https://fanta.irwin.games",
		year: { start: 2023 },
		category: "Gaming",
		kind: "product",
		languages: ["TypeScript", "React", "Next.js"],
		logo: "/images/projects/fanta-irwin/logo.png",
		colors: {
			primary: "#14b8a6",
			secondary: "#d946ef",
		},
		online: false,
		lede: "A betting game made for Irwin's graduation. Guests bet on what would happen that evening.",
		story: [
			"Fanta Irwin was made for Irwin's graduation party. Guests could bet on what would happen that evening, in the Italian fanta tradition. Everyone started with glauchi, the in-game currency, and watched the ranking update as the night went on. That night is what later became the idea for EpicParty.",
			"I built it in Next.js with PlanetScale: login, bets, admin, and a live board. The look had to feel like a game among friends: large type, silly events, and a scoreboard that stays readable on a phone in a dark room.",
		],
		highlights: [
			"Designed a live ranking for a graduation night",
			"Built betting, admin, and profile flows in Next.js",
			"Inspired the idea for EpicParty",
		],
	},
	{
		slug: "cyrus-yung",
		name: "Cyrus Yung",
		url: "www.yungcyrus.com",
		href: "https://www.yungcyrus.com",
		year: { start: 2019 },
		category: "Artist",
		kind: "product",
		languages: ["HTML", "CSS", "React"],
		logo: "/images/projects/cyrus-yung/logo.svg",
		colors: {
			primary: "#2f5bff",
			secondary: "#7b2cff",
		},
		online: false,
		lede: "A public site for a rapper: music, visuals, and links in one place.",
		story: [
			"A list of links is not enough for an artist site. This one had to carry a voice: dark, electric, and fast on a phone.",
			"I built it in React as a short one-pager that could grow: releases, press, and a visual system that could support a new mixtape without a redesign.",
		],
		highlights: [
			"Designed a visual system around the artist identity",
			"Built a React front-end tuned for mobile",
			"Structured content so new releases could ship without a rebuild",
		],
	},
	{
		slug: "descrudes",
		name: "Descrudes",
		url: "www.descrudes.it",
		href: "https://www.descrudes.it",
		year: { start: 2018 },
		category: "Fashion",
		kind: "product",
		languages: ["HTML", "CSS", "JS", "Laravel"],
		logo: "/images/projects/descrudes/logo.svg",
		colors: {
			primary: "#e23d2a",
			secondary: "#f08a24",
		},
		online: false,
		lede: "An editorial storefront for an Italian clothing label, built around collections.",
		story: [
			"Descrudes needed a site that felt like a lookbook, not a generic catalogue. I built the full stack in Laravel: collection pages, product stories, and a calm path from browsing to purchase.",
			"The work sat between fashion direction and engineering. Photography had to stay large, type had to stay sharp, and the CMS had to be usable right before a drop.",
		],
		highlights: [
			"Designed and shipped the public site end-to-end",
			"Built collection and product templates around editorial photography",
			"Implemented Laravel admin workflows for seasonal drops",
		],
	},
] satisfies Project[];

export const signatureColors = {
	primary: "#1e293b",
	secondary: "#64748b",
} as const;

export const defaultProjectSlug = "epicparty";

export function formatProjectYear(year: ProjectYear) {
	if (year.end === undefined) {
		return String(year.start);
	}

	return `${year.start}–${year.end}`;
}

export function projectUrlLabel(project: Project) {
	return project.url ?? "<hidden>";
}

export function hasPublicUrl(
	project: Project,
): project is Project & { url: string; href: string } {
	return project.url !== undefined && project.href !== undefined;
}

export function getHighlightedProjects() {
	return projects.filter((project) => project.highlighted);
}

export function getProjectBySlug(slug: string) {
	return projects.find((project) => project.slug === slug);
}

function getRequiredProject(slug: string) {
	const project = getProjectBySlug(slug);

	if (!project) {
		throw new Error(`Unknown project: ${slug}`);
	}

	return project;
}

export const defaultProject = getRequiredProject(defaultProjectSlug);

export function resolveProjectSlug(slug: string | undefined) {
	if (slug !== undefined && getProjectBySlug(slug)) {
		return slug;
	}

	return defaultProjectSlug;
}

export function projectSearch(slug: string | undefined) {
	const resolved = resolveProjectSlug(slug);

	if (resolved === defaultProjectSlug) {
		return {};
	}

	return { project: resolved };
}

export function getProjectIndex(slug: string) {
	return projects.findIndex((project) => project.slug === slug);
}

export function getParentProject(project: Project) {
	if (project.parentSlug === undefined) {
		return undefined;
	}

	return getProjectBySlug(project.parentSlug);
}

export function formatParentAttribution(parent: Project) {
	if (parent.kind === "studio") {
		return `Project of ${parent.name}`;
	}

	return `Product of ${parent.name}`;
}

export function getChildProjects(slug: string) {
	return projects.filter((project) => project.parentSlug === slug);
}

export function getProjectGallery(project: Project) {
	return project.gallery ?? [];
}

export function getFeaturedMedia(project: Project) {
	const gallery = getProjectGallery(project);

	return gallery.find((item) => item.featured) ?? gallery[0];
}
