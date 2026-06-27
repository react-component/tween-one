<div align="center">
  <h1>@rc-component/tween-one</h1>
  <p><sub><img alt="Ant Design" height="14" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style="vertical-align: -0.125em;" /> Ant Design 生态的一部分。</sub></p>
  <p>🎬 React 补间动画基础组件。</p>
</div>

<p align="center"><a href="./README.md">English</a> | 简体中文</p>


<div align="center">

[![NPM version][npm-image]][npm-url] [![npm download][download-image]][download-url] [![build status][github-actions-image]][github-actions-url] [![Codecov][codecov-image]][codecov-url] [![bundle size][bundlephobia-image]][bundlephobia-url] [![dumi][dumi-image]][dumi-url]

</div>

## 特性

- 面向 React 元素和 SVG 的声明式补间动画组件。
- 支持时间线、重复、yoyo、路径动画、SVG 绘制/变形、数字动画和分组过渡。
- 被 Ant Design 的动画示例和旧动画演示使用。

## 安装

```bash
npm install @rc-component/tween-one
```

`rc-tween-one` 是旧包名。新版本应使用带 scope 的 `@rc-component/tween-one` 包。

## 使用

```tsx
import TweenOne from '@rc-component/tween-one';

export default () => (
  <TweenOne animation={{ x: 100, opacity: 1 }} style={{ opacity: 0 }}>
    demo
  </TweenOne>
);
```

## 插件 API

```tsx
import TweenOne, { Plugins } from '@rc-component/tween-one';
import SvgDrawPlugin from '@rc-component/tween-one/es/plugin/SvgDrawPlugin';

Plugins.push(SvgDrawPlugin);

export default () => (
  <svg width="160" height="80">
    <TweenOne
      animation={{ SVGDraw: '100%' }}
      component="path"
      d="M0,40L160,40"
      style={{ fill: 'none', stroke: '#1677ff', strokeWidth: 8 }}
    />
  </svg>
);
```

## 示例

- 本地文档：运行 `npm start`，并打开终端输出的 dumi 地址。
- Pull Request 预览由 Vercel 和 Surge 发布。
- 动画 API 文档：https://motion.ant.design/api/tween-one

## 浏览器支持

| Edge   | Chrome     | Firefox     | Opera     | Safari    |
| ------ | ---------- | ----------- | --------- | --------- |
| IE 10+ | Chrome 31+ | Firefox 31+ | Opera 30+ | Safari 7+ |

## 本地开发

```bash
npm install --legacy-peer-deps
npm start
```

常用检查：

```bash
npm run lint
npm run tsc
npm test
npm run build
npm run compile
```

## 发布

```bash
npm run prepublishOnly
```

包构建完成后，发布流程由 `@rc-component/np` 通过 `rc-np` 命令处理。
## API

<a href='https://motion.ant.design/api/tween-one' target='_blank'>中文文档</a>

### Props

| 名称             | 类型                   | 默认值 | 说明                                                                                              |
| ---------------- | ---------------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| animation        | object / array         | null    | 动画配置参数                                                                             |
| paused           | boolean                | false   | 暂停动画时间线                                                                                   |
| reverse          | boolean                | false   | 反向播放动画时间线                                                                                  |
| delay            | number                 | 0       | 动画时间线延迟                                                                                   |
| repeat           | number                 | 0       | `animation` 中所有数据的重复次数；无限重复请使用 -1                                              |
| repeatDelay      | number                 | 0       | 动画时间线重复延迟                                                                            |
| yoyo             | boolean                | false   | 每次重复时让 `animation` 中所有数据正反交替播放。                                    |
| onChange         | func                   | null    | 动画变化时调用，`callback({ moment, targets, index, mode, ratio, vars, index, repeat })` |
| onChangeTimeline | func                   | null    | 动画时间线变化时调用，`callback({ mode, targets, vars, moment, totalTime, repeat })`           |
| moment           | number                 | null    | 设置当前帧                                                                                    |
| regionStartTime  | number                 | 0       | 设置动画区间的开始时间                                                               |
| regionEndTime    | number                 | null    | 设置动画区间的结束时间                                                                 |
| attr             | boolean                | false   | 属性动画为 `true`；SVG morph 时必须为 `true`。                                            |
| resetStyle       | boolean                | false   | 更新动画数据时重置初始样式                                                                  |
| component        | string / React.Element | `div`   | 组件标签                                                                                            |
| componentProps   | object                 | null    | 当 `component` 为 `React.Element` 时传入组件属性，不添加 `style`                                         |

