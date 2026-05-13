import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FiArrowUp } from "react-icons/fi";
import { Link } from "react-scroll";

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
      <div className="container-wide py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-gradient-brand text-ink-950 font-display font-bold text-sm">
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
              smooth
              duration={500}
              aria-label="Back to top"
              className="ml-2 inline-grid h-10 w-10 place-items-center rounded-lg bg-gradient-brand text-ink-950 cursor-pointer hover:shadow-glow transition-shadow"
            >
              <FiArrowUp />
            </Link>
          </li>
        </ul>
      </div>
      <div className="container-wide pb-8 flex flex-wrap items-center justify-between gap-2 text-xs text-fog-400">
        <span>© {year} Aditya Shekhawat. All rights reserved.</span>
        <span className="font-mono">Designed &amp; built with care.</span>
      </div>
    </footer>
  );
};

export default GeneralFooter;
