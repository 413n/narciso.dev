import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

type Theme = "night" | "day";

type ThemeContextValue = {
	theme: Theme;
	isNight: boolean;
	toggle: () => void;
};

const STORAGE_KEY = "narciso-theme";
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function readStoredTheme() {
	if (typeof window === "undefined") {
		return "night" as const;
	}

	const stored = window.localStorage.getItem(STORAGE_KEY);

	if (stored === "day" || stored === "night") {
		return stored;
	}

	return "night" as const;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<Theme>("night");

	useEffect(() => {
		setTheme(readStoredTheme());
	}, []);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme === "night");
		window.localStorage.setItem(STORAGE_KEY, theme);
	}, [theme]);

	const toggle = useCallback(() => {
		setTheme((current) => (current === "night" ? "day" : "night"));
	}, []);

	return (
		<ThemeContext.Provider
			value={{
				theme,
				isNight: theme === "night",
				toggle,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error("useTheme must be used within ThemeProvider");
	}

	return context;
}
