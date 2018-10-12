# rc-tween-one
---

React TweenOne Component


[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/rc-tween-one.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-tween-one
[travis-image]: https://img.shields.io/travis/react-component/tween-one.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/tween-one
[coveralls-image]: https://img.shields.io/coveralls/react-component/tween-one.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/tween-one?branch=master
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

http://react-component.github.io/tween-one/


## install


[![rc-tween-one](https://nodei.co/npm/rc-tween-one.png)](https://npmjs.org/package/rc-tween-one)


## Usage

```jsx
var TweenOne = require('rc-tween-one');
var React = require('react');
React.render(<TweenOne animation={{x:100}}>
  demo
</TweenOne>, container);
```

### Plugin

```jsx
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
```jsx
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
| paused      | boolean        | false   | animate pause |
| reverse    | boolean        | false   | animate revers |
| reverseDelay | number       | 0       | animate revers start delay |
| repeat     |  number        | 0       | `animation` all data repeat, To repeat indefinitely, use  -1 |
| yoyo       | boolean        | false   | `animation` all data alternating backward and forward on each repeat. |
| onChange   | func           | null    | when the animation change called, callback({ moment, target, index, mode, timelineMode }) |
| moment     | number         | null    | set the current frame    |
| attr       | string         | `style` | `style` or `attr`, `attr` is tag attribute. when morph SVG must be `attr`.  |
| resetStyle | boolean    | false   | update animation data, reset init style |
| component  | string / React.Element  | `div`   | component tag  |
| componentProps | object     | null   | component is React.Element, component tag props, not add `style` |


### animation = { }

> Basic animation param. please view [animation terms](https://motion.ant.design/language/animate-term)

| name      | type           | default | description    |
|------------|----------------|---------|----------------|
| type       | string         | `to`    | play type: `to` `from`|
| duration   |  number        | 450     | animate duration     |
| delay      | number         | 0       | animate delay  |
| repeat     | number         | 0       | animate repeat, To repeat indefinitely, use  -1 |
| repeatDelay| number         | 0       | repeat start delay |
| appearTo   | number         | null    | Add to the specified time |
| yoyo       | boolean        | false   | `true`: alternating backward and forward on each repeat. |
| ease       | string / func         | `easeInOutQuad` | animate ease. [refer](http://easings.net/en)  |
| bezier     | object         | null    | bezier curve animate |
| onStart    | func           | null    | A function that should be called when the tween begins, callback(e), e: { index, target }  |
| onUpdate   | func           | null    | A function that should be called every time the animate updates, callback(e), e: { index, target,  ratio }   |
| onComplete | func           | null    | A function that should be called when the animate has completed, callback(e), e: { index, target }  |
| onRepeat   | func           | null    | A function that should be called each time the animate repeats, callback(e), e: { index, target }  |

> Cannot be used at the same time `reverse` and `repeat: -1`.

### animation =[ ] is timeline

### ease: function

path easing;

| name      | type           | default | description    |
|------------|----------------|---------|----------------|
| path      | string         | null     | svg path       |
| param     | object         | `{ rect: 100, lengthPixel: 200 }` | rect is block size, default: 100 * 100; lengthPixel default: curve is divided into 200 sections |

```js
const path = 'M0,100 C30,60 0,20 50,50 C70,70 60,0 100,0';
const ease = Tween.easing.path(path, param = { rect: 100, lengthPixel: 200 });
React.render(<TweenOne animation={{ x: 100, ease }}>
  demo
</TweenOne>, container);
```

### BezierPlugin

bezier = { }

| name      | type           | default | description    |
|------------|----------------|---------|----------------|
| type       | string         | `soft`  | `thru`, `soft`, `quadratic`, `cubic` |
| autoRotate | boolean        | false   | to automatically rotate the target according to its position on the Bezier path  |
| vars       | array          | null    | bezier point data，as: `{x:100,y:100}` |

> bezier API refer to [gsap BezierPlugin](http://greensock.com/docs/#/HTML5/GSAP/Plugins/BezierPlugin/)

### SvgDrawPlugin

SVGDraw = string or number;

{ SVGDraw: 30 } or { SVGDraw: 'start end' } start and end values can be `%`;

### SvgMorphPlugin

svg polygon or path values: polygon is points, path is d; [demo](http://react-component.github.io/tween-one/examples/svg.html)

### PathPlugin

path = string or object;

string: `animation={{ path: 'M0,100 C30,60 0,20 50,50 C70,70 60,0 100,0' }}`,  default:  x, y, rotate;

object: `animation={{ path: { x: path, y: path, rotate: path } }}`, can be controlled from their own needs.

### ChildrenPlugin

#### Children = { value:, floatLength, formatMoney };

| name | type | default | description |
|---|---|---|---|
| value | number | null | children number to value. |
| floatLength | number | null | float precision length |
| formatMoney | boolean or { thousand, decimal } | false | format number to money. |

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
