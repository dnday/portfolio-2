import Proj1IMG from "../assets/Project1.png";
import Proj2IMG from "../assets/Project2.png";
import Proj3IMG from "../assets/Project3.png";
import Proj4IMG from "../assets/Project4.png";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Project() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

  const projects = [
    {
      id: 1,
      title: "Movie Recommendation Bot Twitter",
      description:
        "An intelligent movie recommendation bot for Twitter that suggests movies based on user preferences using IMDB data.",
      tech: ["Python", "Tweepy", "IMDB API"],
      image: Proj1IMG,
      link: "https://github.com/dnday/movie-twitter-bot",
      gradient: "from-yellowg to-purpled",
    },
    {
      id: 2,
      title: "Book Management System",
      description:
        "A comprehensive backend system for managing book inventory and employee records with RESTful architecture.",
      tech: ["Golang", "MongoDB", "REST API"],
      image: Proj2IMG,
      link: "https://github.com/dnday/golangproject",
      gradient: "from-yellowg to-blu",
    },
    {
      id: 3,
      title: "PIONIR Kesatria 2025",
      description:
        "A website for PIONIR Kesatria 2025, featuring a responsive design, interactive map, and information about PIONIR itself.",
      tech: ["Next.js", "JavaScript", "Tailwind CSS"],
      image: Proj3IMG,
      link: "https://pionir-kesatria-ft.vercel.app/",
      gradient: "from-greeno to-yellowg",
    },
    {
      id: 4,
      title: "AI Sumarization Tool",
      description:
        "An AI-powered tool that summarizes long articles and documents into concise summaries using multimodal LLM like Deepseek, GPT, etc.",
      tech: ["React", "Tailwind CSS", "Framer Motion"],
      image: Proj4IMG,
      link: "https://ai-sum-1jmt.vercel.app/",
      gradient: "from-blu to-greeno",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-yellowg mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          My Projects
        </motion.h1>
        <motion.p
          className="text-xl text-white/80 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Showcasing my journey through code - from backend systems to
          full-stack applications
        </motion.p>
      </motion.div>

      {/* Apple-style Glass Morphism Slider */}
      <div className="relative" data-aos="fade-up">
        {/* Main Glass Container */}
        <div className="relative overflow-hidden rounded-[24px] backdrop-blur-3xl bg-white/[0.05] border border-white/[0.08] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
          <div
            className="flex transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {projects.map((project, index) => (
              <div key={project.id} className="w-full flex-shrink-0">
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-[24px] overflow-hidden backdrop-blur-2xl">
                  <div className="flex flex-col lg:flex-row min-h-[520px]">
                    {/* Image Section with Apple-style Glass */}
                    <div className="lg:w-3/5 relative group overflow-hidden">
                      <div className="relative w-full h-full min-h-[300px] lg:min-h-[520px]">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.02]"
                        />
                        {/* Subtle overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/[0.15] via-transparent to-transparent"></div>
                        {/* Apple-style glass hover effect */}
                        <div className="absolute inset-0 bg-white/0 backdrop-blur-0 transition-all duration-[400ms] ease-out group-hover:bg-white/[0.03] group-hover:backdrop-blur-[2px]"></div>
                      </div>
                    </div>

                    {/* Content Section with Apple Glass Design */}
                    <div className="lg:w-2/5 p-10 lg:p-12 relative overflow-hidden">
                      {/* Apple-style background layers */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-[0.85]`}
                      ></div>
                      <div className="absolute inset-0 backdrop-blur-xl bg-white/[0.08] border-l border-white/[0.06]"></div>

                      {/* Content with enhanced spacing */}
                      <div className="relative z-10 flex flex-col h-full">
                        <motion.div
                          className="inline-flex items-center px-4 py-2 text-xs font-medium text-white/90 backdrop-blur-2xl bg-white/[0.15] border border-white/[0.2] rounded-full mb-8 shadow-lg w-fit"
                          whileHover={{
                            scale: 1.02,
                            backgroundColor: "rgba(255,255,255,0.2)",
                          }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                          <span className="w-2 h-2 bg-white/80 rounded-full mr-2"></span>
                          Featured Project
                        </motion.div>

                        <motion.h3
                          className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-[1.15] tracking-tight"
                          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.6,
                            delay: 0.1,
                            ease: "easeOut",
                          }}
                        >
                          {project.title}
                        </motion.h3>

                        <motion.p
                          className="text-white/85 mb-8 leading-relaxed text-base font-light"
                          style={{ textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.6,
                            delay: 0.2,
                            ease: "easeOut",
                          }}
                        >
                          {project.description}
                        </motion.p>

                        <motion.div
                          className="flex flex-wrap gap-3 mb-10"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.6,
                            delay: 0.3,
                            ease: "easeOut",
                          }}
                        >
                          {project.tech.map((tech, techIndex) => (
                            <motion.span
                              key={techIndex}
                              className="px-4 py-2 backdrop-blur-2xl bg-white/[0.12] border border-white/[0.15] text-white/90 text-sm font-medium rounded-full shadow-sm hover:bg-white/[0.18] hover:border-white/[0.25] transition-all duration-300"
                              whileHover={{
                                scale: 1.02,
                                y: -1,
                                boxShadow: "0 4px 12px rgba(255,255,255,0.1)",
                              }}
                              initial={{ opacity: 0, scale: 0.9, y: 10 }}
                              whileInView={{ opacity: 1, scale: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 0.4,
                                delay: 0.4 + techIndex * 0.08,
                                ease: "easeOut",
                              }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </motion.div>

                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-8 py-4 backdrop-blur-2xl bg-white/[0.9] hover:bg-white/[0.95] text-gray-900 font-semibold rounded-[16px] transition-all duration-300 border border-white/[0.3] shadow-lg hover:shadow-xl group mt-auto w-fit"
                          whileHover={{
                            scale: 1.02,
                            y: -2,
                            boxShadow: "0 12px 32px rgba(255,255,255,0.15)",
                          }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.6,
                            delay: 0.5,
                            ease: "easeOut",
                          }}
                        >
                          <span>View Project</span>
                          <svg
                            className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Apple-style Navigation Buttons */}
          <motion.button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 backdrop-blur-2xl bg-black/[0.4] hover:bg-black/[0.6] border border-white/[0.1] text-white p-4 rounded-full transition-all duration-300 z-20 shadow-lg hover:shadow-xl"
            aria-label="Previous slide"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>

          <motion.button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 backdrop-blur-2xl bg-black/[0.4] hover:bg-black/[0.6] border border-white/[0.1] text-white p-4 rounded-full transition-all duration-300 z-20 shadow-lg hover:shadow-xl"
            aria-label="Next slide"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>

          {/* Apple-style Dots Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-4 z-20">
            {projects.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-[400ms] ease-out backdrop-blur-2xl border border-white/[0.2] ${
                  index === currentSlide
                    ? "w-8 h-3 bg-white/80 rounded-full shadow-md"
                    : "w-3 h-3 bg-white/40 hover:bg-white/60 rounded-full"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                whileHover={index !== currentSlide ? { scale: 1.1 } : {}}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>

        {/* Apple-style Manual Navigation */}
        <motion.div
          className="flex justify-center items-center mt-12 space-x-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <motion.button
            onClick={prevSlide}
            className="px-8 py-4 backdrop-blur-2xl bg-yellowg/[0.15] hover:bg-yellowg/[0.25] border border-yellowg/[0.3] text-yellowg font-semibold rounded-[16px] transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            ← Previous
          </motion.button>
          <motion.button
            onClick={nextSlide}
            className="px-8 py-4 backdrop-blur-2xl bg-yellowg/[0.15] hover:bg-yellowg/[0.25] border border-yellowg/[0.3] text-yellowg font-semibold rounded-[16px] transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            Next →
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <p className="text-yellowg text-lg">
          Interested in collaborating? Let's build something amazing together!
        </p>
      </motion.div>
    </section>
  );
}
