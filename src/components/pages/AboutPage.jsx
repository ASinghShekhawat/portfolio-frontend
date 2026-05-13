import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import AboutSectionAbout from "./aboutpage-comps/AboutSectionAbout";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-ink-950/80 backdrop-blur-xl border-b border-white/5">
        <nav
          aria-label="Primary"
          className="container-wide flex h-16 md:h-20 items-center justify-between"
        >
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-brand text-ink-950 font-display font-bold text-base shadow-glow">
              A
            </span>
            <span className="hidden sm:block font-display font-semibold text-fog-50 tracking-tight">
              Aditya<span className="text-accent-emerald">.</span>
            </span>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white/10 text-fog-100 text-sm hover:border-accent-emerald/60 hover:text-accent-emerald transition-colors"
          >
            <FiArrowLeft size={16} /> Back home
          </Link>
        </nav>
      </header>

      <AboutSectionAbout />
    </>
  );
};

export default AboutPage;
