import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, scroller } from "react-scroll";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
  LayoutGroup,
} from "framer-motion";
import ThemeToggle from "../../../theme/ThemeToggle";

const links = [
  { id: 1, link: "Home" },
  { id: 2, link: "About" },
  { id: 3, link: "Experience" },
  { id: 4, link: "Projects" },
  { id: 5, link: "Technologies" },
  { id: 6, link: "Contact" },
];

// Sections become "stations" along the progress bar. The avatar rides
// the bar like a train — visited stations fill in, upcoming stations
// stay outlined. Education sits between Tech and Contact on the page.
const STATION_IDS = [
  "Home",
  "About",
  "Experience",
  "Projects",
  "Technologies",
  "Education",
  "Contact",
];

const Navbar = () => {
  const [isShowNav, setIsShowNav] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [hoverLink, setHoverLink] = useState(null);
  const navRef = useRef(null);

  const { scrollYProgress } = useScroll();
  // No spring — drive bar fill + avatar position directly from
  // scrollYProgress so they track the scroll wheel at native frame rate.
  // Spring physics always lag the target, which read as "buffered".
  const scaleX = scrollYProgress;

  // Avatar derived purely from the raw scroll value — zero lag.
  const avatarLeft = useTransform(scrollYProgress, (v) => {
    const clamped = Math.max(0.015, Math.min(0.985, v));
    return `${clamped * 100}%`;
  });
  const avatarScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 1.08]);
  const avatarRotate = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const avatarFilter = useTransform(
    scrollYProgress,
    [0, 1],
    ["saturate(0.95) brightness(0.96)", "saturate(1.2) brightness(1.08)"]
  );
  const ringOpacity = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  // Station positions — each section's scroll-percentage along the bar.
  // Re-measured on resize and once after fonts/images settle.
  const [stations, setStations] = useState([]);
  useEffect(() => {
    const measure = () => {
      const docH =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docH <= 0) return;
      const next = STATION_IDS.map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const top = el.getBoundingClientRect().top + window.scrollY;
        return { id, pct: Math.max(0, Math.min(1, top / docH)) };
      }).filter(Boolean);
      setStations(next);
    };
    measure();
    const t = setTimeout(measure, 800);
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Track raw scroll progress so each station knows if it's been visited.
  const [progress, setProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setProgress(v));

  // Hover state for showing the station name as a "you are here" tooltip
  const [hoveredStation, setHoveredStation] = useState(null);

  const jumpToStation = (id) => {
    scroller.scrollTo(id, {
      smooth: "easeOutQuart",
      duration: 350,
      offset: -80,
    });
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body scroll lock when mobile nav open
  useEffect(() => {
    document.body.style.overflow = isShowNav ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isShowNav]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveLink(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    const nodes = links.map((l) => document.getElementById(l.link)).filter(Boolean);
    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  const indicatorKey = hoverLink || activeLink;

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-ink-950/75 backdrop-blur-xl border-b border-line-subtle/5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]"
            : "bg-transparent"
        }`}
      >
        <nav
          ref={navRef}
          aria-label="Primary"
          className="container-wide flex h-16 md:h-20 items-center justify-between"
        >
          <Link
            to="Home"
            smooth="easeOutQuart"
            duration={350}
            className="group flex items-center gap-2 cursor-pointer"
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-brand text-ink-950 font-display font-bold text-base shadow-glow">
              A
            </span>
            <span className="hidden sm:block font-display font-semibold text-fog-50 tracking-tight">
              Aditya<span className="text-accent-emerald">.</span>
            </span>
          </Link>

          <LayoutGroup>
            <ul
              onMouseLeave={() => setHoverLink(null)}
              className="hidden lg:flex items-center gap-1 font-medium text-sm text-fog-200"
            >
              {links.map(({ id, link }) => {
                const isHL = indicatorKey === link;
                return (
                  <li
                    key={id}
                    onMouseEnter={() => setHoverLink(link)}
                    className="relative"
                  >
                    <Link
                      to={link}
                      smooth="easeOutQuart"
                      spy
                      duration={350}
                      offset={-80}
                      onSetActive={() => setActiveLink(link)}
                      className="relative z-10 inline-block cursor-pointer rounded-md px-4 py-2 transition-colors hover:text-fog-50"
                    >
                      {isHL && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute inset-0 -z-10 rounded-md bg-line-subtle/[0.06] border border-line-subtle/[0.08]"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                      <span
                        className={
                          isHL ? "text-fog-50" : "transition-colors"
                        }
                      >
                        {link}
                      </span>
                      {activeLink === link && (
                        <motion.span
                          layoutId="nav-active-dot"
                          className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-accent-emerald shadow-glow"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </LayoutGroup>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <a
              href="/FullStack_Developer_Aditya_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="sheen font-mono text-xs uppercase tracking-widest px-4 py-2 rounded-md border border-fog-300/15 text-fog-100 hover:border-accent-emerald/60 hover:text-accent-emerald transition-colors"
            >
              Résumé
            </a>
          </div>

          <button
            type="button"
            aria-label={isShowNav ? "Close menu" : "Open menu"}
            aria-expanded={isShowNav}
            onClick={() => setIsShowNav(!isShowNav)}
            className="lg:hidden cursor-pointer p-2 text-fog-100 hover:text-accent-emerald transition-colors z-50 relative"
          >
            {isShowNav ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </nav>

        {/* Scroll progress — a "metro line" with section stations and
            the user's avatar riding the line like a train between them. */}
        <div className="relative w-full">
          {/* Track */}
          <div className="h-px w-full bg-fog-400/10" />
          {/* Gradient fill */}
          <motion.div
            style={{ scaleX, transformOrigin: "0% 50%" }}
            className="absolute inset-x-0 top-0 h-px bg-gradient-brand"
          />

          {/* Stations (clickable section markers) */}
          {stations.map(({ id, pct }, i) => {
            const visited = progress >= pct - 0.005;
            const isLast = i === stations.length - 1;
            const isFirst = i === 0;
            // Skip rendering markers right at the edges so they don't
            // overlap the avatar's start/end clamps.
            if (isFirst || isLast) return null;
            return (
              <div
                key={id}
                style={{ left: `${pct * 100}%` }}
                className="absolute top-0 -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <button
                  type="button"
                  onClick={() => jumpToStation(id)}
                  onMouseEnter={() => setHoveredStation(id)}
                  onMouseLeave={() => setHoveredStation(null)}
                  onFocus={() => setHoveredStation(id)}
                  onBlur={() => setHoveredStation(null)}
                  aria-label={`Jump to ${id}`}
                  className="group/station relative grid place-items-center h-4 w-4 cursor-pointer focus:outline-none"
                >
                  <span
                    className={`block h-1.5 w-1.5 rotate-45 transition-all duration-300 ${
                      visited
                        ? "bg-accent-emerald shadow-glow scale-110"
                        : "bg-ink-700 border border-fog-400/40"
                    } group-hover/station:scale-150 group-focus-visible/station:scale-150`}
                  />
                  {/* Tooltip — section name appearing on hover */}
                  <AnimatePresence>
                    {hoveredStation === id && (
                      <motion.span
                        initial={{ opacity: 0, y: 4, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.9 }}
                        transition={{ duration: 0.18 }}
                        className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 mt-1 px-2 py-1 rounded-md glass border border-accent-emerald/30 shadow-glow whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-fog-100"
                      >
                        {id}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            );
          })}

          {/* The riding avatar (the "train") */}
          <motion.div
            aria-hidden="true"
            style={{
              left: avatarLeft,
              x: "-50%",
              scale: avatarScale,
              rotate: avatarRotate,
            }}
            className="absolute top-0 -translate-y-1/2 z-20 pointer-events-none"
          >
            <motion.span
              style={{ opacity: ringOpacity }}
              className="absolute -inset-1.5 rounded-full bg-gradient-brand blur-md"
            />
            <motion.div
              style={{ filter: avatarFilter }}
              className="relative h-6 w-6 rounded-full overflow-hidden border border-accent-emerald/70 bg-ink-900 shadow-glow"
            >
              <img
                src="/images/profile.webp"
                alt=""
                className="h-full w-full object-cover"
                draggable="false"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isShowNav && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden bg-ink-950/95 backdrop-blur-xl"
          >
            <ul className="flex flex-col items-center justify-center h-full gap-6">
              {links.map(({ id, link }, i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1, duration: 0.4 }}
                >
                  <Link
                    onClick={() => setIsShowNav(false)}
                    to={link}
                    smooth="easeOutQuart"
                    duration={350}
                    offset={-80}
                    className="font-display text-3xl font-semibold text-fog-50 cursor-pointer hover:text-accent-emerald transition-colors"
                  >
                    {link}
                  </Link>
                </motion.li>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * links.length + 0.1, duration: 0.4 }}
                href="/FullStack_Developer_Aditya_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="mt-4 px-6 py-3 rounded-md bg-gradient-brand text-ink-950 font-semibold"
              >
                Download résumé
              </motion.a>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * links.length + 0.18, duration: 0.4 }}
                className="mt-2"
              >
                <ThemeToggle />
              </motion.div>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
