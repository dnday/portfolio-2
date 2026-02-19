import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  SiCss3,
  SiGo,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiPython,
  SiReact,
} from "react-icons/si";
import HeroPic from "../assets/self2.jpg";

// Floating Icons Component
const FloatingIcons = () => {
  const icons = [
    { Icon: SiReact, color: "text-cyan-400", delay: 0, x: "10%", y: "15%" },
    {
      Icon: SiJavascript,
      color: "text-yellow-400",
      delay: 0.5,
      x: "85%",
      y: "20%",
    },
    { Icon: SiPython, color: "text-blue-400", delay: 1, x: "15%", y: "75%" },
    { Icon: SiGo, color: "text-cyan-300", delay: 1.5, x: "80%", y: "70%" },
    {
      Icon: SiNodedotjs,
      color: "text-green-500",
      delay: 2,
      x: "25%",
      y: "45%",
    },
    {
      Icon: SiMongodb,
      color: "text-green-400",
      delay: 2.5,
      x: "75%",
      y: "45%",
    },
    { Icon: SiHtml5, color: "text-orange-500", delay: 3, x: "50%", y: "10%" },
    { Icon: SiCss3, color: "text-blue-500", delay: 3.5, x: "50%", y: "85%" },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.15, 0.3, 0.15],
            scale: [0.8, 1.2, 0.8],
            y: [0, -20, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8 + index,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
          className="absolute"
          style={{ left: item.x, top: item.y }}
        >
          <item.Icon
            className={`${item.color} text-4xl sm:text-5xl lg:text-6xl`}
          />
        </motion.div>
      ))}
    </div>
  );
};

// Floating Particles Component
const FloatingParticles = () => {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.4, 0],
            y: [0, -100, -200],
            x: [0, Math.random() * 50 - 25, Math.random() * 100 - 50],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
          className="absolute rounded-full bg-gradient-to-br from-yellowg/30 to-purpled/30 blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
        />
      ))}
    </div>
  );
};

// Floating Geometric Shapes
const FloatingShapes = () => {
  const shapes = [
    {
      type: "square",
      color: "yellowg",
      x: "20%",
      y: "25%",
      size: 40,
      rotation: 45,
    },
    {
      type: "circle",
      color: "purpled",
      x: "75%",
      y: "30%",
      size: 30,
      rotation: 0,
    },
    {
      type: "triangle",
      color: "blu",
      x: "30%",
      y: "65%",
      size: 35,
      rotation: 120,
    },
    {
      type: "square",
      color: "greeno",
      x: "70%",
      y: "60%",
      size: 25,
      rotation: 0,
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.2, 1],
            rotate: [
              shape.rotation,
              shape.rotation + 180,
              shape.rotation + 360,
            ],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12 + index * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute bg-${shape.color}/10 border border-${shape.color}/20 backdrop-blur-sm`}
          style={{
            left: shape.x,
            top: shape.y,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            borderRadius:
              shape.type === "circle"
                ? "50%"
                : shape.type === "triangle"
                  ? "0"
                  : "8px",
            clipPath:
              shape.type === "triangle"
                ? "polygon(50% 0%, 0% 100%, 100% 100%)"
                : "none",
          }}
        />
      ))}
    </div>
  );
};

// Floating Code Tags
const FloatingCodeTags = () => {
  const codeTags = [
    { text: "</>", x: "12%", y: "35%", delay: 0 },
    { text: "{ }", x: "88%", y: "40%", delay: 1 },
    { text: "< >", x: "18%", y: "55%", delay: 2 },
    { text: "fn()", x: "82%", y: "50%", delay: 1.5 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
      {codeTags.map((tag, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            y: [0, -15, 0],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 5 + index,
            repeat: Infinity,
            delay: tag.delay,
            ease: "easeInOut",
          }}
          className="absolute text-yellowg/30 font-mono text-xl sm:text-2xl font-bold"
          style={{
            left: tag.x,
            top: tag.y,
          }}
        >
          {tag.text}
        </motion.div>
      ))}
    </div>
  );
};

// Interactive Grid Dots
const GridDots = () => {
  const rows = 8;
  const cols = 12;
  const dots = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      dots.push({ row: i, col: j });
    }
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 hidden lg:block">
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 gap-4 p-8">
        {dots.map((dot, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0.3, 0.6, 0.3],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3 + (index % 5),
              repeat: Infinity,
              delay: index * 0.1,
              ease: "easeInOut",
            }}
            className="w-2 h-2 rounded-full bg-yellowg/50 mx-auto"
          />
        ))}
      </div>
    </div>
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

      {/* Floating Icons - Tech Stack */}
      <FloatingIcons />

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Floating Geometric Shapes */}
      <FloatingShapes />

      {/* Floating Code Tags */}
      <FloatingCodeTags />

      {/* Grid Dots Background */}
      <GridDots />

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
                <TypedText />
              </div>
            </div>
          </motion.div>

          {/* Middle Section - Profile Picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="relative w-48 sm:w-56 md:w-64 lg:w-72"
            >
              {/* Glow effect */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-br from-yellowg/30 to-purpled/30 rounded-full blur-2xl"
              />

              {/* Image container with glass effect */}
              <div className="relative backdrop-blur-sm bg-white/[0.05] border border-white/[0.15] rounded-full p-2 shadow-2xl">
                <img
                  src={HeroPic}
                  alt="Profile"
                  className="w-full aspect-square object-cover rounded-full relative z-10"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Right Section - About Me */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="order-3"
          >
            <div className="relative backdrop-blur-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.1] hover:border-yellowg/[0.3] rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-lg hover:shadow-yellowg/10 overflow-hidden">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellowg/[0.02] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl pointer-events-none"></div>

              <div className="relative z-10 space-y-4 sm:space-y-5">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl sm:text-3xl font-bold font-serif text-yellowg"
                >
                  About Me
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm sm:text-base leading-relaxed text-white/70"
                >
                  I'm a web developer based in Indonesia. I have a passion for
                  web development and love to create new things.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.a
                    href="/CV_MARCELINUS_DINOGLIDE_YOGA_PRAKOSO.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    download="Marcelinus_Dinoglide_Yoga_Prakoso_Resume.pdf"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-yellowg/10 hover:bg-yellowg/20 backdrop-blur-xl border border-yellowg/30 hover:border-yellowg/50 text-yellowg font-semibold rounded-xl transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-yellowg/20"
                  >
                    <span>Download Resume</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
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
        : fullText.substring(0, text.length + 1),
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
    <div className="min-h-[80px] sm:min-h-[90px]">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
        {text}
        <span className="text-yellowg animate-pulse ml-1">|</span>
      </h1>
    </div>
  );
}

export default hero;
