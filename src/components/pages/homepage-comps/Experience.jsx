import Reveal from "../../motion/Reveal";
import Stagger, { StaggerItem } from "../../motion/Stagger";
import SectionLabel from "../../effects/SectionLabel";
import Spotlight from "../../effects/Spotlight";

const experiences = [
  {
    role: "Software Engineer I — Backend",
    company: "BrowserStack",
    location: "Remote, India",
    period: "Dec 2024 — Present",
    summary:
      "Owning end-to-end backend systems for an internal test-case-management product powered by multi-agent LLM pipelines.",
    bullets: [
      "Architected a cloud-native async pipeline on BullMQ processing 10,000+ test-case generation operations/day with 99.9% reliability and sub-500ms median latency.",
      "Designed a multi-agent LLM orchestration (planning, feature extraction, scenario generation, deduplication) — cutting manual test authoring time by ~60% and improving scenario accuracy by 40% vs. the single-prompt baseline.",
      "Improved pipeline throughput by 45% via queue redesign, dead-letter handling, and horizontal worker scaling; Prometheus/Grafana dashboards and alerting cut MTTR by 35%.",
      "Led LLM-based feature extraction from PRDs into the TCM system; defined schema contracts, aligned with PM/QA, and shipped with zero production incidents.",
      "Enforced TDD across pipeline modules (Jest unit + integration) on GitHub Actions CI/CD with automated quality gates.",
    ],
    tags: [
      "Node.js",
      "BullMQ",
      "WebSockets",
      "Docker",
      "OpenAI",
      "Anthropic",
      "Prometheus",
      "Grafana",
      "GitHub Actions",
    ],
    current: true,
  },
  {
    role: "Associate Software Engineer",
    company: "Kanerika Software",
    location: "Hyderabad, India",
    period: "Jun 2023 — Dec 2024",
    summary:
      "Owned full SDLC for an internal data-visualization product and led frontend/backend architecture across multiple teams.",
    bullets: [
      "Designed and delivered 'Phi', an internal data-viz product — Spring Boot REST APIs over PostgreSQL serving 50+ concurrent users at <200ms p95 response times.",
      "Drove atomic-design component architecture across React/Redux frontend and backend services, reducing code redundancy by ~30% and cutting new-feature delivery time by 20%.",
      "Built GitHub Actions CI/CD pipelines (build + test + deploy) achieving zero-downtime deployments across staging and production.",
      "Translated ambiguous stakeholder requirements into technical designs with trade-off analyses — reducing re-work by ~25% across 3 product cycles.",
    ],
    tags: [
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "React",
      "Redux",
      "PrimeReact",
      "GitHub Actions",
    ],
    current: false,
  },
];

const Experience = () => {
  return (
    <section
      name="Experience"
      id="Experience"
      className="relative w-full py-24 md:py-32"
    >
      <div className="container-wide">
        <Reveal>
          <SectionLabel index={2}>Where I&rsquo;ve worked</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="section-heading mt-3">
            Experience &amp; <span className="text-gradient">impact</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-2xl text-fog-300 text-base sm:text-lg">
            3+ years shipping production backend systems — from data-viz APIs
            to multi-agent LLM pipelines.
          </p>
        </Reveal>

        <div className="mt-14 relative">
          {/* Vertical line */}
          <div className="absolute left-3 md:left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-accent-emerald/40 via-white/10 to-transparent" />

          <Stagger className="space-y-12 md:space-y-16">
            {experiences.map((exp, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <StaggerItem
                  key={`${exp.company}-${exp.period}`}
                  className={`relative grid md:grid-cols-2 gap-4 md:gap-12 ${
                    isLeft ? "" : "md:[&>:first-child]:order-2"
                  }`}
                >
                  {/* Node */}
                  <div className="absolute left-3 md:left-1/2 top-2 -translate-x-1/2 z-10">
                    <span className="relative grid place-items-center h-4 w-4">
                      {exp.current && (
                        <span className="absolute inset-0 rounded-full bg-accent-emerald animate-ping opacity-50" />
                      )}
                      <span
                        className={`relative h-3 w-3 rounded-full border-2 ${
                          exp.current
                            ? "bg-accent-emerald border-accent-emerald shadow-glow"
                            : "bg-ink-800 border-fog-400"
                        }`}
                      />
                    </span>
                  </div>

                  {/* Card side */}
                  <div
                    className={`pl-10 md:pl-0 ${
                      isLeft ? "md:pr-10 md:text-right" : "md:pl-10"
                    }`}
                  >
                    <Spotlight className="rounded-2xl">
                    <div className="card-surface p-6 hover:border-accent-emerald/30 hover:shadow-card-hover transition-all duration-500">
                      <div className="flex flex-wrap items-baseline gap-2 mb-2">
                        <h3 className="font-display text-xl font-semibold text-fog-50">
                          {exp.role}
                        </h3>
                        {exp.current && (
                          <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-accent-emerald/15 text-accent-emerald border border-accent-emerald/30">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-accent-emerald font-medium">
                        {exp.company}
                        <span className="text-fog-400"> · {exp.location}</span>
                      </p>
                      <p className="mt-4 text-fog-300 text-sm sm:text-base leading-relaxed">
                        {exp.summary}
                      </p>
                      <ul
                        className={`mt-4 space-y-1.5 text-sm text-fog-300 ${
                          isLeft ? "md:text-right" : ""
                        }`}
                      >
                        {exp.bullets.map((b, i) => (
                          <li
                            key={i}
                            className={`flex gap-2 ${
                              isLeft ? "md:flex-row-reverse" : ""
                            }`}
                          >
                            <span className="text-accent-emerald mt-1 flex-shrink-0">
                              ▸
                            </span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      <div
                        className={`mt-5 flex flex-wrap gap-1.5 ${
                          isLeft ? "md:justify-end" : ""
                        }`}
                      >
                        {exp.tags.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-ink-700/60 border border-white/5 text-fog-200"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    </Spotlight>
                  </div>

                  {/* Period side */}
                  <div
                    className={`hidden md:flex items-start pt-2 ${
                      isLeft ? "md:pl-10" : "md:pr-10 md:justify-end md:text-right"
                    }`}
                  >
                    <div className="font-mono text-sm uppercase tracking-widest text-fog-400">
                      {exp.period}
                    </div>
                  </div>

                  {/* Period (mobile) */}
                  <div className="md:hidden pl-10 -mt-2">
                    <div className="font-mono text-xs uppercase tracking-widest text-fog-400">
                      {exp.period}
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
};

export default Experience;
