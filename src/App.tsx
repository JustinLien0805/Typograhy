import { useState } from "react";
import UnifiedQuiz from "./components/UnifiedQuiz";
import { QUESTIONS } from "./data/questionsData";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };
  console.log(QUESTIONS);
  if (currentIndex >= QUESTIONS.length) {
    return (
      <div className="w-full min-h-screen bg-black text-white flex flex-col items-center justify-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
          Quiz Completed! 🎉
        </h1>
        <p className="text-gray-400 text-lg">
          You have finished all {QUESTIONS.length} questions.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
        >
          Play Again
        </button>
      </div>
    );
  }

  const currentQuestionData = QUESTIONS[currentIndex];

  return (
    <div className="w-full min-h-screen bg-black">
      <UnifiedQuiz
        key={currentQuestionData.id}
        config={currentQuestionData}
        onNext={handleNext}
      />
    </div>
  );
}

export default App;
