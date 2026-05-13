import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const links = [
  {
    id: 1,
    label: "LinkedIn",
    icon: <FaLinkedin size={18} />,
    href: "https://www.linkedin.com/in/er-aditya-shekhawat-0b7625200/",
  },
  {
    id: 2,
    label: "GitHub",
    icon: <FaGithub size={18} />,
    href: "https://github.com/ASinghShekhawat",
  },
  {
    id: 3,
    label: "Email",
    icon: <HiOutlineMail size={18} />,
    href: "mailto:adityashekhawat1706@gmail.com",
  },
];

const MobileSocialLinks = () => {
  return (
    <ul className="flex desktop:hidden mt-6 gap-2">
      {links.map(({ id, label, icon, href }) => (
        <li key={id}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-ink-800/60 border border-white/10 text-fog-200 text-sm hover:text-accent-emerald hover:border-accent-emerald/50 transition-colors"
          >
            {icon}
            <span className="font-medium">{label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default MobileSocialLinks;
