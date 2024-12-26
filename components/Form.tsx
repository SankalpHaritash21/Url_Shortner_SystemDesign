"use client";

import { isValidUrl } from "@/utils/validation";
import { useState } from "react";

type Hop = {
  url: string;
  statusCode: number;
};

type TrackingResult = {
  hops: Hop[];
  finalUrl: string;
};

interface UrlFormProps {
  onSubmit: (result: TrackingResult) => void; // Use TrackingResult instead of any
}

export default function UrlForm({ onSubmit }: UrlFormProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidUrl(url)) {
      setError("Please enter a valid URL");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/trace", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      onSubmit(result);
    } catch (error) {
      console.error(error);
      setError("An error occurred while tracking the URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-12">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter a URL to track"
          className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors disabled:opacity-50"
        >
          {loading ? "Tracking..." : "Track URL"}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-red-500 dark:text-red-400 text-center">
          {error}
        </p>
      )}
    </form>
  );
}
