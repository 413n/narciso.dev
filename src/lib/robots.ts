export const noindexRobots = "noindex, nofollow";

export function robotsTxt() {
	return ["User-agent: *", "Allow: /", "Disallow: /cv", ""].join("\n");
}
