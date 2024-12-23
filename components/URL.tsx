"use client";
import React, { useState } from "react";
import axios from "axios";

const UrlComponent = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const url = "https://url-shortner-system-design.vercel.app";
  // process.env.NEXT_PUBLIC_API_URL || "https://url-shortner-system-design.vercel.app/";

  interface ShortenResponse {
    shortUrl: string;
  }

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
    } catch (error) {
      console.error("Error creating short URL", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
        URL Shortener
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="url"
          placeholder="Enter your long URL"
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
        <div className="mt-6 text-center">
          <p className="text-gray-700 font-medium">Your Shortened URL:</p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-bold hover:underline break-all"
          >
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default UrlComponent;
