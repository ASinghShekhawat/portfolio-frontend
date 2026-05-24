import { useTheme } from "../theme/ThemeProvider";
import CosmosBackground from "./CosmosBackground";

/**
 * Ambient background — blurred gradient orbs plus a subtle grid overlay
 * and noise texture. Theme-aware: uses CSS custom properties so it
 * retones cleanly between Porthos (dark) and Athos (light). For Aramis
 * (Interstellar) the orbs are replaced by a cosmic scene with stars,
 * planets, and a wormhole tint — see CosmosBackground.
 */
const AuroraBackground = () => {
  const { theme } = useTheme();
  if (theme === "aramis") return <CosmosBackground />;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950"
    >
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.6]"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, #000 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, #000 40%, transparent 100%)",
        }}
      />

      {/* Orbs */}
      <div className="absolute -top-32 -left-32 h-[40rem] w-[40rem] rounded-full bg-accent-emerald/15 blur-[120px] animate-pulse-glow" />
      <div
        className="absolute top-1/3 -right-40 h-[36rem] w-[36rem] rounded-full bg-accent-cyan/10 blur-[120px] animate-pulse-glow"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full bg-accent-violet/10 blur-[120px] animate-pulse-glow"
        style={{ animationDelay: "3s" }}
      />

      {/* Noise */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "var(--noise-bg)",
          opacity: "var(--noise-opacity)",
          mixBlendMode: "var(--noise-blend)",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 50%, var(--vignette-color) 100%)",
        }}
      />
    </div>
  );
};

export default AuroraBackground;
