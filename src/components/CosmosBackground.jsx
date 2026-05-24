import { useMemo, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "../theme/ThemeProvider";

/**
 * Aramis (Interstellar) background — a layered cosmic scene combining
 * real NASA photography with CSS/SVG effects. Layered back-to-front:
 *
 *   1. Deep-space base + Milky-Way galactic band
 *   2. NASA imagery — 5 photos as scroll-parallax depth planes, each
 *      radial-masked into the void at low opacity
 *   3. Two spiral galaxies (slow rotation)
 *   4. Wormhole conic sweep
 *   5. Starfield — 5 parallax depths, ~2550 stars total
 *   6. Nebula glow orbs (gold / ice / violet)
 *   7. Gargantua-style ringed planet + Mann's-style ice world
 *   8. Ambient shooting stars + grand activation streak
 *   9. Endurance HUD readout (bottom-left)
 *  10. Subtle orbital grid, noise, vignette
 *
 * Stars use the box-shadow trick: a single 1×1 div carries hundreds of
 * shadow points, which the browser rasterizes once. Animating opacity
 * (twinkle) is GPU-composited and cheap.
 */

// Each plane gets a different scroll-parallax speed so they drift at
// different rates, creating depth. Negative speed = moves opposite to
// scroll (feels "behind"). Positive = moves with scroll (feels "near").
const NASA_PLANES = [
  {
    src: "/images/nasa_images/web-first-images-release.png",
    parallax: -260,         // furthest plane, slowest drift
    style: {
      top: "-12%",
      right: "-18%",
      width: "62vw",
      height: "62vw",
      maxWidth: "1200px",
      maxHeight: "1200px",
      opacity: 0.42,
      mixBlendMode: "screen",
    },
    mask:
      "radial-gradient(ellipse 50% 50% at 50% 50%, #000 30%, rgba(0,0,0,0.6) 55%, transparent 80%)",
  },
  {
    src: "/images/nasa_images/ssc2006-02a-0.jpg",
    parallax: -180,
    style: {
      top: "18%",
      left: "-14%",
      width: "48vw",
      height: "48vw",
      maxWidth: "900px",
      maxHeight: "900px",
      opacity: 0.32,
      mixBlendMode: "screen",
    },
    mask:
      "radial-gradient(ellipse 50% 50% at 50% 50%, #000 25%, rgba(0,0,0,0.55) 50%, transparent 80%)",
  },
  {
    src: "/images/nasa_images/galaxy.jpeg",
    parallax: -120,
    style: {
      top: "62%",
      right: "12%",
      width: "30vw",
      height: "30vw",
      maxWidth: "560px",
      maxHeight: "560px",
      opacity: 0.40,
      mixBlendMode: "screen",
      transform: "rotate(34deg)",
    },
    mask:
      "radial-gradient(ellipse 45% 45% at 50% 50%, #000 28%, transparent 78%)",
  },
  {
    src: "/images/nasa_images/55252854454-c4ed9aa664-o.jpg",
    parallax: -80,
    style: {
      bottom: "-12%",
      left: "18%",
      width: "44vw",
      height: "44vw",
      maxWidth: "820px",
      maxHeight: "820px",
      opacity: 0.28,
      mixBlendMode: "screen",
    },
    mask:
      "radial-gradient(ellipse 50% 50% at 50% 50%, #000 25%, rgba(0,0,0,0.5) 52%, transparent 82%)",
  },
  {
    src: "/images/nasa_images/art002e009288orig.jpg",
    parallax: -40,          // closest plane, drifts most
    style: {
      top: "44%",
      left: "38%",
      width: "22vw",
      height: "22vw",
      maxWidth: "420px",
      maxHeight: "420px",
      opacity: 0.22,
      mixBlendMode: "screen",
    },
    mask:
      "radial-gradient(ellipse 42% 42% at 50% 50%, #000 22%, transparent 75%)",
  },
];
const buildStarShadows = (count, spread, color) =>
  Array.from({ length: count }, () => {
    const x = ((Math.random() - 0.5) * spread).toFixed(1);
    const y = ((Math.random() - 0.5) * spread).toFixed(1);
    return `${x}px ${y}px ${color}`;
  }).join(", ");

const CosmosBackground = () => {
  const stars = useMemo(
    () => ({
      // Tiny faraway stars — densest, faintest, slowest twinkle
      far: buildStarShadows(1800, 5000, "rgba(255, 250, 235, 0.65)"),
      // Mid-distance
      mid: buildStarShadows(520, 5000, "rgba(255, 250, 235, 0.9)"),
      // Bright foreground stars
      near: buildStarShadows(110, 5000, "rgba(255, 252, 240, 1)"),
      // Warm-tinted accent stars (gold dusting)
      gold: buildStarShadows(70, 5000, "rgba(255, 213, 130, 1)"),
      // Cool-tinted accent stars (blue dusting)
      cyan: buildStarShadows(50, 5000, "rgba(180, 220, 245, 1)"),
    }),
    []
  );

  // Bumped by ThemeProvider on every setTheme("aramis") call — including
  // re-clicks while already on Aramis. Used as React `key` on the grand
  // streak so the element remounts and the animation replays each click.
  const { aramisActivationKey } = useTheme();

  // Scroll-driven parallax for the NASA planes. useScroll's progress is
  // a normalized 0→1 value, useTransform maps it to pixel offsets.
  const { scrollYProgress } = useScroll();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950"
    >
      {/* Deep-space base — radial gradients hinting at horizon glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 100%, rgba(20, 28, 48, 0.55) 0%, transparent 60%), radial-gradient(ellipse 100% 60% at 70% 15%, rgba(48, 32, 18, 0.35) 0%, transparent 65%)",
        }}
      />

      {/* Milky-Way galactic band — diagonal soft stripe across the page */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(108deg, transparent 25%, rgba(255, 220, 160, 0.05) 38%, rgba(255, 220, 160, 0.09) 46%, rgba(122, 196, 232, 0.07) 52%, rgba(255, 220, 160, 0.09) 58%, rgba(255, 220, 160, 0.05) 66%, transparent 80%)",
          filter: "blur(24px)",
        }}
      />

      {/* NASA imagery — parallax depth planes, lazy-loaded and staggered.
          Each plane mounts after a small delay so they stream in over the
          first ~1s of Aramis activation rather than fighting for bandwidth
          (and so the grand activation streak gets a clean first second). */}
      {NASA_PLANES.map((plane, i) => (
        <NasaPlane
          key={i}
          plane={plane}
          scrollYProgress={scrollYProgress}
          delay={150 + i * 200}
        />
      ))}

      {/* Spiral galaxy #1 — upper-left, gold-tinted */}
      <div
        className="absolute hidden sm:block"
        style={{
          top: "6%",
          left: "8%",
          width: "460px",
          height: "460px",
          transform: "rotate(18deg)",
          animation: "cosmos-spin 220s linear infinite",
          opacity: 0.55,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 14% at center, rgba(255, 230, 180, 0.55) 0%, rgba(245, 184, 79, 0.28) 18%, rgba(245, 184, 79, 0.10) 40%, transparent 70%)",
            filter: "blur(2px)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255, 245, 220, 0.9) 0%, rgba(255, 210, 140, 0.45) 6%, rgba(245, 184, 79, 0.18) 14%, transparent 28%)",
          }}
        />
      </div>

      {/* Spiral galaxy #2 — lower-right, ice-blue-tinted */}
      <div
        className="absolute hidden md:block"
        style={{
          bottom: "10%",
          right: "6%",
          width: "380px",
          height: "380px",
          transform: "rotate(-32deg)",
          animation: "cosmos-spin 280s linear infinite reverse",
          opacity: 0.5,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 14% at center, rgba(210, 235, 252, 0.5) 0%, rgba(122, 196, 232, 0.24) 20%, rgba(122, 196, 232, 0.08) 42%, transparent 72%)",
            filter: "blur(2px)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(245, 252, 255, 0.85) 0%, rgba(180, 220, 245, 0.4) 7%, rgba(122, 196, 232, 0.16) 16%, transparent 30%)",
          }}
        />
      </div>

      {/* Wormhole hint — slow conic sweep in upper-right */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "conic-gradient(from 0deg at 78% 18%, transparent 0deg, rgba(245, 184, 79, 0.18) 35deg, rgba(122, 196, 232, 0.10) 70deg, transparent 110deg, transparent 360deg)",
          animation: "cosmos-spin 90s linear infinite",
        }}
      />

      {/* Starfield — 5 layers, ~2550 stars total, anchored at viewport center */}
      <div className="absolute top-1/2 left-1/2">
        <div
          className="absolute"
          style={{
            width: 1,
            height: 1,
            boxShadow: stars.far,
            animation: "cosmos-twinkle 7s ease-in-out infinite",
          }}
        />
        <div
          className="absolute"
          style={{
            width: 1.5,
            height: 1.5,
            boxShadow: stars.mid,
            animation: "cosmos-twinkle 4.5s ease-in-out infinite 1s",
          }}
        />
        <div
          className="absolute"
          style={{
            width: 2,
            height: 2,
            borderRadius: "50%",
            boxShadow: stars.near,
            animation: "cosmos-twinkle 3.5s ease-in-out infinite 0.4s",
          }}
        />
        <div
          className="absolute"
          style={{
            width: 1.5,
            height: 1.5,
            borderRadius: "50%",
            boxShadow: stars.gold,
            animation: "cosmos-twinkle 5.5s ease-in-out infinite 2s",
          }}
        />
        <div
          className="absolute"
          style={{
            width: 1.5,
            height: 1.5,
            borderRadius: "50%",
            boxShadow: stars.cyan,
            animation: "cosmos-twinkle 6s ease-in-out infinite 1.5s",
          }}
        />
      </div>

      {/* Distant nebula glows */}
      <div className="absolute -top-32 -left-32 h-[42rem] w-[42rem] rounded-full bg-accent-emerald/15 blur-[140px] animate-pulse-glow" />
      <div
        className="absolute top-1/3 -right-40 h-[38rem] w-[38rem] rounded-full bg-accent-cyan/12 blur-[140px] animate-pulse-glow"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute bottom-[-8rem] left-1/3 h-[32rem] w-[32rem] rounded-full bg-accent-violet/12 blur-[130px] animate-pulse-glow"
        style={{ animationDelay: "3s" }}
      />

      {/* Gargantua-style ringed planet */}
      <svg
        className="absolute top-[10%] right-[6%] w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
        viewBox="0 0 200 200"
        style={{
          animation: "cosmos-float 14s ease-in-out infinite",
          filter: "drop-shadow(0 0 24px rgba(245, 184, 79, 0.35))",
        }}
      >
        <defs>
          <radialGradient id="aramis-planet-gold" cx="35%" cy="32%" r="75%">
            <stop offset="0%" stopColor="rgb(255, 220, 150)" stopOpacity="1" />
            <stop offset="40%" stopColor="rgb(232, 168, 70)" stopOpacity="1" />
            <stop offset="80%" stopColor="rgb(140, 82, 30)" stopOpacity="1" />
            <stop offset="100%" stopColor="rgb(48, 24, 8)" stopOpacity="1" />
          </radialGradient>
          <linearGradient id="aramis-ring" x1="0" x2="1" y1="0.5" y2="0.5">
            <stop offset="0%" stopColor="rgba(245, 184, 79, 0)" />
            <stop offset="30%" stopColor="rgba(245, 184, 79, 0.85)" />
            <stop offset="50%" stopColor="rgba(255, 224, 160, 0.95)" />
            <stop offset="70%" stopColor="rgba(245, 184, 79, 0.85)" />
            <stop offset="100%" stopColor="rgba(245, 184, 79, 0)" />
          </linearGradient>
          <clipPath id="aramis-ring-back">
            <rect x="0" y="0" width="200" height="100" />
          </clipPath>
          <clipPath id="aramis-ring-front">
            <rect x="0" y="100" width="200" height="100" />
          </clipPath>
        </defs>
        <g transform="rotate(-22 100 100)">
          <ellipse
            cx="100"
            cy="100"
            rx="88"
            ry="14"
            fill="none"
            stroke="url(#aramis-ring)"
            strokeWidth="3"
            clipPath="url(#aramis-ring-back)"
          />
          <circle cx="100" cy="100" r="42" fill="url(#aramis-planet-gold)" />
          <ellipse
            cx="100"
            cy="100"
            rx="88"
            ry="14"
            fill="none"
            stroke="url(#aramis-ring)"
            strokeWidth="3"
            clipPath="url(#aramis-ring-front)"
          />
        </g>
      </svg>

      {/* Mann's-style ice world */}
      <div
        className="absolute bottom-[20%] left-[10%] w-14 h-14 sm:w-20 sm:h-20 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, rgb(220, 238, 252) 0%, rgb(140, 188, 220) 38%, rgb(56, 96, 132) 78%, rgb(12, 24, 40) 100%)",
          boxShadow:
            "0 0 30px -2px rgba(122, 196, 232, 0.45), inset -6px -6px 18px rgba(8, 16, 28, 0.6)",
          animation: "cosmos-float 18s ease-in-out infinite 2s",
        }}
      />

      {/* Ambient shooting stars — looping, staggered */}
      <span className="cosmos-shoot" style={{ top: "14%", left: "85%" }} />
      <span
        className="cosmos-shoot"
        style={{ top: "32%", left: "70%", animationDelay: "5s" }}
      />
      <span
        className="cosmos-shoot"
        style={{ top: "58%", left: "92%", animationDelay: "10s" }}
      />
      <span
        className="cosmos-shoot"
        style={{ top: "72%", left: "55%", animationDelay: "16s" }}
      />

      {/* Grand activation streak — replays on every Aramis click */}
      <span key={aramisActivationKey} className="cosmos-shoot-grand" />

      {/* Endurance HUD — small "ship telemetry" readout, bottom-left */}
      <div
        className="absolute bottom-5 left-6 hidden md:flex flex-col gap-1 font-mono text-[9px] uppercase tracking-[0.22em] text-fog-300/85"
        style={{ textShadow: "0 0 8px rgba(245, 184, 79, 0.35)" }}
      >
        <div className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-emerald shadow-glow animate-pulse" />
          <span className="text-accent-emerald">endurance</span>
          <span className="text-fog-500">·</span>
          <span>online</span>
        </div>
        <div className="text-fog-400/80">
          sector{" "}
          <span className="text-fog-200">aramis</span>
          <span className="text-fog-500 mx-1.5">·</span>
          drift{" "}
          <span className="text-fog-200">0.042c</span>
        </div>
        <div className="text-fog-500/70">
          carina &middot; pillars &middot; m81 &middot; ngc-3324
        </div>
      </div>

      {/* Subtle orbital grid */}
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 90% 70% at 50% 40%, #000 25%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 50% 40%, #000 25%, transparent 100%)",
        }}
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
            "radial-gradient(ellipse at center, transparent 0%, transparent 45%, var(--vignette-color) 100%)",
        }}
      />
    </div>
  );
};

/**
 * Single NASA-image depth plane. Uses a real <img> element so we get
 * native `loading="lazy"`, `decoding="async"`, and `fetchpriority="low"`
 * — the browser fetches and decodes off the critical path. Mounting is
 * also delayed (`delay` ms) so the planes stream in over time instead
 * of all requesting at once.
 */
const NasaPlane = ({ plane, scrollYProgress, delay = 0 }) => {
  const y = useTransform(scrollYProgress, [0, 1], [0, plane.parallax]);
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  if (!mounted) return null;

  const { src, style, mask } = plane;

  return (
    <motion.div className="absolute" style={{ ...style, y, willChange: "transform" }}>
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        fetchpriority="low"
        draggable="false"
        onLoad={() => setLoaded(true)}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.9s ease-out",
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      />
    </motion.div>
  );
};

export default CosmosBackground;
