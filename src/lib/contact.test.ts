import { describe, expect, test } from "vitest";

import {
	bindContactMailto,
	contactDecoy,
	contactMailtoHref,
	decodeContact,
} from "./contact.ts";

describe("contact", () => {
	test("keeps a generated decoy that email harvesters will not match", () => {
		expect(contactDecoy.includes("@")).toBe(false);
		expect(contactDecoy.includes(".")).toBe(false);
		expect(contactDecoy).toMatch(/^[a-z]+·[a-z]+$/);
	});

	test("assembles the address only at decode time", () => {
		const address = decodeContact();
		const [local, host] = address.split("@");

		expect(address.split("@")).toHaveLength(2);
		expect(local?.length).toBe(10);
		expect(host?.includes(".")).toBe(true);
		expect(contactDecoy).not.toBe(address);
	});

	test("builds a mailto href from the decoded address", () => {
		const href = contactMailtoHref();

		expect(href.startsWith("mailto:")).toBe(true);
		expect(href.slice("mailto:".length)).toBe(decodeContact());
	});

	test("writes a mailto href onto an anchor that is not a mailto link yet", () => {
		const anchor = { protocol: "http:", href: "https://example.com" };

		bindContactMailto(anchor as HTMLAnchorElement);

		expect(anchor.href).toBe(contactMailtoHref());
	});
});
