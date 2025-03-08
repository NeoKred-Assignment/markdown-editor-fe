import { useState, useEffect, useRef } from "react";
import Editor from "./Editor";
import { debounce } from "@/lib/utils";
import { convertMarkdownToHtml } from "@/services/markdownService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Preview from "./Preview/Preview";

const MarkdownContainer = ({ markdown, setMarkdown }) => {
  const [html, setHtml] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const prevMarkdownRef = useRef<string>("");

  const debouncedConvertRef = useRef(
    debounce(async (text: string) => {
      if (!text || !text.trim()) {
        setHtml("");
        setIsLoading(false);
        return;
      }

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
    }, 500)
  ).current;

  useEffect(() => {
    if (markdown !== prevMarkdownRef.current) {
      debouncedConvertRef(markdown);
    }
  }, [markdown]);

  return (
    <div className="markdown-editor h-full flex flex-col md:flex-row ">
      <Editor content={markdown} onChange={setMarkdown} />
      <Preview html={html} isLoading={isLoading} />

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
