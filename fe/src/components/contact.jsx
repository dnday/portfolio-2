import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FiMail, FiMessageSquare, FiSend, FiUser } from "react-icons/fi";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8081";

const Contact = () => {
  // Form state management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null,
  });

  // Refs for scroll animations
  const titleRef = useRef(null);
  const formRef = useRef(null);

  // Check if elements are in view
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.3 });
  const isFormInView = useInView(formRef, { once: true, amount: 0.1 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({
      isSubmitting: true,
      isSubmitted: false,
      error: null,
    });

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        error: null,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: error.message || "Failed to send message. Please try again.",
      });
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center items-center py-20 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-yellowg/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purpled/5 rounded-full blur-3xl"></div>

      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="w-full max-w-3xl mx-auto text-center mb-12 relative z-10"
      >
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 font-serif">
          Get in Touch
        </h2>
        <p className="text-lg text-gray-300 max-w-xl mx-auto">
          Have a question or want to work together? Feel free to drop me a
          message!
        </p>
      </motion.div>

      <motion.div
        ref={formRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="w-full max-w-2xl mx-auto relative z-10"
      >
        <div className="backdrop-blur-xl bg-white/[0.03] hover:bg-white/[0.06] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/[0.1] hover:border-yellowg/[0.3] transition-all duration-300 shadow-lg hover:shadow-yellowg/10 relative overflow-hidden group">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellowg/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl pointer-events-none"></div>

          <div className="relative z-10">
            {formStatus.isSubmitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-10"
              >
                <div className="w-16 h-16 bg-yellowg/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiSend className="text-3xl text-yellowg" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-300">
                  Thank you for reaching out. I'll get back to you as soon as
                  possible.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      isFormInView
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -20 }
                    }
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="relative"
                  >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-yellowg/50" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="backdrop-blur-xl bg-white/[0.05] border border-white/[0.1] text-white rounded-xl block w-full pl-10 p-3 focus:outline-none focus:ring-2 focus:ring-yellowg/50 focus:border-yellowg/30 transition-all duration-300 hover:bg-white/[0.08]"
                      placeholder="Your Name"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={
                      isFormInView
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: 20 }
                    }
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="relative"
                  >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-yellowg/50" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="backdrop-blur-xl bg-white/[0.05] border border-white/[0.1] text-white rounded-xl block w-full pl-10 p-3 focus:outline-none focus:ring-2 focus:ring-yellowg/50 focus:border-yellowg/30 transition-all duration-300 hover:bg-white/[0.08]"
                      placeholder="Your Email"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="relative"
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMessageSquare className="text-yellowg/50" />
                  </div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="backdrop-blur-xl bg-white/[0.05] border border-white/[0.1] text-white rounded-xl block w-full pl-10 p-3 focus:outline-none focus:ring-2 focus:ring-yellowg/50 focus:border-yellowg/30 transition-all duration-300 hover:bg-white/[0.08]"
                    placeholder="Subject"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="backdrop-blur-xl bg-white/[0.05] border border-white/[0.1] text-white rounded-xl block w-full p-3 focus:outline-none focus:ring-2 focus:ring-yellowg/50 focus:border-yellowg/30 transition-all duration-300 hover:bg-white/[0.08]"
                    placeholder="Your Message"
                  />
                </motion.div>

                {formStatus.error && (
                  <div className="text-red-400 text-sm p-2 bg-red-500/10 rounded">
                    {formStatus.error}
                  </div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.4, delay: 0.8 }}
                  className="flex justify-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={formStatus.isSubmitting}
                    className={`relative px-8 py-3 rounded-full overflow-hidden group backdrop-blur-xl bg-yellowg/90 hover:bg-yellowg border border-yellowg/50 shadow-lg hover:shadow-yellowg/30 transition-all duration-300 ${
                      formStatus.isSubmitting ? "opacity-80" : ""
                    }`}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-yellowg to-yellow-400 transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                    <span className="relative flex items-center justify-center space-x-2 text-black font-medium">
                      {formStatus.isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <FiSend className="text-black" />
                          <span>Send Message</span>
                        </>
                      )}
                    </span>
                  </motion.button>
                </motion.div>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
