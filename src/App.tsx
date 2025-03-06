import React from "react";
import ThemeToggle from "./components/ThemeToggle";
import Button from "./components/Button";
import { useLocalStorage } from "./hooks/useLocalStorage";
import MarkdownContainer from "./features/MarkdownEditor/MarkdownContainer";

// Sample markdown for initial content
const DEFAULT_MARKDOWN = `# Welcome to Markdown Editor

## Features
- Real-time preview
- Syntax highlighting
- Dark mode support

## Code Example
\`\`\`javascript
function greeting(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

## Table Example
| Name | Age | Occupation |
|------|-----|------------|
| John | 30  | Developer  |
| Jane | 25  | Designer   |

Enjoy writing markdown!
`;

const App: React.FC = () => {
  const [markdown, setMarkdown] = useLocalStorage(
    "markdown-content",
    DEFAULT_MARKDOWN
  );

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
    if (window.confirm("Are you sure you want to clear the editor?")) {
      setMarkdown("");
    }
  };

  return (
    <div className="min-h-screen">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">Real-time Markdown Editor</h1>
          <div className="flex space-x-2">
            <input
              type="file"
              accept=".md"
              id="upload"
              className="hidden"
              onChange={handleUpload}
            />
            <label htmlFor="upload">
              <Button onClick={() => {}} className="cursor-pointer">
                Upload
              </Button>
            </label>
            <Button onClick={handleDownload}>Download</Button>
            <Button
              onClick={handleClear}
              className="bg-red-600 hover:bg-red-700"
            >
              Clear
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>
        <MarkdownContainer />
      </main>
    </div>
  );
};

export default App;
