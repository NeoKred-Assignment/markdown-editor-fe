import React from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  const tooltipText = isDarkMode ? "Switch to light mode" : "Switch to dark mode";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={toggleTheme}
            className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center cursor-pointer"
            aria-label={tooltipText}
          >
            {isDarkMode ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <line x1="12" y1="3" x2="12" y2="5"></line>
                <line x1="12" y1="19" x2="12" y2="21"></line>
                <line x1="5" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="19" y2="12"></line>
                <line x1="6.36" y1="6.36" x2="7.78" y2="7.78"></line>
                <line x1="16.22" y1="16.22" x2="17.64" y2="17.64"></line>
                <line x1="6.36" y1="17.64" x2="7.78" y2="16.22"></line>
                <line x1="16.22" y1="7.78" x2="17.64" y2="6.36"></line>
              </svg>
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>
        </TooltipTrigger>
        {/* <TooltipContent 
          side="left" 
          align="center" 
          className="z-100"
        >
          <p>{tooltipText}</p>
        </TooltipContent> */}
      </Tooltip>
    </TooltipProvider>
  );
};

export default ThemeToggle;