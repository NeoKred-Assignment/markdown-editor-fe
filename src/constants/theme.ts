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

type ThemeOption = {
  name: string;
  style: import("react-syntax-highlighter").SyntaxHighlighterProps["style"];
  isDark: boolean;
  accentColor: string;
};

export const THEMES: ThemeOption[] = [
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
