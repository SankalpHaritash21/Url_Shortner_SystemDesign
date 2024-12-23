"use client";
import React, { useState } from "react";
import axios from "axios";

const App = () => {
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
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-600 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">URL Shortener</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="url"
            placeholder="Enter your URL"
            className="w-full p-2 border border-gray-300 text-black rounded mb-4"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Shorten URL
          </button>
        </form>
        {shortUrl && (
          <div className="mt-4">
            <p className="text-gray-700">Shortened URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
