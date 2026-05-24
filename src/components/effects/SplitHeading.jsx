import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Scroll-linked character reveal heading. As the element enters the viewport
 * each character independently animates opacity + y + slight rotation,
 * tied to scroll progress. The effect is unlike most "in-view" reveals
 * because it actually tracks scroll, so partial scrolls show partial reveals.
 *
 *   <SplitHeading as="h2">Where I've worked</SplitHeading>
 */
const SplitHeading = ({
  as: Component = "h2",
  children,
  className = "",
  stagger = 0.6,
  highlight,
}) => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });

  // Force a number type for children
  const text = typeof children === "string" ? children : "";
  const segments = text.split(" ");

  const M = motion[Component] || motion.h2;

  if (reduce || !text) {
    return (
      <Component className={className}>
        {children}
      </Component>
    );
  }

  let globalIdx = 0;
  const total = text.replace(/\s/g, "").length;

  return (
    <M ref={ref} className={className}>
      {segments.map((word, wi) => {
        const isHighlight =
          highlight && word.replace(/[^a-zA-Z]/g, "") === highlight;
        return (
          <span
            key={wi}
            className={`inline-block whitespace-nowrap mr-[0.25em] ${
              isHighlight ? "text-gradient" : ""
            }`}
          >
            {word.split("").map((ch, ci) => {
              const local = globalIdx;
              globalIdx += 1;
              const startAt = (local / total) * (1 - stagger);
              const endAt = startAt + stagger;
              return (
                <Letter
                  key={ci}
                  ch={ch}
                  progress={scrollYProgress}
                  startAt={startAt}
                  endAt={endAt}
                />
              );
            })}
          </span>
        );
      })}
    </M>
  );
};

const Letter = ({ ch, progress, startAt, endAt }) => {
  const opacity = useTransform(progress, [startAt, endAt], [0, 1]);
  const y = useTransform(progress, [startAt, endAt], [22, 0]);
  const rotate = useTransform(progress, [startAt, endAt], [8, 0]);
  return (
    <motion.span
      style={{ opacity, y, rotate, display: "inline-block" }}
    >
      {ch}
    </motion.span>
  );
};

export default SplitHeading;
