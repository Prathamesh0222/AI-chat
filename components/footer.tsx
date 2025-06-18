"use client";

import { Github, Linkedin } from "lucide-react";

export const Footer = () => {
  const handleGithubClick = () => {
    window.open("https://github.com/Prathamesh0222");
  };
  const handleLinkedinClick = () => {
    window.open("https://www.linkedin.com/in/prathamesh-pimpalkar-903b0621a/");
  };
  return (
    <footer className="text-white/75 py-5 relative">
      <div className="flex justify-between max-w-7xl mx-auto items-center text-sm">
        <p>Designed & Developed By Prathamesh</p>
        <div className="flex gap-2">
          <div className="hover:bg-blue-400/20 rounded-full cursor-pointer p-2.5 duration-300 transition-color">
            <Github onClick={handleGithubClick} className="w-6 h-6" />
          </div>
          <div className="hover:bg-blue-400/20 rounded-full cursor-pointer p-2.5 duration-300 transition-color">
            <Linkedin onClick={handleLinkedinClick} className="w-6 h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
};
