import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import type { ReactNode } from "react";

import { AppLayout } from "#/components/layout/app-layout.tsx";
import { NotFoundPage } from "#/components/not-found.tsx";
import { TooltipProvider } from "#/components/ui/tooltip.tsx";
import { person } from "#/data/site.ts";
import { ThemeProvider } from "#/lib/theme.tsx";
import appCss from "../styles.css?url";

const fontHref =
	"https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{ title: `${person.name} — ${person.role}` },
			{ name: "description", content: person.about },
			{ name: "theme-color", content: "#09090b" },
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				sizes: "any",
				href: "/favicon.svg",
			},
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/apple-touch-icon.png",
			},
			{ rel: "manifest", href: "/site.webmanifest" },
			{ rel: "preconnect", href: "https://fonts.googleapis.com" },
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous",
			},
			{ rel: "stylesheet", href: fontHref },
			{ rel: "stylesheet", href: appCss },
		],
	}),
	notFoundComponent: NotFoundPage,
	shellComponent: RootDocument,
	component: AppLayout,
});

function RootDocument({ children }: { children: ReactNode }) {
	return (
		<html lang="en" className="dark">
			<head>
				<HeadContent />
			</head>
			<body>
				<ThemeProvider>
					<TooltipProvider>{children}</TooltipProvider>
				</ThemeProvider>
				{import.meta.env.DEV ? (
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
						]}
					/>
				) : null}
				<Scripts />
			</body>
		</html>
	);
}
