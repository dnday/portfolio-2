import { motion } from "framer-motion";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";

export default function Footer() {
  const socialLinks = [
    {
      name: "Github",
      url: "https://github.com/dnday",
      icon: BsGithub,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/marcel9994",
      icon: BsTwitter,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/marcelinus-dinoglide-yoga-prakoso",
      icon: BsLinkedin,
    },
  ];

  return (
    <footer className="relative text-white py-16 px-4 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-t from-yellowg/5 to-transparent"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-8">
          {socialLinks.map((network) => {
            const Icon = network.icon;
            return (
              <motion.a
                key={network.name}
                href={network.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="backdrop-blur-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.1] hover:border-yellowg/[0.3] rounded-xl p-3 transition-all duration-300 group"
                aria-label={network.name}
              >
                <Icon className="w-5 h-5 text-white/70 group-hover:text-yellowg transition-colors" />
              </motion.a>
            );
          })}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent mb-6"></div>

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Marcel's. Inspired by{" "}
            <a
              href="https://seanhalpin.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellowg/70 hover:text-yellowg transition-colors"
            >
              Seán Halpin
            </a>
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
