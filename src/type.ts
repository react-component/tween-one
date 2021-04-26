import type React from 'react';
import type { IAnimObject as Anim, IMode, ITimelineCallBack } from 'tween-one';

export type IObject = Record<string, any>;
export interface ICallBack {
  mode?: IMode;
  moment?: number;
  ratio?: number;
  index: number;
  repeat?: number;
  timelineMoment?: number;
  vars?: IObject | IObject[];
  targets?: IObject | IObject[];
}

interface AnimObject extends Anim {
  Children?: {
    value?: number;
    floatLength?: number;
    formatMoney?: true | { thousand?: string; decimal?: string };
  };
}

export type AnimObjectOrArray = AnimObject | AnimObject[];

export type IAnimObject = AnimObjectOrArray | ((key: string, index: number) => AnimObject);


interface AllHTMLAttributes extends Omit<React.SVGAttributes<any>, 'crossOrigin'>, React.AllHTMLAttributes<any> {

}
export interface IAnimProps extends Omit<AllHTMLAttributes, 'onChange'> {
  style?: React.CSSProperties;
  children?: any;
  animation?: AnimObjectOrArray;
  paused?: boolean;
  reverse?: boolean;
  repeatDelay?: number;
  repeat?: number;
  yoyo?: boolean;
  ref?: React.Ref<any>;
  onChange?: (v: ICallBack) => void;
  onChangeTimeline?: (v: ITimelineCallBack) => void;
  moment?: number;
  attr?: boolean;
  resetStyle?: boolean;
  component?:
    | string
    | React.ClassType<any, React.Component, React.ComponentClass<any>>
    | React.ForwardRefExoticComponent<IAnimProps & { ref?: React.Ref<any> }>
    | null
    | undefined;
  componentProps?: IObject;
  forcedJudg?: IObject;
  killPrevAnim?: boolean;
  regionStartTime?: number;
  regionEndTime?: number;
}

export interface IGroupProps extends Omit<React.HTMLAttributes<any>, 'onChange'> {
  appear?: boolean;
  enter?: IAnimObject;
  leave?: IAnimObject;
  animatingClassName?: string[];
  exclusive?: boolean;
  resetStyle?: boolean;
  onEnd?: (e: { key?: string | React.ReactText; type?: string }) => void;
  component?:
    | string
    | React.ClassType<any, React.Component, React.ComponentClass<{ ref: any }>>
    | null
    | undefined;
  componentProps?: IObject;
}

export interface TweenOneRef extends React.ForwardRefExoticComponent<IAnimProps> {
  isTweenOne?: boolean;
  plugins?: any;
  ticker?: any;
  easing?: any;
}

export interface TweenOneGroupRef extends React.ForwardRefExoticComponent<IGroupProps> {
  isTweenOneGroup?: boolean;
}
