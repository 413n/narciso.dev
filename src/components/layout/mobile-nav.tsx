import { MenuIcon } from "lucide-react";
import { useState } from "react";

import { SiteNav } from "#/components/layout/site-nav.tsx";
import { SocialLinks } from "#/components/layout/social-links.tsx";
import { ThemeToggle } from "#/components/layout/theme-toggle.tsx";
import { Button } from "#/components/ui/button.tsx";
import { Separator } from "#/components/ui/separator.tsx";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "#/components/ui/sheet.tsx";

export function MobileNav() {
	const [open, setOpen] = useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					aria-label="Open menu"
					className="no-print rounded-full md:hidden"
				>
					<MenuIcon />
				</Button>
			</SheetTrigger>
			<SheetContent
				side="right"
				className="w-3/4 gap-0 border-border bg-background p-0 sm:max-w-xs"
			>
				<SheetHeader className="p-6 pr-14">
					<SheetTitle className="font-display text-lg tracking-tight">
						Menu
					</SheetTitle>
					<SheetDescription className="sr-only">
						Site navigation, theme, and social links
					</SheetDescription>
				</SheetHeader>
				<div className="flex flex-1 flex-col justify-between gap-8 px-6 pb-6">
					<SiteNav
						onNavigate={() => {
							setOpen(false);
						}}
						className="gap-1"
					/>
					<div className="flex flex-col items-start gap-3">
						<Separator />
						<ThemeToggle />
						<SocialLinks />
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
