
# rc-tween-one
---

React TweenOne Component


[![NPM version][npm-image]][npm-url]
[![build status][github-actions-image]][github-actions-url]
[![Codecov][codecov-image]][codecov-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/rc-tween-one.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-tween-one
[github-actions-image]: https://github.com/react-component/tween-one/workflows/CI/badge.svg
[github-actions-url]: https://github.com/react-component/tween-one/actions
[codecov-image]: https://img.shields.io/codecov/c/github/react-component/tween-one/master.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/react-component/tween-one/branch/master
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-tween-one.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-tween-one


## Browser Support

|![IE](https://github.com/alrra/browser-logos/blob/master/src/edge/edge_48x48.png?raw=true) | ![Chrome](https://github.com/alrra/browser-logos/blob/master/src/chrome/chrome_48x48.png?raw=true) | ![Firefox](https://github.com/alrra/browser-logos/blob/master/src/firefox/firefox_48x48.png?raw=true) | ![Opera](https://github.com/alrra/browser-logos/blob/master/src/opera/opera_48x48.png?raw=true) | ![Safari](https://github.com/alrra/browser-logos/blob/master/src/safari/safari_48x48.png?raw=true)|
| --- | --- | --- | --- | --- |
| IE 10+ ✔ | Chrome 31.0+ ✔ | Firefox 31.0+ ✔ | Opera 30.0+ ✔ | Safari 7.0+ ✔ |

## Development

```
npm install
npm start
```

## Example

http://localhost:8100/examples/

2.x: http://react-component.github.io/tween-one/

3.x: https://tween-one.vercel.app/

## install


[![rc-tween-one](https://nodei.co/npm/rc-tween-one.png)](https://npmjs.org/package/rc-tween-one)


## Usage

```js | pure
var TweenOne = require('rc-tween-one');
var React = require('react');
React.render(<TweenOne animation={{x:100}}>
  demo
</TweenOne>, container);
```

### Plugin

```js | pure
var TweenOne = require('rc-tween-one');
var React = require('react');
var SvgDrawPlugin = require('rc-tween-one/lib/plugin/SvgDrawPlugin');
TweenOne.plugins.push(SvgDrawPlugin);
React.render(<svg width="600" height="600">
  <TweenOne 
    animation={{ SVGDraw:'50%'}}
    d="M0,0L100,0"
    style={{ fill: 'none', strokeWidth: 20, stroke: '#00000' }}
    component="path"
  />
</svg>, container);
```

### TweenOneGroup
```js | pure
var TweenOne = require('rc-tween-one');
var React = require('react');
var TweenOneGroup = TweenOne.TweenOneGroup;
React.render(<TweenOneGroup>
  <div key="0">demo</div>
  <div key="1">demo</div>
</TweenOneGroup>, container);
```

## API

<a href='https://motion.ant.design/api/tween-one' target='_blank'>中文文档</a>

### props

| name      | type           | default | description    |
|------------|----------------|---------|----------------|
| animation  | object / array | null    | animate configure parameters |
| paused      | boolean       | false   | animate timeline pause |
| reverse    | boolean        | false   | animate timeline revers |
| delay      | number          | 0       | animate timeline delay |      
| repeat     |  number        | 0       | `animation` all data repeat, To repeat indefinitely, use  -1 |
| repeatDelay | number       | 0       | animate timeline repeat delay |
| yoyo       | boolean        | false   | `animation` all data alternating backward and forward on each repeat. |
| onChange   | func           | null    | when the animation change called, callback({ moment, targets, index, mode, ratio, vars, index, repeat }) |
| onChangeTimeline   | func           | null    | when the animation change called, callback({ mode, targets, vars, moment, totalTime, repeat }) |
| moment     | number         | null    | set the current frame    |
| regionStartTime  | number           | 0       | Set the start time of the animation region  |
| regionEndTime    | number         | null    | Set the end time of the animation region   |
| attr       | boolean         | false | attribute animation is `true`, when morph SVG must be `true`.  |
| resetStyle | boolean    | false   | update animation data, reset init style |
| component  | string / React.Element  | `div`   | component tag  |
| componentProps | object     | null   | component is React.Element, component tag props, not add `style` |


### animation = { }

> Basic animation param. please view [animation terms](https://motion.ant.design/language/animate-term)

| name      | type           | default | description    |
|------------|----------------|---------|----------------|
| [key: string] | `string` `number` `array` | null | All variables based on number, such as left, x, color, shadow  |
| type       | string         | `to`    | play type: `to` `from` `set`|
| duration   |  number        | 450     | animate duration     |
| delay      | number         | 0       | animate delay  |
| repeat     | number         | 0       | animate repeat, To repeat indefinitely, use  -1 |
| repeatDelay| number         | 0       | repeat start delay |
| appearTo   | number         | null    | Add to the specified time |
| yoyo       | boolean        | false   | `true`: alternating backward and forward on each repeat. |
| ease       | string         | `easeInOutQuad` | animate ease [refer](http://easings.net/en) or svg path `M0,100 C30,60 0,20 50,50 C70,70 60,0 100,0`  |
| bezier     | object         | null    | bezier curve animate |
| onStart    | func           | null    | A function that should be called when the tween begins, callback(e), e: { index, target }  |
| onUpdate   | func           | null    | A function that should be called every time the animate updates, callback(e), e: { index, targets,  ratio }   |
| onComplete | func           | null    | A function that should be called when the animate has completed, callback(e), e: { index, targets }  |
| onRepeat   | func           | null    | A function that should be called each time the animate repeats, callback(e), e: { index, targets }  |

> Cannot be used at the same time `reverse` and `repeat: -1`.

### animation =[ ] is timeline
```js | pure
<TweenOne animation={[{ x: 100 }, { y: 100 }]} />
```
## Plugins
### SvgDrawPlugin

```js | pure
import { Plugins } from 'rc-tween-one';
import SvgDrawPlugin from 'rc-tween-one/es/plugin/SvgDrawPlugin';
Plugins.push(SvgDrawPlugin);

<TweenOne animation={{ SVGDraw: '10%' }} />
```

SVGDraw = string or number;

{ SVGDraw: 30 } or { SVGDraw: 'start end' } start and end values can be `%`;

### SvgMorphPlugin

```js | pure
import { Plugins } from 'rc-tween-one';
import SvgMorphPlugin from 'rc-tween-one/es/plugin/SvgMorphPlugin';
Plugins.push(SvgMorphPlugin);

<TweenOne animation={{ SVGMorph: { path: '300,10 500,200 120,230 450,220 0,20' }}} />
```
#### SvgMorphPlugin API

| name             | type   | default | description    |
|------------------|--------|---------|----------------|
| path             | string | null    | svg path, ref: `M0,0L100,0`;|
| attr             | string | null    | Svg tag attributes, example: `polygon` is ` points`, `path` is `d`. |
| maxSegmentLength | number | 0.5     | The lower the value, the smoother the generated animation will be, but at the expense of performance;|


### PathPlugin

```js | pure
import { Plugins } from 'rc-tween-one';
import PathMotionPlugin from 'rc-tween-one/es/plugin/PathMotionPlugin';
Plugins.push(PathMotionPlugin);

<TweenOne animation={{ PathMotion: { path: '300,10 500,200 120,230 450,220 0,20' }}} />
```
#### PathMotion API

| name   | type                | default         | description                   |
| ------ | ------------------- | --------------- | ----------------------------- |
| path   | string / {x,y}[]           | null            | svg path, ref: `M0,0L100,0`; |
| pathVars | IPathVars | null | Only valid if path is array `[{x, y}, {x, y}]` |
| center | `number \ string[]` | `['50%','50%']` | center point, ref: `[50px, 50px]`;   |
| x      | boolean             | true            | x follow the path.               |
| y      | boolean             | true            | y follow the path.               |
| rotate | boolean             | true            | rotate follow the path.          |

##### IPathVars
| name   | type                | default         | description                   |
| ------ | ------------------- | --------------- | ----------------------------- |
| type      | `thru \ soft \ cubic` | `thru`  | path type. `thru` same as the path; `soft` with the curve of attraction facing them, but not through the point;  `cubic` allows you to define standard Cubic Bezier, example: `[start, control, control, end]`.  |
| curviness | 0-2                   | 1       | This determines how "curvy" the resulting path is. `0` is lines, `1` is curved path, `2` would make it much more curvy. It can be `1.5`.  |
| relative  | boolean               | false   | Increase relative to current value. example: if the target's x starts at 100 and the path is `[{x:5}, {x:10}, {x:-2}]` , it would first move to `105`, then `115`, and finally end at `113`. |

### ChildrenPlugin

#### Children = { value:, floatLength, formatMoney };

| name | type | default | description |
|---|---|---|---|
| value | number | null | children number to value. |
| floatLength | number | null | float precision length |
| formatMoney | `true` \ { thousand, decimal } | null | format number to money. |

#### formatMoney = { thousand, decimal }

| name | type | default | description |
|---|---|---|---|
| thousand | string | `,` | no explanation. |
| decimal  | string | `.` | no explanation. |

## TweenOneGroup

| name      | type           | default | description    |
|------------|----------------|---------|----------------|
| appear    |  boolean       |  true   |  whether support appear anim |
| enter     | object / array / func | `{ x: 30, opacity: 0, type: 'from' }` | enter anim twee-one data. when array is tween-one timeline, func refer to queue-anim  |
| leave     | object / array / func | `{ x: 30, opacity: 0 }` | leave anim twee-one data. when array is tween-one timeline, func refer to queue-anim  |
| onEnd     |  func          | -    | one animation end callback |
| animatingClassName | array | `['tween-one-entering', 'tween-one-leaving']` | className to every element of animating |
| resetStyle  |  boolean    | true | TweenOne resetStyle, reset the initial style when changing animation. |
| exclusive   |  boolean   | false  | Whether to allow a new animate to execute immediately when switching. `enter => leave`: execute immediately leave |
| component | 	React.Element/String | div  |  component tag  | 
| componentProps | object  |  -  | component tag props |
