import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UnifiedQuiz from "../components/UnifiedQuiz";
// 引入你剛剛寫好的 findQuestionById
import { findQuestionById } from "../data/questionsData";

export default function QuizPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 1. 使用 helper 查找目前題目資料
  const data = useMemo(() => {
    if (id) return findQuestionById(id);
    return null;
  }, [id]);

  // 防呆：如果找不到題目
  if (!data) {
    return <div className="text-white">Question not found</div>;
  }

  // 解構出需要的資料
  const { question, nextQuestionId } = data;

  // 2. 處理「完成」後的邏輯
  const handleComplete = () => {
    // 延遲 1.5 秒讓使用者看到 "Correct!" 動畫
    setTimeout(() => {
      if (nextQuestionId) {
        // A. 如果有下一題 ID -> 跳轉去下一題
        console.log("Going to next question:", nextQuestionId); // Debug 用
        navigate(`/quiz/${nextQuestionId}`);
      } else {
        // B. 沒有下一題了 (nextQuestionId 為 null) -> 回首頁
        console.log("Category completed, going home"); // Debug 用
        navigate("/");
      }
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen bg-black">
      <UnifiedQuiz
        key={question.id}
        config={question}
        onNext={handleComplete}
      />

      {/* 右上角強制離開按鈕 */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-6 right-6 z-50 text-white/50 hover:text-white text-sm uppercase tracking-widest"
      >
        Exit ✕
      </button>
    </div>
  );
}
