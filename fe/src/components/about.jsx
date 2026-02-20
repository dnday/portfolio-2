import AOS from "aos";
import "aos/dist/aos.css";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import HeroPic from "../assets/self2.jpg";

const About = () => {
  const resumeExperience = [
    {
      organization: "Gamantaray UGM",
      position: "Software Programmer",
      tasks: [
        "Developed a web-based dashboard to monitor Autonomous Surface Vehicle (ASV) telemetry data and real-time vision output from onboard sensors and cameras.",
        "Integrated sensor data streams for visualization and system diagnostics.",
        "Contributed to system reliability and performance optimization for real-time monitoring.",
      ],
      startDate: "December 2025",
      endDate: "Present",
    },
    {
      organization: "FindIT!",
      position: "CTF Technical Staff",
      tasks: [
        "Contributed to organizing Capture The Flag (CTF) competitions.",
        "Assisted in challenge preparation and event technical coordination.",
      ],
      startDate: "October 2025",
      endDate: "Present",
    },
    {
      organization:
        "Keluarga Mahasiswa Teknik Elektro dan Teknologi Informasi FT UGM",
      position: "Workshop Division Staff",
      tasks: [
        "Organized training sessions and technical bootcamps to support academic and non-academic learning activities.",
      ],
      startDate: "January 2025",
      endDate: "Present",
    },
    {
      organization: "Misa Kampus UGM",
      position: "Human Resources Staff",
      tasks: [
        "Managed internal development programs, organizational visits, and gathering events.",
      ],
      startDate: "September 2024",
      endDate: "February 2026",
    },
    {
      organization: "PIONIR Kesatria",
      position: "HumIT Staff (Website Subdivision)",
      tasks: [
        "Built a responsive and high-performance event website using Next.js and TailwindCSS.",
        "Developed interactive UI components with React and managed version control using Git.",
        "Successfully deployed the website, reaching 500+ users during the event period.",
      ],
      startDate: "May 2025",
      endDate: "August 2025",
    },
    {
      organization: "Technocorner",
      position: "Robotic Technical Staff",
      tasks: [
        "Managed robotic competitions, particularly in the Line Follower category.",
      ],
      startDate: "October 2024",
      endDate: "June 2025",
    },
    {
      organization: "FindIT!",
      position: "Logistics and Equipment Division Staff",
      tasks: [
        "Managed event logistics including properties, merchandise, and consumption.",
      ],
      startDate: "October 2024",
      endDate: "May 2025",
    },
  ];

  // Hero section animation controls
  const heroControls = useAnimation();
  const [heroRef, heroInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Experience section animation controls
  const expControls = useAnimation();
  const [expRef, expInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1200,
      easing: "ease-out-cubic",
      once: true,
      offset: 100,
    });

    if (heroInView) {
      heroControls.start("visible");
    }
    if (expInView) {
      expControls.start("visible");
    }
  }, [heroControls, heroInView, expControls, expInView]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 80, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const experienceContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const experienceItemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95, rotateX: 15 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1.0,
        ease: [0.25, 0.1, 0.25, 1],
        type: "spring",
        stiffness: 80,
        damping: 20,
      },
    },
  };

  const cardHoverVariants = {
    rest: {
      scale: 1,
      rotateY: 0,
      boxShadow: "0 10px 30px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.1)",
      filter: "brightness(1)",
    },
    hover: {
      scale: 1.02,
      rotateY: 2,
      boxShadow:
        "0 20px 60px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.2), 0 0 50px rgba(59, 130, 246, 0.1)",
      filter: "brightness(1.05)",
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const contentHoverVariants = {
    rest: { opacity: 0, scale: 0.98 },
    hover: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
        type: "spring",
        stiffness: 200,
        damping: 25,
      },
    },
  };

  // Apple-style floating elements animation
  const floatingElementVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 0.6,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.3,
      },
    },
  };

  return (
    <div className="pb-20 relative overflow-hidden ">
      {/* Enhanced Apple-style floating decorative elements */}
      <motion.div
        initial="hidden"
        animate={{
          opacity: 0.4,
          scale: [1, 1.2, 1],
          rotate: [0, 360, 0],
          y: [0, -30, 0],
        }}
        transition={{
          opacity: { duration: 2, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute top-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-400/15 via-purple-400/20 to-pink-400/15 rounded-full blur-3xl"
      />

      <motion.div
        initial="hidden"
        animate={{
          opacity: 0.3,
          scale: [1, 1.1, 1],
          rotate: [0, -180, 0],
          y: [0, 25, 0],
          x: [0, 15, 0],
        }}
        transition={{
          opacity: { duration: 2.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.8 },
          scale: {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          },
          rotate: { duration: 25, repeat: Infinity, ease: "linear", delay: 1 },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3 },
          x: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2.5 },
        }}
        className="absolute bottom-40 left-10 w-32 h-32 bg-gradient-to-r from-yellow-400/12 via-orange-400/18 to-red-400/12 rounded-full blur-3xl"
      />

      <motion.div
        initial="hidden"
        animate={{
          opacity: 0.35,
          scale: [1, 1.15, 1],
          rotate: [0, 90, 0],
          y: [0, -20, 0],
        }}
        transition={{
          opacity: { duration: 3, ease: [0.25, 0.1, 0.25, 1], delay: 1.2 },
          scale: {
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          },
          rotate: { duration: 30, repeat: Infinity, ease: "linear", delay: 2 },
          y: { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 5 },
        }}
        className="absolute top-1/2 right-1/4 w-28 h-28 bg-gradient-to-r from-green-400/12 via-emerald-400/18 to-teal-400/12 rounded-full blur-3xl"
      />

      {/* Additional floating orbs */}
      <motion.div
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [0.8, 1.2, 0.8],
          x: [0, 50, 0],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute top-1/4 left-1/4 w-24 h-24 bg-gradient-to-r from-cyan-400/10 to-blue-400/15 rounded-full blur-2xl"
      />

      <motion.div
        animate={{
          opacity: [0.15, 0.25, 0.15],
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6,
        }}
        className="absolute bottom-1/4 right-1/3 w-36 h-36 bg-gradient-to-r from-violet-400/8 via-purple-400/15 to-fuchsia-400/10 rounded-full blur-3xl"
      />

      {/* Title Section with enhanced animations */}
      <motion.div
        ref={heroRef}
        initial="hidden"
        animate={heroControls}
        variants={staggerContainer}
        className="mt-10 relative"
        data-aos="fade-up"
        data-aos-duration="1500"
        data-aos-delay="200"
      >
        {/* Apple-style glassmorphism backdrop */}
        <div className="absolute inset-0" />

        <motion.h1
          variants={fadeInUp}
          className="font-serif text-7xl font-semibold text-yellowg text-center mb-8 relative z-10"
          data-aos="zoom-in"
          data-aos-duration="1200"
          data-aos-delay="400"
          whileHover={{
            scale: 1.05,
            textShadow: "0 0 30px rgba(255, 255, 255, 0.3)",
            filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          I'm Marcel.
        </motion.h1>

        {/* Enhanced About Content */}
        <div
          className="flex justify-center items-center relative"
          data-aos="fade-up"
          data-aos-duration="1300"
          data-aos-delay="600"
        >
          <div className="max-w-7xl flex flex-col mt-5 sm:flex-row items-center p-8 relative">
            {/* Apple-style gradient mesh background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/[0.03] via-purple-400/[0.02] to-pink-400/[0.03] rounded-3xl blur-3xl" />

            {/* Enhanced Image Container */}
            <motion.div
              variants={fadeInUp}
              className="w-full sm:w-auto sm:mr-10 mb-5 flex justify-center relative z-10"
              data-aos="flip-left"
              data-aos-duration="1000"
              data-aos-delay="800"
            >
              <motion.div
                className="overflow-hidden rounded-t-full shadow-2xl backdrop-blur-xl bg-white/10 border border-white/20 p-2 relative group"
                whileHover={{
                  scale: 1.08,
                  y: -8,
                  rotateY: 8,
                  rotateX: 5,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
              >
                {/* Enhanced Apple-style glow effect */}
                <motion.div
                  className="absolute -inset-6 bg-gradient-to-r from-blue-400/30 via-purple-400/25 to-cyan-400/25 rounded-t-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  }}
                />

                {/* Floating particles effect */}
                <motion.div
                  className="absolute -inset-4 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.5 }}
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white/40 rounded-full"
                      style={{
                        top: `${20 + i * 15}%`,
                        left: `${10 + i * 12}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </motion.div>

                <img
                  src={HeroPic}
                  alt="Picture of Developer"
                  className="relative object-cover rounded-t-full w-64 h-64 sm:w-64 sm:h-64 z-10 group-hover:brightness-110 transition-all duration-500"
                />
              </motion.div>
            </motion.div>

            {/* Enhanced Text container */}
            <motion.div
              variants={fadeInUp}
              className="w-full relative z-10"
              data-aos="fade-left"
              data-aos-duration="1200"
              data-aos-delay="1000"
            >
              <motion.div
                className="text-left rounded-2xl sm:text-left backdrop-blur-xl bg-white/10 border border-white/20 p-8 shadow-2xl hover:bg-white/15 hover:border-white/30 transition-all duration-700 relative overflow-hidden group"
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  boxShadow:
                    "0 25px 50px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                {/* Enhanced Apple-style animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-400/8 via-purple-400/6 to-pink-400/8 rounded-2xl opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                />

                {/* Animated border shimmer */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={{
                    backgroundPosition: ["-200% 0%", "200% 0%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                <motion.p
                  className="text-2xl text-yellowg font-serif relative z-10"
                  whileHover={{
                    scale: 1.01,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                >
                  <motion.span
                    className="text-2xl mb-7 sm:text-5xl text-greeny block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  >
                    I'm a sophomore Information Engineering student at
                    Universitas Gadjah Mada.
                  </motion.span>
                  <br />
                  <motion.span
                    className="block mt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                  >
                    I have a passion for web development, cloud computing, IoT,
                    and data science.
                  </motion.span>
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Experience Section - Apple Glass Design */}
      <motion.div
        ref={expRef}
        initial="hidden"
        animate={expControls}
        variants={experienceContainer}
        className="container mx-auto px-4 mt-32 relative"
        data-aos="fade-up"
        data-aos-duration="1500"
        data-aos-delay="300"
      >
        {/* Apple-style section background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent rounded-3xl" />

        <motion.h2
          className="text-4xl font-semibold text-center text-yellowg mb-10"
          variants={fadeInUp}
        >
          Experience
        </motion.h2>
        <div className="max-w-4xl mx-auto space-y-16 relative z-10">
          {resumeExperience.map((work, i) => (
            <motion.div
              key={`experience-${i}`}
              variants={experienceItemVariants}
              initial="rest"
              whileHover="hover"
              className="relative"
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay={200 + i * 100}
            >
              {/* Enhanced Apple Glass Card */}
              <motion.div
                variants={cardHoverVariants}
                className="relative backdrop-blur-2xl bg-white/[0.08] border border-white/[0.12] rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-700 cursor-pointer group"
                style={{
                  perspective: "1000px",
                }}
              >
                {/* Enhanced edge lighting effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500"
                  initial={{ opacity: 0, scale: 1 }}
                  whileHover={{
                    opacity: 1,
                    scale: 1.02,
                    boxShadow:
                      "0 0 25px rgba(59, 130, 246, 0.4), 0 0 50px rgba(168, 85, 247, 0.3)",
                  }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                />
                {/* Enhanced animated border glow */}
                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-transparent opacity-0 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.4), rgba(168, 85, 247, 0.4), rgba(236, 72, 153, 0.4), transparent)",
                    backgroundSize: "300% 300%",
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                {/* Interactive hover glow */}
                {/* Enhanced floating accent elements */}
                <motion.div
                  className="absolute -top-2 -right-2 w-24 h-24 bg-gradient-to-r from-blue-400/15 to-purple-400/15 rounded-full blur-xl opacity-0"
                  animate={{
                    opacity: [0, 0.3, 0],
                    scale: [0.9, 1.1, 0.9],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-2 -left-2 w-20 h-20 bg-gradient-to-r from-green-400/12 to-cyan-400/12 rounded-full blur-xl opacity-0"
                  animate={{
                    opacity: [0, 0.3, 0],
                    scale: [0.9, 1.1, 0.9],
                    rotate: [360, 180, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut",
                  }}
                />

                {/* Interactive hover glow */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/[0.05] via-purple-400/[0.03] to-pink-400/[0.05] opacity-0"
                  animate={{
                    opacity: [0, 0.2, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                {/* Interactive hover glow */}
                <motion.div
                  variants={contentHoverVariants}
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/[0.05] via-purple-400/[0.03] to-pink-400/[0.05] opacity-0"
                />
                {/* Floating accent elements */}
                <motion.div
                  className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-xl opacity-0"
                  animate={{ opacity: [0, 0.3, 0], scale: [0.8, 1.1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                />
                {/* Enhanced Content */}
                <div className="relative z-10">
                  <motion.div
                    className="flex flex-col md:flex-row md:items-start md:justify-between mb-6"
                    whileHover={{ x: 3, scale: 1.01 }}
                    transition={{
                      duration: 0.3,
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    }}
                  >
                    <div>
                      <motion.h3
                        className="text-2xl font-bold text-yellowg mb-2"
                        whileHover={{
                          scale: 1.03,
                          textShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
                        }}
                        transition={{
                          duration: 0.2,
                          type: "spring",
                          stiffness: 400,
                          damping: 20,
                        }}
                      >
                        {work.organization}
                      </motion.h3>
                      <motion.p
                        className="text-lg text-greeny font-medium"
                        whileHover={{ x: 2, scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                      >
                        {work.position}
                      </motion.p>
                    </div>
                    <motion.div
                      className="mt-4 md:mt-0"
                      whileHover={{
                        scale: 1.08,
                        boxShadow: "0 5px 15px rgba(255, 255, 255, 0.1)",
                      }}
                      transition={{
                        duration: 0.2,
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <span className="inline-block px-4 py-2 text-sm text-gray-300 bg-white/[0.08] border border-white/[0.12] rounded-full backdrop-blur-sm hover:bg-white/[0.12] hover:border-white/[0.18] transition-all duration-300">
                        {work.startDate} - {work.endDate}
                      </span>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="border-t border-white/[0.12] pt-6"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ul className="space-y-4">
                      {work.tasks.map((task, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start group/item"
                          initial={{ opacity: 1, x: 0 }}
                          animate={{ opacity: 1, x: 0 }}
                          whileHover={{ x: 5 }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.1,
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                          }}
                        >
                          <motion.span
                            className="text-yellowg mr-3 mt-1.5 text-lg"
                            whileHover={{
                              scale: 1.3,
                              rotate: 360,
                              textShadow: "0 0 10px rgba(255, 255, 0, 0.5)",
                            }}
                            transition={{ duration: 0.4 }}
                          >
                            ✦
                          </motion.span>
                          <motion.span
                            className="text-white/90 leading-relaxed group-hover/item:text-white transition-colors duration-300"
                            whileHover={{ x: 3 }}
                            transition={{ duration: 0.2 }}
                          >
                            {task}
                          </motion.span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default About;
