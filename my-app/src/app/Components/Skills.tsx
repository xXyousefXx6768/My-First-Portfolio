import React from "react";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
  FaPhp,
  FaLaravel,
  FaGitAlt,
  FaGithub,
  FaFigma,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTailwindcss,
  SiTypescript,
  SiFirebase,
  SiRedux,
  SiVite,
  SiFramer,
  SiZap,
} from "react-icons/si";

interface Skill {
  name: string;
  icon: JSX.Element;
}

const Skills: React.FC = () => {
  const skills: Skill[] = [
    { name: "React JS", icon: <FaReact className="text-sky-400" /> },
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
    { name: "HTML", icon: <FaHtml5 className="text-orange-500" /> },
    { name: "CSS", icon: <FaCss3Alt className="text-blue-500" /> },
    { name: "Tailwind", icon: <SiTailwindcss className="text-sky-500" /> },
    { name: "Bootstrap", icon: <FaBootstrap className="text-purple-600" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-600" /> },
    { name: "PHP", icon: <FaPhp className="text-indigo-600" /> },
    { name: "Laravel", icon: <FaLaravel className="text-red-600" /> },
    { name: "Git & GitHub", icon: <FaGithub className="text-gray-700" /> },
    { name: "GSAP", icon: <SiZap className="text-green-500" /> },
    { name: "Firebase", icon: <SiFirebase className="text-yellow-500" /> },
    { name: "Redux", icon: <SiRedux className="text-purple-500" /> },
    { name: "Vite", icon: <SiVite className="text-violet-500" /> },
    { name: "Figma", icon: <FaFigma className="text-pink-500" /> },
    { name: "Framer Motion", icon: <SiFramer className="text-fuchsia-600" /> },
  ];

  return (
    <section className="py-16 px-6 text-center">
      <h2 className="text-4xl font-bold mb-10 text-orange-500 dark:text-white">
        My <span className="text-amber-500">Skills</span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 place-items-center">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="group flex flex-col items-center justify-center space-y-2 transition-all duration-300"
          >
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:bg-amber-500">
              <div className="text-4xl transition-all duration-300 group-hover:text-white">
                {skill.icon}
              </div>
            </div>
            <p className="text-sm font-medium text-white dark:text-gray-300 group-hover:text-amber-600 transition-all duration-300">
              {skill.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
