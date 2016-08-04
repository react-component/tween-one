# rc-tween-one
---

React TweenOne Component


[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/rc-tween-one.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-tween-one
[travis-image]: https://img.shields.io/travis/react-component/tween-one.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/tween-one
[coveralls-image]: https://img.shields.io/coveralls/react-component/tween-one.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/tween-one?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/react-component/tween-one.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/react-component/tween-one
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-tween-one.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-tween-one


## Browser Support

|![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png)|
| --- | --- | --- | --- | --- |
| IE 9+ ✔ | Chrome 31.0+ ✔ | Firefox 31.0+ ✔ | Opera 30.0+ ✔ | Safari 7.0+ ✔ |

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

```js
var TweenOne = require('rc-tween-one');
var React = require('react');
React.render(<TweenOne animation={{x:100}}>
  demo
</TweenOne>, container);
```

### Plugin

```
var TweenOne = require('rc-tween-one');
var SvgDrawPlugin = require('rc-tween-one/lib/plugin/SvgDrawPlugin');
Tween.plugins.push(SvgDrawPlugin);
```

### TweenOneGroup
```js
var TweenOne = require('rc-tween-one');
var React = require('react');
var TweenOneGroup = TweenOne.TweenOneGroup;
React.render(<TweenOneGroup>
  <div key="0">demo</div>
  <div key="1">demo</div>
</TweenOneGroup>, container);
```

## API

> version >= 0.6.x support SVG;


### props

| name      | type           | default | description    |
|------------|----------------|---------|----------------|
| animation  | object / array | null    | animate configure parameters |
| paused      | boolean        | false   | animate pause |
| reverse    | boolean        | false   | animate revers |
| reverseDelay | number       | 0       | animate revers start delay |
| onChange   | func           | null    | when the animation change called, callback({ moment, item, tween, index, mode}) |
| moment     | number         | null    | set the current frame    |
| attr       | string         | `style` | `style` or `attr`, `attr` is tag attribute. when morph SVG must be `attr`.  |
| component  | string / React.Element  | `div`   | component tag  |


### animation = { }

> transform need to set the initial value, must be set in the style;

> 0.4 filter => `grayScale`, `sepia`, `hueRotate`, `invert`, `brightness`, `contrast`, `blur`;  { blur: '5px' }  Unit must bring.

| name      | type           | default | description    |
|------------|----------------|---------|----------------|
| type       | string         | `to`    | play type: `to` `from`|
| in style   | string / number| null  | CSS style value: `translateX` `rotateX` `color` `marginTop` or `grayScale`, `sepia`, `hueRotate`, `invert`, `brightness`, `contrast`, `blur` or gsap: `x` `y`... |
| duration   |  number        | 450     | animate duration     |
| delay      | number         | 0       | animate delay  |
| repeat     | number         | 0       | animate repeat, To repeat indefinitely, use  -1 |
| repeatDelay| number         | 0       | repeat start delay |
| yoyo       | boolean        | false   | if `true`, every other repeat cycle will run in the opposite direction so that the tween appears to go back and forth (forward then backward).  |
| ease       | string         | `easeInOutQuad` | animate ease. [refer](http://easings.net/en)  |
| bezier     | object         | null    | bezier curve animate |
| onStart    | func           | null    | A function that should be called when the tween begins  |
| onUpdate   | func           | null    | A function that should be called every time the animate updates  |
| onComplete | func           | null    | A function that should be called when the animate has completed  |
| onRepeat   | func           | null    | A function that should be called each time the animate repeats  |



### animation =[ ] is timeline

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


## TweenOneGroup

| name      | type           | default | description    |
|------------|----------------|---------|----------------|
| appear    |  boolean       |  true   |  whether support appear anim |
| enter     | object / array / func | `{ x: 30, opacity: 0, type: 'from' }` | enter anim twee-one data. when array is tween-one timeline, func refer to queue-anim  |
| leave     | object / array / func | `{ x: 30, opacity: 0 }` | leave anim twee-one data. when array is tween-one timeline, func refer to queue-anim  |
| onEnd     |  func          | -    | one animation end callback |
| animatingClassName | array | `['tween-one-entering', 'tween-one-leaving']` | className to every element of animating |
| component | 	React.Element/String | div  |  component tag  | 
