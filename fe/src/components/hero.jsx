import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import HeroPic from "../assets/self2.jpg";

const TypedText = ({ phrases }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timeout;

    if (!isDeleting && displayedText === currentPhrase) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    } else {
      const nextText = isDeleting
        ? currentPhrase.substring(0, displayedText.length - 1)
        : currentPhrase.substring(0, displayedText.length + 1);

      timeout = setTimeout(
        () => setDisplayedText(nextText),
        isDeleting ? 50 : 150,
      );
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, phraseIndex, phrases]);

  return (
    <span className="inline-block min-w-[280px] sm:min-w-[300px] md:min-w-[350px]">
      {displayedText}
      <span className="ml-1 animate-pulse text-yellowg">|</span>
    </span>
  );
};

const hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center text-white relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-yellowg/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purpled/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-8 items-center">
          {/* Left Section - I'm */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <div className="relative backdrop-blur-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.1] hover:border-yellowg/[0.3] rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-lg hover:shadow-yellowg/10 overflow-hidden">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellowg/[0.02] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl pointer-events-none"></div>

              <div className="relative z-10">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl sm:text-3xl font-light mb-4 sm:mb-6 text-white/70"
                >
                  I'm
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-yellowg via-yellow-400 to-yellowg bg-clip-text text-transparent mb-4 sm:mb-6"
                >
                  <TypedText
                    phrases={["Marcelinus", "a Learner", "a Developer"]}
                  />
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-base sm:text-lg lg:text-xl leading-relaxed text-white/60"
                >
                  Passionate about crafting elegant solutions through code and
                  design
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Center Section - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative group">
              {/* Glow effect behind image */}
              <div className="absolute -inset-4 bg-gradient-to-r from-yellowg/30 via-purpled/30 to-yellowg/30 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>

              {/* Image container */}
              <div className="relative backdrop-blur-xl bg-white/[0.03] border-2 border-white/[0.1] hover:border-yellowg/[0.5] rounded-full p-2 transition-all duration-500 shadow-2xl">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-white/[0.05]">
                  <img
                    src={HeroPic}
                    alt="Profile"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Overlay gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-yellowg/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              {/* Decorative ring animation */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-yellowg/30"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

          {/* Right Section - Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="order-3"
          >
            <div className="relative backdrop-blur-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.1] hover:border-yellowg/[0.3] rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-lg hover:shadow-yellowg/10 overflow-hidden">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellowg/[0.02] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl pointer-events-none"></div>

              <div className="relative z-10">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white"
                >
                  Full-Stack Developer
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-base sm:text-lg leading-relaxed text-white/60"
                >
                  Building seamless digital experiences with modern technologies
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-12 sm:mt-16"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-3 sm:px-10 sm:py-4 rounded-full overflow-hidden backdrop-blur-xl bg-yellowg/90 hover:bg-yellowg border border-yellowg/50 shadow-lg hover:shadow-yellowg/30 transition-all duration-300"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-yellowg to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10 text-black font-medium text-base sm:text-lg">
              View Projects
            </span>
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-3 sm:px-10 sm:py-4 rounded-full overflow-hidden backdrop-blur-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.1] hover:border-yellowg/[0.3] transition-all duration-300 shadow-lg"
          >
            <span className="relative z-10 text-white/90 group-hover:text-yellowg font-medium text-base sm:text-lg transition-colors">
              Get In Touch
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default hero;
