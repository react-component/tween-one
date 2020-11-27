---
title: TweenOneGroup
order: 8
---

### appear = false

```jsx
import TweenOneGroup from 'rc-tween-one/src/TweenOneGroup';
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
      <TweenOneGroup style={{ position: 'relative' }} appear={false} className="demo-group">
        <div key={int.toString()}>
          <img src={imgArray[int]} height="200" alt="img" />
        </div>
      </TweenOneGroup>
    </div>
  );
};
```

## basic

<code src="../examples/group.tsx" />

### exclusive = true

```jsx
import TweenOneGroup from 'rc-tween-one/src/TweenOneGroup';
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

### children change

```jsx
import TweenOneGroup from 'rc-tween-one/src/TweenOneGroup';
import React from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';

const imgArray = [
  'https://os.alipayobjects.com/rmsportal/IhCNTqPpLeTNnwr.jpg',
  'https://os.alipayobjects.com/rmsportal/uaQVvDrCwryVlbb.jpg',
];
export default () => {
  const [children, setChildren] = React.useState(
    [<div key="1">
      <img src={imgArray[0]} height="200" alt="img" />
    </div>]
  )
  return (
    <div>
      <Button
        onClick={() => {
          const newChildren = (
            <div key={Date.now()}>
             <img src={imgArray[Math.floor(Math.random() * imgArray.length)]} height="200" alt="img" />
            </div>
          )
          setChildren(children.concat(newChildren));
        }}
      >
        添加
      </Button>
      <Button
        onClick={() => {
          children.splice(children.length - 1, 1);
          console.log(children)
          setChildren([...children])
        }}
      >
        删除
      </Button>
      <TweenOneGroup style={{ position: 'relative' }} exclusive>
        {children}
      </TweenOneGroup>
    </div>
  );
};
```

出场交叉样式

```css
.demo-group.tween-one-leaving {
  position: absolute;
  top: 0;
  left: 0;
}
````

<style>
  .demo-group.tween-one-leaving{
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
