import { createFileRoute } from "@tanstack/react-router";

import { CvPrintDocument } from "#/components/cv/cv-print-document.tsx";
import { person } from "#/data/site.ts";

export const Route = createFileRoute("/cv/print")({
	component: CvPrintPage,
	head: () => ({
		meta: [
			{ title: `${person.name} — Curriculum vitae` },
			{
				name: "description",
				content: `Printable A4 curriculum vitae for ${person.name}, ${person.role}.`,
			},
		],
	}),
});

function CvPrintPage() {
	return <CvPrintDocument />;
}
