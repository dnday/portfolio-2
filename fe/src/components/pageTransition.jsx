import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const PageTransition = ({ children, type = "fade" }) => {
  // Collection of transition effects
  const transitions = {
    // Smooth fade with slight zoom
    fade: {
      initial: { opacity: 0, scale: 0.98 },
      animate: { 
        opacity: 1, 
        scale: 1,
        transition: { 
          duration: 0.7, 
          ease: [0.22, 1, 0.36, 1] 
        }
      },
      exit: { 
        opacity: 0, 
        scale: 1.02,
        transition: { 
          duration: 0.5, 
          ease: [0.22, 1, 0.36, 1] 
        }
      }
    },
    
    // Slide from side with rotation
    slide: {
      initial: { opacity: 0, x: -100, rotateY: 15 },
      animate: { 
        opacity: 1, 
        x: 0, 
        rotateY: 0,
        transition: { 
          duration: 0.6, 
          ease: [0.25, 1, 0.5, 1],
          staggerChildren: 0.1
        }
      },
      exit: { 
        opacity: 0, 
        x: 100, 
        rotateY: -15,
        transition: { 
          duration: 0.4, 
          ease: [0.25, 1, 0.5, 1] 
        }
      }
    },
    
    // Card flip effect
    flip: {
      initial: { opacity: 0, rotateX: 20, rotateY: -20, scale: 0.95 },
      animate: { 
        opacity: 1, 
        rotateX: 0, 
        rotateY: 0, 
        scale: 1,
        transition: { 
          duration: 0.8, 
          ease: [0.16, 1, 0.3, 1] 
        }
      },
      exit: { 
        opacity: 0, 
        rotateX: -20, 
        rotateY: 20, 
        scale: 0.95,
        transition: { 
          duration: 0.5, 
          ease: [0.16, 1, 0.3, 1] 
        }
      }
    },
    
    // Reveal from bottom
    reveal: {
      initial: { opacity: 0, y: 80 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.7, 
          ease: [0.2, 0.65, 0.3, 0.9] 
        }
      },
      exit: { 
        opacity: 0, 
        y: -80,
        transition: { 
          duration: 0.5, 
          ease: [0.2, 0.65, 0.3, 0.9] 
        }
      }
    }
  };
  
  // Select the transition based on type prop
  const selectedTransition = transitions[type] || transitions.fade;
  
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={selectedTransition}
      style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
};

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['fade', 'slide', 'flip', 'reveal'])
};

export default PageTransition;