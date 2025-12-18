// src/pages/QuizPage.tsx
import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UnifiedQuiz from "../components/UnifiedQuiz";
import QuizMicro from "../components/QuizMicro";
import { findQuestionById } from "../data/questionsData";

export default function QuizPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const data = useMemo(() => {
    if (id) return findQuestionById(id);
    return null;
  }, [id]);

  if (!data) {
    return <div className="text-white">Question not found</div>;
  }

  const { question, nextQuestionId } = data;

  const handleComplete = () => {
    setTimeout(() => {
      if (nextQuestionId) {
        navigate(`/quiz/${nextQuestionId}`);
      } else {
        navigate("/");
      }
    }, 1500);
  };

  if (question.type === "micro") {
    return (
      <QuizMicro key={question.id} config={question} onNext={handleComplete} />
    );
  }

  return (
    <div className="w-full min-h-screen bg-black">
      <UnifiedQuiz
        key={question.id}
        config={question}
        onNext={handleComplete}
      />
      <button
        onClick={() => navigate("/")}
        className="fixed top-6 right-6 z-50 text-white/50 hover:text-white text-sm uppercase tracking-widest"
      >
        Exit ✕
      </button>
    </div>
  );
}
