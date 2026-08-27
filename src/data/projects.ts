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

export type ProjectKind = "brand" | "product";

export type Project = {
	slug: string;
	name: string;
	url: string;
	href: string;
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
		kind: "brand",
		languages: ["TypeScript", "React", "TanStack"],
		logo: "/images/projects/n6-studio/logo.svg",
		colors: {
			primary: "#111111",
			secondary: "#94a3b8",
		},
		online: true,
		lede: "A studio brand for games, extensions, and tools — small products shipped under one mark.",
		story: [
			"N6 Studio is the umbrella, not the product. It needed a public surface that could hold a Chrome extension, a capture app, and whatever comes next without pretending they are the same thing.",
			"I built the studio site in TanStack Start: brand kit, listings, and Polar checkout for paid extensions. Black, quiet, and fast — a place to land, not a manifesto.",
		],
		highlights: [
			"Shaped a brand surface for a family of small products",
			"Built the studio site in TanStack Start with Polar checkout",
			"Gave extensions and experiments a single place to land",
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
		lede: "An open-source capture app for thoughts, todos, reminders, and bookmarks — send once, find it later.",
		story: [
			"Notes had to get out of the way. Jot a thought, paste a URL, pick a time, attach a photo — then send once. Everything lands in an inbox and stays in sync for when you actually need it.",
			"I built it on TanStack Start with a Convex backend and Better Auth. Anonymous sessions work immediately; Google is there when you want it. The product is the capture, not the account wall.",
		],
		highlights: [
			"Designed a capture-first inbox that stays out of the way",
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
		lede: "A social gaming platform built for short sessions, loud rooms, and a reason to come back tonight.",
		story: [
			"EpicParty had to feel like a night out, not an admin dashboard. Lobbies, matches, and profiles needed to be instant on a phone and still hold up on a TV across the room.",
			"I designed the interface around pace: clear turns, readable scores, and a visual language that stays playful without getting in the way of the game. The same brand now also covers Pro and Tools — organizer ops and event coordination that sit next to the game without stealing its name.",
		],
		highlights: [
			"Designed the product surface for live, social play",
			"Built the web client around fast sessions and readable match state",
			"Shaped a visual system that can survive new game modes without a redesign",
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
		online: false,
		lede: "Party operations for organizers, and a guest-facing Party app that keeps the roster, teams, and access links in one place.",
		story: [
			"A hosted Party is not a match lobby. Organizers needed roster, access, and team language that could survive a live night — and guests needed a web app that did not look like an admin tool.",
			"I designed Pro around that split: a dashboard for the people running the Party, and a guest surface for the people in it. Access links, teams, and identity stay Party-scoped so ops can evolve without rewriting the consumer game.",
		],
		highlights: [
			"Designed organizer and guest surfaces around a single Party",
			"Built roster, team, and access-link flows that survive a live night",
			"Split ops from the consumer game so each product can move on its own",
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
		online: false,
		lede: "Focused utilities for coordinating event work — availability, timeslots, and a booking flow that does not need a meeting.",
		story: [
			"Tools is for the coordination around a Party, not the Party itself. Organizers share an Availability; guests pick timeslots. Booking claims a slot. Poll mode finds the overlap without locking anyone in.",
			"I kept the product small on purpose. One job, readable on a phone, and a visual language that can sit next to EpicParty without copying the game.",
		],
		highlights: [
			"Designed availability as a shared, guest-friendly surface",
			"Implemented booking and poll modes without collapsing them into one metaphor",
			"Kept the product a tool, not a second platform",
		],
	},
	{
		slug: "gs-wedding",
		name: "G&S Wedding",
		url: "gs-wedding.vercel.app",
		href: "https://gs-wedding.vercel.app",
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
		lede: "An invitation, RSVP, and wedding-day challenge site for G & S — private links, not a public landing page.",
		story: [
			"The site had to feel like an invitation: names, date, church, dinner — then a calm path to yes or no. Guests never hit a homepage. They opened their own link.",
			"On the day, teams ran challenges with QR check-in and a live ranking. I built it in Next.js with tRPC and Drizzle: RSVP, gifts, and a one-night game that still had to work when the room was loud.",
		],
		highlights: [
			"Designed a private RSVP flow that felt like an invitation, not a form",
			"Built wedding-day challenges with team ranking and QR check-in",
			"Shipped a stack that could survive a single day without a rehearsal",
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
		lede: "A party betting night in the Italian fanta tradition — how well do you actually know Irwin?",
		story: [
			"Fanta Irwin was a one-night game among friends. Everyone started with a stack of glauchi, bet on events before the party, and watched the ranking move as the night happened.",
			"I built it in Next.js with PlanetScale: login, bets, admin, and a live board. The tone had to feel like a game among friends, not a casino — loud type, ridiculous events, and a scoreboard that could sit on a phone in a dark room.",
		],
		highlights: [
			"Designed a live ranking around a single party night",
			"Built betting, admin, and profile flows in Next.js",
			"Tuned the tone to feel like a game among friends, not a casino",
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
		lede: "A loud, identity-first presence for a rapper — music, visuals, and a single place to land.",
		story: [
			"Artist sites die when they feel like a Linktree with extra steps. This one had to carry a voice: dark, electric, and fast on a phone in a club queue.",
			"I built it in React as a tight one-pager that could grow — releases, press, and a visual language that could survive a new mixtape without a redesign.",
		],
		highlights: [
			"Shaped a visual system around the artist identity",
			"Implemented a React front-end tuned for mobile",
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
		colors: {
			primary: "#e23d2a",
			secondary: "#f08a24",
		},
		online: false,
		lede: "An editorial storefront for an Italian clothing label — collections first, checkout second.",
		story: [
			"Descrudes needed a site that felt like a lookbook, not a generic catalogue. I built the full stack in Laravel: collection pages, product stories, and a calm path from browsing to purchase.",
			"The work sat between fashion direction and engineering. Photography had to stay huge, type had to stay sharp, and the CMS had to be usable on a Sunday night before a drop.",
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
