import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiExternalLink, FiGithub } from "react-icons/fi";

export function ModalInfo({ SelectedProject, closeModal }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeModal();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [closeModal]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        <div
          className="absolute inset-0 bg-ink-950/80 backdrop-blur-md"
          onClick={closeModal}
        />

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-line-subtle/10 bg-ink-900/95 shadow-card-hover"
        >
          <div className="relative aspect-[16/9] overflow-hidden bg-ink-800">
            <img
              src={SelectedProject.src}
              alt={`Screenshot of ${SelectedProject.title}`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
          </div>

          <button
            type="button"
            onClick={closeModal}
            aria-label="Close project details"
            className="absolute top-4 right-4 inline-grid h-10 w-10 place-items-center rounded-full bg-ink-950/70 border border-line-subtle/10 text-fog-100 hover:text-accent-emerald hover:border-accent-emerald/50 backdrop-blur-sm transition-colors"
          >
            <FiX size={18} />
          </button>

          <div className="p-6 sm:p-8 -mt-8 relative">
            <div className="flex flex-wrap items-baseline gap-3 mb-2">
              <h3
                id="project-modal-title"
                className="font-display text-2xl sm:text-3xl font-bold text-fog-50"
              >
                {SelectedProject.title}
              </h3>
              {SelectedProject.year && (
                <span className="font-mono text-xs uppercase tracking-widest text-fog-400">
                  {SelectedProject.year}
                </span>
              )}
            </div>
            {SelectedProject.tagline && (
              <p className="text-accent-emerald font-medium text-base sm:text-lg">
                {SelectedProject.tagline}
              </p>
            )}

            <div className="grid sm:grid-cols-2 gap-6 mt-8">
              {SelectedProject.role && (
                <Field label="Role">{SelectedProject.role}</Field>
              )}
              {SelectedProject.stack && (
                <Field label="Stack">
                  <div className="flex flex-wrap gap-1.5">
                    {SelectedProject.stack.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-ink-700/60 border border-line-subtle/5 text-fog-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </Field>
              )}
              {SelectedProject.problem && (
                <Field label="The problem" wide>
                  {SelectedProject.problem}
                </Field>
              )}
              {SelectedProject.outcome && (
                <Field label="Outcome" wide>
                  {SelectedProject.outcome}
                </Field>
              )}
              {!SelectedProject.problem && (
                <Field label="About" wide>
                  {SelectedProject.description}
                </Field>
              )}
            </div>

            <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-line-subtle/5">
              {SelectedProject.demo && (
                <a
                  href={SelectedProject.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-brand text-ink-950 font-semibold text-sm hover:shadow-glow transition-shadow"
                >
                  <FiExternalLink size={16} /> Live demo
                </a>
              )}
              {SelectedProject.code && (
                <a
                  href={SelectedProject.code}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-line-subtle/15 text-fog-100 font-semibold text-sm hover:border-accent-emerald hover:text-accent-emerald transition-colors"
                >
                  <FiGithub size={16} /> Source code
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

const Field = ({ label, children, wide }) => (
  <div className={wide ? "sm:col-span-2" : ""}>
    <div className="font-mono text-[11px] uppercase tracking-widest text-fog-400 mb-2">
      {label}
    </div>
    <div className="text-fog-100 text-sm sm:text-base leading-relaxed">
      {children}
    </div>
  </div>
);
