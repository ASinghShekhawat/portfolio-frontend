import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/**
 * "Aditya" rendered in a script font with a left-to-right wipe reveal,
 * styled with the brand gradient. Looks like a signature being written.
 */
const Signature = ({ className = "", text = "Aditya" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  return (
    <div
      ref={ref}
      className={`relative inline-block leading-none ${className}`}
      aria-label={`${text} signature`}
    >
      {/* Faint underline trail */}
      <motion.span
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          duration: reduce ? 0.001 : 1.6,
          delay: 0.3,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ transformOrigin: "0% 50%" }}
        className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-brand opacity-50"
      />

      {/* The script text, revealed by a clip-path wipe.
          Negative right/top/bottom inset on the end state preserves
          italic overhang (Caveat's tail flourish on the final glyph). */}
      <motion.span
        initial={{ clipPath: "inset(-20% 100% -20% 0)" }}
        animate={
          inView
            ? { clipPath: "inset(-20% -20% -20% 0)" }
            : { clipPath: "inset(-20% 100% -20% 0)" }
        }
        transition={{
          duration: reduce ? 0.001 : 1.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="block text-gradient italic"
        style={{
          fontFamily: '"Caveat", "Brush Script MT", cursive',
          fontWeight: 700,
          fontSize: "2.25rem",
          paddingRight: "0.2em",
        }}
      >
        {text}
      </motion.span>
    </div>
  );
};

export default Signature;
