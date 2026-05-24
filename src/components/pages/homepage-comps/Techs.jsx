import { FiCode, FiServer, FiDatabase, FiCloud, FiShare2, FiCpu, FiActivity, FiCheckSquare, FiGlobe } from "react-icons/fi";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import javascript from "../../../assets/javascript.png";
import react from "../../../assets/react.png";
import node from "../../../assets/node.png";
import postgres from "../../../assets/postgres.png";
import java from "../../../assets/java.png";
import spring from "../../../assets/spring.png";
import mysql from "../../../assets/mysql.png";
import docker from "../../../assets/docker.png";
import kubernetes from "../../../assets/kubernetes.png";
import jenkins from "../../../assets/jenkins.png";

import Reveal from "../../motion/Reveal";
import Stagger, { StaggerItem } from "../../motion/Stagger";
import SectionLabel from "../../effects/SectionLabel";
import Spotlight from "../../effects/Spotlight";
import SplitHeading from "../../effects/SplitHeading";

const iconMap = {
  Java: java,
  JavaScript: javascript,
  "Spring Boot": spring,
  "Node.js": node,
  React: react,
  PostgreSQL: postgres,
  MySQL: mysql,
  Docker: docker,
  Kubernetes: kubernetes,
  Jenkins: jenkins,
};

const coreStack = [
  { name: "Java · Spring Boot", level: 95, years: 3 },
  { name: "Node.js · NestJS", level: 92, years: 2 },
  { name: "Kubernetes · Docker", level: 85, years: 2 },
  { name: "PostgreSQL · Redis", level: 88, years: 3 },
  { name: "Kafka · BullMQ", level: 82, years: 2 },
  { name: "OpenAI · LangChain · RAG", level: 90, years: 1.5 },
];

const groups = [
  {
    title: "Languages",
    icon: FiCode,
    items: ["Java", "Python", "JavaScript", "TypeScript", "SQL", "C++"],
  },
  {
    title: "Backend",
    icon: FiServer,
    items: [
      "Spring Boot",
      "Spring Security",
      "WebFlux",
      "Node.js",
      "Express",
      "NestJS",
      "REST",
      "GraphQL",
    ],
  },
  {
    title: "Databases",
    icon: FiDatabase,
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "DynamoDB",
      "FAISS (vector)",
    ],
  },
  {
    title: "Cloud & Infra",
    icon: FiCloud,
    items: [
      "AWS · S3 · SQS · Lambda · CloudWatch · IAM",
      "Docker",
      "Kubernetes · Helm · k9s",
      "Azure",
      "GCP",
    ],
  },
  {
    title: "Messaging",
    icon: FiShare2,
    items: ["Kafka", "RabbitMQ", "BullMQ", "DLQ", "Backpressure"],
  },
  {
    title: "AI / LLM",
    icon: FiCpu,
    items: [
      "OpenAI",
      "Anthropic",
      "LangChain",
      "RAG pipelines",
      "Embeddings",
      "Agentic orchestration",
    ],
  },
  {
    title: "Observability",
    icon: FiActivity,
    items: ["Prometheus", "Grafana", "OpenTelemetry", "CloudWatch"],
  },
  {
    title: "Testing & CI/CD",
    icon: FiCheckSquare,
    items: ["TDD", "JUnit", "Mockito", "Jest", "Jenkins", "GitHub Actions"],
  },
  {
    title: "Networking",
    icon: FiGlobe,
    items: ["HTTP/S", "TCP/IP", "UDP", "DNS", "WebSockets"],
  },
];

const SkillBar = ({ name, level, years, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-baseline">
        <span className="text-sm text-fog-100 font-medium">{name}</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-fog-400">
          {years}y · {level}%
        </span>
      </div>
      <div className="relative h-1.5 rounded-full bg-ink-700/70 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-y-0 left-0 bg-gradient-brand rounded-full shadow-glow"
        />
      </div>
    </div>
  );
};

const Techs = () => {
  return (
    <section
      name="Technologies"
      id="Technologies"
      className="relative w-full py-24 md:py-32"
    >
      <div className="container-wide">
        <Reveal>
          <SectionLabel index={4}>Toolbox</SectionLabel>
        </Reveal>
        <SplitHeading
          as="h2"
          className="section-heading mt-3"
          highlight="with"
        >
          Technologies I work with
        </SplitHeading>
        <Reveal delay={0.1}>
          <p className="mt-3 max-w-xl text-fog-300">
            Picked for the job, not for the resume.
          </p>
        </Reveal>

        {/* Core stack mastery bars */}
        <Reveal delay={0.15}>
          <Spotlight className="rounded-2xl mt-10">
            <div className="card-surface sheen p-6 sm:p-8">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                <h3 className="font-display font-semibold text-fog-50">
                  Core stack
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-widest text-fog-400">
                  Day-to-day · production-grade
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
                {coreStack.map((s, i) => (
                  <SkillBar key={s.name} {...s} delay={i * 0.1} />
                ))}
              </div>
            </div>
          </Spotlight>
        </Reveal>

        <Stagger
          stagger={0.06}
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {groups.map(({ title, icon: Icon, items }) => (
            <StaggerItem key={title} className="h-full">
              <Spotlight className="rounded-2xl h-full">
                <div className="card-surface sheen p-6 hover:border-accent-emerald/30 hover:shadow-card-hover transition-all duration-500 h-full">
                  <div className="flex items-center gap-3">
                    <span className="inline-grid h-9 w-9 place-items-center rounded-lg bg-gradient-brand-soft border border-accent-emerald/30 text-accent-emerald">
                      <Icon size={16} />
                    </span>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-fog-200">
                      {title}
                    </h3>
                  </div>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {items.map((item) => {
                      const key = item.split(" ·")[0];
                      const icon = iconMap[key];
                      return (
                        <li
                          key={item}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ink-700/50 border border-line-subtle/5 text-fog-100 text-xs hover:border-accent-emerald/30 hover:bg-ink-700/80 transition-colors"
                        >
                          {icon && (
                            <img
                              src={icon}
                              alt=""
                              aria-hidden="true"
                              loading="lazy"
                              className="h-3.5 w-3.5 object-contain"
                            />
                          )}
                          <span>{item}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Spotlight>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default Techs;
