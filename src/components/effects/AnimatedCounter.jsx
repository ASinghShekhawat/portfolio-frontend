import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Animated count-up that triggers when the element enters the viewport.
 * Supports decimals, suffix/prefix, and a custom formatter.
 *
 *   <AnimatedCounter from={0} to={10_000} suffix="+" duration={1.8} />
 */
const AnimatedCounter = ({
  from = 0,
  to,
  duration = 1.6,
  suffix = "",
  prefix = "",
  decimals = 0,
  format,
  className = "",
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(from);

  const mv = useMotionValue(from);
  const spring = useSpring(mv, {
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    mv.set(to);
  }, [inView, to, mv, reduce]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => setValue(v));
    return () => unsub();
  }, [spring]);

  const display = format
    ? format(value)
    : value.toFixed(decimals);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
