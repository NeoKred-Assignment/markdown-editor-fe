import React, { useState, useEffect, useCallback, useRef } from "react";
import { debounce } from "../../lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeProvider, useTheme } from "../../context/ThemeContext";
import ClearConfirmationDialog from "@/components/ClearConfirmationDialog";
import FileUploadModal from "@/components/FileUploadModal";
import { Download, Upload, Eraser } from "lucide-react"; 

interface EditorProps {
  onChange: (value: string) => void;
  content?: string;
  isLoading?: boolean;
  setIsLoading?: (loading: boolean) => void;
}

const DEFAULT_MARKDOWN =
  "# Welcome to the Markdown Editor\n\nStart typing your markdown here...";

const Editor: React.FC<EditorProps> = ({ onChange, content, isLoading = false, setIsLoading = () => {} }) => {
  const [localValue, setLocalValue] = useState(content || DEFAULT_MARKDOWN);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const { theme } = useTheme();

  console.log(theme, "theme");

  const handleClear = () => {
    setShowClearDialog(true);
  };

  const confirmClear = () => {
    onChange(
      "# Welcome to the Markdown Editor\n\nStart typing your markdown here..."
    );
    localStorage.setItem(
      "markdown-content",
      "# Welcome to the Markdown Editor\n\nStart typing your markdown here..."
    );
    setShowClearDialog(false);
  };

  // Create a properly memoized debounced function
  const debouncedOnChange = useCallback(
    debounce((text: string) => {
      onChange(text);
    }, 300),
    [onChange]
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    
    debouncedOnChange(newValue);
  };

  // Update local value when prop changes
  useEffect(() => {
    if (content !== undefined && content !== localValue) {
      setLocalValue(content || DEFAULT_MARKDOWN);
    }
  }, [content]);

  const handleDownload = () => {
    const blob = new Blob([localValue], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (fileContent: string) => {
    setLocalValue(fileContent);
    
    onChange(fileContent);
    localStorage.setItem("markdown-content", fileContent);
  };

  return (
    <ThemeProvider>
      <div className="editor-pane h-[85vh]">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold mb-2">Markdown</h2>

          <div className="flex items-center gap-2">
            {isLoading && (
              <span className="text-sm text-gray-500 animate-pulse">
                Processing...
              </span>
            )}
            <Button
              onClick={handleDownload}
              variant="customBlue"
              size="sm"
              className={`ml-auto`}
            >
              <Download size={16} className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button
              onClick={() => setShowUploadModal(true)}
              variant="customGreen"
              size="sm"
              className={`ml-auto`}
            >
              <Upload size={16} className="mr-2 h-4 w-4" />
              Upload File
            </Button>

            <Button
              onClick={handleClear}
              variant="customFuchsia"
              size="sm"
            >
              <Eraser size={16} className="mr-2 h-4 w-4" />
              Clear
            </Button>
          </div>
        </div>
        <textarea
          ref={textareaRef}
          className="editor-textarea"
          value={localValue}
          onChange={handleChange}
          placeholder="Type your markdown here..."
          spellCheck="false"
        />
      </div>

      <ClearConfirmationDialog
        open={showClearDialog}
        onOpenChange={setShowClearDialog}
        onConfirm={confirmClear}
      />

      <FileUploadModal
        open={showUploadModal}
        onOpenChange={setShowUploadModal}
        onFileUpload={handleFileUpload}
      />
    </ThemeProvider>
  );
};

export default Editor;
