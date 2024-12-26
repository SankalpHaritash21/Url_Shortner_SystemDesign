"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const WelcomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-gray-100 relative">
      {/* Subtle Silver Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 opacity-50 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        {/* Main Heading */}
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-silver to-gray-300"
        >
          <span className="text-gray-500">Welcome to</span>{" "}
          <span className="text-white">LinkLite</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="text-lg md:text-2xl text-gray-400 mb-12"
        >
          Simplify your URLs and share them effortlessly!
        </motion.p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          >
            <Link
              href="/url"
              className="inline-block px-8 py-3 bg-gradient-to-r from-gray-700 to-gray-500 text-white font-bold text-lg rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all"
            >
              Go to App
            </Link>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          >
            <Link
              href="/urltrack"
              className="inline-block px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-400 text-black font-bold text-lg rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all"
            >
              Track URLs
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomePage;
