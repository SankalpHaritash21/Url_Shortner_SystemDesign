import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

type UrlData = {
  originalUrl: string;
  creationTime: number;
};

const urlGraph = new Map<string, UrlData>();
const baseUrl = "http://localhost:3000"; //"https://url-shortner-system-design.vercel.app";
let numberOfRequests: { [key: string]: number } = {};

// Reset rate-limiting data every second
setInterval(() => {
  numberOfRequests = {};
}, 1000);

export async function POST(req: Request) {
  const { originalUrl } = await req.json();

  // Validate URL
  if (!originalUrl || typeof originalUrl !== "string") {
    return NextResponse.json(
      { message: "Invalid or missing URL" },
      { status: 400 }
    );
  }

  // Check if URL is valid using the URL constructor
  let validatedUrl: URL;
  try {
    validatedUrl = new URL(originalUrl);
  } catch {
    return NextResponse.json(
      { message: "Invalid URL format" },
      { status: 400 }
    );
  }

  // Ensure the URL has http:// or https://
  if (!/^https?:\/\//i.test(validatedUrl.href)) {
    validatedUrl = new URL(`http://${originalUrl}`);
  }

  // Rate limiting
  if (numberOfRequests[validatedUrl.href]) {
    if (numberOfRequests[validatedUrl.href] >= 5) {
      return NextResponse.json(
        { message: "Too many requests. Try again later." },
        { status: 429 }
      );
    }
    numberOfRequests[validatedUrl.href]++;
  } else {
    numberOfRequests[validatedUrl.href] = 1;
  }

  // Generate a unique short ID
  const shortId = nanoid(6);
  const creationTime = Date.now();
  urlGraph.set(shortId, { originalUrl: validatedUrl.href, creationTime });

  return NextResponse.json({
    shortUrl: `${baseUrl}/api/${shortId}`,
  });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  if (id && urlGraph.has(id)) {
    const { originalUrl, creationTime } = urlGraph.get(id)!;
    const currentTime = Date.now();

    // Check expiration (30 minutes)
    if (currentTime - creationTime > 30 * 60 * 1000) {
      urlGraph.delete(id); // Remove expired URL
      return NextResponse.json({ message: "URL has expired" }, { status: 410 });
    }

    return NextResponse.redirect(originalUrl);
  }

  return NextResponse.json({ message: "URL not found" }, { status: 404 });
}
