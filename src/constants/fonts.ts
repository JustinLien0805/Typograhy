export const SKIPPED_FONTS = [
  "sans-serif",
  "serif",
  "monospace",
  "cursive",
  "fantasy",
  "inherit",
  "initial",
  "revert",
  "unset",
  "Optima",
  "Georgia",
  "CustomGeorgia",
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Courier New",
  "Verdana",
  "Inter",
];

export const isCssVariable = (fontName: string) => {
  return fontName.trim().startsWith("var(");
};
