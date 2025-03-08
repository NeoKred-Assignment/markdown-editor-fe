import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, Upload, X } from "lucide-react";
import { toast } from 'react-toastify';

interface FileUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFileUpload: (content: string) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  open,
  onOpenChange,
  onFileUpload,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isDragging) setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const files = e.dataTransfer?.files;
      if (files && files.length > 0) {
        const file = files[0];
        if (file.size > MAX_FILE_SIZE) {
          setError("File size exceeds 5MB");
          setFile(null);
          toast.warn("File size exceeds 5MB");
        } else if (!file.name.endsWith('.md')) {
          setError("Only Markdown files are allowed");
          setFile(null);
          toast.warn("Only Markdown files are allowed");
        } else {
          setFile(file);
          setError(null);
        }
      }
    };

    if (dropAreaRef.current) {
      dropAreaRef.current.addEventListener("dragenter", handleDragEnter);
      dropAreaRef.current.addEventListener("dragover", handleDragOver);
      dropAreaRef.current.addEventListener("dragleave", handleDragLeave);
      dropAreaRef.current.addEventListener("drop", handleDrop);

      return () => {
        dropAreaRef.current?.removeEventListener("dragenter", handleDragEnter);
        dropAreaRef.current?.removeEventListener("dragover", handleDragOver);
        dropAreaRef.current?.removeEventListener("dragleave", handleDragLeave);
        dropAreaRef.current?.removeEventListener("drop", handleDrop);
      };
    }
  }, []);

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > MAX_FILE_SIZE) {
        setError("File size exceeds 5MB");
        setFile(null);
        toast.warn("File size exceeds 5MB");
      } else if (!file.name.endsWith('.md')) {
        setError("Only Markdown files are allowed");
        setFile(null);
        toast.warn("Only Markdown files are allowed");
      } else {
        setFile(file);
        setError(null);
      }
    }
  };

  const handleClearFile = () => {
    setFile(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target?.result as string;
        onFileUpload(content);
        onOpenChange(false);
      };
      reader.onerror = () => {
        setError("Failed to read file");
        setIsLoading(false);
      };
      reader.readAsText(file);
      setIsLoading(false)
    } catch (error) {
      console.error("Error reading file:", error);
      setError("An error occurred while reading the file");
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">
            Upload Markdown File
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Upload your file to populate existing data. Drag and drop your file here or click to browse.
          </DialogDescription>
        </DialogHeader>
        
        <div 
          ref={dropAreaRef}
          className={`
            mt-4 border-2 border-dashed rounded-md p-8 
            flex flex-col items-center justify-center text-center
            cursor-pointer transition-colors min-h-[180px]
            ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'}
            ${file ? 'bg-gray-50 dark:bg-gray-700/30' : ''}
          `}
          onClick={handleBrowseClick}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept=".md"
            onChange={handleFileChange}
          />
          
          {file ? (
            <div className="space-y-2">
              <div className="text-green-600 dark:text-green-400 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="font-medium text-gray-900 dark:text-gray-100">{file.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {(file.size / 1024).toFixed(1)} KB
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-100" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Drop your file here, or click to select
              </p>
            </div>
          )}
        </div>
        
        {error && (
          <div className="mt-4 text-red-500 flex items-center gap-2 text-sm p-2 bg-red-50 dark:bg-red-900/20 rounded">
            <AlertCircle size={16} />
            {error}
          </div>
        )}
        
        <DialogFooter className="flex space-x-2 justify-end mt-4">
          <Button
            variant="outline" 
            size="default"
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          
          {file && (
            <Button 
              variant="outline" 
              size="default"
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
              onClick={handleClearFile}
              disabled={isLoading}
            >
              <X size={16} className="mr-1 text-gray-700 dark:text-gray-300" /> Clear
            </Button>
          )}
          
          <Button 
            variant="customTeal" 
            size="default"
            onClick={handleUpload}
            disabled={!file || isLoading}
          >
            {isLoading ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadModal;
