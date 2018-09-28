// Type definitions for rc-tween-one 2.2
// Project: https://github.com/react-component/tween-one
// Definitions by: jljsj33 <https://github.com/jljsj33>
// Definitions: https://github.com/react-component/tween-one
import * as React from 'react';

import Group from './TweenOneGroup';
import { IAnimObject, IEaseCallBack } from './AnimObject';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export declare type IAttrType = 'style' | 'attr';

export interface IChangeProps {
  moment?: number;
  target?: HTMLElement;
  index?: number;
  mode?: string;
  timelineMode?: string;
}

export interface IProps<T> extends Omit<React.HTMLAttributes<T>, 'onChange'> {
  animation?: IAnimObject | IAnimObject[];
  paused?: boolean;
  reverse?: boolean;
  reverseDelay?: number;
  repeat?: number;
  yoyo?: boolean;
  onChange?: (e: IChangeProps) => void;
  moment?: number;
  attr?: IAttrType,
  resetStyle?: boolean,
  component?: string | React.ReactNode;
  componentProps?: {};
}

export const TweenOneGroup: typeof Group;

export default class RcTweenOne<T> extends React.Component<IProps<T>> {
  static easing: {
    path(path: string, parame?: { rect?: number, lengthPixel?: number }): IEaseCallBack;
  };
  static plugins: {
    push(plugin: any): void;
  }
  static TweenOneGroup: typeof Group;
}
