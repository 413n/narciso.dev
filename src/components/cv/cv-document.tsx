import { PrinterIcon } from "lucide-react";

import { ProjectLogo } from "#/components/project/project-logo.tsx";
import { Badge } from "#/components/ui/badge.tsx";
import { Button } from "#/components/ui/button.tsx";
import { Separator } from "#/components/ui/separator.tsx";
import { projects } from "#/data/projects.ts";
import { resume } from "#/data/resume.ts";

export function CvDocument() {
	return (
		<article className="flex h-full min-h-0 flex-col gap-6 overflow-auto rounded-lg bg-card p-5 text-card-foreground shadow-[0_7px_14px_rgb(50_50_93_/_0.1),0_3px_6px_rgb(0_0_0_/_0.07)] sm:p-8 print:rounded-none print:shadow-none">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
				<div className="flex flex-col gap-1">
					<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
						Curriculum vitae
					</p>
					<h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
						{resume.name}
					</h1>
					<p className="text-muted-foreground">
						{resume.title} · {resume.location}
					</p>
					<a
						href={`mailto:${resume.email}`}
						className="text-sm text-foreground"
					>
						{resume.email}
					</a>
				</div>
				<Button
					type="button"
					variant="outline"
					className="no-print self-start rounded-full"
					onClick={() => {
						window.print();
					}}
				>
					<PrinterIcon />
					Print
				</Button>
			</div>

			<p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
				{resume.summary}
			</p>

			<Separator />

			<section className="flex flex-col gap-4">
				<h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
					Experience
				</h2>
				<div className="flex flex-col gap-6">
					{resume.experience.map((item) => (
						<article
							key={`${item.company}-${item.role}-${item.start}`}
							className="flex flex-col gap-2"
						>
							<div className="flex flex-wrap items-baseline justify-between gap-2">
								<h3 className="font-display text-lg font-semibold">
									{item.role}
								</h3>
								<p className="text-xs text-muted-foreground">
									{item.start === item.end
										? item.start
										: `${item.start} – ${item.end}`}
								</p>
							</div>
							<p className="text-sm text-muted-foreground">{item.company}</p>
							<ul className="flex flex-col gap-1.5 text-sm">
								{item.highlights.map((highlight) => (
									<li key={highlight} className="flex gap-2">
										<span className="mt-2 size-1 shrink-0 rounded-full bg-foreground/40" />
										<span>{highlight}</span>
									</li>
								))}
							</ul>
						</article>
					))}
				</div>
			</section>

			<Separator />

			<section className="flex flex-col gap-4">
				<h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
					Projects
				</h2>
				<div className="flex flex-col gap-6">
					{projects.map((project) => (
						<article key={project.slug} className="flex flex-col gap-2">
							<div className="flex items-start justify-between gap-3">
								<div className="flex min-w-0 items-center gap-3">
									{project.logo ? (
										<ProjectLogo
											src={project.logo}
											name={project.name}
											className="size-8 rounded-md"
										/>
									) : null}
									<div className="flex min-w-0 flex-col gap-0.5">
										<h3 className="font-display text-lg font-semibold">
											{project.name}
										</h3>
										<p className="text-sm text-muted-foreground">
											{project.category}
										</p>
									</div>
								</div>
								<p className="shrink-0 text-xs text-muted-foreground">
									{project.year}
								</p>
							</div>
							<ul className="flex flex-col gap-1.5 text-sm">
								{project.highlights.map((highlight) => (
									<li key={highlight} className="flex gap-2">
										<span className="mt-2 size-1 shrink-0 rounded-full bg-foreground/40" />
										<span>{highlight}</span>
									</li>
								))}
							</ul>
						</article>
					))}
				</div>
			</section>

			<Separator />

			<div className="grid gap-8 sm:grid-cols-2">
				<section className="flex flex-col gap-3">
					<h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
						Skills
					</h2>
					<div className="flex flex-wrap gap-2">
						{resume.skills.map((skill) => (
							<Badge key={skill.name} variant="secondary">
								{skill.name}
							</Badge>
						))}
					</div>
				</section>
				<section className="flex flex-col gap-3">
					<h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
						Languages
					</h2>
					<ul className="flex flex-col gap-1.5 text-sm">
						{resume.languages.map((language) => (
							<li key={language.name}>
								{language.name} — {language.grade}
							</li>
						))}
					</ul>
				</section>
			</div>
		</article>
	);
}
