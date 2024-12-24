"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaClipboard, FaClipboardCheck } from "react-icons/fa";

const UrlComponent = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [shortUrl, setShortUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const url = "https://url-shortner-system-design.vercel.app"; //"http://localhost:3000"

  interface ShortenResponse {
    shortUrl: string;
  }

  const focusField = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === "k") {
      e.preventDefault();
      searchInputRef.current?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<ShortenResponse>(
        `${url}/api/shortner`,
        {
          originalUrl,
        }
      );
      setShortUrl(response.data.shortUrl);
      setIsCopied(false); // Reset copied status when a new URL is generated
    } catch (error) {
      console.error("Error creating short URL", error);
    }
  };

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      setIsCopied(true);

      // Reset copied status after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        focusField(e);
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
        URL Shortener
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="url"
          ref={searchInputRef}
          placeholder="Enter your long URL (CTRL + K)"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
        >
          Shorten URL
        </button>
      </form>
      {shortUrl && (
        <div className="mt-6 text-center space-y-2">
          <p className="text-gray-700 font-medium">Your Shortened URL:</p>
          <div className="flex items-center justify-center space-x-2">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-bold hover:underline break-all"
            >
              {shortUrl}
            </a>
            <button
              onClick={handleCopy}
              className="text-gray-500 hover:text-blue-500 focus:outline-none transition duration-200"
              title="Copy to clipboard"
            >
              {isCopied ? (
                <FaClipboardCheck className="text-green-500" size={20} />
              ) : (
                <FaClipboard size={20} />
              )}
            </button>
          </div>
          {isCopied && (
            <p className="text-sm text-green-500">Copied to clipboard!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UrlComponent;
