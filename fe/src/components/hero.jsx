import HeroPic from "../assets/self2.jpg";
import Resume from "../assets/CV_MARCELINUS DINOGLIDE YOGA PRAKOSO.pdf";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen py-16 px-5 sm:p-10 lg:p-20 flex flex-col lg:flex-row items-center justify-center lg:justify-around gap-10 lg:gap-6 text-white"
    >
      {/* Left Section - I'm */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay: 0.1,
        }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3 },
        }}
        className="w-full lg:w-1/3 max-w-md rounded-xl p-6 backdrop-blur-sm bg-white/5 shadow-lg border border-white/10 overflow-hidden"
      >
        <p className="text-3xl sm:text-4xl font-weight-300 mb-4 text-indigo-200">
          I'm
        </p>
        <TypedText />
      </motion.div>

      {/* Middle Section - Profile Picture */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{
          scale: 1.05,
          rotate: [0, 2, 0, -2, 0],
          transition: {
            duration: 0.5,
            rotate: {
              repeat: Infinity,
              repeatType: "mirror",
              duration: 2,
            },
          },
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          delay: 0.4,
          duration: 0.8,
        }}
        className="w-full lg:w-auto flex justify-center lg:flex-shrink-0"
      >
        <div className="relative w-[180px] sm:w-[220px] md:w-[250px]">
          <motion.div
            animate={{
              boxShadow: [
                "0px 0px 0px rgba(79, 70, 229, 0.3)",
                "0px 0px 20px rgba(79, 70, 229, 0.7)",
                "0px 0px 0px rgba(79, 70, 229, 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            className="absolute inset-0 rounded-full"
          />
          <img
            src={HeroPic}
            alt="The Picture of Developer"
            className="w-full aspect-square object-cover border-4 border-white/70 rounded-full drop-shadow-lg relative z-10"
          />
        </div>
      </motion.div>

      {/* Right Section - About Me */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: "spring",
          delay: 0.1,
          stiffness: 100,
          damping: 15,
        }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3 },
        }}
        className="w-full lg:w-1/3 max-w-md rounded-xl p-6 backdrop-blur-sm bg-white/5 shadow-lg border border-white/10 overflow-hidden"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl sm:text-4xl font-semibold font-serif mb-4 text-yellowg"
        >
          About Me
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="font-inter text-base sm:text-lg mb-6 leading-relaxed text-gray-200 break-words"
        >
          I'm a web developer based in Indonesia. I have a passion for web
          development and love to create new things.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex justify-start"
        >
          <motion.a
            href={Resume}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            download="Marcelinus_Dinoglide_Yoga_Prakoso_Resume.pdf"
            className="w-auto px-6 py-3 bg-white text-indigo-500 font-bold rounded-full hover:bg-indigo-500 hover:text-white transition duration-300 ease-in-out text-sm sm:text-base"
          >
            Download Resume
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

// Typing animation component
function TypedText() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = ["Marcelinus Dinoglide", "a Web Developer", "a Learner"];

  useEffect(() => {
    const timer = setTimeout(() => {
      handleType();
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  const handleType = () => {
    const i = loopNum % phrases.length;
    const fullText = phrases[i];

    setText(
      isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
    );

    setTypingSpeed(isDeleting ? 75 : 150);

    if (!isDeleting && text === fullText) {
      setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    }
  };

  return (
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
      {text}
      <span className="text-indigo-400 animate-pulse">|</span>
    </h1>
  );
}

export default hero;
