"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center px-6 py-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
          <path
            d="M0 400 L300 200 L600 400 L900 100 L1200 300"
            stroke="url(#gradient1)"
            strokeWidth="1"
            opacity="0.3"
          />
          <path
            d="M0 500 L400 300 L800 500 L1200 200"
            stroke="url(#gradient2)"
            strokeWidth="1"
            opacity="0.2"
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <div className="flex items-center justify-center mb-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              duration: 0.5,
              ease: "easeIn",
              stiffness: 100,
              damping: 10,
            }}
            className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/20"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-gray-300 text-sm">
              Powered by Advanced AI
            </span>
          </motion.div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            duration: 0.5,
            delay: 0.2,
            ease: "easeIn",
            stiffness: 100,
            damping: 10,
          }}
          className="text-5xl font-semibold text-white mb-3 leading-tight"
        >
          Revolutionary AI
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            chat experience
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            duration: 0.5,
            delay: 0.3,
            ease: "easeIn",
            stiffness: 100,
            damping: 10,
          }}
          className="text-lg text-gray-300 mb-5 max-w-3xl mx-auto leading-relaxed md:px-12"
        >
          Experience the future of conversation. Build smarter workflows, get
          instant answers, and unlock your team&apos;s potential.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            duration: 0.5,
            delay: 0.4,
            ease: "easeIn",
            stiffness: 100,
            damping: 10,
          }}
        >
          <Link href={"/signup"}>
            <Button className="bg-blue-500/70 hover:bg-blue-500 cursor-pointer items-center font-semibold text-white">
              <MessageCircle />
              <span>Start for free</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>

          <p className="text-gray-400 text-xs mt-5">
            No credit card required • Start chatting instantly
          </p>
        </motion.div>
      </div>
    </section>
  );
};
