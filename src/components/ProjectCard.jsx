import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { FiExternalLink, FiGithub, FiArrowUpRight } from "react-icons/fi";

const ProjectCard = ({ project, handleModalInfo }) => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 200, damping: 22 });
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 22 });

  const onMove = (e) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  const open = (url) => {
    const w = window.open(url, "_blank");
    if (w) {
      w.opener = null;
      w.rel = "noopener noreferrer";
    }
  };

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduce ? {} : { rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="group card-surface hover:border-accent-emerald/30 hover:shadow-card-hover transition-all duration-500 h-full flex flex-col"
    >
      <button
        type="button"
        onClick={() => handleModalInfo(project)}
        className="block w-full text-left focus:outline-none flex flex-col flex-1"
        aria-label={`View details for ${project.title}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={project.src}
            alt={`Screenshot of the ${project.title} project`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent opacity-90" />
          <div className="absolute top-3 left-3 flex gap-1.5">
            {project.year && (
              <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-ink-950/70 border border-white/10 text-fog-200 backdrop-blur-sm">
                {project.year}
              </span>
            )}
            {project.featured && (
              <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-accent-emerald/15 border border-accent-emerald/30 text-accent-emerald backdrop-blur-sm">
                Featured
              </span>
            )}
          </div>
          <div className="absolute bottom-3 right-3 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-fog-100 opacity-0 group-hover:opacity-100 transition-opacity">
            Case study
            <FiArrowUpRight className="text-accent-emerald" />
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-display text-lg font-semibold text-fog-50 group-hover:text-accent-emerald transition-colors">
            {project.title}
          </h3>
          {project.tagline && (
            <p className="mt-1 text-sm text-fog-300 line-clamp-2 min-h-[2.5rem]">
              {project.tagline}
            </p>
          )}

          {project.stack && (
            <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
              {project.stack.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-ink-700/60 border border-white/5 text-fog-200"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </button>

      <div className="px-5 pb-5 flex items-center gap-2 border-t border-white/5 pt-4">
        {project.demo ? (
          <button
            type="button"
            onClick={() => open(project.demo)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-fog-100 hover:text-accent-emerald transition-colors"
          >
            <FiExternalLink size={15} /> Demo
          </button>
        ) : (
          <span
            className="inline-flex items-center gap-1.5 text-sm font-medium text-fog-500 cursor-not-allowed"
            title="No public demo — internal / closed-source project"
          >
            <FiExternalLink size={15} /> Internal
          </span>
        )}
        <span className="text-fog-500">·</span>
        {project.code ? (
          <button
            type="button"
            onClick={() => open(project.code)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-fog-100 hover:text-accent-emerald transition-colors"
          >
            <FiGithub size={15} /> Code
          </button>
        ) : (
          <span
            className="inline-flex items-center gap-1.5 text-sm font-medium text-fog-500 cursor-not-allowed"
            title="Source not public"
          >
            <FiGithub size={15} /> Private
          </span>
        )}
        <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-fog-400">
          Read more →
        </span>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
