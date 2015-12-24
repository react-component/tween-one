# rc-tween-one
---

## Development

```
npm install
npm start
```

## API

| props      | type           | default | description    |
|------------|----------------|---------|----------------|
| vars       | object / array | null    | 需要执行动画的参数 |


### vars = {}

| props      | type           | default | description    |
|------------|----------------|---------|----------------|
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



### vars =[] 时为timeline

### bezier = {}

| props      | type           | default | description    |
|------------|----------------|---------|----------------|
| type       | string         | 'soft'  | `thru`, `thruBasic`, `soft`, `quadratic`, `cubic` |
| autoRotate | boolean        | false   | 跟随位置旋转向  |
| vars       | array          | null    | 贝赛尔点的位置，如 `{x:100,y:100}` |

>> 贝赛尔曲线API参照 [gsap BezierPlugin](http://greensock.com/docs/#/HTML5/GSAP/Plugins/BezierPlugin/)

## Example

http://localhost:8100/examples
