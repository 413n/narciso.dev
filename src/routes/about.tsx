import { createFileRoute } from "@tanstack/react-router";

import { SkillsList } from "#/components/home/skills-list.tsx";
import { StageMain } from "#/components/layout/site-shell.tsx";
import { person } from "#/data/site.ts";

export const Route = createFileRoute("/about")({
	component: AboutPage,
	head: () => ({
		meta: [
			{ title: `${person.name} — About` },
			{
				name: "description",
				content: person.about,
			},
		],
	}),
});

function AboutPage() {
	return (
		<StageMain>
			<article className="flex h-full min-h-0 flex-col gap-8 overflow-auto rounded-lg bg-card p-5 text-card-foreground shadow-[0_7px_14px_rgb(50_50_93_/_0.1),0_3px_6px_rgb(0_0_0_/_0.07)] sm:p-8">
				<div className="flex flex-col gap-6">
					<p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
						About me
					</p>
					<p className="text-2xl leading-snug sm:text-3xl">{person.about}</p>
				</div>

				<section className="flex flex-col gap-3">
					<p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
						Skills
					</p>
					<SkillsList />
				</section>
			</article>
		</StageMain>
	);
}
