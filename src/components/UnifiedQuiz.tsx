import BaseQuiz from "./BaseQuiz";
import UniversalCanvas from "./UniversalCanvas";
import type { QuestionConfig } from "../data/questionsData";

interface UnifiedQuizProps {
  config: QuestionConfig;
  onNext: () => void;
}

export default function UnifiedQuiz({ config, onNext }: UnifiedQuizProps) {
  const renderCanvas = (currentFont: string) => {
    const elements = config.getElements(
      currentFont,
      config.canvasWidth,
      config.canvasHeight
    );

    return (
      <UniversalCanvas
        width={config.canvasWidth}
        height={config.canvasHeight}
        backgroundImage={config.backgroundImage}
        backgroundColor={config.backgroundColor}
        elements={elements}
      />
    );
  };

  return (
    <BaseQuiz
      questionTitle={config.title}
      options={config.options}
      posterWidth={config.posterWidthClass}
      theme={config.theme}
      lineAlignment={config.lineAlignment}
      renderCanvas={renderCanvas}
      onNextStep={onNext}
    />
  );
}
