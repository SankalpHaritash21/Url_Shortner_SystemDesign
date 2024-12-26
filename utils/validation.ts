export const isValidUrl = (url: string): boolean => {
  if (!url) return false;

  try {
    const parsedUrl = new URL(url.trim());
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch (error) {
    console.error(error);
    return false;
  }
};
