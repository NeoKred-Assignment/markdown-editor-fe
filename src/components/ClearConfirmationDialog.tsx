import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";

interface ClearConfirmationDialogProps {
  open: boolean;
  onOpenChange: () => void;
  onConfirm: () => void;
}

const ClearConfirmationDialog: React.FC<ClearConfirmationDialogProps> = ({
  open,
  onOpenChange,
  onConfirm
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">Clear Editor Contents</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Are you sure you want to clear all content in the editor? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex space-x-2 justify-end">
          <DialogClose asChild>
            <Button
              variant="outline" 
              size="default"
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button 
            variant="customTeal" 
            size="default"
            onClick={onConfirm}
          >
            Clear
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClearConfirmationDialog; 