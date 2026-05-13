import { FiCode, FiServer, FiDatabase, FiCloud, FiShare2, FiCpu, FiActivity, FiCheckSquare, FiGlobe } from "react-icons/fi";

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

const Techs = () => {
  return (
    <section
      name="Technologies"
      id="Technologies"
      className="relative w-full py-24 md:py-32"
    >
      <div className="container-wide">
        <Reveal>
          <p className="section-eyebrow">Toolbox</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="section-heading mt-3">
            Technologies I <span className="text-gradient">work with</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-3 max-w-xl text-fog-300">
            Picked for the job, not for the resume.
          </p>
        </Reveal>

        <Stagger
          stagger={0.06}
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {groups.map(({ title, icon: Icon, items }) => (
            <StaggerItem
              key={title}
              className="card-surface p-6 hover:border-accent-emerald/30 hover:shadow-card-hover transition-all duration-500"
            >
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
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ink-700/50 border border-white/5 text-fog-100 text-xs"
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
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default Techs;
