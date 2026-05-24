import { useRef, useCallback } from "react";

/**
 * Cursor-follow radial-gradient spotlight overlay. Wrap any element to add
 * a pointer-tracked highlight. Uses CSS custom properties; cheap and smooth.
 *
 *   <Spotlight className="rounded-2xl"> ...card... </Spotlight>
 *
 * The wrapped child should be positioned (relative/absolute) so the
 * absolutely-positioned overlay paints over it.
 */
const Spotlight = ({
  children,
  className = "",
  size = 320,
  color = "rgba(13, 252, 75, 0.18)",
  borderColor = "rgba(13, 252, 75, 0.45)",
  as: Component = "div",
}) => {
  const ref = useRef(null);

  const onMove = useCallback((e) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    node.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  const onLeave = useCallback(() => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--mx", `-9999px`);
    node.style.setProperty("--my", `-9999px`);
  }, []);

  return (
    <Component
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group/spotlight relative ${className}`}
      style={{
        "--mx": "-9999px",
        "--my": "-9999px",
        "--spot-size": `${size}px`,
        "--spot-color": color,
        "--spot-border": borderColor,
      }}
    >
      {/* Border highlight that follows the cursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spotlight:opacity-100"
        style={{
          background:
            "radial-gradient(var(--spot-size) circle at var(--mx) var(--my), var(--spot-border), transparent 60%)",
          maskImage:
            "linear-gradient(#000, #000), linear-gradient(#000, #000)",
          WebkitMaskImage:
            "linear-gradient(#000, #000), linear-gradient(#000, #000)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />
      {/* Inner glow that fills the surface */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spotlight:opacity-100"
        style={{
          background:
            "radial-gradient(var(--spot-size) circle at var(--mx) var(--my), var(--spot-color), transparent 70%)",
        }}
      />
      {children}
    </Component>
  );
};

export default Spotlight;
