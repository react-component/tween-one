---
title: changelog
order: 2
---

# History

---

## 3.0.0-beta.x

- hooks 重构 rc-tween-one;
- 拆离动画库与组件, 动画库 https://docs.antfin-inc.com/tween-one-js-update_1/

#### API 变更

- 删除 `currentRef`, hooks 如果 component 是组件，ref 返回为组件的 ref;
- 删除 `reverseDelay`;
- 增加 `repeatDelay`;
- `attr` 改为 `boolean` 类型；
- 更新 `onChange` 和回调，cb: { moment, targets, index, mode, ratio, vars, index, repeat }
- 新增 `onChangeTimeline`, cb: { mode, targets, vars, moment, totalTime, repeat }
- 其它回调如 `onStart`、`onUpdate`、`onComplete` 等的 cb 的 target 全部更新为 targets；
- 删除 `BezierPlugin`，合进 PathMotionPlugin;;
- `PathMotionPlugin` 更改用法，使用 `PathMotion: { path, center, x, y, rotate }`, 详细参考 pathMotion demo;
- `SvgMorph` 依赖更改为使用 `flubber`；
- 滤境使用，改成 `import { Plugins } from 'rc-tween-one'; Plugins.push()`, 保留 `TweenOne.plugins.push()`;
- 删除 `TweenOne.easing.path(path)` 使用，直接用 `ease: 'M0,0L100,100'`;
- 增加动画区域播放 `regionStartTime`, `regionEndTime`;
- 增加对背景渐变的动画支持，`backgroundImage: 'linear-gradient(to left, #000fff 0%, red 20%, #fff000 100%)'`
- TweenOneGroup 使用改成 `import TweenOneGroup from 'rc-tween-one/lib/TweenOneGroup';`
---

## 2.2.0

1. resetStyleBool 改名成 resetStyle;
2. TweenOne 删除 updateReStart, 现在默认是。
3. Group 重构动画逻辑，以队列形式切换，如果在动画时做切换，需将动画完成后再执切换动画。
4. Group 增加 exclusive, 在队列动画时强行执行切换动画。

## 2.0.0

add repeat and yoyo to tag;

## 1.8.0

add children plugin.

## 0.4

1. filter 拆分为 'grayScale', 'sepia', 'hueRotate', 'invert', 'brightness', 'contrast', 'blur', 与 transform 一致；

2. 忧化时间轴

3. 忧化 yoyo 在数组最后个卡顿的问题。
