import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { BiLogoGoogleCloud } from "react-icons/bi";
import { FaCertificate } from "react-icons/fa";
import {
  SiArduino,
  SiCplusplus,
  SiCss3,
  SiGit,
  SiGo,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostman,
  SiPython,
  SiReact,
  SiVercel,
} from "react-icons/si";

const skills = [
  { name: "C++", icon: <SiCplusplus size={36} /> },
  { name: "Arduino", icon: <SiArduino size={36} /> },
  { name: "Go", icon: <SiGo size={36} /> },
  { name: "Python", icon: <SiPython size={36} /> },
  { name: "HTML", icon: <SiHtml5 size={36} /> },
  { name: "CSS", icon: <SiCss3 size={36} /> },
  { name: "JavaScript", icon: <SiJavascript size={36} /> },
  { name: "React.js", icon: <SiReact size={36} /> },
  { name: "Next.js", icon: <SiNextdotjs size={36} /> },
  { name: "Node.js", icon: <SiNodedotjs size={36} /> },
  { name: "MongoDB", icon: <SiMongodb size={36} /> },
  { name: "Google Cloud", icon: <BiLogoGoogleCloud size={36} /> },
];

const tools = [
  { name: "Postman", icon: <SiPostman size={36} /> },
  { name: "Vercel", icon: <SiVercel size={36} /> },
  { name: "Git", icon: <SiGit size={36} /> },
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
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
    <div className="min-h-screen text-gray-100 flex flex-col items-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center mb-12 sm:mb-16 lg:mb-20 relative z-10"
        data-aos="fade-down"
      >
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-yellowg font-bold mb-3 sm:mb-4">
          My Skills
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto px-4">
          Technologies and tools I use to build amazing things
        </p>
      </motion.div>

      {/* Programming Skills */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="relative z-10 w-full max-w-6xl mx-auto mb-16 sm:mb-20 lg:mb-24"
        data-aos="fade-up"
      >
        <h2 className="text-center font-serif text-2xl sm:text-3xl lg:text-4xl text-yellowg font-semibold mb-8 sm:mb-10 lg:mb-12">
          Programming Skills
        </h2>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5 lg:gap-6"
          variants={containerVariants}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={`skill-${index}`}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="group"
              data-aos="fade-up"
              data-aos-delay={100 + index * 30}
            >
              <div className="relative backdrop-blur-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.1] hover:border-yellowg/[0.3] rounded-xl sm:rounded-2xl p-5 sm:p-6 transition-all duration-300 aspect-square flex flex-col items-center justify-center gap-3 overflow-hidden shadow-lg hover:shadow-yellowg/10">
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellowg/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-2.5 sm:gap-3">
                  <div className="text-yellowg/80 group-hover:text-yellowg transition-colors duration-300">
                    {skill.icon}
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-center text-white/70 group-hover:text-white transition-colors duration-300">
                    {skill.name}
                  </p>
                </div>
              </div>
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
        className="relative z-10 w-full max-w-6xl mx-auto mb-16 sm:mb-20 lg:mb-24"
        data-aos="fade-up"
      >
        <h2 className="text-center font-serif text-2xl sm:text-3xl lg:text-4xl text-yellowg font-semibold mb-8 sm:mb-10 lg:mb-12">
          Development Tools
        </h2>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 max-w-3xl mx-auto"
          variants={containerVariants}
        >
          {tools.map((tool, index) => (
            <motion.div
              key={`tool-${index}`}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="group"
              data-aos="fade-up"
              data-aos-delay={100 + index * 30}
            >
              <div className="relative backdrop-blur-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.1] hover:border-yellowg/[0.3] rounded-xl sm:rounded-2xl p-6 sm:p-7 lg:p-8 transition-all duration-300 aspect-square flex flex-col items-center justify-center gap-3 overflow-hidden shadow-lg hover:shadow-yellowg/10">
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellowg/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="text-yellowg/80 group-hover:text-yellowg transition-colors duration-300">
                    {tool.icon}
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-center text-white/70 group-hover:text-white transition-colors duration-300">
                    {tool.name}
                  </p>
                </div>
              </div>
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
        className="relative z-10 w-full max-w-5xl mx-auto"
        data-aos="fade-up"
      >
        <h2 className="text-center font-serif text-2xl sm:text-3xl lg:text-4xl text-yellowg font-semibold mb-8 sm:mb-10 lg:mb-12">
          Certificates
        </h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6"
          variants={containerVariants}
        >
          {certificates.map((cert, index) => (
            <motion.a
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              key={`cert-${index}`}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="group"
              data-aos="fade-up"
              data-aos-delay={100 + index * 30}
            >
              <div className="relative backdrop-blur-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.1] hover:border-yellowg/[0.3] rounded-xl sm:rounded-2xl p-6 sm:p-7 lg:p-8 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-yellowg/10">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellowg/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Decorative blur elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellowg/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purpled/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center gap-4">
                  <div className="text-yellowg/80 group-hover:text-yellowg transition-colors duration-300">
                    <FaCertificate size={40} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-semibold text-white/90 group-hover:text-white transition-colors duration-300">
                      {cert.name}
                    </h3>
                    <div className="inline-flex items-center gap-2 bg-white/[0.05] backdrop-blur-sm border border-white/[0.1] rounded-full px-3 py-1.5 group-hover:border-yellowg/[0.2] transition-colors duration-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellowg/80"></div>
                      <span className="text-xs sm:text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300">
                        {cert.platform}
                      </span>
                    </div>
                  </div>

                  {/* Arrow indicator on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      className="w-5 h-5 text-yellowg"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Skill;
