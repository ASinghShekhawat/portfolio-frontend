import { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { ModalInfo } from "../../ModalInfo";
import ProjectCard from "../../ProjectCard";
import projects from "../../../utils/constants";
import Reveal from "../../motion/Reveal";
import Stagger, { StaggerItem } from "../../motion/Stagger";
import SectionLabel from "../../effects/SectionLabel";

const MyProjects = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});

  const handleModalInfo = (project) => {
    setSelectedProject(project);
    setModalIsOpen(true);
  };

  const closeModal = () => setModalIsOpen(false);

  return (
    <section
      name="Projects"
      id="Projects"
      className="relative w-full py-24 md:py-32"
    >
      <div className="container-wide">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <SectionLabel index={3}>Selected work</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="section-heading mt-3">
                Projects I&rsquo;ve{" "}
                <span className="text-gradient">shipped</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-3 max-w-xl text-fog-300">
                A mix of product builds, side experiments, and learning
                exercises. Tap any card for a quick case-study.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <a
              href="https://github.com/ASinghShekhawat"
              target="_blank"
              rel="noreferrer"
              className="group hidden sm:inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-fog-200 hover:text-accent-emerald transition-colors"
            >
              More on GitHub
              <MdOutlineKeyboardArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </Reveal>
        </div>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 auto-rows-fr">
          {projects.map((project) => (
            <StaggerItem key={project.id} className="h-full">
              <ProjectCard
                project={project}
                handleModalInfo={handleModalInfo}
              />
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-10 flex sm:hidden justify-center">
          <a
            href="https://github.com/ASinghShekhawat"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-fog-200 hover:text-accent-emerald transition-colors"
          >
            More on GitHub
            <MdOutlineKeyboardArrowRight size={18} />
          </a>
        </div>
      </div>

      {modalIsOpen && (
        <ModalInfo
          SelectedProject={selectedProject}
          closeModal={closeModal}
        />
      )}
    </section>
  );
};

export default MyProjects;
