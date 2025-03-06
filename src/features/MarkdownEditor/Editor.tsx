import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "../../lib/utils";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  content?: string;
}

const DEFAULT_MARKDOWN = "# Welcome to the Markdown Editor\n\nStart typing your markdown here...";


const Editor: React.FC<EditorProps> = ({ onChange, content }) => {
  const [localValue, setLocalValue] = useState(content || DEFAULT_MARKDOWN);

  // Use the debounce utility function
  const debouncedOnChange = useCallback(
    (text: string) => {
      debounce(() => onChange(text), 300)();
    },
    [onChange]
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    debouncedOnChange(newValue);
  };

  // Update local value when prop changes
  useEffect(() => {
    setLocalValue(content || DEFAULT_MARKDOWN);
  }, [content]);

  return (
    <div className="editor-pane h-screen">
      <h2 className="text-lg font-bold mb-2">Markdown</h2>
      <textarea
        className="editor-textarea"
        value={localValue}
        onChange={handleChange}
        placeholder="Type your markdown here..."
        spellCheck="false"
      />
    </div>
  );
};

export default Editor;
