import { MoonIcon, SunIcon } from "lucide-react";

import { Button } from "#/components/ui/button.tsx";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "#/components/ui/tooltip.tsx";
import { useTheme } from "#/lib/theme.tsx";

export function ThemeToggle() {
	const { isNight, toggle } = useTheme();

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					onClick={toggle}
					aria-label={isNight ? "Switch to light mode" : "Switch to night mode"}
					className="self-start rounded-full bg-transparent text-muted-foreground shadow-none hover:bg-transparent hover:text-foreground dark:hover:bg-transparent"
				>
					{isNight ? <SunIcon /> : <MoonIcon />}
				</Button>
			</TooltipTrigger>
			<TooltipContent>{isNight ? "Light mode" : "Night mode"}</TooltipContent>
		</Tooltip>
	);
}
