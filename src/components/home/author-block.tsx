import { person } from "#/data/site.ts";

export function AuthorBlock() {
	return (
		<div className="flex w-full flex-col items-start gap-1">
			<p className="font-display text-[18px] font-bold leading-none tracking-tight text-foreground">
				{person.name}
			</p>
			<p className="text-[17px] leading-none text-muted-foreground">
				{person.role}
			</p>
		</div>
	);
}
