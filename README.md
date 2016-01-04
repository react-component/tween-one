# rc-tween-one
---

React TweenOne Component


[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]
[![Sauce Test Status](https://saucelabs.com/buildstatus/rc-tween-one)](https://saucelabs.com/u/rc-tween-one)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/rc-tween-one.svg)](https://saucelabs.com/u/rc-tween-one)

[npm-image]: http://img.shields.io/npm/v/rc-tween-one.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-tween-one
[travis-image]: https://img.shields.io/travis/ant-motion/tween-one.svg?style=flat-square
[travis-url]: https://travis-ci.org/ant-motion/tween-one
[coveralls-image]: https://img.shields.io/coveralls/ant-motion/tween-one.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/ant-motion/tween-one?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/ant-motion/tween-one.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/ant-motion/tween-one
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-tween-one.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-tween-one


## Browser Support

|![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png)|
| --- | --- | --- | --- | --- |
| IE 8+ ✔ | Chrome 31.0+ ✔ | Firefox 31.0+ ✔ | Opera 30.0+ ✔ | Safari 7.0+ ✔ |

## Screenshots

<img src="" width="288"/>


## Development

```
npm install
npm start
```

## Example

http://localhost:8100/examples/


## Feature

* support ie8,ie8+,chrome,firefox,safari

### Keyboard


## install


[![rc-tween-one](https://nodei.co/npm/rc-tween-one.png)](https://npmjs.org/package/rc-tween-one)


## Usage

```js
var TweenOne = require('rc-tween-one');
var React = require('react');
React.render(<TweenOne vars={{x:100}}>
               文案示例
             </TweenOne>, container);
```

## API

### props

| name      | type           | default | description    |
|------------|----------------|---------|----------------|
| type       | string         | `play`  | 播放参数，为 `play` `pause` `reverse` `restart` |
| vars       | object / array | null    | 需要执行动画的参数 |
| component  | string         | `div`   | 标签   |


### vars = {}

| name      | type           | default | description    |
|------------|----------------|---------|----------------|
| type       | string         | `to`    | 播放类型，`to` `from`|
| style里的样式 | string / number| null  | 样式里能执行动画的，如 `translateX` `rotateX` `color` `marginTop` 或 `x` `y`等 |
| duration   |  number        | 450     | 动画时间     |
| delay      | number         | 0       | 延时  |
| repeat     | number         | 0       | 重复,-1为无限重复 |
| repeatDelay| number         | 0       | 重复开始时的延时 |
| yoyo       | boolean        | false   | 重复时是否倒放  |
| ease       | string         | 'easeInOutQuad' | 数动缓动参数 |
| bezier     | object         | null    | 贝赛尔曲线动画   |
| onStart    | func           | null    | 动画开始时调用  |
| onUpdate   | func           | null    | 更新时调用  |
| onComplete | func           | null    | 结束时调用  |
| onRepeat   | func           | null    | 重复时调用  |



### vars =[ ] 时为timeline

### bezier = {}

| name      | type           | default | description    |
|------------|----------------|---------|----------------|
| type       | string         | 'soft'  | `thru`, `soft`, `quadratic`, `cubic` |
| autoRotate | boolean        | false   | 跟随位置旋转  |
| vars       | array          | null    | 贝赛尔点的位置，如 `{x:100,y:100}` |

> 贝赛尔曲线API参照 [gsap BezierPlugin](http://greensock.com/docs/#/HTML5/GSAP/Plugins/BezierPlugin/)

## Test Case

http://localhost:8100/tests/runner.html?coverage

## Coverage

http://localhost:8100/node_modules/rc-server/node_modules/node-jscover/lib/front-end/jscoverage.html?w=http://localhost:8100/tests/runner.html?coverage

## License

rc-tween-one is released under the MIT license.
