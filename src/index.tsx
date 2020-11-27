import { Ticker, Plugins, Easing } from 'tween-one';
import TweenOne from './TweenOne';

export * from './type';

export { Easing, Ticker, Plugins };

TweenOne.plugins = Plugins;
TweenOne.ticker = Ticker;
TweenOne.easing = Easing;

export default TweenOne;
