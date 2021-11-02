import { Ticker, Plugins, Easing } from 'tween-one';
import TweenOne from './TweenOne';
import TweenOneGroup from './TweenOneGroup';
import ChildrenPlugin from './plugin/ChildrenPlugin';
import PathMotionPlugin from './plugin/PathMotionPlugin';
import SvgDrawPlugin from './plugin/SvgDrawPlugin';
import SvgMorphPlugin from './plugin/SvgMorphPlugin';

export * from './type';

export {
  Easing,
  Ticker,
  Plugins,
  TweenOneGroup,
  ChildrenPlugin,
  PathMotionPlugin,
  SvgDrawPlugin,
  SvgMorphPlugin,
};

TweenOne.plugins = Plugins;
TweenOne.ticker = Ticker;
TweenOne.easing = Easing;

export default TweenOne;
