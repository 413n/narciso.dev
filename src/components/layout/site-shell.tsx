import { motion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

import { cn } from "#/lib/utils.ts";

export function SiteShell({
	primary,
	secondary,
	layout = "reel",
	children,
}: {
	primary: string;
	secondary: string;
	layout?: "reel" | "page";
	children: ReactNode;
}) {
	return (
		<div
			className={cn("stage", layout === "page" && "stage-page")}
			style={
				{
					"--project-primary": primary,
					"--project-secondary": secondary,
				} as CSSProperties
			}
		>
			<div className="stage-left" />
			<div className="stage-right">
				<motion.div
					className="stage-right-fill"
					animate={{
						background: `linear-gradient(45deg, ${primary}, ${secondary})`,
					}}
					transition={{ duration: 0.4, ease: "linear" }}
				/>
			</div>
			{children}
			<div className="stage-grain" />
		</div>
	);
}

export function StageNav({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return <div className={cn("stage-nav", className)}>{children}</div>;
}

export function StageMain({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return <div className={cn("stage-main", className)}>{children}</div>;
}

export function StageFooter({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return <div className={cn("stage-footer", className)}>{children}</div>;
}
