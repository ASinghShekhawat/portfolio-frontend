import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { scroller } from "react-scroll";

const sections = [
  { id: "Home", label: "Home" },
  { id: "About", label: "About" },
  { id: "Experience", label: "Experience" },
  { id: "Projects", label: "Projects" },
  { id: "Technologies", label: "Toolbox" },
  { id: "Education", label: "Education" },
  { id: "Contact", label: "Contact" },
];

const ScrollRail = () => {
  const [active, setActive] = useState("Home");

  // Smoothed scroll progress for the rail's growing line
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    mass: 0.4,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  const handleClick = (id) => {
    scroller.scrollTo(id, {
      smooth: "easeOutQuart",
      duration: 350,
      offset: -80,
    });
  };

  return (
    <nav
      aria-label="Section progress"
      className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-30"
    >
      <ul className="relative flex flex-col items-end gap-5 py-4">
        {/* Background line */}
        <span
          aria-hidden="true"
          className="absolute right-[7px] top-0 bottom-0 w-px bg-line-subtle/10"
        />
        {/* Progress line */}
        <motion.span
          aria-hidden="true"
          className="absolute right-[7px] top-0 w-px bg-gradient-brand origin-top"
          style={{ scaleY, bottom: 0 }}
        />

        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id} className="relative">
              <button
                type="button"
                onClick={() => handleClick(s.id)}
                aria-label={`Go to ${s.label}`}
                aria-current={isActive ? "true" : undefined}
                className="group flex items-center gap-3 pr-0"
              >
                <span
                  className={`font-mono text-[10px] uppercase tracking-widest transition-all duration-300 ${
                    isActive
                      ? "opacity-100 translate-x-0 text-fog-50"
                      : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-fog-300"
                  }`}
                >
                  {s.label}
                </span>
                <span className="relative grid place-items-center h-4 w-4">
                  {isActive && (
                    <motion.span
                      layoutId="rail-active"
                      className="absolute inset-0 rounded-full bg-accent-emerald/20 border border-accent-emerald shadow-glow"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span
                    className={`relative h-1.5 w-1.5 rounded-full transition-colors ${
                      isActive
                        ? "bg-accent-emerald"
                        : "bg-fog-400 group-hover:bg-fog-100"
                    }`}
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default ScrollRail;
