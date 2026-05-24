import { motion, useReducedMotion } from "framer-motion";

/**
 * Orbits a set of badges around a central radius. Each badge has its own
 * angle and inverse-counter-rotates to keep its label upright.
 *
 *   <OrbitRing items={["k8s", "ai", "java"]} radius={170} duration={24} />
 */
const OrbitRing = ({
  items = [],
  radius = 160,
  duration = 28,
  reverse = false,
  className = "",
  startAngle = 0,
}) => {
  const reduce = useReducedMotion();
  const count = items.length || 1;
  const dir = reverse ? -1 : 1;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      <motion.div
        className="absolute inset-0"
        animate={reduce ? {} : { rotate: 360 * dir }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {items.map((label, i) => {
          const angle = startAngle + (i * 360) / count;
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;

          return (
            <motion.div
              key={`${label}-${i}`}
              className="absolute left-1/2 top-1/2"
              style={{ x, y }}
              animate={reduce ? {} : { rotate: -360 * dir }}
              transition={{
                duration,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              <div className="-translate-x-1/2 -translate-y-1/2">
                <div className="glass rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-fog-100 border border-accent-emerald/30 shadow-glow whitespace-nowrap">
                  {label}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default OrbitRing;
