import React, { useMemo, useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/loading-txt.json";
import { THEMES } from "@/constants/theme";
import "./Preview.css";

type ThemeOption = {
  name: string;
  style: import("react-syntax-highlighter").SyntaxHighlighterProps["style"];
  isDark: boolean;
  accentColor: string;
};

interface PreviewProps {
  html?: string;
  prefersDarkMode?: boolean;
  initialTheme?: string;
  isLoading?: boolean;
}

function useTableHeaderFix(html: string | undefined, processedContent: string) {
  useEffect(() => {
    // Function to fix tables
    const fixTableHeaders = () => {
      // Find all tables in the document
      const tables = document.querySelectorAll(".markdown-table");

      tables.forEach((table) => {
        // Check if this table has a thead element
        let thead = table.querySelector("thead");

        if (!thead || !thead.offsetHeight) {
          console.log("Found table with missing or hidden header");

          // Look for the first row which might be intended as header
          const firstRow = table.querySelector("tr:first-child");

          if (firstRow) {
            // Create a new thead if needed
            if (!thead) {
              thead = document.createElement("thead");
              table.insertBefore(thead, table.firstChild);
            }

            // Move the first row to the thead
            thead.appendChild(firstRow);

            // Convert td to th if needed
            const cells = firstRow.querySelectorAll("td");
            cells.forEach((cell) => {
              const th = document.createElement("th");
              th.innerHTML = cell.innerHTML;
              th.className = cell.className;
              cell.parentNode.replaceChild(th, cell);
            });
          }
        }
      });
    };

    // Run the fix after a short delay to ensure content is rendered
    const timeoutId = setTimeout(fixTableHeaders, 500);

    // Also run on window resize as layout shifts might hide headers
    window.addEventListener("resize", fixTableHeaders);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", fixTableHeaders);
    };
  }, [html, processedContent]); // Now these are valid dependencies
}

