"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export const Header = () => {
  return (
    <header className="relative z-50 px-6 py-4">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          duration: 0.5,
          stiffness: 100,
          damping: 10,
          bounce: 0.5,
        }}
        className="flex items-center justify-between max-w-7xl mx-auto"
      >
        <div>
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05, rotate: -30 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center"
            >
              <motion.span className="text-white font-bold text-sm">
                AI
              </motion.span>
            </motion.div>
            <span className="text-white font-semibold text-xl">ChatFlow</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/signin">
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="text-gray-300 hover:text-white cursor-pointer duration-300 transition-colors"
              >
                Sign in
              </Button>
            </motion.div>
          </Link>
          <Link href="/signup">
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white cursor-pointer duration-300 transition-colors">
                Get Started
              </Button>
            </motion.div>
          </Link>
        </div>
      </motion.nav>
    </header>
  );
};
