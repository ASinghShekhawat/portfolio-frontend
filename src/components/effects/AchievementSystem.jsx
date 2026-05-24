import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiAward } from "react-icons/fi";

/**
 * Lightweight achievement system. Each section the visitor reaches earns
 * them a small XP-style toast in the bottom-right corner. A persistent
 * pill in the bottom-left tallies progress. Visiting every section once
 * unlocks a rare "Portfolio Explorer" achievement.
 *
 * State persists across page reloads via localStorage so coming back
 * doesn't reset progress.
 */

const SECTIONS = [
  { id: "Home",         label: "Met the engineer",     xp: 10, emoji: "👋" },
  { id: "About",        label: "Read the bio",         xp: 15, emoji: "📖" },
  { id: "Experience",   label: "Tracked the journey",  xp: 20, emoji: "💼" },
  { id: "Projects",     label: "Inspected the work",   xp: 25, emoji: "🚀" },
  { id: "Technologies", label: "Surveyed the stack",   xp: 20, emoji: "🛠️" },
  { id: "Education",    label: "Verified credentials", xp: 15, emoji: "🎓" },
  { id: "Contact",      label: "Ready to connect",     xp: 30, emoji: "✉️" },
];

const STORAGE_KEY = "portfolio-achievements";
const TOAST_TTL = 3400;

const AchievementSystem = () => {
  const [visited, setVisited] = useState(() => new Set());
  const [toasts, setToasts] = useState([]);
  const [allComplete, setAllComplete] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (Array.isArray(data?.visited)) {
          setVisited(new Set(data.visited));
        }
        if (data?.allComplete) setAllComplete(true);
      }
    } catch {
      /* storage blocked — fine */
    }
  }, []);

  // Persist whenever visited changes
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ visited: [...visited], allComplete })
      );
    } catch {
      /* storage blocked */
    }
  }, [visited, allComplete]);

  // Watch sections via IntersectionObserver
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const id = e.target.id;
          const section = SECTIONS.find((s) => s.id === id);
          if (!section) continue;
          setVisited((prev) => {
            if (prev.has(id)) return prev;
            const next = new Set(prev);
            next.add(id);
            // Push toast for this newly-visited section
            setToasts((curr) => [
              ...curr,
              { ...section, key: `${id}-${Date.now()}` },
            ]);
            return next;
          });
        }
      },
      { rootMargin: "0px 0px -35% 0px", threshold: 0.35 }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Auto-dismiss toasts
  useEffect(() => {
    if (toasts.length === 0) return;
    const timers = toasts.map((t) =>
      setTimeout(() => {
        setToasts((curr) => curr.filter((x) => x.key !== t.key));
      }, TOAST_TTL)
    );
    return () => timers.forEach(clearTimeout);
  }, [toasts]);

  // Rare "Portfolio Explorer" achievement when all sections are visited
  useEffect(() => {
    if (visited.size === SECTIONS.length && !allComplete) {
      setAllComplete(true);
      setToasts((curr) => [
        ...curr,
        {
          id: "_explorer",
          label: "Portfolio Explorer",
          xp: 50,
          emoji: "🏆",
          rare: true,
          key: `rare-${Date.now()}`,
        },
      ]);
    }
  }, [visited, allComplete]);

  const earnedXP = [...visited].reduce((s, id) => {
    const sec = SECTIONS.find((x) => x.id === id);
    return s + (sec?.xp || 0);
  }, allComplete ? 50 : 0);

  return (
    <>
      {/* Persistent counter — bottom left */}
      <AnimatePresence>
        {visited.size > 0 && (
          <motion.div
            key="ach-counter"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="hidden md:inline-flex fixed bottom-5 left-5 z-40 items-center gap-2 px-3 py-2 rounded-full glass border border-accent-emerald/30 shadow-glow"
          >
            <FiAward className="text-accent-emerald" size={13} />
            <span className="font-mono text-[10px] uppercase tracking-widest text-fog-100">
              {visited.size} / {SECTIONS.length} sections
            </span>
            <span className="font-mono text-[10px] text-fog-400">·</span>
            <span className="font-mono text-[10px] tracking-widest text-fog-100">
              {earnedXP} <span className="text-fog-400">XP</span>
            </span>
            {allComplete && (
              <span className="ml-1 text-sm leading-none">🏆</span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast stack — bottom right */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col-reverse gap-2 pointer-events-none max-w-xs">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.key}
              initial={{ opacity: 0, x: 80, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className={`pointer-events-auto inline-flex items-center gap-3 px-3 py-2.5 rounded-xl card-surface sheen shadow-card-hover ${
                t.rare ? "border-accent-emerald/60 ring-1 ring-accent-emerald/40" : ""
              }`}
              style={{ minWidth: 248 }}
            >
              <span
                className={`grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg text-lg leading-none shadow-glow ${
                  t.rare
                    ? "bg-gradient-brand text-ink-950"
                    : "bg-accent-emerald/10 border border-accent-emerald/30"
                }`}
              >
                {t.emoji}
              </span>
              <div className="min-w-0">
                <div className="font-mono text-[9px] uppercase tracking-widest text-accent-emerald truncate">
                  {t.rare ? "Rare achievement" : "Section unlocked"}
                </div>
                <div className="text-fog-50 text-sm font-medium leading-tight truncate">
                  {t.label}
                </div>
                <div className="font-mono text-[10px] tracking-widest text-fog-300 mt-0.5">
                  +{t.xp} XP
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default AchievementSystem;
