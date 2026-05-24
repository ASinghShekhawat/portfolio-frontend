import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "portfolio-theme";
const VALID_THEMES = ["porthos", "athos"];
const DEFAULT_THEME = "porthos";

const ThemeContext = createContext({
  theme: DEFAULT_THEME,
  setTheme: () => {},
  toggleTheme: () => {},
});

/**
 * Reads the theme persisted to localStorage (set by the FOUC-prevention
 * script in index.html), exposes it through context, and writes any change
 * back to <html data-theme> + localStorage. Default = Porthos (dark).
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    if (typeof document !== "undefined") {
      const attr = document.documentElement.getAttribute("data-theme");
      if (VALID_THEMES.includes(attr)) return attr;
    }
    return DEFAULT_THEME;
  });

  const setTheme = useCallback((next) => {
    if (!VALID_THEMES.includes(next)) return;
    setThemeState(next);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (e) {
        /* storage may be blocked */
      }
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "porthos" ? "athos" : "porthos");
  }, [theme, setTheme]);

  // Sync attribute if state somehow gets out of sync (e.g. external mutation)
  useEffect(() => {
    if (document.documentElement.getAttribute("data-theme") !== theme) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
