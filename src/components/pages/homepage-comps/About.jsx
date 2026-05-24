import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import Reveal from "../../motion/Reveal";
import Stagger, { StaggerItem } from "../../motion/Stagger";
import AnimatedCounter from "../../effects/AnimatedCounter";
import SectionLabel from "../../effects/SectionLabel";
import Spotlight from "../../effects/Spotlight";
import SplitHeading from "../../effects/SplitHeading";

const stats = [
  {
    label: "Years building",
    to: 3,
    suffix: "+",
  },
  {
    label: "Ops / day at 99.9%",
    to: 10000,
    format: (v) => Math.round(v).toLocaleString(),
    suffix: "+",
  },
  {
    label: "Rate-limiter RPS",
    to: 50000,
    format: (v) => `${Math.round(v / 1000)}K`,
  },
  {
    label: "MTTR reduced",
    to: 35,
    suffix: "%",
  },
];

const facts = [
  { k: "Based in", v: "Remote, India" },
  { k: "Current role", v: "SDE I, Backend @ BrowserStack" },
  { k: "Education", v: "B.Tech CS, MBM University (8.5 CGPA)" },
  { k: "Focus", v: "Backend · LLM systems · Cloud" },
];

const About = () => {
  return (
    <section
      name="About"
      id="About"
      className="relative w-full py-24 md:py-32"
    >
      <div className="container-wide">
        <Reveal>
          <SectionLabel index={1}>About me</SectionLabel>
        </Reveal>
        <SplitHeading
          as="h2"
          className="section-heading mt-3"
          highlight="cloud-native"
        >
          Backend engineer, cloud-native by default.
        </SplitHeading>

        <div className="grid lg:grid-cols-12 gap-10 mt-12 items-start">
          <div className="lg:col-span-7 space-y-5 text-fog-200 text-base sm:text-lg leading-relaxed">
            <Reveal delay={0.1}>
              <p>
                I&rsquo;m a backend software engineer with 3+ years of
                experience owning and shipping cloud-native, high-throughput
                data services from design to production. Right now I&rsquo;m
                at <span className="text-accent-emerald font-medium">BrowserStack</span>,
                building multi-agent LLM pipelines and async queue systems
                that process <span className="text-fog-50 font-medium">10,000+ operations/day</span>
                {" "}at <span className="text-fog-50 font-medium">99.9% reliability</span>.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p>
                Deep expertise in Java, Node.js, and Python — hands-on with
                AWS, Kubernetes, Kafka, and the full SDLC. I care about
                system design, observability, and writing software that
                actually scales when traffic shows up.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <p>
                Outside of work I&rsquo;m usually digging into{" "}
                <span className="text-fog-50 font-medium">RAG pipelines</span>,
                {" "}<span className="text-fog-50 font-medium">distributed primitives</span>,
                and the design patterns behind systems I admire.
              </p>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="pt-2">
                <Link
                  to="/about-me"
                  className="group inline-flex items-center gap-1 font-mono text-sm uppercase tracking-widest text-accent-emerald hover:text-fog-50 transition-colors"
                >
                  Read the longer version
                  <MdOutlineKeyboardArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <Stagger className="grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <StaggerItem key={s.label}>
                  <Spotlight className="rounded-2xl h-full">
                    <div className="card-surface sheen p-5 h-full transition-colors hover:border-accent-emerald/30">
                      <div className="font-display text-3xl sm:text-4xl font-bold text-gradient leading-none">
                        <AnimatedCounter
                          to={s.to}
                          suffix={s.suffix}
                          format={s.format}
                          duration={2}
                        />
                      </div>
                      <div className="mt-2 font-mono text-[11px] uppercase tracking-widest text-fog-300">
                        {s.label}
                      </div>
                    </div>
                  </Spotlight>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.2}>
              <Spotlight className="rounded-2xl">
                <dl className="card-surface p-5 divide-y divide-line-subtle/5">
                  {facts.map(({ k, v }) => (
                    <div
                      key={k}
                      className="flex justify-between items-center py-2.5 first:pt-0 last:pb-0 text-sm gap-4"
                    >
                      <dt className="font-mono text-[11px] uppercase tracking-widest text-fog-400 flex-shrink-0">
                        {k}
                      </dt>
                      <dd className="text-fog-100 font-medium text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Spotlight>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
