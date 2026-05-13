import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";

const links = [
  {
    id: 1,
    label: "LinkedIn",
    icon: <FaLinkedin size={20} />,
    href: "https://www.linkedin.com/in/er-aditya-shekhawat-0b7625200/",
  },
  {
    id: 2,
    label: "GitHub",
    icon: <FaGithub size={20} />,
    href: "https://github.com/ASinghShekhawat",
  },
  {
    id: 3,
    label: "Email",
    icon: <HiOutlineMail size={22} />,
    href: "mailto:adityashekhawat1706@gmail.com",
  },
  {
    id: 4,
    label: "Résumé",
    icon: <BsFillPersonLinesFill size={20} />,
    href: "/FullStack_Developer_Aditya_Resume.pdf",
    download: true,
  },
];

const SocialLinks = () => {
  return (
    <nav
      aria-label="Social links"
      className="hidden desktop:flex flex-col fixed top-1/3 left-0 z-30"
    >
      <ul className="flex flex-col gap-1.5 p-2 rounded-r-xl bg-ink-900/70 border border-l-0 border-white/10 backdrop-blur-md shadow-card">
        {links.map(({ id, label, icon, href, download }) => (
          <li key={id}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              download={download}
              className="group flex items-center gap-3 rounded-lg px-3 py-2 text-fog-200 hover:text-accent-emerald hover:bg-white/5 transition-colors"
            >
              <span className="grid h-9 w-9 place-items-center rounded-md bg-ink-800/80 border border-white/5 group-hover:border-accent-emerald/40 transition-colors">
                {icon}
              </span>
              <span className="font-mono text-xs uppercase tracking-widest opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all w-0 group-hover:w-auto overflow-hidden">
                {label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SocialLinks;
