import React, { useState, useEffect, useCallback, useRef } from "react";
import { debounce } from "../../lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeProvider, useTheme } from "../../context/ThemeContext";
import ClearConfirmationDialog from "@/components/ClearConfirmationDialog";

interface EditorProps {
  onChange: (value: string) => void;
  content?: string;
}

const DEFAULT_MARKDOWN =
  "# Welcome to the Markdown Editor\n\nStart typing your markdown here...";

const Editor: React.FC<EditorProps> = ({ onChange, content }) => {
  const [localValue, setLocalValue] = useState(content || DEFAULT_MARKDOWN);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showClearDialog, setShowClearDialog] = useState(false);

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

  return (
    <ThemeProvider>
      <div className="editor-pane h-[80vh]">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold mb-2">Markdown</h2>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleDownload}
              variant="customBlue"
              size="sm"
              className={`ml-auto`}
            >
              Download
            </Button>
            <Button
              onClick={handleDownload}
              variant="customBlue"
              size="sm"
              className={`ml-auto`}
            >
              Upload File
            </Button>

            <Button onClick={handleClear} variant="customBlue" size="default">
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
    </ThemeProvider>
  );
};

export default Editor;
