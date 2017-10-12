// export this package's api
import TweenOne from './src/TweenOne';
import group from './src/TweenOneGroup';
import _easing from './src/easing';
import _plugins from './src/plugins';
import _ticker from './src/ticker';

TweenOne.TweenOneGroup = group;
TweenOne.easing = _easing;
TweenOne.plugins = _plugins;
TweenOne.ticker = _ticker;

export default TweenOne;

export const TweenOneGroup = group;

export const easing = _easing;

export const plugins = _plugins;

export const ticker = _ticker;