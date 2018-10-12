import * as React from 'react';

import { IAnimObject, IEaseCallBack } from './AnimObject';

import { Omit } from './index';

export interface IGroupProps<T> extends Omit<React.HTMLAttributes<T>, 'onChange'> {
  appear?: boolean;
  enter?: IAnimObject | IAnimObject[] | ((key: string, index: number) => IAnimObject);
  leave?: IAnimObject | IAnimObject[] | ((key: string, index: number) => IAnimObject);
  animatingClassName?: string[] | [string, string];
  exclusive?: boolean;
  resetStyle?: boolean;
  onEnd?: (e: { key: string, type: string }) => void;
  component?: string | React.ReactNode;
  componentProps?: {};
}

export default class RcTweenOneGroup<T> extends React.Component<IGroupProps<T>>{ }