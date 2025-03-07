// Define base URL and endpoints as constants
const API_BASE_URL = "http://localhost:8000";
const MARKDOWN_ENDPOINT = "/v1/markdown";

export const convertMarkdownToHtml = async (text: string): Promise<string> => {
  // Return empty string for empty input
  if (!text || !text.trim()) {
    return "";
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}${MARKDOWN_ENDPOINT}`, {
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
