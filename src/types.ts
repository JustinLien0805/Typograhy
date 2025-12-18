export type TextAnchor = "start" | "middle" | "end";

export interface CanvasTextElement {
  id: string;
  text: string | React.ReactNode;
  x: number | string;
  y: number | string;
  fontFamily: string;
  fontSize: number;
  fontWeight?: number | string;
  color?: string;
  anchor?: TextAnchor;
  letterSpacing?: string;
  lineHeight?: number;
  opacity?: number;
  isDynamic?: boolean;
  initialOpacity?: number;
  targetOpacity?: number;
  className?: string;
  style?: React.CSSProperties;
}

export interface CanvasImageConfig {
  src: string;
  width: number;
  height: number;
  opacity?: number;
}

export interface MicroQuestionConfig {
  type: "micro";
  id: string;
  title: string;
  beforeText: string;
  afterText: string;

  options: string[];

  correctOptions: string[];
  QuestionComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  ResultComponent: React.FC<React.SVGProps<SVGSVGElement>>;
}
