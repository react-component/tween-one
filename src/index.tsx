import TweenOne from './TweenOne';
import { Ticker, Plugins, Easing } from 'tween-one';

export { Easing, Ticker, Plugins };

TweenOne.plugins = Plugins;
TweenOne.ticker = Ticker;
TweenOne.easing = Easing;

export default TweenOne;

export * from './type';