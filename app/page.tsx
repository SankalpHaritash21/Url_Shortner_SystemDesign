"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const WelcomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-gray-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold mb-6 text-purple-400"
        >
          Welcome to <span className="text-blue-500">Shortly</span>
        </motion.h1>
        <motion.p
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="text-lg md:text-2xl text-gray-300 mb-8"
        >
          Simplify your URLs and share them effortlessly!
        </motion.p>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        >
          <Link
            href="/url"
            className="inline-block px-6 py-3 bg-purple-600 text-gray-100 font-bold text-lg rounded-full shadow-lg hover:bg-purple-500 transition-all"
          >
            Go to App
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WelcomePage;
