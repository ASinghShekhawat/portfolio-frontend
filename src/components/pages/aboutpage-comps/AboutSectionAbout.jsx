import { motion } from "framer-motion";
import Reveal from "../../motion/Reveal";

const AboutSectionAbout = () => {
  return (
    <section
      name="About"
      className="relative w-full min-h-screen flex items-center pt-24 pb-16"
    >
      <div className="container-wide grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-center">
        <Reveal direction="right">
          <div className="relative mx-auto w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-card">
            <img
              src="/images/profile_1.webp"
              alt="Portrait of Aditya Shekhawat"
              loading="eager"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
            <motion.div
              aria-hidden="true"
              className="absolute -inset-2 -z-10 rounded-3xl bg-gradient-brand opacity-30 blur-3xl"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </Reveal>

        <div className="space-y-6">
          <Reveal>
            <p className="section-eyebrow">Hi, I&rsquo;m Aditya</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-fog-50 leading-[1.05]">
              Backend engineer, shipping{" "}
              <span className="text-gradient">since 2023</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-fog-300 text-base md:text-lg leading-relaxed">
              I graduated from{" "}
              <span className="text-fog-100 font-medium">
                MBM University, Jodhpur
              </span>{" "}
              in 2023 with a B.Tech in Computer Science (8.5 CGPA). For 3+
              years since, I&rsquo;ve been deep in cloud-native backend
              systems — currently as a{" "}
              <span className="text-accent-emerald font-medium">
                Software Engineer I on the backend team at BrowserStack
              </span>
              , owning multi-agent LLM pipelines and async queue
              infrastructure processing 10,000+ ops/day at 99.9% reliability.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-fog-300 text-base md:text-lg leading-relaxed">
              Before BrowserStack, I spent ~18 months at{" "}
              <span className="text-fog-100 font-medium">Kanerika Software</span>{" "}
              owning end-to-end delivery of an internal data-visualization
              product — Spring Boot APIs over PostgreSQL serving 50+
              concurrent users at p95 &lt;200ms, with React/Redux on the
              frontend and zero-downtime CI/CD on GitHub Actions.
            </p>
          </Reveal>
          <Reveal delay={0.28}>
            <p className="text-fog-300 text-base md:text-lg leading-relaxed">
              I work across <span className="text-fog-100 font-medium">Java</span>,
              {" "}<span className="text-fog-100 font-medium">Node.js</span>, and
              {" "}<span className="text-fog-100 font-medium">Python</span>{" "}
              — comfortable with AWS, Kubernetes, Kafka, Redis, and the rest
              of the modern backend stack. I care about system design,
              observability (Prometheus, Grafana, OpenTelemetry), and
              writing software that holds up when traffic actually shows up.
            </p>
          </Reveal>
          <Reveal delay={0.36}>
            <p className="text-fog-300 text-base md:text-lg leading-relaxed">
              Outside of work I&rsquo;m usually digging into RAG pipelines,
              distributed primitives (token buckets, consensus, replication),
              or breaking down the design patterns behind systems I admire.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionAbout;