### animation = { }

> 基础动画参数。请查看[动画术语](https://motion.ant.design/language/animate-term)。

| 名称          | 类型                      | 默认值         | 说明                                                                                                |
| ------------- | ------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------- |
| [key: string] | `string` `number` `array` | null            | 所有基于数值的变量，例如 left、x、color、shadow                                              |
| type          | string                    | `to`            | 播放类型：`to`、`from`、`set`                                                                               |
| duration      | number                    | 450             | 动画时长                                                                                           |
| delay         | number                    | 0               | 动画延迟                                                                                              |
| repeat        | number                    | 0               | 动画重复次数；无限重复请使用 -1                                                             |
| repeatDelay   | number                    | 0               | 重复开始延迟                                                                                         |
| appearTo      | number                    | null            | 添加到指定时间                                                                                  |
| yoyo          | boolean                   | false           | `true`：每次重复时正反交替播放。                                                   |
| ease          | string                    | `easeInOutQuad` | 动画缓动，参考[这里](http://easings.net/en)，也可传入 SVG 路径 `M0,100 C30,60 0,20 50,50 C70,70 60,0 100,0`       |
| bezier        | object                    | null            | 贝塞尔曲线动画                                                                                       |
| onStart       | func                      | null            | 补间开始时调用的函数，`callback(e)`，`e: { index, target }`                  |
| onUpdate      | func                      | null            | 动画每次更新时调用的函数，`callback(e)`，`e: { index, targets, ratio }` |
| onComplete    | func                      | null            | 动画完成时调用的函数，`callback(e)`，`e: { index, targets }`        |
| onRepeat      | func                      | null            | 动画每次重复时调用的函数，`callback(e)`，`e: { index, targets }`         |

> `reverse` 和 `repeat: -1` 不能同时使用。

### animation = [] 为时间线

```js | pure
<TweenOne animation={[{ x: 100 }, { y: 100 }]} />
```

## 插件

### SvgDrawPlugin

```js | pure
import { Plugins } from '@rc-component/tween-one';
import SvgDrawPlugin from '@rc-component/tween-one/es/plugin/SvgDrawPlugin';
Plugins.push(SvgDrawPlugin);

<TweenOne animation={{ SVGDraw: '10%' }} />;
```

SVGDraw = string 或 number；

{ SVGDraw: 30 } 或 { SVGDraw: 'start end' }，start 和 end 的值可以为 `%`。

### SvgMorphPlugin

```js | pure
import { Plugins } from '@rc-component/tween-one';
import SvgMorphPlugin from '@rc-component/tween-one/es/plugin/SvgMorphPlugin';
Plugins.push(SvgMorphPlugin);

<TweenOne animation={{ SVGMorph: { path: '300,10 500,200 120,230 450,220 0,20' } }} />;
```

#### SvgMorphPlugin API

| name             | type   | 默认 | description                                                                                           |
| ---------------- | ------ | ------- | ----------------------------------------------------------------------------------------------------- |
| path             | string | null    | SVG 路径，参考：`M0,0L100,0`；                                                                          |
| attr             | string | null    | SVG 标签属性，例如 `polygon` 为 `points`，`path` 为 `d`。                                   |
| maxSegmentLength | number | 0.5     | 值越小，生成的动画越平滑，但会牺牲性能。 |

### PathMotionPlugin

```js | pure
import { Plugins } from '@rc-component/tween-one';
import PathMotionPlugin from '@rc-component/tween-one/es/plugin/PathMotionPlugin';
Plugins.push(PathMotionPlugin);

<TweenOne animation={{ PathMotion: { path: '300,10 500,200 120,230 450,220 0,20' } }} />;
```

#### PathMotion API

| name     | type                | 默认         | description                                    |
| -------- | ------------------- | --------------- | ---------------------------------------------- |
| path     | string / {x,y}[]    | null            | SVG 路径，参考：`M0,0L100,0`；                   |
| pathVars | IPathVars           | null            | 仅在 path 为数组时有效 `[{x, y}, {x, y}]` |
| center   | `number \ string[]` | `['50%','50%']` | 中心点，参考：`[50px, 50px]`；             |
| x        | boolean             | true            | x 跟随路径。                             |
| y        | boolean             | true            | y 跟随路径。                             |
| rotate   | boolean             | true            | rotate 跟随路径。                        |

##### IPathVars

| name      | type                  | 默认 | description                                                                                                                                                                                                    |
| --------- | --------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type      | `thru \ soft \ cubic` | `thru`  | 路径类型。`thru` 与路径一致；`soft` 使用趋近点但不穿过点的曲线；`cubic` 可定义标准三次贝塞尔，例如 `[start, control, control, end]`。 |
| curviness | 0-2                   | 1       | 决定生成路径的弯曲程度。`0` 为直线，`1` 为曲线路径，`2` 更弯曲，也可以是 `1.5`。                                                                       |
| relative  | boolean               | false   | 基于当前值相对增加。例如目标 x 从 100 开始，路径为 `[{x:5}, {x:10}, {x:-2}]`，则会先移动到 `105`，再到 `115`，最终停在 `113`。                   |

### ChildrenPlugin

#### Children = { value, floatLength, formatMoney }

| name        | type                           | 默认 | description               |
| ----------- | ------------------------------ | ------- | ------------------------- |
| value       | number                         | null    | 将子节点数字转换为值。 |
| floatLength | number                         | null    | 小数精度长度    |
| formatMoney | `true` \ { thousand, decimal } | null    | 将数字格式化为金额。   |

#### formatMoney = { thousand, decimal }

| name     | type   | 默认 | description     |
| -------- | ------ | ------- | --------------- |
| thousand | string | `,`     | 无说明。 |
| decimal  | string | `.`     | 无说明。 |

## TweenOneGroup

| 名称               | 类型                  | 默认值                                       | 说明                                                                                                       |
| ------------------ | --------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| appear             | boolean               | true                                          | 是否支持 appear 动画                                                                                       |
| enter              | object / array / func | `{ x: 30, opacity: 0, type: 'from' }`         | 进入动画数据。数组表示 tween-one 时间线，函数用法参考 queue-anim。                              |
| leave              | object / array / func | `{ x: 30, opacity: 0 }`                       | 离开动画数据。数组表示 tween-one 时间线，函数用法参考 queue-anim。                              |
| onEnd              | func                  | -                                             | 单个动画结束回调                                                                                        |
| animatingClassName | array                 | `['tween-one-entering', 'tween-one-leaving']` | 添加到每个动画中元素的 className                                                                           |
| resetStyle         | boolean               | true                                          | TweenOne resetStyle，动画变化时重置初始样式。                                             |
| exclusive          | boolean               | false                                         | 切换时是否允许新动画立即执行。`enter => leave` 表示立即执行 leave。 |
| component          | React.Element/String  | div                                           | 组件标签                                                                                                     |
| componentProps     | object                | -                                             | 组件标签 props                                                                                               |

## 许可证

@rc-component/tween-one 基于 [MIT](./LICENSE) 许可证发布。

[npm-image]: https://img.shields.io/npm/v/@rc-component/tween-one.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@rc-component/tween-one
[github-actions-image]: https://github.com/react-component/tween-one/actions/workflows/main.yml/badge.svg
[github-actions-url]: https://github.com/react-component/tween-one/actions/workflows/main.yml
[codecov-image]: https://img.shields.io/codecov/c/github/react-component/tween-one/master.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/react-component/tween-one/branch/master
[download-image]: https://img.shields.io/npm/dm/@rc-component/tween-one.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/@rc-component/tween-one
[bundlephobia-url]: https://bundlephobia.com/package/@rc-component/tween-one
[bundlephobia-image]: https://badgen.net/bundlephobia/minzip/@rc-component/tween-one
[dumi-url]: https://github.com/umijs/dumi
[dumi-image]: https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square
