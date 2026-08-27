"use client";

import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { getHighlightedProjects } from "#/data/projects.ts";
import { resume } from "#/data/resume.ts";
import { socials } from "#/data/site.ts";
import { decodeContact } from "#/lib/contact.ts";
import { cn } from "#/lib/utils.ts";

const linkedIn = socials.find((social) => social.kind === "linkedin");
const github = socials.find((social) => social.kind === "github");

function displayHref(href: string) {
	const url = new URL(href);
	const host = url.hostname.startsWith("www.")
		? url.hostname.slice(4)
		: url.hostname;
	const path = url.pathname.endsWith("/")
		? url.pathname.slice(0, -1)
		: url.pathname;

	return `${host}${path}`;
}

function formatTenure(start: string | number, end?: string | number) {
	if (end === undefined || String(start) === String(end)) {
		return String(start);
	}

	return `${start} – ${end}`;
}

function CvPrintEmail() {
	const [address, setAddress] = useState<string>();

	useEffect(() => {
		setAddress(decodeContact());
	}, []);

	if (!address) {
		return null;
	}

	return (
		<>
			<span aria-hidden="true"> · </span>
			<a href={`mailto:${address}`} className="text-inherit no-underline">
				{address}
			</a>
		</>
	);
}

function SectionHeading({ children }: { children: string }) {
	return (
		<h2
			className={cn(
				"border-b border-neutral-900 pb-[2pt] text-sm font-bold",
				"uppercase tracking-[0.14em] text-neutral-900",
			)}
		>
			{children}
		</h2>
	);
}

export function CvPrintDocument() {
	return (
		<div className="cv-print-desk">
			<div className="cv-print-toolbar no-print">
				<Link
					to="/cv"
					className="text-sm text-neutral-600 hover:text-neutral-900"
				>
					Back to CV
				</Link>
				<button
					type="button"
					className="text-sm text-neutral-600 hover:text-neutral-900"
					onClick={() => {
						window.print();
					}}
				>
					Print
				</button>
			</div>

			<article className="cv-print-sheet">
				<header className="flex flex-col gap-[6pt] border-b-2 border-neutral-900 pb-[10pt]">
					<div className="flex flex-col gap-[2pt]">
						<h1 className="text-4xl leading-none font-bold tracking-[-0.02em] text-neutral-900">
							{resume.name}
						</h1>
						<p className="text-lg leading-snug text-neutral-700">
							{resume.title}
						</p>
					</div>
					<p className="text-sm leading-snug break-words text-neutral-700">
						{resume.location}
						<CvPrintEmail />
						{linkedIn && "href" in linkedIn ? (
							<>
								<span aria-hidden="true"> · </span>
								<a href={linkedIn.href} className="text-inherit no-underline">
									{displayHref(linkedIn.href)}
								</a>
							</>
						) : null}
						{github && "href" in github ? (
							<>
								<span aria-hidden="true"> · </span>
								<a href={github.href} className="text-inherit no-underline">
									{displayHref(github.href)}
								</a>
							</>
						) : null}
					</p>
				</header>

				<p className="text-sm leading-[1.4] text-neutral-800">
					{resume.summary}
				</p>

				<section className="flex flex-col gap-[10pt]">
					<SectionHeading>Experience</SectionHeading>
					<div className="flex flex-col gap-[12pt]">
						{resume.experience.map((item) => (
							<article
								key={`${item.company}-${item.role}-${item.start}`}
								className="flex break-inside-avoid flex-col gap-[3pt]"
							>
								<div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
									<h3 className="text-base leading-snug font-bold text-neutral-900">
										{item.role}
									</h3>
									<p className="shrink-0 text-sm text-neutral-600">
										{formatTenure(item.start, item.end)}
									</p>
								</div>
								<p className="text-sm leading-snug text-neutral-700 italic">
									{item.company}
								</p>
								<ul className="list-disc pl-[1.15em] text-sm leading-[1.4] text-neutral-800 marker:text-neutral-900">
									{item.highlights.map((highlight) => (
										<li key={highlight}>{highlight}</li>
									))}
								</ul>
							</article>
						))}
					</div>
				</section>

				<section className="flex flex-col gap-[10pt]">
					<SectionHeading>Projects</SectionHeading>
					<div className="flex flex-col gap-[12pt]">
						{getHighlightedProjects().map((project) => (
							<article
								key={project.slug}
								className="flex break-inside-avoid flex-col gap-[3pt]"
							>
								<div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
									<h3 className="text-base leading-snug font-bold text-neutral-900">
										{project.name}
									</h3>
									<p className="shrink-0 text-sm text-neutral-600">
										{formatTenure(project.year.start, project.year.end)}
									</p>
								</div>
								<p className="text-sm leading-snug text-neutral-700">
									{project.category}
									<span aria-hidden="true"> · </span>
									<a href={project.href} className="text-inherit no-underline">
										{project.url}
									</a>
								</p>
								<ul className="list-disc pl-[1.15em] text-sm leading-[1.4] text-neutral-800 marker:text-neutral-900">
									{project.highlights.map((highlight) => (
										<li key={highlight}>{highlight}</li>
									))}
								</ul>
							</article>
						))}
					</div>
				</section>

				<div
					className={cn(
						"grid grid-cols-1 gap-x-[18pt] gap-y-[14pt]",
						"sm:grid-cols-2 print:grid-cols-2",
					)}
				>
					<section className="flex flex-col gap-[8pt]">
						<SectionHeading>Skills</SectionHeading>
						<p className="text-sm leading-[1.45] text-neutral-800">
							{resume.skills.join(" · ")}
						</p>
					</section>
					<section className="flex flex-col gap-[8pt]">
						<SectionHeading>Languages</SectionHeading>
						<ul className="flex flex-col gap-[2pt] text-sm leading-[1.4] text-neutral-800">
							{resume.languages.map((language) => (
								<li key={language.name}>
									{language.name} — {language.grade}
								</li>
							))}
						</ul>
					</section>
				</div>
			</article>
		</div>
	);
}
