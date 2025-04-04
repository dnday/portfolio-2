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
} from "react-icons/si";
import { BiLogoGoogleCloud } from "react-icons/bi";
import { FaCertificate } from "react-icons/fa";
import { motion } from "framer-motion";

const skills = [
  { name: "C++", icon: <SiCplusplus size={40} /> },
  { name: "Arduino", icon: <SiArduino size={40} /> },
  { name: "Go", icon: <SiGo size={40} /> },
  { name: "Python", icon: <SiPython size={40} /> },
  { name: "HTML", icon: <SiHtml5 size={40} /> },
  { name: "CSS", icon: <SiCss3 size={40} /> },
  { name: "JavaScript", icon: <SiJavascript size={40} /> },
  { name: "React.js", icon: <SiReact size={40} /> },
  { name: "Google Cloud", icon: <BiLogoGoogleCloud size={40} /> },
];

const tools = [
  { name: "Postman", icon: <SiPostman size={40} /> },
  { name: "Vercel", icon: <SiVercel size={40} /> },
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
  return (
    <div className="min-h-screen text-gray-100 flex flex-col items-center p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-serif text-7xl text-yellowg font-semibold mt-4 mb-7"
      >
        My Skills.
      </motion.h1>

      {/* Programming Skills */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
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
              key={index}
              variants={itemVariants}
              className="text-white p-4 rounded-lg shadow-md hover:scale-105 transition-transform"
            >
              <div className="flex justify-center">{skill.icon}</div>
              <p className="mt-2 text-xl text-center">{skill.name}</p>
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
              key={index}
              variants={itemVariants}
              className="text-white p-4 rounded-lg shadow-md hover:scale-105 transition-transform"
            >
              <div className="flex justify-center">{tool.icon}</div>
              <p className="mt-2 text-xl text-center">{tool.name}</p>
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
              key={index}
              variants={itemVariants}
              className="text-white p-5 rounded-lg shadow-md hover:scale-105 transition-transform w-64"
            >
              <div className="flex justify-center">
                <FaCertificate size={40} />
              </div>
              <p className="mt-2 text-xl text-center font-bold">{cert.name}</p>
              <p className="text-center text-gray-400">{cert.platform}</p>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Skill;
