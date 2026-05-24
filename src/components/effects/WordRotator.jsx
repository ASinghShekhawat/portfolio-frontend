import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * Rotates through a list of phrases, swapping with a staggered letter animation.
 *
 *   <WordRotator words={["pipelines", "agents", "systems"]} />
 */
const WordRotator = ({
  words = [],
  interval = 2400,
  className = "",
}) => {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduce || words.length <= 1) return;
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [interval, words.length, reduce]);

  const word = words[idx] ?? "";

  return (
    <span
      className={`inline-block relative align-baseline ${className}`}
      aria-live="polite"
    >
      {/* Reserve width using the longest word so layout doesn't shift */}
      <span aria-hidden="true" className="invisible whitespace-nowrap">
        {words.reduce((a, b) => (b.length > a.length ? b : a), "")}
      </span>
      <span className="absolute inset-0 inline-flex whitespace-nowrap">
        <AnimatePresence mode="wait">
          <motion.span
            key={word}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="inline-flex"
          >
            {word.split("").map((ch, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ y: "0.6em", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-0.6em", opacity: 0 }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
                style={{ whiteSpace: "pre" }}
              >
                {ch}
              </motion.span>
            ))}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
};

export default WordRotator;
