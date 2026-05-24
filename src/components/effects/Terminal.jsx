import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/**
 * A terminal-styled widget that types out a series of lines, character by
 * character, when scrolled into view. Each line has a `delay`, `text`, and
 * optional `prefix`/`color`/`pause`. Pauses naturally to feel realistic.
 */
const Terminal = ({
  lines = [],
  className = "",
  title = "system",
  charDelay = 18,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();

  const [shown, setShown] = useState([]);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setShown(lines.map((l) => ({ ...l, typed: l.text })));
      return;
    }

    let cancelled = false;
    let lineIdx = 0;
    let charIdx = 0;
    setShown([]);

    const tick = async () => {
      while (!cancelled && lineIdx < lines.length) {
        const line = lines[lineIdx];
        if (line.delay && charIdx === 0) {
          await new Promise((r) => setTimeout(r, line.delay));
          if (cancelled) return;
        }
        while (!cancelled && charIdx < line.text.length) {
          charIdx++;
          const typed = line.text.slice(0, charIdx);
          setShown((prev) => {
            const next = [...prev];
            next[lineIdx] = { ...line, typed };
            return next;
          });
          await new Promise((r) => setTimeout(r, charDelay));
        }
        if (cancelled) return;
        if (line.pause) {
          await new Promise((r) => setTimeout(r, line.pause));
          if (cancelled) return;
        }
        lineIdx++;
        charIdx = 0;
      }
    };

    tick();
    return () => {
      cancelled = true;
    };
  }, [inView, lines, charDelay, reduce]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`card-surface overflow-hidden font-mono text-xs ${className}`}
    >
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5 bg-ink-900/70">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27C840]" />
        <span className="ml-2 text-fog-400 tracking-widest text-[10px] uppercase">
          {title}
        </span>
        <span className="ml-auto text-fog-500 text-[10px] uppercase tracking-widest">
          zsh
        </span>
      </div>
      <div className="px-4 py-3 leading-relaxed">
        {shown.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap break-words">
            {line.prefix && (
              <span className="text-accent-emerald mr-2">{line.prefix}</span>
            )}
            <span className={line.color || "text-fog-100"}>
              {line.typed ?? ""}
              {i === shown.length - 1 && shown[i].typed !== line.text && (
                <span className="inline-block h-3 w-1.5 ml-0.5 bg-accent-emerald translate-y-0.5 animate-pulse" />
              )}
            </span>
          </div>
        ))}
        {shown.length === lines.length &&
          shown[shown.length - 1]?.typed === lines[lines.length - 1].text && (
            <div className="whitespace-pre-wrap">
              <span className="text-accent-emerald mr-2">$</span>
              <span className="inline-block h-3 w-1.5 bg-accent-emerald translate-y-0.5 animate-pulse" />
            </div>
          )}
      </div>
    </motion.div>
  );
};

export default Terminal;
