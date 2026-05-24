import { useState } from "react";
import axios from "axios";
import { FiSend, FiMail, FiMapPin, FiGithub, FiLinkedin } from "react-icons/fi";
import Reveal from "../../motion/Reveal";
import SectionLabel from "../../effects/SectionLabel";
import Spotlight from "../../effects/Spotlight";
import SplitHeading from "../../effects/SplitHeading";

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);

  // Pull live theme colors so SweetAlert matches whichever theme is active
  const themeColors = () => {
    const cs = getComputedStyle(document.documentElement);
    const rgb = (name) => `rgb(${cs.getPropertyValue(name).trim()})`;
    return {
      accent: rgb("--c-accent-emerald"),
      bg: rgb("--c-ink-900"),
      fg: rgb("--c-fog-50"),
      backdrop: `rgb(${cs.getPropertyValue("--c-ink-950").trim()} / 0.7)`,
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    const formData = new FormData(event.target);

    try {
      await axios.post("https://getform.io/f/bgdlxrea", formData);
      const { default: Swal } = await import("sweetalert2");
      const c = themeColors();
      await Swal.fire({
        icon: "success",
        iconColor: c.accent,
        title: "Message sent!",
        text: "Thanks for reaching out — I'll get back to you soon.",
        showConfirmButton: true,
        background: c.bg,
        color: c.fg,
        confirmButtonColor: c.accent,
        confirmButtonText: "Cheers",
        backdrop: c.backdrop,
      });
      event.target.reset();
    } catch (error) {
      const { default: Swal } = await import("sweetalert2");
      const c = themeColors();
      await Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Couldn't send your message. Please try email instead.",
        background: c.bg,
        color: c.fg,
        confirmButtonColor: c.accent,
      });
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      name="Contact"
      id="Contact"
      className="relative w-full py-24 md:py-32"
    >
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel index={6}>Get in touch</SectionLabel>
            </Reveal>
            <SplitHeading
              as="h2"
              className="section-heading mt-3"
              highlight="together"
            >
              Let&apos;s build something together.
            </SplitHeading>
            <Reveal delay={0.1}>
              <p className="mt-4 text-fog-300 text-base sm:text-lg leading-relaxed">
                I&rsquo;m always open to interesting conversations — roles,
                collaborations, or just a hello. The fastest reply is via
                email or LinkedIn.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <ul className="mt-8 space-y-3 text-sm">
                <li className="flex items-center gap-3 text-fog-200">
                  <span className="inline-grid h-9 w-9 place-items-center rounded-lg bg-ink-800/80 border border-line-subtle/10 text-accent-emerald">
                    <FiMail />
                  </span>
                  <a
                    href="mailto:adityashekhawat1706@gmail.com"
                    className="hover:text-accent-emerald transition-colors"
                  >
                    adityashekhawat1706@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-3 text-fog-200">
                  <span className="inline-grid h-9 w-9 place-items-center rounded-lg bg-ink-800/80 border border-line-subtle/10 text-accent-emerald">
                    <FiMapPin />
                  </span>
                  <span>Bangalore, India</span>
                </li>
                <li className="flex items-center gap-3 text-fog-200">
                  <span className="inline-grid h-9 w-9 place-items-center rounded-lg bg-ink-800/80 border border-line-subtle/10 text-accent-emerald">
                    <FiLinkedin />
                  </span>
                  <a
                    href="https://www.linkedin.com/in/er-aditya-shekhawat-0b7625200/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-accent-emerald transition-colors"
                  >
                    linkedin.com/in/er-aditya-shekhawat
                  </a>
                </li>
                <li className="flex items-center gap-3 text-fog-200">
                  <span className="inline-grid h-9 w-9 place-items-center rounded-lg bg-ink-800/80 border border-line-subtle/10 text-accent-emerald">
                    <FiGithub />
                  </span>
                  <a
                    href="https://github.com/ASinghShekhawat"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-accent-emerald transition-colors"
                  >
                    github.com/ASinghShekhawat
                  </a>
                </li>
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-7">
            <Spotlight className="rounded-2xl">
            <form
              onSubmit={handleSubmit}
              className="card-surface sheen p-6 sm:p-8 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Your name" htmlFor="contact-name">
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Jane Doe"
                    required
                    className="w-full bg-transparent text-fog-50 placeholder-fog-500 focus:outline-none"
                  />
                </Field>
                <Field label="Your email" htmlFor="contact-email">
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="jane@company.com"
                    required
                    className="w-full bg-transparent text-fog-50 placeholder-fog-500 focus:outline-none"
                  />
                </Field>
              </div>
              <Field label="Subject" htmlFor="contact-subject">
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  placeholder="What's this about?"
                  className="w-full bg-transparent text-fog-50 placeholder-fog-500 focus:outline-none"
                />
              </Field>
              <Field label="Message" htmlFor="contact-message" textarea>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="6"
                  required
                  placeholder="Tell me a bit about what you're working on…"
                  className="w-full bg-transparent text-fog-50 placeholder-fog-500 focus:outline-none resize-none"
                />
              </Field>

              <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
                <p className="text-xs text-fog-400">
                  I usually reply within 48 hours.
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gradient-brand text-ink-950 font-semibold shadow-glow hover:shadow-glow-lg transition-shadow disabled:opacity-60 disabled:cursor-wait"
                >
                  {submitting ? "Sending…" : "Send message"}
                  <FiSend
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </button>
              </div>
            </form>
            </Spotlight>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, htmlFor, textarea, children }) => (
  <label
    htmlFor={htmlFor}
    className={`block rounded-lg border border-line-subtle/10 bg-ink-900/60 px-4 ${
      textarea ? "py-3" : "py-2.5"
    } focus-within:border-accent-emerald/60 transition-colors`}
  >
    <span className="block font-mono text-[10px] uppercase tracking-widest text-fog-400 mb-1">
      {label}
    </span>
    {children}
  </label>
);

export default Contact;
