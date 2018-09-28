type IEaseCallBack = ((t: number, b: number, c: number, d: number) => number);

export declare type IAnimType = 'to' | 'from';

export declare type IEaseType = 'linear' |
  'easeInSine' | 'easeOutSine' | 'easeInOutSine' |
  'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad' |
  'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic' |
  'easeInQuart' | 'easeOutQuart' | 'easeInOutQuart' |
  'easeInQuint' | 'easeOutQuint' | 'easeInOutQuint' |
  'easeInExpo' | 'easeInOutExpo' | 'easeInOutExpo' |
  'easeInCirc' | 'easeOutCirc' | 'easeInOutCirc' |
  'easeInBack' | 'easeOutBack' | 'easeInOutBack' |
  'easeInElastic' | 'easeOutElastic' | 'easeInOutElastic' |
  'easeInBounce' | 'easeOutBounce' | 'easeInOutBounce' |
  IEaseCallBack; // TweenOne ease path;

export interface IBezierProps {
  type?: string;
  autoRotate?: boolean;
  vars: { x: number, y: number }[];
}

export interface IChildrenProps {
  value: number;
  floatLength?: number;
  formatMoney?: { thousand: string, decimal: string };
}

export interface IStyleAnimProps {
  [key: string]: any;
  bezier?: IBezierProps;
  SVGDraw?: number | string;// DrawPlugin
  // Children
  Children?: IChildrenProps;
  // path
  path?: string;
  // transform
  x?: number | string;
  y?: number | string;
  z?: number | string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotate?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  scale?: number | string;
  scaleX?: number | string;
  scaleY?: number | string;
  transformOrigin?: number | string;
  // filter
  grayScale?: number;
  sepia?: number;
  hueRotate?: string;
  invert?: number;
  brightness?: number;
  contrast?: number;
  saturate?: number;
  blur?: string;
  // basic
  width?: number | string;
  maxWidth?: number | string;
  minWidth?: number | string;
  height?: number | string;
  maxHeight?: number | string;
  minHeight?: number | string;
  lineHeight?: number | string;
  opacity?: number | string;
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
  marginTop?: number | string;
  marginRight?: number | string;
  marginBottom?: number | string;
  marginLeft?: number | string;
  paddingTop?: number | string;
  paddingRight?: number | string;
  paddingBottom?: number | string;
  paddingLeft?: number | string;
  color?: string;
  backgroundColor?: string;
  borderWidth?: number | string;
  borderRadius?: number | string;
  borderColor?: string;
  boxShadow?: string;
  textShadow?: string;
  // svg style
  storkeWidth?: number;
  fill?: string;
  stroke?: string;
  strokeDashoffset?: number;
  strokeDasharray?: string;
}

export interface IAnimObject extends IStyleAnimProps {
  type?: IAnimType;
  duration?: number;
  delay?: number;
  repeat?: number;
  repeatDelay?: number;
  appearTo?: number;
  yoyo?: boolean;
  ease?: IEaseType;
  style?: IStyleAnimProps;
  // morphPlugin
  points?: string;
  d?: string;
  // attr svg
  cx?: number;
  cy?: number;
  r?: number;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  rx?: number;
  ry?: number;
  dx?: number;
  dy?: number;
  offset?: number | string;
  stdDeviation?: number | string;
  stopColor?: string;
  stopOpacity?: number;
  onStart?: (e: { index: number, target: HTMLElement }) => void;
  onUpdate?: (e: { index: number, target: HTMLElement, ratio: number }) => void;
  onComplete?: (e: { index: number, target: HTMLElement }) => void;
  onRepeat?: (e: { index: number, target: HTMLElement }) => void;
}