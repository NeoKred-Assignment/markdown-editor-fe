import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
