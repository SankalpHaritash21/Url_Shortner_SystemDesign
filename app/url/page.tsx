"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import UrlComponent from "@/components/URL";
import { FaHashnode } from "react-icons/fa6";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { gitHub, hashNode, linkedIn } from "@/constant/constant";

const URLShortener = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 text-white flex flex-col items-center justify-center px-4 relative">
      {/* Icons at Top Right */}
      <div className="absolute top-4 right-4 flex space-x-4">
        <Link
          href={`${gitHub}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-blue-400 text-2xl transition-colors"
        >
          <FaGithub />
        </Link>
        <Link
          href={`${linkedIn}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-blue-400 text-2xl transition-colors"
        >
          <FaLinkedin />
        </Link>
        <Link
          href={`${hashNode}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-blue-400 text-2xl transition-colors"
        >
          <FaHashnode />
        </Link>
      </div>

      {/* Main Content */}
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

export default URLShortener;
