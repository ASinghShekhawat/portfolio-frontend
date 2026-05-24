import { motion, useReducedMotion } from "framer-motion";

/**
 * Numbered eyebrow heading: "01 ─ About me" with the rule animating in
 * from zero width as it enters the viewport.
 */
const SectionLabel = ({ index, children, className = "" }) => {
  const reduce = useReducedMotion();
  const n = String(index).padStart(2, "0");

  return (
    <div
      className={`inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent-emerald ${className}`}
    >
      <span className="text-accent-emerald/70 tabular-nums">{n}</span>
      <motion.span
        aria-hidden="true"
        initial={{ width: 0 }}
        whileInView={{ width: reduce ? 32 : 48 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="block h-px bg-accent-emerald/70"
      />
      <span>{children}</span>
    </div>
  );
};

export default SectionLabel;
