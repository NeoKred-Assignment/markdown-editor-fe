import React, { useMemo, useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialLight,
  materialDark,
  atomDark,
  oneDark,
  dracula,
  solarizedlight,
  nord,
  duotoneLight,
  duotoneDark,
  vs,
  xonokai,
  okaidia,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import "./Preview.css";

// Theme interface
type ThemeOption = {
  name: string;
  style: import("react-syntax-highlighter").SyntaxHighlighterProps["style"];
  isDark: boolean;
  accentColor: string;
};

// Available themes
const THEMES: ThemeOption[] = [
  {
    name: "Material Light",
    style: materialLight,
    isDark: false,
    accentColor: "#2196F3",
  },
  {
    name: "Material Dark",
    style: materialDark,
    isDark: true,
    accentColor: "#4dabf7",
  },
  { name: "Atom Dark", style: atomDark, isDark: true, accentColor: "#61afef" },
  { name: "One Dark", style: oneDark, isDark: true, accentColor: "#e06c75" },
  { name: "Dracula", style: dracula, isDark: true, accentColor: "#bd93f9" },
  {
    name: "Solarized Light",
    style: solarizedlight,
    isDark: false,
    accentColor: "#cb4b16",
  },
  { name: "Nord", style: nord, isDark: true, accentColor: "#88c0d0" },
  {
    name: "Duotone Light",
    style: duotoneLight,
    isDark: false,
    accentColor: "#a173d0",
  },
  {
    name: "Duotone Dark",
    style: duotoneDark,
    isDark: true,
    accentColor: "#a173d0",
  },
  { name: "VS", style: vs, isDark: false, accentColor: "#569cd6" },
  { name: "Xonokai", style: xonokai, isDark: true, accentColor: "#f92672" },
  { name: "Okaidia", style: okaidia, isDark: true, accentColor: "#9cdcfe" },
];

interface PreviewProps {
  html?: string;
  prefersDarkMode?: boolean;
  initialTheme?: string;
}

const Preview: React.FC<PreviewProps> = ({
  html,
  prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches,
  initialTheme,
}) => {
  console.log("html", html);
  const [processedContent, setProcessedContent] = useState<string>("");
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>(() => {
    if (initialTheme) {
      const theme = THEMES.find(
        (t) => t.name.toLowerCase() === initialTheme.toLowerCase()
      );
      if (theme) return theme;
    }
    // Default to a light or dark theme based on system preference
    return prefersDarkMode ? THEMES[1] : THEMES[0]; // Material Dark or Material Light
  });

  const sanitizedContent = useMemo(() => {
    if (!html) return { __html: "" };
    return { __html: DOMPurify.sanitize(html) };
  }, [html]);

  useEffect(() => {
    if (!html) {
      setProcessedContent("");
      return;
    }

    // Process the HTML to find and replace code blocks
    const processHTML = () => {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = DOMPurify.sanitize(html);

      // Find all pre > code elements
      const codeBlocks = tempDiv.querySelectorAll("pre > code");

      codeBlocks.forEach((codeBlock, index) => {
        const language =
          codeBlock.className.replace("language-", "").trim() || "plaintext";

        // Create a wrapper div for the syntax highlighter
        const wrapper = document.createElement("div");
        wrapper.className = "syntax-highlighted-block";
        wrapper.setAttribute("data-language", language);
        wrapper.setAttribute("data-code-index", index.toString());

        // Replace the pre element with our wrapper
        const preElement = codeBlock.parentElement;
        if (preElement && preElement.parentElement) {
          preElement.parentElement.replaceChild(wrapper, preElement);
        }
      });

      // Find all inline code elements
      const inlineCodeBlocks = tempDiv.querySelectorAll("code:not(pre > code)");
      inlineCodeBlocks.forEach((codeBlock, index) => {
        const wrapper = document.createElement("span");
        wrapper.className = "inline-code-block";
        wrapper.setAttribute("data-inline-code-index", index.toString());

        // Replace the code element with our wrapper
        if (codeBlock.parentElement) {
          codeBlock.parentElement.replaceChild(wrapper, codeBlock);
        }
      });

      setProcessedContent(tempDiv.innerHTML);
    };

    processHTML();
  }, [html]);

  // Render the content with syntax highlighting
  const renderContent = () => {
    if (!processedContent) {
      return <div dangerouslySetInnerHTML={sanitizedContent} />;
    }

    // Process block code elements
    const parts = processedContent.split(
      /<div class="syntax-highlighted-block"[^>]*data-language="([^"]*)"[^>]*data-code-index="([^"]*)"><\/div>/g
    );
    const result: JSX.Element[] = [];

    // Process each part
    for (let i = 0; i < parts.length; i++) {
      // Regular HTML content
      if (parts[i]) {
        // Look for inline code blocks in this HTML segment
        const inlineCodeRegex =
          /<span class="inline-code-block"[^>]*data-inline-code-index="([^"]*)"><\/span>/g;
        const inlineParts = parts[i].split(inlineCodeRegex);
        const inlineResult: JSX.Element[] = [];

        for (let j = 0; j < inlineParts.length; j++) {
          if (inlineParts[j]) {
            inlineResult.push(
              <span
                key={`inline-html-${i}-${j}`}
                dangerouslySetInnerHTML={{ __html: inlineParts[j] }}
              />
            );
          }

          // If we have an index, this is an inline code block
          if (j + 1 < inlineParts.length) {
            const inlineIndex = parseInt(inlineParts[j + 1], 10);

            // Find the code for this index
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = DOMPurify.sanitize(html);
            const inlineCodeBlocks = tempDiv.querySelectorAll(
              "code:not(pre > code)"
            );

            if (inlineCodeBlocks[inlineIndex]) {
              const code = inlineCodeBlocks[inlineIndex].textContent || "";

              inlineResult.push(
                <code
                  key={`inline-code-${i}-${inlineIndex}`}
                  className="inline-code"
                  style={{
                    backgroundColor: selectedTheme.isDark
                      ? "#282c34"
                      : "#f5f5f5",
                    color: selectedTheme.accentColor,
                    borderRadius: "3px",
                    padding: "2px 5px",
                    fontFamily: "monospace",
                  }}
                >
                  {code}
                </code>
              );
            }

            // Skip the next part as it was just the index
            j++;
          }
        }

        result.push(<div key={`html-${i}`}>{inlineResult}</div>);
      }

      // If we have language and index information, this is a code block
      if (i + 2 < parts.length) {
        const language = parts[i + 1] || "plaintext";
        const index = parseInt(parts[i + 2], 10);

        // Find the code for this index
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = DOMPurify.sanitize(html);
        const codeBlocks = tempDiv.querySelectorAll("pre > code");

        if (codeBlocks[index]) {
          const code = codeBlocks[index].textContent || "";

          result.push(
            <div key={`code-${index}`} className="code-block-wrapper">
              <div
                className="code-header"
                style={{
                  backgroundColor: selectedTheme.isDark ? "#21252b" : "#f0f0f0",
                  borderBottom: `1px solid ${
                    selectedTheme.isDark ? "#181a1f" : "#e0e0e0"
                  }`,
                }}
              >
                <span
                  className="code-language-tag"
                  style={{ color: selectedTheme.accentColor }}
                >
                  {language.toUpperCase()}
                </span>
                <div className="theme-selector">
                  <select
                    value={selectedTheme.name}
                    onChange={(e) => {
                      const theme = THEMES.find(
                        (t) => t.name === e.target.value
                      );
                      if (theme) setSelectedTheme(theme);
                    }}
                    style={{
                      backgroundColor: selectedTheme.isDark
                        ? "#282c34"
                        : "#f5f5f5",
                      color: selectedTheme.isDark ? "#abb2bf" : "#383a42",
                      border: `1px solid ${
                        selectedTheme.isDark ? "#181a1f" : "#e0e0e0"
                      }`,
                      borderRadius: "3px",
                    }}
                  >
                    {THEMES.map((theme) => (
                      <option key={theme.name} value={theme.name}>
                        {theme.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <SyntaxHighlighter
                language={language === "js" ? "javascript" : language}
                style={selectedTheme.style}
                showLineNumbers={true}
                customStyle={{
                  margin: 0,
                  borderRadius: "0 0 4px 4px",
                }}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          );
        }

        // Skip the next two parts as they were just metadata
        i += 2;
      }
    }

    return result;
  };

  console.log("renderContent()", renderContent());
  return (
    <div
      className={`preview-pane h-screen ${
        selectedTheme.isDark ? "dark-theme" : "light-theme"
      }`}
      style={{
        backgroundColor: selectedTheme.isDark ? "#282c34" : "#ffffff",
        color: selectedTheme.isDark ? "#abb2bf" : "#383a42",
      }}
    >
      <div className="preview-header">
        <h2 className="text-lg font-bold mb-2">Preview</h2>
        <div className="theme-controls">
          <select
            value={selectedTheme.name}
            onChange={(e) => {
              const theme = THEMES.find((t) => t.name === e.target.value);
              if (theme) setSelectedTheme(theme);
            }}
            style={{
              backgroundColor: selectedTheme.isDark ? "#21252b" : "#f5f5f5",
              color: selectedTheme.isDark ? "#abb2bf" : "#383a42",
              border: `1px solid ${
                selectedTheme.isDark ? "#181a1f" : "#e0e0e0"
              }`,
              borderRadius: "3px",
              padding: "4px 8px",
            }}
          >
            {THEMES.map((theme) => (
              <option key={theme.name} value={theme.name}>
                {theme.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div
        className="preview-content markdown-body"
        style={{
          backgroundColor: selectedTheme.isDark ? "#282c34" : "#ffffff",
          color: selectedTheme.isDark ? "#abb2bf" : "#383a42",
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default Preview;
