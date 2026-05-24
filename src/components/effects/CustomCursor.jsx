import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Desktop-only custom cursor: an inner dot tracking 1:1 with the pointer and
 * a slightly delayed outer ring. Grows + inverts blend mode over interactive
 * elements. Hides the native cursor only on fine-pointer devices.
 */
const CustomCursor = () => {
  const reduce = useReducedMotion();
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [variant, setVariant] = useState("default");

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const ringX = useSpring(mx, { stiffness: 220, damping: 26, mass: 0.4 });
  const ringY = useSpring(my, { stiffness: 220, damping: 26, mass: 0.4 });

  const lastTarget = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setIsFinePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isFinePointer || reduce) return;
    document.documentElement.classList.add("custom-cursor-active");

    const onMove = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);

      const t = e.target;
      if (t === lastTarget.current) return;
      lastTarget.current = t;

      const interactive = t.closest(
        "a, button, [role='button'], input, textarea, label, [data-cursor='hover']"
      );
      const isText = t.closest("p, h1, h2, h3, h4, h5, h6, li, span, em, strong");

      if (interactive) setVariant("hover");
      else if (isText && t.matches("p, li, em, strong")) setVariant("text");
      else setVariant("default");
    };

    const onDown = () => setVariant("press");
    const onUp = () => setVariant("default");
    const onLeave = () => setVariant("hidden");

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [isFinePointer, reduce, mx, my]);

  if (!isFinePointer || reduce) return null;

  const ringSize =
    variant === "hover" ? 56 : variant === "text" ? 32 : variant === "press" ? 16 : 28;

  const ringOpacity =
    variant === "hidden" ? 0 : variant === "hover" ? 1 : 0.75;

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ x: mx, y: my }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
      >
        <motion.div
          animate={{
            scale: variant === "press" ? 0.6 : 1,
            opacity: variant === "hidden" ? 0 : 1,
          }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="-translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white"
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
      >
        <motion.div
          animate={{
            width: ringSize,
            height: ringSize,
            opacity: ringOpacity,
          }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-emerald/70"
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
