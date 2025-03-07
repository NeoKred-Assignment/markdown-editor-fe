import React, { useState, useEffect, useCallback } from "react";
import Editor from "./Editor";
import Preview from "./Preview";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { debounce } from "@/lib/utils";
import { DEFAULT_MARKDOWN } from "@/constants/defaultMarkdown";

const MarkdownContainer = ({ markdown, setMarkdown }) => {
  const [html, setHtml] = useState<string>("");

  const convertMarkdownToHtml = useCallback(async (text: string) => {
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
      setHtml(data.html);
    } catch (error) {
      console.error("Error converting markdown:", error);
    }
  }, []);

  const debouncedConvert = debounce(convertMarkdownToHtml, 300);

  useEffect(() => {
    debouncedConvert(markdown);
  }, [markdown, debouncedConvert]);

  return (
    <div className="markdown-editor h-full flex flex-col md:flex-row">
      <Editor content={markdown} onChange={setMarkdown} />
      <Preview html={html} />
      {/* <div className="fixed bottom-4 right-4">
        <button
          onClick={() => {}}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-sm"
        >
          Using: Backend API
        </button>
      </div> */}
    </div>
  );
};

export default MarkdownContainer;
