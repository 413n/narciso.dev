import { MailIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "#/components/ui/tooltip.tsx";
import {
	bindContactMailto,
	contactDecoy,
	contactMailtoHref,
	decodeContact,
} from "#/lib/contact.ts";
import { cn } from "#/lib/utils.ts";

export function ContactMailButton({ className }: { className?: string }) {
	const [href, setHref] = useState<string>();

	useEffect(() => {
		setHref(contactMailtoHref());
	}, []);

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<a
					href={href}
					aria-label="Email"
					onPointerDown={(event) => {
						bindContactMailto(event.currentTarget);
					}}
					onFocus={(event) => {
						bindContactMailto(event.currentTarget);
					}}
					className={cn(
						"inline-flex size-8 items-center justify-center rounded-full text-foreground/80 transition hover:bg-foreground/8 hover:text-foreground",
						className,
					)}
				>
					<MailIcon className="size-4" />
				</a>
			</TooltipTrigger>
			<TooltipContent>Email</TooltipContent>
		</Tooltip>
	);
}

export function ProtectedEmail({ className }: { className?: string }) {
	const [address, setAddress] = useState<string>();
	const [sharp, setSharp] = useState(false);

	function reveal() {
		setAddress((current) => current ?? decodeContact());
	}

	useEffect(() => {
		function revealForPrint() {
			flushSync(() => {
				setAddress((current) => current ?? decodeContact());
				setSharp(true);
			});
		}

		window.addEventListener("beforeprint", revealForPrint);

		return () => {
			window.removeEventListener("beforeprint", revealForPrint);
		};
	}, []);

	useEffect(() => {
		if (!address || sharp) {
			return;
		}

		const frame = window.requestAnimationFrame(() => {
			setSharp(true);
		});

		return () => {
			window.cancelAnimationFrame(frame);
		};
	}, [address, sharp]);

	if (address) {
		return (
			<a
				href={`mailto:${address}`}
				className={cn(
					"w-fit font-mono text-sm tracking-wide text-foreground no-underline transition-[filter,color] duration-500 print:blur-none",
					sharp ? "blur-none" : "text-muted-foreground blur-[5px]",
					className,
				)}
			>
				{address}
			</a>
		);
	}

	return (
		<button
			type="button"
			onClick={reveal}
			aria-label="Reveal email address"
			title="Click to reveal"
			className={cn("group w-fit cursor-pointer text-left", className)}
		>
			<span
				aria-hidden="true"
				className="inline-block select-none font-mono text-sm tracking-wide text-muted-foreground blur-[5px] transition-[filter,color] duration-300 group-hover:text-foreground group-hover:blur-[3px]"
			>
				{contactDecoy}
			</span>
		</button>
	);
}
