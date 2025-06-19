"use client";

import { Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export const Footer = () => {
  const handleGithubClick = () => {
    window.open("https://github.com/Prathamesh0222");
  };
  const handleLinkedinClick = () => {
    window.open("https://www.linkedin.com/in/prathamesh-pimpalkar-903b0621a/");
  };
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        duration: 0.5,
        delay: 0.5,
        ease: "easeIn",
        stiffness: 100,
        damping: 10,
      }}
      className="text-white/75 py-5 relative"
    >
      <div className="flex justify-between max-w-7xl mx-auto items-center text-sm">
        <p>Designed & Developed By Prathamesh</p>
        <div className="flex gap-2">
          <motion.div
            whileHover={{ scale: 1.05, rotate: -30 }}
            whileTap={{ scale: 0.95 }}
            className="hover:bg-blue-400/20 rounded-full cursor-pointer p-2.5 transition-color"
          >
            <Github onClick={handleGithubClick} className="w-6 h-6" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, rotate: -30 }}
            whileTap={{ scale: 0.95 }}
            className="hover:bg-blue-400/20 rounded-full cursor-pointer p-2.5 transition-color"
          >
            <Linkedin onClick={handleLinkedinClick} className="w-6 h-6" />
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};
