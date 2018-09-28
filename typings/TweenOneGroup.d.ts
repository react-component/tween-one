import * as React from 'react';

import { IAnimObject, IEaseCallBack } from './AnimObject';

export interface IGroupProps {
  appear?: boolean;
  enter?: IAnimObject | IAnimObject[] | ((key: string, index: number) => IAnimObject);
  leave?: IAnimObject | IAnimObject[] | ((key: string, index: number) => IAnimObject);
  animatingClassName?: [string, string];
  exclusive?: boolean;
  onEnd?: (e: { key: string, type: string }) => void;
  component?: string | React.ReactNode;
  componentProps?: {};
}

export default class RcTweenOneGroup extends React.Component<IGroupProps>{ }