const Preview: React.FC<PreviewProps> = ({
  html,
  prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches,
  initialTheme,
  isLoading = false,
}) => {
  console.log("html", html);
  const [processedContent, setProcessedContent] = useState<string>("");
  const [showSource, setShowSource] = useState<boolean>(false);
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>(() => {
    if (initialTheme) {
      const theme = THEMES.find(
        (t) => t.name.toLowerCase() === initialTheme.toLowerCase()
      );
      if (theme) return theme;
    }
    return prefersDarkMode ? THEMES[1] : THEMES[0];
  });

  const decodeHtmlEntities = (html: string): string => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = html;
    return textArea.value;
  };

  const sanitizedContent = useMemo(() => {
    if (!html) return { __html: "" };

    let fixedHtml = html
      .replace(/&ldquo;/g, '"')
      .replace(/&rdquo;/g, '"')
      .replace(/&quot;/g, '"');

    fixedHtml = decodeHtmlEntities(fixedHtml);

    return {
      __html: DOMPurify.sanitize(fixedHtml, {
        ADD_ATTR: ["controls", "preload", "playsinline", "poster"],
        ADD_TAGS: ["audio", "video", "source"],
        FORBID_ATTR: [],
      }),
    };
  }, [html]);

  useEffect(() => {
    if (!html) {
      setProcessedContent("");
      return;
    }

    const processHTML = () => {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = DOMPurify.sanitize(html);

      const codeBlocks = tempDiv.querySelectorAll("pre > code");

      codeBlocks.forEach((codeBlock, index) => {
        const language =
          codeBlock.className.replace("language-", "").trim() || "plaintext";

        const wrapper = document.createElement("div");
        wrapper.className = "syntax-highlighted-block";
        wrapper.setAttribute("data-language", language);
        wrapper.setAttribute("data-code-index", index.toString());

        const preElement = codeBlock.parentElement;
        if (preElement && preElement.parentElement) {
          preElement.parentElement.replaceChild(wrapper, preElement);
        }
      });

      const inlineCodeBlocks = tempDiv.querySelectorAll("code:not(pre > code)");
      inlineCodeBlocks.forEach((codeBlock, index) => {
        const wrapper = document.createElement("span");
        wrapper.className = "inline-code-block";
        wrapper.setAttribute("data-inline-code-index", index.toString());

        if (codeBlock.parentElement) {
          codeBlock.parentElement.replaceChild(wrapper, codeBlock);
        }
      });

      setProcessedContent(tempDiv.innerHTML);
    };

    processHTML();
  }, [html]);

  useEffect(() => {
    DOMPurify.addHook("afterSanitizeAttributes", function (node) {
      if (node.tagName === "AUDIO" || node.tagName === "VIDEO") {
        node.setAttribute("controls", "controls");
        node.setAttribute("preload", "metadata");

        if (node.tagName === "VIDEO") {
          node.setAttribute("playsinline", "playsinline");
        }
      }

      if (node.tagName === "SOURCE") {
        if (node.hasAttribute("src")) {
          const src = node.getAttribute("src");
          if (src) {
            const cleanSrc = src
              .replace(/&ldquo;/g, '"')
              .replace(/&rdquo;/g, '"')
              .replace(/&quot;/g, '"');
            node.setAttribute("src", cleanSrc);
          }
        }
      }
    });
  }, []);

  useTableHeaderFix(html, processedContent);

  const renderContent = () => {
    if (!processedContent) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = sanitizedContent.__html;

      const tables = tempDiv.querySelectorAll(".markdown-table");
      tables.forEach((table) => {
        const thead = table.querySelector("thead");
        const firstRow = table.querySelector("tr:first-child");

        if (firstRow && (!thead || !thead.contains(firstRow))) {
          const newThead = document.createElement("thead");
          newThead.appendChild(firstRow.cloneNode(true));

          const cells = newThead.querySelectorAll("td");
          cells.forEach((cell) => {
            const th = document.createElement("th");
            th.innerHTML = cell.innerHTML;
            th.className = cell.className;
            cell.parentNode.replaceChild(th, cell);
          });

          table.insertBefore(newThead, table.firstChild);

          if (thead !== firstRow.parentNode) {
            firstRow.parentNode.removeChild(firstRow);
          }
        }
      });

      return <div dangerouslySetInnerHTML={{ __html: tempDiv.innerHTML }} />;
    }

    const parts = processedContent.split(
      /<div class="syntax-highlighted-block"[^>]*data-language="([^"]*)"[^>]*data-code-index="([^"]*)"><\/div>/g
    );
    const result: JSX.Element[] = [];

    for (let i = 0; i < parts.length; i++) {
      if (parts[i]) {
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

          if (j + 1 < inlineParts.length) {
            const inlineIndex = parseInt(inlineParts[j + 1], 10);

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

            j++;
          }
        }

        result.push(<div key={`html-${i}`}>{inlineResult}</div>);
      }

      if (i + 2 < parts.length) {
        const language = parts[i + 1] || "plaintext";
        const index = parseInt(parts[i + 2], 10);

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

        i += 2;
      }
    }

    return result;
  };

  return (
    <div
      className={`preview-pane flex flex-col h-screen ${
        selectedTheme.isDark ? "dark-theme" : "light-theme"
      }`}
      style={{
        backgroundColor: selectedTheme.isDark ? "#282c34" : "#ffffff",
        color: selectedTheme.isDark ? "#abb2bf" : "#383a42",
      }}
    >
      <div
        className="preview-header sticky top-0 z-10 p-4 border-b flex justify-between items-center"
        style={{
          backgroundColor: selectedTheme.isDark ? "#21252b" : "#f5f5f5",
          borderColor: selectedTheme.isDark ? "#181a1f" : "#e0e0e0",
        }}
      >
        <h2 className="text-lg font-bold">Preview</h2>
        <div className="theme-controls flex items-center gap-3">
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
          <button
            onClick={() => setShowSource(!showSource)}
            style={{
              backgroundColor: selectedTheme.isDark ? "#21252b" : "#f5f5f5",
              color: showSource
                ? selectedTheme.accentColor
                : selectedTheme.isDark
                ? "#abb2bf"
                : "#383a42",
              border: `1px solid ${
                selectedTheme.isDark ? "#181a1f" : "#e0e0e0"
              }`,
              borderRadius: "3px",
              padding: "4px 12px",
              fontWeight: showSource ? "bold" : "normal",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {showSource ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                Preview
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
                Source
              </>
            )}
          </button>
        </div>
      </div>
      <div
        className="preview-content markdown-body flex-1 overflow-auto p-4 relative"
        style={{
          backgroundColor: selectedTheme.isDark ? "#282c34" : "#ffffff",
          color: selectedTheme.isDark ? "#abb2bf" : "#383a42",
        }}
      >
        {isLoading && (
          <div className="mt-10 pt-7  flex items-center justify-center bg-white/50 dark:bg-gray-900/50 z-10">
            <div className="w-32 h-32">
              <div style={{ transform: "scale(0.7)" }}>
                <Lottie
                  animationData={loadingAnimation}
                  loop={true}
                  style={{ width: "100%", height: "100%", marginTop: "120px" }}
                />
              </div>
            </div>
          </div>
        )}

        {showSource ? (
          <div className="code-block-wrapper">
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
                HTML
              </span>
            </div>
            <SyntaxHighlighter
              language="html"
              style={selectedTheme.style}
              showLineNumbers={true}
              customStyle={{
                margin: 0,
                borderRadius: "0 0 4px 4px",
              }}
            >
              {html || ""}
            </SyntaxHighlighter>
          </div>
        ) : (
          renderContent()
        )}
      </div>
    </div>
  );
};

export default Preview;
