import { useEffect, useState } from "react";
import { SKIPPED_FONTS, isCssVariable } from "../constants/fonts";

export const useGoogleFonts = (fontFamilies: string[]) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!fontFamilies || fontFamilies.length === 0) {
      setIsLoaded(true);
      return;
    }

    const googleFonts = fontFamilies.filter((fontString) => {
      const primaryFont = fontString.split(",")[0].replace(/['"]/g, "").trim();

      if (isCssVariable(fontString)) return false;

      if (SKIPPED_FONTS.includes(primaryFont)) return false;

      if (
        SKIPPED_FONTS.some(
          (skip) => fontString.includes(skip) && skip.length > 4
        )
      )
        return false;

      return true;
    });

    if (googleFonts.length === 0) {
      setIsLoaded(true);
      return;
    }
    console.log(googleFonts);
    const fontQuery = googleFonts
      .map((font) => {
        const cleanName = font.replace(/['"]/g, "").trim().replace(/ /g, "+");
        return `family=${cleanName}:wght@400;600;900`;
      })
      .join("&");
    console.log("fontquery", fontQuery);
    const linkId = `dynamic-fonts-${googleFonts.join("-")}`;
    const url = `https://fonts.googleapis.com/css2?${fontQuery}&display=swap`;

    if (!document.getElementById(linkId)) {
      const link = document.createElement("link");
      link.id = linkId;
      link.href = url;
      link.rel = "stylesheet";

      link.onload = () => setIsLoaded(true);
      link.onerror = () => {
        console.error("Failed to load fonts:", googleFonts);
        setIsLoaded(true);
      };

      document.head.appendChild(link);
    } else {
      setIsLoaded(true);
    }
  }, [JSON.stringify(fontFamilies)]);

  return isLoaded;
};
