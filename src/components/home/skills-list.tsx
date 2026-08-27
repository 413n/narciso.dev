import { motion } from "motion/react";

import {
	featuredSkillIcons,
	featuredSkills,
	skillGroups,
} from "#/data/site.ts";

export function SkillsList() {
	return (
		<div className="flex w-full flex-col gap-8">
			<div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
				{featuredSkills.map((skill, index) => (
					<motion.div
						key={skill}
						className="flex items-center gap-2.5"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: index * 0.05, duration: 0.25 }}
					>
						<img
							src={featuredSkillIcons[skill]}
							alt=""
							aria-hidden="true"
							className="size-5 shrink-0 dark:invert sm:size-6"
						/>
						<p className="text-sm font-semibold sm:text-base">{skill}</p>
					</motion.div>
				))}
			</div>

			<div className="grid gap-6 sm:grid-cols-3">
				{skillGroups.map((group, groupIndex) => (
					<div key={group.category} className="flex flex-col gap-2">
						<p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
							{group.category}
						</p>
						<ul className="flex flex-wrap gap-1">
							{group.skills.map((skill, skillIndex) => (
								<motion.li
									key={skill}
									className="rounded-md bg-muted px-2 py-1 text-xs font-medium"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{
										delay: 0.35 + groupIndex * 0.08 + skillIndex * 0.04,
										duration: 0.25,
									}}
								>
									{skill}
								</motion.li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
}
