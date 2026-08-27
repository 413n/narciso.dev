import { person, skills } from "#/data/site.ts";

export const resume = {
	name: person.name,
	title: person.role,
	location: person.location,
	email: person.email,
	summary:
		"Full stack developer blending interface craft with solid back-end work. I ship websites that look considered and hold up in production.",
	bio: person.about,
	experience: [
		{
			role: "Software Engineer",
			company: "adesso Schweiz AG",
			start: "2022",
			end: "Present",
			highlights: [
				"Build and ship production software with consulting and engineering teams in Lugano.",
				"Work across the stack with a bias for clear UX and maintainable delivery.",
				"Take features from discovery through to something a client can actually run.",
			],
		},
		{
			role: "Junior Software Engineer",
			company: "Triman GmbH",
			start: "2019",
			end: "2022",
			highlights: [
				"Delivered full-stack features for Swiss SME clients in an agile studio.",
				"Worked across modern web front-ends and cloud-backed services.",
				"Grew from junior into owning slices of delivery end-to-end.",
			],
		},
	],
	skills: [...skills],
	languages: [
		{ name: "Italian", grade: "Native" },
		{ name: "English", grade: "Professional" },
	],
} as const;
