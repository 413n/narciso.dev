import { useEffect, useState } from "react";

export function useMinWidth(minWidth: number) {
	const [matches, setMatches] = useState(() => {
		if (typeof window === "undefined") {
			return true;
		}

		return window.innerWidth >= minWidth;
	});

	useEffect(() => {
		const media = window.matchMedia(`(min-width: ${minWidth}px)`);

		function sync() {
			setMatches(media.matches);
		}

		sync();
		media.addEventListener("change", sync);

		return () => {
			media.removeEventListener("change", sync);
		};
	}, [minWidth]);

	return matches;
}
