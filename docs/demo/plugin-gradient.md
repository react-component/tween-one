---
title: plugin:gradient
order: 6
---

# gradient

```jsx
import React from 'react';
import TweenOne from 'rc-tween-one';

export default () => {
  return (
    <div>
      <TweenOne
        animation={{
          backgroundImage: 'linear-gradient(to bottom, #000fff 0%, red 20%, #fff000 100%)',
          repeat: -1,
          yoyo: true,
          duration: 2000,
        }}
        className="gradient"
      ></TweenOne>
      <TweenOne
        animation={{
          backgroundImage: 'radial-gradient(ellipse at 0%, #000fff 0%, #fff000 100%)',
          repeat: -1,
          yoyo: true,
          duration: 2000,
        }}
        className="radial"
      ></TweenOne>
    </div>
  );
};
```

### 背景渐变使用示例

```js
<TweenOne
  animation={{
    backgroundImage: 'linear-gradient(to left, #000fff 0%, red 20%, #fff000 100%)',
  }}
/>
```

> 注意：渐变的类型(type)、渐变的范围(extent-keyword)、颜色位置的单位请保持一致，否则以 animation 里的优先；

> 渐变色上面尽量加位置单位，示例 `linear-gradient(to left, #000fff 0%, red 20%, #fff000 100%)`

<style>
.gradient {
  width: 200px;
  height: 100px;
  margin-bottom: 20px;
  background-image: linear-gradient(to left, #fff000 0%, #00ff00 20%, #000fff 100%);
}
.radial {
  width: 200px;
  height: 100px;
  margin-bottom: 20px;
  background-image: radial-gradient(#e66465, #9198e5);
}
</style>
