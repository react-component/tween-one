import React from 'react';
import { IAnimObject as AnimObject, IObject, IMode, ITimelineCallBack } from 'tween-one';

export interface ICallBack {
  mode?: IMode;
  moment?: number;
  ratio?: number;
  index: number;
  repeat?: number;
  timelineMoment?: number;
  vars?: IObject | IObject[];
  targets?: IObject | IObject[]
};

export type AnimObjectOrArray = AnimObject | AnimObject[];

export type IAnimObject = AnimObjectOrArray | ((key: string, index: number) => AnimObject);

export interface IAnimProps extends Omit<React.HTMLAttributes<any>, 'onChange'> {
  style?: React.CSSProperties;
  children?: any;
  animation?: AnimObjectOrArray;
  paused?: boolean;
  reverse?: boolean;
  repeatDelay?: number;
  repeat?: number;
  yoyo?: boolean;
  onChange?: (v: ICallBack) => void;
  onChangeTimeline?: (v: ITimelineCallBack) => void;
  moment?: number;
  attr?: boolean;
  resetStyle?: boolean;
  component?:
    | string
    | React.ClassType<any, React.Component, React.ComponentClass<{ ref: any }>>
    | null
    | undefined;
  componentProps?: IObject;
  forcedJudg?: IObject;
  killPrevAnim?: boolean;
}

export interface IGroupProps extends Omit<React.HTMLAttributes<any>, 'onChange'> {
  appear?: boolean;
  enter?: IAnimObject;
  leave?: IAnimObject;
  animatingClassName?: string[] | [string, string];
  exclusive?: boolean;
  resetStyle?: boolean;
  onEnd?: (e: { key?: string | React.ReactText; type?: string }) => void;
  component?:
    | string
    | React.ClassType<any, React.Component, React.ComponentClass<{ ref: any }>>
    | null
    | undefined;
  componentProps?: {};
}

export interface TweenOneRef extends React.ForwardRefExoticComponent<any> {
  isTweenOne?: boolean;
  plugins?: any;
  ticker?: any;
  easing?: any;
}

export interface TweenOneGroupRef extends React.ForwardRefExoticComponent<any> {
  isTweenOneGroup?: boolean;
}