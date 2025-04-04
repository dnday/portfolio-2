import React, { useEffect } from "react";
import HeroPic from "../assets/self2.jpg";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const About = () => {
  const resumeExperience = [
    {
      organization: "KOMATIK UGM",
      position: "Member of IoT Gama",
      tasks: [
        "Learn about IoT (sensors, microcontroller, programming language, LoRa) and its application to solve real-world problems",
      ],
      startDate: "February 2025",
      endDate: "Present",
    },
    {
      organization: "KMTETI",
      position: "Workshop Staff",
      tasks: [
        "Organize training sessions and boot camps related to technical skills in support of classroom and off-site lectures",
      ],
      startDate: "January 2025",
      endDate: "Present",
    },
    {
      organization: "FindIT! UGM",
      position: "Logistic Division Staff",
      tasks: [
        "Managing needs of the event including property, korsa/workshirt, and consumption",
      ],
      startDate: "October 2024",
      endDate: "Present",
    },
    {
      organization: "Technocorner UGM",
      position: "Robotic Technical Staff",
      tasks: [
        "Managing robotic competition in Technocorner especially in Line Follower",
      ],
      startDate: "October 2024",
      endDate: "Present",
    },
    {
      organization: "Misa Kampus UGM",
      position: "Staff of Human Resources and Development",
      tasks: ["Engaged in staff recruitment and development programs"],
      startDate: "September 2024",
      endDate: "Present",
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
    if (heroInView) {
      heroControls.start("visible");
    }
    if (expInView) {
      expControls.start("visible");
    }
  }, [heroControls, heroInView, expControls, expInView]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <div className="pb-20">
      {/* Title Section */}
      <motion.div
        ref={heroRef}
        initial="hidden"
        animate={heroControls}
        variants={staggerContainer}
        className="mt-10"
      >
        <motion.h1
          variants={fadeInUp}
          className="font-serif text-7xl font-semibold text-yellowg text-center mb-8"
        >
          I'm Marcel.
        </motion.h1>

        {/* About Content */}
        <div className="flex justify-center items-center">
          <div className="max-w-7xl flex flex-col mt-5 sm:flex-row items-center p-8">
            {/* Image Container */}
            <motion.div
              variants={fadeInUp}
              className="w-full sm:w-auto sm:mr-10 mb-5 flex justify-center"
            >
              <motion.div
                className="overflow-hidden rounded-t-full shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={HeroPic}
                  alt="Picture of Developer"
                  className="object-cover rounded-t-full w-64 h-64 sm:w-64 sm:h-64"
                />
              </motion.div>
            </motion.div>

            {/* Text container */}
            <motion.div variants={fadeInUp} className="w-full">
              <div className="text-left rounded-xl sm:text-left">
                <p className="text-2xl text-yellowg font-serif">
                  <span className="text-2xl mb-7 sm:text-5xl text-greeny">
                    I'm a first-year Information Engineering student at
                    Universitas Gadjah Mada.
                  </span>
                  <br />
                  <span className="block mt-4">
                    I have a passion for web development, cloud computing, IoT,
                    and data science.
                  </span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Experience Section - Simplified */}
      <motion.div
        ref={expRef}
        initial="hidden"
        animate={expControls}
        variants={staggerContainer}
        className="container mx-auto px-4 mt-32"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-yellowg font-serif text-5xl text-center mb-16"
        >
          Experience
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          {resumeExperience.map((work, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="mb-10 bg-gray-900 bg-opacity-70 p-6 rounded-lg shadow-lg border border-gray-700 transform transition-all duration-300 hover:scale-[1.02] hover:border-yellowg"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-yellowg text-xl font-bold">
                    {work.organization}
                  </h3>
                  <h4 className="text-greeny font-medium mt-1">
                    {work.position}
                  </h4>
                </div>
                <div className="text-gray-400 text-sm mt-2 md:mt-0 md:text-right">
                  {work.startDate} - {work.endDate}
                </div>
              </div>
              <div className="mt-4 border-t border-gray-700 pt-4">
                <ul className="text-white">
                  {work.tasks.map((task, index) => (
                    <li key={index} className="flex items-start mb-2">
                      <span className="text-yellowg mr-2">•</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default About;
