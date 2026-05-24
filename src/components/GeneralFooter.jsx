import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FiArrowUp } from "react-icons/fi";
import { Link } from "react-scroll";
import Signature from "./effects/Signature";

const socials = [
  {
    href: "https://github.com/ASinghShekhawat",
    icon: <FaGithub />,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/er-aditya-shekhawat-0b7625200/",
    icon: <FaLinkedin />,
    label: "LinkedIn",
  },
  {
    href: "mailto:adityashekhawat1706@gmail.com",
    icon: <HiOutlineMail />,
    label: "Email",
  },
];

const year = new Date().getFullYear();

const GeneralFooter = () => {
  return (
    <footer className="relative mt-24 border-t border-white/5">
      <div className="container-wide pt-14 pb-10">
        {/* Big closing wordmark */}
        <div className="text-center mb-10">
          <p className="font-mono text-[10px] uppercase tracking-widest text-fog-400 mb-2">
            Thanks for scrolling
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-shimmer">
            Let&rsquo;s build.
          </h2>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-gradient-brand text-ink-950 font-display font-bold text-sm shadow-glow">
              A
            </span>
            <div>
              <div className="font-display font-semibold text-fog-50 leading-tight">
                Aditya Shekhawat
              </div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-fog-400">
                Backend engineer · Remote, India
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Signature className="hidden sm:block" />

            <ul className="flex items-center gap-2">
              {socials.map(({ href, icon, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="inline-grid h-10 w-10 place-items-center rounded-lg bg-ink-800/70 border border-white/10 text-fog-200 hover:text-accent-emerald hover:border-accent-emerald/50 transition-colors"
                  >
                    {icon}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="Home"
                  smooth="easeOutQuart"
                  duration={350}
                  aria-label="Back to top"
                  className="ml-2 inline-grid h-10 w-10 place-items-center rounded-lg bg-gradient-brand text-ink-950 cursor-pointer hover:shadow-glow transition-shadow"
                >
                  <FiArrowUp />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs text-fog-400">
          <span>© {year} Aditya Shekhawat. All rights reserved.</span>
          <span className="font-mono">
            Built with React, Tailwind, Framer Motion · Crafted with care.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default GeneralFooter;
