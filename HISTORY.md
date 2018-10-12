# History
----

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

1. filter 拆分为 'grayScale', 'sepia', 'hueRotate', 'invert', 'brightness', 'contrast', 'blur', 与transform一致；

2. 忧化时间轴

3. 忧化 yoyo 在数组最后个卡顿的问题。