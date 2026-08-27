export type ProjectMedia = {
	id: string;
	src: string;
	alt: string;
	kind: "image" | "video";
	featured?: boolean;
	poster?: string;
};

export type Project = {
	slug: string;
	name: string;
	url: string;
	href: string;
	year: number;
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
	gallery?: ProjectMedia[];
};

export const projects = [
	{
		slug: "descrudes",
		name: "Descrudes",
		url: "www.descrudes.it",
		href: "https://www.descrudes.it",
		year: 2018,
		category: "Fashion",
		languages: ["HTML", "CSS", "JS", "Laravel"],
		colors: {
			primary: "#e23d2a",
			secondary: "#f08a24",
		},
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
	{
		slug: "cyrus-yung",
		name: "Cyrus Yung",
		url: "www.yungcyrus.com",
		href: "https://www.yungcyrus.com",
		year: 2019,
		category: "Artist",
		languages: ["HTML", "CSS", "React"],
		colors: {
			primary: "#2f5bff",
			secondary: "#7b2cff",
		},
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
		slug: "epicparty",
		name: "EpicParty",
		url: "epicparty.app",
		href: "https://epicparty.app",
		year: 2021,
		category: "Gaming",
		languages: ["TypeScript", "React", "Node"],
		logo: "/images/projects/epicparty/logo.svg",
		colors: {
			primary: "#6c2cff",
			secondary: "#00e5a8",
		},
		lede: "A social gaming platform built for short sessions, loud rooms, and a reason to come back tonight.",
		story: [
			"EpicParty had to feel like a night out, not an admin dashboard. Lobbies, matches, and profiles needed to be instant on a phone and still hold up on a TV across the room.",
			"I designed the interface around pace: clear turns, readable scores, and a visual language that stays playful without getting in the way of the game.",
		],
		highlights: [
			"Designed the product surface for live, social play",
			"Built the web client around fast sessions and readable match state",
			"Shaped a visual system that can survive new game modes without a redesign",
		],
	},
] satisfies Project[];

export const signatureColors = {
	primary: "#1e344a",
	secondary: "#52677b",
} as const;

export const defaultProject = projects[0];
export const defaultProjectSlug = defaultProject.slug;

export function getProjectBySlug(slug: string) {
	return projects.find((project) => project.slug === slug);
}

export function resolveProjectSlug(slug: string | undefined) {
	if (slug !== undefined && getProjectBySlug(slug)) {
		return slug;
	}

	return defaultProjectSlug;
}

export function getProjectIndex(slug: string) {
	return projects.findIndex((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string) {
	const index = getProjectIndex(slug);

	if (index < 0) {
		return undefined;
	}

	const previous = projects.at((index - 1 + projects.length) % projects.length);
	const next = projects.at((index + 1) % projects.length);

	if (!previous || !next) {
		return undefined;
	}

	return { previous, next };
}

export function getProjectGallery(project: Project) {
	return project.gallery ?? [];
}

export function getFeaturedMedia(project: Project) {
	const gallery = getProjectGallery(project);

	return gallery.find((item) => item.featured) ?? gallery[0];
}
