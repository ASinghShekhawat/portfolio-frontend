import javascript from "../../../assets/javascript.png";
import react from "../../../assets/react.png";
import git from "../../../assets/git.png";
import node from "../../../assets/node.png";
import postgres from "../../../assets/postgres.png";
import java from "../../../assets/java.png";
import spring from "../../../assets/spring.png";
import mysql from "../../../assets/mysql.png";
import docker from "../../../assets/docker.png";
import kubernetes from "../../../assets/kubernetes.png";
import jenkins from "../../../assets/jenkins.png";
import ai from "../../../assets/ai.png";

import { Link as ScrollLink } from "react-scroll";

const Techs = () => {
  const techs = [
  // 🧠 Core Languages
  {
    id: 1,
    src: java,
    title: "Java",
    style: "shadow-blue-400", // official Java blue
  },
  {
    id: 2,
    src: javascript,
    title: "JavaScript",
    style: "shadow-yellow-400",
  },

  // 🚀 Backend Frameworks
  {
    id: 3,
    src: spring,
    title: "Spring",
    style: "shadow-green-600",
  },
  {
    id: 4,
    src: node,
    title: "Node JS",
    style: "shadow-green-400",
  },

  // 🛠️ Dev Tools
  {
    id: 5,
    src: git,
    title: "Git",
    style: "shadow-orange-500",
  },

  // 🚀 DevOps / CI-CD
  {
    id: 6,
    src: docker,
    title: "Docker",
    style: "shadow-blue-300",
  },
  {
    id: 7,
    src: kubernetes,
    title: "Kubernetes",
    style: "shadow-blue-500",
  },
  {
    id: 8,
    src: jenkins,
    title: "Jenkins",
    style: "shadow-red-500",
  },

  // 🎨 Frontend
  {
    id: 9,
    src: react,
    title: "React",
    style: "shadow-cyan-400",
  },

  // 🗄️ Databases
  {
    id: 10,
    src: postgres,
    title: "PostgreSQL",
    style: "shadow-blue-400",
  },
  {
    id: 11,
    src: mysql,
    title: "MySQL",
    style: "shadow-blue-400",
  },

  // 🤖 AI / LLMs
  {
    id: 12,
    src: ai,
    title: "AI & LLMs",
    style: "shadow-purple-400",
  },
];


  return (
    <section
      name="Technologies"
      className="relative w-full md:h-screen h-unset"
    >
      <div className="max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full h-full text-white">
        <div>
          <h2 className="text-4xl font-bold inline pb-1 border-b-4 border-primary-color/40 sm:text-5xl">
            Technologies
          </h2>
          <p className="py-6">These are the technologies I&#39;ve worked with</p>
        </div>

        <div className="w-full grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8 text-center py-8 sm:px-0">
          {techs.map(({ id, src, title, style }) => (
            <div
              key={id}
              className={`flex flex-col justify-between shadow-md hover:scale-105 duration-500 py-2 rounded-lg ${style}`}
            >
              <img className="w-20 mx-auto py-2 md:py-4" src={src} alt="" />
              <p className="mt-4 md:mt-2">{title}</p>
            </div>
          ))}
        </div>
      </div>

      <ScrollLink
        to="Education"
        smooth
        duration={500}
        className="absolute bottom-2 -left-full md:left-1/2 md:-translate-x-1/2 cursor-pointer hover:text-primary-color"
      >
        <i className="bx bx-chevron-down text-7xl text-gray-400 animate-bounce font hover:text-primary-color"></i>
      </ScrollLink>
    </section>
  );
};


export default Techs;
