import { motion } from "motion/react";

import { skills } from "#/data/site.ts";

export function SkillsList({ compact = false }: { compact?: boolean }) {
	return (
		<div className="flex w-full flex-col gap-1">
			{skills.map((skill, index) => (
				<motion.div
					key={skill.name}
					className="relative w-full overflow-hidden rounded-md bg-muted"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: index * 0.05, duration: 0.25 }}
				>
					<motion.div
						className="absolute inset-y-0 left-0 bg-linear-to-r from-foreground/10 to-foreground/25 dark:from-background dark:to-foreground/20"
						initial={{ width: 0 }}
						animate={{ width: `${skill.level}%` }}
						transition={{
							delay: index * 0.05,
							duration: 0.45,
							ease: "easeOut",
						}}
					/>
					<p
						className={
							compact
								? "relative px-2 py-1 text-xs font-semibold"
								: "relative px-3 py-2 text-sm font-semibold sm:text-base"
						}
					>
						{skill.name}
					</p>
				</motion.div>
			))}
		</div>
	);
}
