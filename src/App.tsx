import React, { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import MarkdownContainer from "./features/MarkdownEditor/MarkdownContainer";
import { DEFAULT_MARKDOWN } from "./constants/defaultMarkdown";
import MainLayout from "./layout/MainLayout";
import ClearConfirmationDialog from "./components/ClearConfirmationDialog";
import { ThemeProvider } from "./context/ThemeContext";

const App: React.FC = () => {
  const [markdown, setMarkdown] = useLocalStorage(
    "markdown-content",
    DEFAULT_MARKDOWN
  );
  const [showClearDialog, setShowClearDialog] = useState(false);

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setMarkdown(content);
      };
      reader.readAsText(file);
    }
  };

  const handleClear = () => {
    setShowClearDialog(true);
  };

  const confirmClear = () => {
    setMarkdown("# Welcome to the Markdown Editor\n\nStart typing your markdown here...");
    localStorage.setItem("markdown-content", "# Welcome to the Markdown Editor\n\nStart typing your markdown here...");
    setShowClearDialog(false);
  };

  return (
    <ThemeProvider>
      <MainLayout
        onUpload={handleUpload}
        onDownload={handleDownload}
        onClear={handleClear}
      >
        <MarkdownContainer 
          markdown={markdown} 
          setMarkdown={setMarkdown} 
        />
      </MainLayout>
      
      <ClearConfirmationDialog
        open={showClearDialog}
        onOpenChange={setShowClearDialog}
        onConfirm={confirmClear}
      />
    </ThemeProvider>
  );
};

export default App;
