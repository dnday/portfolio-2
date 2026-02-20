import AOS from "aos";
import "aos/dist/aos.css";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import Proj1IMG from "../assets/Project1.png";
import Proj2IMG from "../assets/Project2.png";
import Proj3IMG from "../assets/Project3.png";
import Proj4IMG from "../assets/Project4.png";
import Proj5IMG from "../assets/Project5.png";
import Proj6IMG from "../assets/Project6.png";

export default function Project() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const projects = [
    {
      id: 2,
      title: "Movie Recommendation Bot Twitter",
      description:
        "An intelligent movie recommendation bot for Twitter that suggests movies based on user preferences using IMDB data.",
      tech: ["Python", "Tweepy", "IMDB API"],
      image: Proj1IMG,
      link: "https://github.com/dnday/movie-twitter-bot",
      gradient: "from-slate-800 to-slate-700",
    },
    {
      id: 1,
      title: "Book Management System",
      description:
        "A comprehensive backend system for managing book inventory and employee records with RESTful architecture.",
      tech: ["Golang", "MongoDB", "REST API"],
      image: Proj2IMG,
      link: "https://github.com/dnday/golangproject",
      gradient: "from-slate-900 to-slate-800",
    },
    {
      id: 3,
      title: "PIONIR Kesatria 2025",
      description:
        "A website for PIONIR Kesatria 2025, featuring a responsive design, interactive map, and information about PIONIR itself.",
      tech: ["Next.js", "JavaScript", "Tailwind CSS"],
      image: Proj3IMG,
      link: "https://pionir-kesatria-ft.vercel.app/",
      gradient: "from-gray-800 to-slate-800",
    },
    {
      id: 4,
      title: "AI Sumarization Tool",
      description:
        "An AI-powered tool that summarizes long articles and documents into concise summaries using multimodal LLM like Deepseek, GPT, etc.",
      tech: ["React", "Tailwind CSS", "Framer Motion"],
      image: Proj4IMG,
      link: "https://ai-sum-1jmt.vercel.app/",
      gradient: "from-slate-800 to-zinc-800",
    },
    {
      id: 5,
      title: "Computer Vision Object Detection",
      description:
        "A computer vision project that detects and classifies objects in images using deep learning models like YOLO or Faster R-CNN.",
      tech: ["Python", "TensorFlow", "OpenCV"],
      image: Proj5IMG,
      link: "https://github.com/dnday/ggmt",
      gradient: "from-zinc-800 to-slate-800",
    },
    {
      id: 6,
      title: "RecruitPro — AI-Powered Recruitment Platform",
      description:
        "Engineered an intelligent recruitment solution leveraging AI for automated resume screening and assessment. Architected comprehensive user experience flow spanning from resume upload through evaluation results with seamless backend integration.",
      tech: [
        "Next.js",
        "Tailwind CSS",
        "Supabase",
        "AI API",
        "NodeMailer",
        "NestJS",
        "JWT",
      ],
      image: Proj6IMG,
      link: "https://gdgoc-1.vercel.app",
      gradient: "from-gray-800 to-zinc-800",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, projects.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % projects.length);
    setIsAutoPlaying(false);
  }, [projects.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
    setIsAutoPlaying(false);
  }, [projects.length]);

  const goToSlide = useCallback(
    (index) => {
      setDirection(index > currentSlide ? 1 : -1);
      setCurrentSlide(index);
      setIsAutoPlaying(false);
    },
    [currentSlide],
  );

  // Swipe handlers for touch devices
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  // Animation variants for slide transitions
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.95,
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        className="text-center mb-12 sm:mb-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h1
          variants={itemVariants}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-yellowg mb-3 sm:mb-4 px-4"
        >
          My Projects
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto px-4"
        >
          Showcasing my journey through code - from backend systems to
          full-stack applications
        </motion.p>
      </motion.div>

      {/* Enhanced Slider with Touch Support */}
      <div
        className="relative"
        data-aos="fade-up"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Main Glass Container */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-[24px] backdrop-blur-3xl bg-white/[0.05] border border-white/[0.08] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
              }}
              className="w-full"
            >
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl sm:rounded-[24px] overflow-hidden backdrop-blur-2xl">
                <div className="flex flex-col lg:flex-row min-h-[500px] sm:min-h-[520px]">
                  {/* Image Section with Enhanced Mobile Design */}
                  <div className="lg:w-3/5 relative group overflow-hidden">
                    <div className="relative w-full h-full min-h-[250px] sm:min-h-[300px] lg:min-h-[520px]">
                      <motion.img
                        key={`img-${projects[currentSlide].id}`}
                        src={projects[currentSlide].image}
                        alt={projects[currentSlide].title}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        whileHover={{ scale: 1.02 }}
                      />
                      {/* Gradient overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-black/20"></div>
                      {/* Glass hover effect */}
                      <div className="absolute inset-0 bg-white/0 backdrop-blur-0 transition-all duration-[400ms] ease-out group-hover:bg-white/[0.03] group-hover:backdrop-blur-[2px] hidden lg:block"></div>
                    </div>
                  </div>

                  {/* Content Section with Responsive Design */}
                  <div className="lg:w-2/5 p-6 sm:p-8 md:p-10 lg:p-12 relative overflow-hidden">
                    {/* Background layers */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${projects[currentSlide].gradient} opacity-[0.85]`}
                    ></div>
                    <div className="absolute inset-0 backdrop-blur-xl bg-white/[0.08] lg:border-l border-white/[0.06]"></div>

                    {/* Content with stagger animations */}
                    <motion.div
                      className="relative z-10 flex flex-col h-full"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      key={`content-${currentSlide}`}
                    >
                      <motion.div
                        variants={itemVariants}
                        className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-medium text-white/90 backdrop-blur-2xl bg-white/[0.15] border border-white/[0.2] rounded-full mb-4 sm:mb-6 md:mb-8 shadow-lg w-fit"
                        whileHover={{
                          scale: 1.02,
                          backgroundColor: "rgba(255,255,255,0.2)",
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <span className="w-2 h-2 bg-white/80 rounded-full mr-2 animate-pulse"></span>
                        Featured Project
                      </motion.div>

                      <motion.h3
                        variants={itemVariants}
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-[1.15] tracking-tight"
                        style={{ textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
                      >
                        {projects[currentSlide].title}
                      </motion.h3>

                      <motion.p
                        variants={itemVariants}
                        className="text-white/85 mb-4 sm:mb-6 md:mb-8 leading-relaxed text-sm sm:text-base font-light"
                        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}
                      >
                        {projects[currentSlide].description}
                      </motion.p>

                      <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 md:mb-10"
                      >
                        {projects[currentSlide].tech.map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            className="px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-2xl bg-white/[0.12] border border-white/[0.15] text-white/90 text-xs sm:text-sm font-medium rounded-full shadow-sm hover:bg-white/[0.18] hover:border-white/[0.25] transition-all duration-300"
                            whileHover={{
                              scale: 1.05,
                              y: -2,
                              boxShadow: "0 4px 12px rgba(255,255,255,0.1)",
                            }}
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: techIndex * 0.08,
                              ease: "easeOut",
                            }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </motion.div>

                      <motion.a
                        variants={itemVariants}
                        href={projects[currentSlide].link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 backdrop-blur-2xl bg-white/[0.9] hover:bg-white/[0.95] text-gray-900 font-semibold text-sm sm:text-base rounded-xl sm:rounded-[16px] transition-all duration-300 border border-white/[0.3] shadow-lg hover:shadow-xl group mt-auto w-full sm:w-fit"
                        whileHover={{
                          scale: 1.02,
                          y: -2,
                          boxShadow: "0 12px 32px rgba(255,255,255,0.15)",
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>View Project</span>
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 transition-transform duration-300 group-hover:translate-x-1"
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
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Responsive Navigation Buttons - Hidden on mobile, visible on tablet+ */}
          <motion.button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 backdrop-blur-2xl bg-black/[0.4] hover:bg-black/[0.6] active:bg-black/[0.7] border border-white/[0.1] text-white p-2 sm:p-3 lg:p-4 rounded-full transition-all duration-300 z-20 shadow-lg hover:shadow-xl hidden sm:flex items-center justify-center"
            aria-label="Previous slide"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
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
            className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 backdrop-blur-2xl bg-black/[0.4] hover:bg-black/[0.6] active:bg-black/[0.7] border border-white/[0.1] text-white p-2 sm:p-3 lg:p-4 rounded-full transition-all duration-300 z-20 shadow-lg hover:shadow-xl hidden sm:flex items-center justify-center"
            aria-label="Next slide"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
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

          {/* Enhanced Dots Indicator with Auto-play indicator */}
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20">
            <div className="flex flex-col items-center gap-3">
              {/* Dots */}
              <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 bg-black/30 backdrop-blur-xl rounded-full px-3 py-2 sm:px-4 sm:py-2.5">
                {projects.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-[400ms] ease-out ${
                      index === currentSlide
                        ? "w-6 sm:w-8 h-2 sm:h-3 bg-white/90 rounded-full shadow-md"
                        : "w-2 sm:w-3 h-2 sm:h-3 bg-white/40 hover:bg-white/60 rounded-full"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    whileHover={index !== currentSlide ? { scale: 1.15 } : {}}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
              {/* Auto-play indicator */}
              {isAutoPlaying && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex items-center gap-2 bg-black/40 backdrop-blur-xl rounded-full px-3 py-1.5 text-white/70 text-xs"
                >
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="hidden sm:inline">Auto-playing</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Responsive Manual Navigation */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center mt-8 sm:mt-12 gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <motion.button
            onClick={prevSlide}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 backdrop-blur-2xl bg-yellowg/[0.15] hover:bg-yellowg/[0.25] active:bg-yellowg/[0.3] border border-yellowg/[0.3] text-yellowg font-semibold rounded-xl sm:rounded-[16px] transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            ← Previous
          </motion.button>
          <motion.button
            onClick={nextSlide}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 backdrop-blur-2xl bg-yellowg/[0.15] hover:bg-yellowg/[0.25] active:bg-yellowg/[0.3] border border-yellowg/[0.3] text-yellowg font-semibold rounded-xl sm:rounded-[16px] transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            Next →
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        className="text-center mt-12 sm:mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <p className="text-yellowg text-base sm:text-lg px-4">
          Interested in collaborating? Let's build something amazing together!
        </p>
      </motion.div>
    </section>
  );
}
