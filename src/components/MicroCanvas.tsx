import React, { Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";

interface MicroCanvasProps {
  QuestionComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  ResultComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  showResult: boolean;
}

export default function MicroCanvas({
  QuestionComponent,
  ResultComponent,
  showResult,
}: MicroCanvasProps) {
  const width = 800;
  const height = 400;
  const LoadingPlaceholder = (
    <g>
      <br />
    </g>
  );
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full max-w-4xl overflow-visible"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Suspense fallback={LoadingPlaceholder}>
        <AnimatePresence mode="wait">
          {!showResult && (
            <motion.g
              key="question-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { duration: 0.4, ease: "easeOut" },
              }}
            >
              <QuestionComponent x={0} y={0} width={width} height={height} />
            </motion.g>
          )}
          {showResult && (
            <motion.g
              key="result-state"
              initial={{ opacity: 0, filter: "blur(10px)", scale: 1.02 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <ResultComponent x={0} y={0} width={width} height={height} />
            </motion.g>
          )}
        </AnimatePresence>
      </Suspense>
    </svg>
  );
}
