import { motion, AnimatePresence } from "motion/react";
import type { CanvasTextElement } from "../types";

interface UniversalCanvasProps {
  width: number;
  height: number;
  backgroundImage?: string;
  backgroundColor?: string;
  elements: CanvasTextElement[]; // 接收所有元素
}

export default function UniversalCanvas({
  width,
  height,
  backgroundImage,
  backgroundColor = "transparent",
  elements,
}: UniversalCanvasProps) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto shadow-2xl rounded-sm block"
      style={{ backgroundColor }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {backgroundImage && (
        <image
          href={backgroundImage}
          x="0"
          y="0"
          width={width}
          height={height}
          preserveAspectRatio="xMidYMid meet"
        />
      )}

      <AnimatePresence>
        {elements.map((el) => (
          <motion.text
            key={`${el.id}-${el.fontFamily}`}
            x={el.x}
            y={el.y}
            textAnchor={el.anchor || "start"}
            dominantBaseline="middle"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: el.opacity ?? 1, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              fontFamily: el.fontFamily,
              fontSize: `${el.fontSize}px`,
              fontWeight: el.fontWeight || 400,
              fill: el.color || "black",
              letterSpacing: el.letterSpacing || "normal",
              textTransform: "uppercase",
            }}
          >
            {el.text}
          </motion.text>
        ))}
      </AnimatePresence>
    </svg>
  );
}
