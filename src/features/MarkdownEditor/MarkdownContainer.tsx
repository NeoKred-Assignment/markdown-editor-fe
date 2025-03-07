import React, { useState, useEffect, useCallback } from "react";
import Editor from "./Editor";
import Preview from "./Preview";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { debounce } from "@/lib/utils";
import { DEFAULT_MARKDOWN } from "@/constants/defaultMarkdown";
import { convertMarkdownToHtml } from "@/services/markdownService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MarkdownContainer = ({ markdown, setMarkdown }) => {
  const [html, setHtml] = useState<string>("");

  const handleMarkdownConversion = useCallback(async (text: string) => {
    // Skip API call if text is empty or only whitespace
    if (!text || !text.trim()) {
      setHtml(""); // Clear the HTML when markdown is empty
      return;
    }

    try {
      const htmlContent = await convertMarkdownToHtml(text);
      setHtml(htmlContent);
    } catch (error) {
      console.error("Error in markdown conversion:", error);
      toast.error("Failed to convert markdown. Please try again later.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, []);

  const debouncedConvert = debounce(handleMarkdownConversion, 300);

  useEffect(() => {
    debouncedConvert(markdown);
  }, [markdown, debouncedConvert]);

  return (
    <div className="markdown-editor h-full flex flex-col md:flex-row">
      <Editor content={markdown} onChange={setMarkdown} />
      <Preview html={html} />
      
      {/* Toast container for notifications */}
      <ToastContainer 
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default MarkdownContainer;
