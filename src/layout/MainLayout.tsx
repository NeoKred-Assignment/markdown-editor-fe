import React, { ReactNode } from "react";
import ThemeToggle from "../components/ThemeToggle";
import { Button } from "../components/ui/button";

interface MainLayoutProps {
  children: ReactNode;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDownload: () => void;
  onClear: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  onUpload,
  onDownload,
  onClear
}) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <header className="sticky top-0 z-100 bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Real-time Markdown Editor
          </h1>
          <div className="flex items-center space-x-3">
            <input
              type="file"
              accept=".md"
              id="upload"
              className="hidden"
              onChange={onUpload}
            />
            <label htmlFor="upload">
              <Button
                variant="customBlue"
                size="default"
              >
                Upload
              </Button>
            </label>
            <Button
              onClick={onDownload}
              variant="customFuchsia"
              size="default"
            >
              Download
            </Button>
            <Button
              onClick={onClear}
              variant="customBlue"
              size="default"
            >
              Clear
            </Button>

            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-4 mt-6">
        {children}
      </main>
    </div>
  );
};

export default MainLayout; 