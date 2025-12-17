import type { FontOption } from "../components/BaseQuiz";
import type { CanvasTextElement } from "../types";

import posterBg from "../assets/technology.png";
import coffeeBg from "../assets/coffee.png";

export interface QuestionConfig {
  id: string;
  title: string;
  options: FontOption[];
  canvasWidth: number;
  canvasHeight: number;
  backgroundImage: string;
  backgroundColor?: string;
  theme?: {
    backgroundColor: string;
    textColor: string;
    buttonBgColor: string;
    buttonTextColor: string;
    buttonHoverColor?: string;
  };
  lineAlignment?: string;
  posterWidthClass?: string;
  getElements: (
    currentFont: string,
    width: number,
    height: number
  ) => CanvasTextElement[];
}

export interface QuizCategory {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  questions: QuestionConfig[];
}

export const QUESTIONS: QuestionConfig[] = [
  {
    id: "q_poster",
    title:
      "which font matches the technical, clean aesthetic of the poster’s body text?",
    backgroundImage: posterBg,
    canvasWidth: 1280,
    canvasHeight: 1554,
    theme: {
      backgroundColor: "bg-black",
      textColor: "text-white",
      buttonBgColor: "bg-[#E6E6E6]",
      buttonTextColor: "text-black",
      buttonHoverColor: "hover:bg-white",
    },
    lineAlignment: "items-center",
    options: [
      {
        id: "1",
        name: "MONOTON",
        fontFamily: "var(--font-monoton)",
        isCorrect: false,
      },
      {
        id: "2",
        name: "B621 Mono",
        fontFamily: '"B621 Mono", monospace',
        isCorrect: false,
      },
      {
        id: "3",
        name: "JetBrains Mono",
        fontFamily: "var(--font-mono)",
        isCorrect: true,
      },
      {
        id: "4",
        name: "Nico Moji",
        fontFamily: '"Nico Moji", sans-serif',
        isCorrect: false,
      },
    ],
    getElements: (font, w, h) => {
      const fontSize = w * 0.09;

      return [
        {
          id: "title",
          text: "THE FUTURE OF",
          x: w * 0.09,
          y: h * 0.23 - w * 0.11 * 1.05,
          fontFamily: font,
          fontSize: fontSize,
          fontWeight: 400,
          letterSpacing: "0em",
          anchor: "start",
          isDynamic: true,
        },
        {
          id: "main",
          text: "TECHNOLOGY",
          x: w * 0.09,
          y: h * 0.23,
          fontFamily: font,
          fontSize: fontSize,
          fontWeight: 400,
          letterSpacing: "0em",
          anchor: "start",
          isDynamic: true,
        },
      ];
    },
  },
  {
    id: "q_coffee",
    title: "Pick the font for this coffee shop branding",
    backgroundImage: coffeeBg,
    canvasWidth: 1000,
    canvasHeight: 1000,
    theme: {
      backgroundColor: "bg-black",
      textColor: "text-white",
      buttonBgColor: "bg-[#EAE5D9]",
      buttonTextColor: "text-black",
      buttonHoverColor: "hover:bg-[#F7F3E8]",
    },
    lineAlignment: "items-start",
    options: [
      {
        id: "1",
        name: "Georgia",
        fontFamily: "Georgia",
        isCorrect: false,
        styleAdjustment: { scale: 0.9 },
      },
      {
        id: "2",
        name: "Optima",
        fontFamily: "Optima",
        isCorrect: true,
      },
      {
        id: "3",
        name: "Crimson Text",
        fontFamily: "Crimson Text",
        isCorrect: false,
      },
      {
        id: "4",
        name: "Cormorant SC",
        fontFamily: "Cormorant SC",
        isCorrect: false,
      },
    ],
    getElements: (font, w, h) => {
      let yOffset = 0;
      let scale = 1;

      if (font.includes("Georgia")) {
        scale = 0.9;
      }
      if (font.includes("Cormorant")) {
        scale = 1.1;
      }

      return [
        {
          id: "coffee-title",
          text: "COFFEE",
          x: w / 2,
          y: h * 0.22 + yOffset,
          fontFamily: font,
          fontSize: w * 0.18 * scale,
          color: "#545F6C",
          anchor: "middle",
          letterSpacing: "0.02em",
          isDynamic: true,
        },
      ];
    },
  },
];
export const QUIZ_CATEGORIES: QuizCategory[] = [
  {
    id: "Type4",
    title: "Type4",
    description: "Master the typography of posters and logos.",
    coverImage: posterBg,
    questions: QUESTIONS,
  },
];
export const findQuestionById = (questionId: string) => {
  for (const category of QUIZ_CATEGORIES) {
    const index = category.questions.findIndex((q) => q.id === questionId);
    if (index !== -1) {
      return {
        question: category.questions[index],
        category: category,
        nextQuestionId: category.questions[index + 1]?.id || null, // 如果有下一題就回傳 ID，沒有就 null
      };
    }
  }
  return null;
};
