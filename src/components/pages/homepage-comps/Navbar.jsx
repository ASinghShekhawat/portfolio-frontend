import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-scroll";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

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

  // Lock body scroll when mobile nav open
  useEffect(() => {
    document.body.style.overflow = isShowNav ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isShowNav]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-ink-950/75 backdrop-blur-xl border-b border-white/5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]"
            : "bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="container-wide flex h-16 md:h-20 items-center justify-between"
        >
          <Link
            to="Home"
            smooth
            duration={500}
            className="group flex items-center gap-2 cursor-pointer"
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-brand text-ink-950 font-display font-bold text-base shadow-glow">
              A
            </span>
            <span className="hidden sm:block font-display font-semibold text-fog-50 tracking-tight">
              Aditya<span className="text-accent-emerald">.</span>
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-1 font-medium text-sm text-fog-200">
            {links.map(({ id, link }) => (
              <li key={id}>
                <Link
                  to={link}
                  smooth
                  spy
                  duration={500}
                  offset={-80}
                  activeClass="!text-fog-50 !bg-white/5"
                  className="cursor-pointer rounded-md px-4 py-2 transition-colors hover:text-fog-50 hover:bg-white/5"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="/FullStack_Developer_Aditya_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs uppercase tracking-widest px-4 py-2 rounded-md border border-white/10 text-fog-100 hover:border-accent-emerald/60 hover:text-accent-emerald transition-colors"
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
                    smooth
                    duration={500}
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
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
