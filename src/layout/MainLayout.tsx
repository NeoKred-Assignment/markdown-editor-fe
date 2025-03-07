import React, { ReactNode, useState } from "react";
import ThemeToggle from "../components/ThemeToggle";
import { Button } from "../components/ui/button";
import FileUploadModal from "../components/FileUploadModal";
import { Upload } from "lucide-react";

interface MainLayoutProps {
  children: ReactNode;
  onUpload: (e: React.ChangeEvent<HTMLInputElement> | string) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, onUpload }) => {
  const [isFileUploadModalOpen, setIsFileUploadModalOpen] = useState(false);

  const handleFileUpload = (content: string) => {
    onUpload(content);
    setIsFileUploadModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <header className="sticky top-0 z-100 bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Real-time Markdown Editor
          </h1>
          <div className="flex items-center space-x-3">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py mt-6">{children}</main>

      <FileUploadModal
        open={isFileUploadModalOpen}
        onOpenChange={setIsFileUploadModalOpen}
        onFileUpload={handleFileUpload}
      />
    </div>
  );
};

export default MainLayout;
