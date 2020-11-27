/// <reference path="import.d.ts" />
declare module '*.css';
declare module '*.less';
declare module 'style-utils';
declare module 'tween-functions';
declare module 'raf';
declare module 'flubber';


declare module 'rc-tween-one';
declare module 'rc-tween-one/src/plugin/ChildrenPlugin';
declare module 'rc-tween-one/src/plugin/PathMotionPlugin';
declare module 'rc-tween-one/src/plugin/SvgDrawPlugin';
declare module 'rc-tween-one/src/plugin/SvgMorphPlugin';
declare module 'rc-tween-one/src/TweenOneGroup';


interface Element {
  _tweenOneVars: any;
}
