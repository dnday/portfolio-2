import {
  SiCplusplus,
  SiArduino,
  SiGo,
  SiPython,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiPostman,
  SiVercel,
  SiNodedotjs,
  SiMongodb,
  SiNextdotjs,
  SiGit,
} from "react-icons/si";
import { BiLogoGoogleCloud } from "react-icons/bi";
import { FaCertificate } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const skills = [
  { name: "C++", icon: <SiCplusplus size={40} /> },
  { name: "Arduino", icon: <SiArduino size={40} /> },
  { name: "Go", icon: <SiGo size={40} /> },
  { name: "Python", icon: <SiPython size={40} /> },
  { name: "HTML", icon: <SiHtml5 size={40} /> },
  { name: "CSS", icon: <SiCss3 size={40} /> },
  { name: "JavaScript", icon: <SiJavascript size={40} /> },
  { name: "React.js", icon: <SiReact size={40} /> },
  { name: "Next.js", icon: <SiNextdotjs size={40} /> },
  { name: "Node.js", icon: <SiNodedotjs size={40} /> },
  { name: "MongoDB", icon: <SiMongodb size={40} /> },
  { name: "Google Cloud", icon: <BiLogoGoogleCloud size={40} /> },
];

const tools = [
  { name: "Postman", icon: <SiPostman size={40} /> },
  { name: "Vercel", icon: <SiVercel size={40} /> },
  { name: "Git", icon: <SiGit size={40} /> },
];

const certificates = [
  {
    name: "Google Cloud Badges",
    platform: "Credly",
    url: "https://www.credly.com/users/marcelinus-dinoglide-yoga-prakoso.7441e0a5",
  },
  {
    name: "Getting Started with Haskell",
    platform: "Dicoding",
    url: "https://www.dicoding.com/certificates/6RPNYQDQRZ2M",
  },
  // Add more certificates as needed
];

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const Skill = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="min-h-screen text-gray-100 flex flex-col items-center p-10 pb-30 relative">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-serif text-7xl text-yellowg font-semibold mt-4 mb-7 relative z-10"
        data-aos="fade-down"
      >
        My Skills.
      </motion.h1>

      {/* Programming Skills */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="relative z-10"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <h2 className="flex justify-center items-center font-serif text-4xl text-yellowg font-medium mt-8 mb-5">
          Programming Skills
        </h2>
        <motion.div
          className="flex flex-wrap justify-center gap-6 mb-12"
          variants={containerVariants}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={`skill-${index}`}
              variants={itemVariants}
              className="text-white p-6 rounded-2xl shadow-2xl hover:scale-105 transition-all duration-500 backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/40 hover:shadow-xl hover:shadow-blue-500/25 w-32 h-32 flex flex-col items-center justify-center"
              data-aos="zoom-in"
              data-aos-delay={300 + index * 100}
              whileHover={{ y: -5 }}
            >
              <div className="flex justify-center text-yellowg hover:text-white transition-colors duration-300 mb-2">
                {skill.icon}
              </div>
              <p className="text-sm text-center font-medium leading-tight">
                {skill.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Tools */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="relative z-10"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <h2 className="flex justify-center items-center font-serif text-4xl text-yellowg font-medium mt-8 mb-5">
          Tech Tools
        </h2>
        <motion.div
          className="flex flex-wrap justify-center gap-6 mb-12"
          variants={containerVariants}
        >
          {tools.map((tool, index) => (
            <motion.div
              key={`tool-${index}`}
              variants={itemVariants}
              className="text-white p-6 rounded-2xl shadow-2xl hover:scale-105 transition-all duration-500 backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/40 hover:shadow-xl hover:shadow-green-500/25 w-32 h-32 flex flex-col items-center justify-center"
              data-aos="zoom-in"
              data-aos-delay={500 + index * 100}
              whileHover={{ y: -5 }}
            >
              <div className="flex justify-center text-yellowg hover:text-white transition-colors duration-300 mb-2">
                {tool.icon}
              </div>
              <p className="text-sm text-center font-medium leading-tight">
                {tool.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Certificates */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="relative z-10"
        data-aos="fade-up"
        data-aos-delay="600"
      >
        <h2 className="flex justify-center items-center font-serif text-4xl text-yellowg font-medium mt-8 mb-5">
          Certificates
        </h2>
        <motion.div
          className="flex flex-wrap justify-center gap-6"
          variants={containerVariants}
        >
          {certificates.map((cert, index) => (
            <motion.a
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              key={`cert-${index}`}
              variants={itemVariants}
              className="text-white p-6 rounded-2xl shadow-2xl hover:scale-105 transition-all duration-500 w-72 backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/40 hover:shadow-xl hover:shadow-purple-500/25 group"
              data-aos="flip-up"
              data-aos-delay={700 + index * 150}
              whileHover={{ y: -5 }}
            >
              <div className="flex justify-center text-yellowg group-hover:text-white transition-colors duration-300">
                <FaCertificate size={40} />
              </div>
              <p className="mt-3 text-xl text-center font-bold group-hover:text-yellowg transition-colors duration-300">
                {cert.name}
              </p>
              <p className="text-center text-gray-300 mt-2 group-hover:text-gray-200 transition-colors duration-300">
                {cert.platform}
              </p>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Skill;
