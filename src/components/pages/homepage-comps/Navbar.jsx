import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-scroll";
import { motion, useScroll, useSpring, AnimatePresence, LayoutGroup } from "framer-motion";
import ThemeToggle from "../../../theme/ThemeToggle";

const links = [
  { id: 1, link: "Home" },
  { id: 2, link: "About" },
  { id: 3, link: "Experience" },
  { id: 4, link: "Projects" },
  { id: 5, link: "Technologies" },
  { id: 6, link: "Contact" },
];

const Navbar = () => {
  const [isShowNav, setIsShowNav] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [hoverLink, setHoverLink] = useState(null);
  const navRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 24,
    mass: 0.3,
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.pageYOffset > 12);
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

        {/* Scroll progress */}
        <motion.div
          style={{ scaleX, transformOrigin: "0% 50%" }}
          className="h-px w-full bg-gradient-brand"
        />
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
