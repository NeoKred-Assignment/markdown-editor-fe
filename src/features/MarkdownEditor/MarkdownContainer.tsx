import React, { useState, useEffect, useCallback, useRef } from "react";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const prevMarkdownRef = useRef<string>("");
  
  // Create a stable debounced function that won't change on re-renders
  const debouncedConvertRef = useRef(
    debounce(async (text: string) => {
      // Skip API call if text is empty or only whitespace
      if (!text || !text.trim()) {
        setHtml(""); // Clear the HTML when markdown is empty
        setIsLoading(false);
        return;
      }
      
      // Skip if the text hasn't actually changed
      if (text === prevMarkdownRef.current) {
        return;
      }
      
      prevMarkdownRef.current = text;
      setIsLoading(true);
      
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
      } finally {
        setIsLoading(false);
      }
    }, 500) // Increased debounce time to 500ms for better performance
  ).current;

  // Use a simpler useEffect without complex dependencies
  useEffect(() => {
    if (markdown !== prevMarkdownRef.current) {
      debouncedConvertRef(markdown);
    }
  }, [markdown]);

  return (
    <div className="markdown-editor h-full flex flex-col md:flex-row ">
      <Editor content={markdown} onChange={setMarkdown} />
      <Preview html={html} isLoading={isLoading} />
      
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
