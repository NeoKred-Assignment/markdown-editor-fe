/**
 * Service for markdown-related API calls
 */

/**
 * Converts markdown text to HTML by calling the backend API
 * @param text Markdown text to convert
 * @returns Converted HTML as a string
 */
export const convertMarkdownToHtml = async (text: string): Promise<string> => {
  // Return empty string for empty input
  if (!text || !text.trim()) {
    return "";
  }
  
  try {
    const response = await fetch("http://localhost:8000/v1/markdown", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ markdown: text }),
    });

    if (!response.ok) {
      throw new Error("Failed to convert markdown");
    }

    const data = await response.json();
    return data.html;
  } catch (error) {
    console.error("Error converting markdown:", error);
    throw error;
  }
};
