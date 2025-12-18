import type { FontOption } from "../components/BaseQuiz";
import type { CanvasTextElement, MicroQuestionConfig } from "../types";

import posterBg from "../assets/technology.png";
import coffeeBg from "../assets/coffee.png";
import r33 from "../assets/r33.svg?react";
import r38 from "../assets/r38.svg?react";
import Ba38Svg from "../assets/ba38.svg?react";
import Ba33Svg from "../assets/ba33.svg?react";
import a38Svg from "../assets/a33.svg?react";
import a33Svg from "../assets/a33.svg?react";
import b38Svg from "../assets/b33.svg?react";
import b33Svg from "../assets/b33.svg?react";
import lineSvg from "../assets/line.svg?react";
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

export const MICRO_QUESTIONS: MicroQuestionConfig[] = [
  // --- Case 1: afsd (Kerning) ---
  {
    type: "micro",
    id: "q_33",
    title: "what property was adjusted?",
    beforeText: "afsd",
    afterText: "af sd",
    options: ["weight", "kerning", "tracking", "leading"],
    correctOptions: ["kerning"],
    QuestionComponent: Ba33Svg,
    ResultComponent: r33,
  },
  // --- Case 2: ek4f (Multi-change) ---
  {
    type: "micro",
    id: "q_38",
    title: "identify ALL modifications made",
    beforeText: "ek4f",
    afterText: "ek4f",
    options: ["kerning", "weight", "leading", "tracking", "font"],
    correctOptions: ["kerning", "weight", "font"],
    QuestionComponent: Ba38Svg,
    ResultComponent: r38,
  },
];
export const QUIZ_CATEGORIES: any[] = [
  {
    id: "Type4",
    title: "Type4",
    description: "Master the typography of posters and logos.",
    coverImage: posterBg,
    questions: QUESTIONS,
  },
  {
    id: "Micro",
    title: "Micro-Typography",
    description: "Train your eye for spacing, weight, and font details.",
    coverImage: posterBg, // 暫時用一樣的圖，之後可換
    questions: MICRO_QUESTIONS, // 放入上面的新題目
  },
];

export const findQuestionById = (questionId: string) => {
  for (const category of QUIZ_CATEGORIES) {
    const index = category.questions.findIndex((q: any) => q.id === questionId);
    if (index !== -1) {
      return {
        question: category.questions[index],
        category: category,
        nextQuestionId: category.questions[index + 1]?.id || null,
      };
    }
  }
  return null;
};
