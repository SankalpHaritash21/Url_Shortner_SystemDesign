"use client";

import React from "react";
import { motion } from "framer-motion";
import UrlComponent from "@/components/URL";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 text-white flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Welcome to <span className="text-blue-400">URL Shortener</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Shorten your long URLs and share them easily with the world!
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-10 w-full max-w-lg"
      >
        <UrlComponent />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="mt-16"
      >
        <p className="text-gray-400">
          Built with ❤️ by{" "}
          <a href="#" className="text-blue-400 hover:underline">
            Sankalp Haritash
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default HomePage;
