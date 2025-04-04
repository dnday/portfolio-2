import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Nav from "./nav";
import Hero from "./hero";
import Skill from "./skill";
import Project from "./project";
import About from "./about";
import Contact from "./contact";
import Footer from "./footer";
import ScrollToTop from "./scrollToTop";
import PageTransition from "./pageTransition"; // Add this import

const Main = () => {
  const location = useLocation();

  return (
    <div>
      <Nav />
      <ScrollToTop />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition type="fade">
                <Hero />
              </PageTransition>
            }
          />
          <Route
            path="/skills"
            element={
              <PageTransition type="reveal">
                <Skill />
              </PageTransition>
            }
          />
          <Route
            path="/projects"
            element={
              <PageTransition type="slide">
                <Project />
              </PageTransition>
            }
          />
          <Route
            path="/about"
            element={
              <PageTransition type="flip">
                <About />
              </PageTransition>
            }
          />
          <Route
            path="/contact"
            element={
              <PageTransition type="slide">
                <Contact />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Main;
