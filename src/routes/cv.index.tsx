import { createFileRoute } from "@tanstack/react-router";

import { CvDocument } from "#/components/cv/cv-document.tsx";
import { StageMain } from "#/components/layout/site-shell.tsx";
import { person } from "#/data/site.ts";

export const Route = createFileRoute("/cv/")({
	component: CvPage,
	head: () => ({
		meta: [
			{ title: `${person.name} — CV` },
			{
				name: "description",
				content: `${person.name}, ${person.role}. ${person.about}`,
			},
		],
	}),
});

function CvPage() {
	return (
		<StageMain>
			<CvDocument />
		</StageMain>
	);
}
