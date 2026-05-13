import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { HiOutlineDownload } from "react-icons/hi";
import { Link } from "react-scroll";
import { motion, useReducedMotion } from "framer-motion";
import MobileSocialLinks from "./MobileSocialLinks";
import MagneticButton from "../../motion/MagneticButton";

const marqueeItems = [
  "Java",
  "Spring Boot",
  "Node.js",
  "Python",
  "Kubernetes",
  "Docker",
  "AWS",
  "Kafka",
  "BullMQ",
  "PostgreSQL",
  "Redis",
  "FAISS",
  "LangChain",
  "OpenAI",
  "Prometheus",
  "Grafana",
];

const Home = () => {
  const reduce = useReducedMotion();

  return (
    <section
      name="Home"
      id="Home"
      className="relative w-full min-h-[100svh] flex items-center pt-24 md:pt-0 pb-16 md:pb-0 overflow-hidden"
    >
      <div className="container-wide grid md:grid-cols-[1.15fr_0.85fr] gap-10 md:gap-12 items-center w-full">
        {/* Text */}
        <div className="order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink-800/60 border border-accent-emerald/20 backdrop-blur-sm mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-accent-emerald animate-ping opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-emerald" />
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-fog-100">
              Available for new opportunities
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-fog-50 leading-[1.05]"
          >
            Hi, I&rsquo;m{" "}
            <span className="text-gradient">Aditya Shekhawat</span>
            <span className="block mt-3 text-fog-200 text-2xl sm:text-3xl lg:text-4xl font-medium">
              Backend engineer shipping{" "}
              <span className="text-fog-50 font-semibold">
                cloud-native systems at scale
              </span>
              .
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-base sm:text-lg text-fog-300 leading-relaxed"
          >
            3+ years owning high-throughput data services from design to
            production. I lead multi-agent LLM pipelines and async queue
            systems processing{" "}
            <span className="text-fog-50 font-medium">10,000+ ops/day</span>{" "}
            at{" "}
            <span className="text-fog-50 font-medium">99.9% reliability</span>{" "}
            at{" "}
            <span className="text-accent-emerald font-medium">BrowserStack</span>.
            Deep on Java, Node.js, Python · AWS, Kubernetes, Kafka.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link to="Projects" smooth duration={500} offset={-80}>
              <MagneticButton className="group inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gradient-brand text-ink-950 font-semibold shadow-glow hover:shadow-glow-lg transition-shadow">
                See my work
                <MdOutlineKeyboardArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </MagneticButton>
            </Link>

            <MagneticButton
              as="a"
              strength={0.2}
              href="/FullStack_Developer_Aditya_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-white/15 text-fog-100 font-semibold hover:border-accent-emerald hover:text-accent-emerald transition-colors"
            >
              <HiOutlineDownload size={18} />
              Résumé
            </MagneticButton>
          </motion.div>

          <MobileSocialLinks />
        </div>

        {/* Portrait */}
        <div className="order-1 md:order-2 relative flex justify-center md:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[260px] sm:w-[300px] md:w-[340px] aspect-square"
          >
            {!reduce && (
              <motion.div
                aria-hidden="true"
                className="absolute -inset-3 rounded-full bg-gradient-brand blur-3xl opacity-50"
                animate={{ opacity: [0.4, 0.65, 0.4] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            <div
              aria-hidden="true"
              className="absolute -inset-1 rounded-full bg-gradient-brand opacity-80 animate-spin-slow"
              style={{ maskImage: "linear-gradient(transparent 50%, #000 100%)" }}
            />
            <div className="relative h-full w-full rounded-full overflow-hidden border border-white/10 bg-ink-900 shadow-card">
              <img
                src="/images/profile.webp"
                alt="Portrait of Aditya Shekhawat"
                className="h-full w-full object-cover"
                loading="eager"
                fetchpriority="high"
              />
            </div>

            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="absolute -left-4 sm:-left-10 top-8 glass rounded-xl px-3 py-2 shadow-card"
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-fog-300">
                Currently
              </div>
              <div className="text-sm text-fog-50 font-semibold">
                @ BrowserStack
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="absolute -right-2 sm:-right-8 bottom-10 glass rounded-xl px-3 py-2 shadow-card"
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-fog-300">
                Focus
              </div>
              <div className="text-sm text-fog-50 font-semibold">
                Backend · LLM · Cloud
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Marquee tech strip */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <div className="relative w-full overflow-hidden py-4 border-y border-white/5 bg-ink-950/40 backdrop-blur-sm">
          <div className="flex w-max gap-12 animate-marquee whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems].map((t, i) => (
              <span
                key={i}
                className="font-mono text-sm tracking-widest text-fog-300/70 flex items-center gap-12"
              >
                {t}
                <span className="text-accent-emerald/40">◆</span>
              </span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-950 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Home;
