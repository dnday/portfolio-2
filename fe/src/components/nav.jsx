import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiMenuAlt1 } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navHeight = scrolled ? 70 : 80;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    document.documentElement.style.setProperty(
      "--navbar-height",
      `${navHeight}px`,
    );

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled, navHeight]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--navbar-height",
      `${navHeight}px`,
    );
  }, [navHeight]);

  useEffect(() => {
    setToggle(false);
  }, [location]);

  return (
    <>
      <div style={{ height: `${navHeight}px` }} className="w-full" />

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-4"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`backdrop-blur-xl bg-white/[0.03] border border-white/[0.1] rounded-full transition-all duration-500 ${
              scrolled
                ? "shadow-lg shadow-black/20 bg-white/[0.05]"
                : "shadow-md"
            }`}
          >
            <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 h-14">
              {/* Logo */}
              <Link
                to="/"
                className="font-bold text-xl sm:text-2xl tracking-wide flex items-center group relative"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-yellowg via-yellow-400 to-yellowg bg-clip-text text-transparent relative"
                >
                  Marcel
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-yellowg to-yellow-400"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                {["home", "skills", "projects", "about", "contact"].map(
                  (item, index) => (
                    <NavLink
                      key={item}
                      to={item === "home" ? "/" : `/${item}`}
                      isActive={
                        item === "home"
                          ? location.pathname === "/"
                          : location.pathname === `/${item}`
                      }
                      delay={index * 0.1}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </NavLink>
                  ),
                )}
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setToggle(!toggle)}
                className="lg:hidden backdrop-blur-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] hover:border-yellowg/[0.3] rounded-lg p-2 transition-all duration-300"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {toggle ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <AiOutlineClose size={24} className="text-yellowg" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiMenuAlt1 size={24} className="text-white/70" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {toggle && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="lg:hidden absolute top-full left-0 right-0 mt-2 px-4 sm:px-6"
            >
              <div className="backdrop-blur-xl bg-white/[0.05] border border-white/[0.1] rounded-3xl shadow-xl shadow-black/20 overflow-hidden">
                <div className="p-4">
                  <ul className="flex flex-col gap-2">
                    {["home", "skills", "projects", "about", "contact"].map(
                      (item, index) => (
                        <motion.li
                          key={item}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{
                            delay: index * 0.08,
                            duration: 0.3,
                          }}
                        >
                          <Link
                            to={item === "home" ? "/" : `/${item}`}
                            className={`block py-3 px-4 rounded-xl transition-all duration-300 relative group overflow-hidden ${
                              (
                                item === "home"
                                  ? location.pathname === "/"
                                  : location.pathname === `/${item}`
                              )
                                ? "backdrop-blur-xl bg-white/[0.08] text-yellowg border border-yellowg/[0.3]"
                                : "text-gray-300 hover:bg-white/[0.05] hover:text-yellowg"
                            }`}
                          >
                            <span className="relative z-10 font-medium">
                              {item.charAt(0).toUpperCase() + item.slice(1)}
                            </span>
                            {(item === "home"
                              ? location.pathname === "/"
                              : location.pathname === `/${item}`) && (
                              <motion.div
                                layoutId="mobileActiveIndicator"
                                className="absolute inset-0 bg-gradient-to-r from-yellowg/10 to-transparent rounded-xl"
                              />
                            )}
                          </Link>
                        </motion.li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

const NavLink = ({ to, children, isActive, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <Link
        to={to}
        className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-yellowg transition-colors duration-300 group block"
      >
        <span className="relative z-10">{children}</span>

        {/* Hover background */}
        <motion.span className="absolute inset-0 rounded-lg bg-white/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Active/Hover underline */}
        <motion.span
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-yellowg to-transparent transition-all duration-300 ${
            isActive
              ? "w-full opacity-100"
              : "w-0 opacity-0 group-hover:w-3/4 group-hover:opacity-100"
          }`}
        />

        {/* Active dot indicator */}
        {isActive && (
          <motion.span
            layoutId="activeNavDot"
            className="absolute -top-1 right-1 w-1.5 h-1.5 bg-yellowg rounded-full"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </Link>
    </motion.div>
  );
};

export default Nav;
