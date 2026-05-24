import { motion, LayoutGroup } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { FiMoon, FiSun } from "react-icons/fi";

const OPTIONS = [
  { id: "athos", label: "Athos", icon: FiSun },
  { id: "porthos", label: "Porthos", icon: FiMoon },
];

/**
 * Horizontal pill toggle for switching themes. The active slab slides
 * between options with a spring (shared layout id), and a soft glow
 * follows. Two label variants: "full" (text + icon) and "compact" (icon only).
 */
const ThemeToggle = ({ variant = "full", className = "" }) => {
  const { theme, setTheme } = useTheme();
  const compact = variant === "compact";

  return (
    <LayoutGroup id={`theme-toggle-${variant}`}>
      <div
        role="radiogroup"
        aria-label="Color theme"
        className={`relative inline-flex items-center gap-0.5 p-1 rounded-full bg-ink-800/60 border border-line-subtle/10 backdrop-blur-md ${className}`}
      >
        {OPTIONS.map(({ id, label, icon: Icon }) => {
          const isActive = theme === id;
          return (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => setTheme(id)}
              className={`relative z-10 inline-flex items-center gap-1.5 rounded-full transition-colors ${
                compact ? "px-2 py-1.5" : "px-3 py-1.5"
              } font-mono text-[10px] uppercase tracking-widest ${
                isActive
                  ? "text-ink-950"
                  : "text-fog-300 hover:text-fog-50"
              }`}
              title={`Switch to ${label}`}
            >
              {isActive && (
                <motion.span
                  layoutId="theme-toggle-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-brand shadow-glow"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
              <Icon size={12} className="flex-shrink-0" />
              {!compact && <span>{label}</span>}
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
};

export default ThemeToggle;
