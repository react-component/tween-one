---
title: TweenOneGroup
order: 8
---

### appear = false


### exclusive = true

```jsx
import TweenOneGroup from 'rc-tween-one/es/TweenOneGroup';
import React from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';

const imgArray = [
  'https://os.alipayobjects.com/rmsportal/IhCNTqPpLeTNnwr.jpg',
  'https://os.alipayobjects.com/rmsportal/uaQVvDrCwryVlbb.jpg',
];
export default () => {
  const [int, setInt] = React.useState(0);
  return (
    <div>
      <Button
        onClick={() => {
          let i = int;
          i++;
          if (i >= imgArray.length) {
            i = 0;
          }
          setInt(i);
        }}
      >
        切换
      </Button>
      <TweenOneGroup style={{ position: 'relative' }} exclusive className="demo-group">
        <div key={int.toString()}>
          <img src={imgArray[int]} height="200" alt="img" />
        </div>
      </TweenOneGroup>
    </div>
  );
};
```


出场交叉样式

```css
.demo-group .tween-one-leaving {
  position: absolute;
  top: 0;
  left: 0;
}
````

<style>
  .demo-group .tween-one-leaving{
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
