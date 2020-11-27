import * as CSS from 'csstype';
import * as TweenOne from 'tween-one';

declare module 'csstype' {
  interface Properties {
    [key: string]: any;
  }
}
declare module 'TweenOne' {
  interface Ticker {
    [key: string]: any;
  }
}
