import React, { useState, lazy, Suspense } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { DEFAULT_MARKDOWN } from "./constants/defaultMarkdown";
import MainLayout from "./layout/MainLayout";
import ClearConfirmationDialog from "./components/ClearConfirmationDialog";
import { ThemeProvider } from "./context/ThemeContext";
import Loader from "./components/Loader";

// Lazy load the MarkdownContainer component
const MarkdownContainer = lazy(() => import("./features/MarkdownEditor/MarkdownContainer"));

const App: React.FC = () => {
  const [markdown, setMarkdown] = useLocalStorage(
    "markdown-content",
    DEFAULT_MARKDOWN
  );


  const handleUpload = (e: React.ChangeEvent<HTMLInputElement> | string) => {
    if (typeof e === 'string') {
      setMarkdown(e);
      return;
    }
    
    // Handle file input change event
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


  return (
    <ThemeProvider>
      <MainLayout
        onUpload={handleUpload}
      >
        <Suspense fallback={<Loader />}>
          <MarkdownContainer 
            markdown={markdown} 
            setMarkdown={setMarkdown}
          />
        </Suspense>
      </MainLayout>
    
    </ThemeProvider>
  );
};

export default App;
