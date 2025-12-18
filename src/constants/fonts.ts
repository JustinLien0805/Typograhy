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
  "Brush Script MT", // 系統字，不用抓
  "Futura",          // 商用字，Google 沒有
  "Avenir",          // 商用字，Google 沒有
];

export const isCssVariable = (fontName: string) => {
  return fontName.trim().startsWith("var(");
};
