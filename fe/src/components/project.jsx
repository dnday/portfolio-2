import Proj1IMG from "../assets/Project1.png";
import Proj2IMG from "../assets/Project2.png";
import { motion } from "framer-motion";

export default function Project() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <div className="m-20 mt-0 max-w-full rounded-2xl">
        <motion.div
          className="flex justify-center m-10"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-serif text-7xl font-semibold text-yellowg">
            Projects.
          </h1>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-10 p-5">
            {/* Project 1 */}
            <motion.div
              className="max-w-md mx-auto bg-gradient-to-r from-yellowg to-purpled rounded-xl shadow-xl overflow-hidden md:max-w-2xl hover:shadow-2xl transition-shadow"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            >
              <div className="flex flex-col xl:flex-row gap-5">
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-purpled font-semibold">
                    Movie Recommendation Bot Twitter
                  </div>
                  <p className="mt-2 text-gray-800">
                    This is a movie recommendation bot from IMDB using Python,
                    Tweepy, and IMDB API.
                  </p>
                  <p className="mt-4 text-black font-medium">
                    Python, Tweepy, IMDB API
                  </p>
                  <a
                    href="https://github.com/dnday/movie-twitter-bot"
                    target="_blank"
                    className="mt-4 inline-block px-6 py-2 border-2 bg-greeno border-greeno text-black rounded-full hover:bg-blu hover:text-white transition duration-300 ease-in-out"
                  >
                    Link Here
                  </a>
                </div>
                <div className="md:shrink-0 flex justify-center items-center p-6">
                  <a
                    href="https://github.com/dnday/movie-twitter-bot"
                    target="_blank"
                  >
                    <motion.img
                      src={Proj1IMG}
                      alt="Movie Recommendation Bot"
                      className="object-cover rounded-lg w-72 h-72 p-4"
                      whileHover={{ scale: 1.1, rotate: 3 }}
                    />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Project 2 */}
            <motion.div
              className="max-w-md mx-auto bg-gradient-to-r from-yellowg to-blu rounded-xl shadow-xl overflow-hidden md:max-w-2xl hover:shadow-2xl transition-shadow"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            >
              <div className="flex flex-col xl:flex-row gap-5">
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-blu font-semibold">
                    Book Management
                  </div>
                  <p className="mt-2 text-gray-800">
                    A backend application to manage book data and employees,
                    built using Golang and MongoDB. It includes CRUD operations
                    for book data and employees.
                  </p>
                  <p className="mt-4 font-medium">Golang, MongoDB, REST API</p>
                  <a
                    href="https://github.com/dnday/golangproject"
                    target="_blank"
                    className="mt-4 inline-block px-6 py-2 border-2 bg-greeno border-greeno text-black rounded-full hover:bg-blu hover:text-white transition duration-300 ease-in-out"
                  >
                    Link Here
                  </a>
                </div>
                <div className="md:shrink-0 flex justify-center items-center p-6">
                  <motion.img
                    src={Proj2IMG}
                    alt="Book Management System"
                    className="object-cover rounded-lg w-72 h-72 p-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
