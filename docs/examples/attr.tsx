import Tween from 'rc-tween-one';
import React from 'react';

export default () => {
  return (
    <svg width="300" height="300" version="1.2" viewBox="0 0 600 600">
      <Tween
        animation={{ cx: 50 }}
        onChange={(e: any) => {
          console.log(e.vars);
        }}
        attr
        component="circle"
        cx="300"
        cy="55"
        r="50"
        style={{ fill: '#fff000', strokeWidth: 5, stroke: '#000fff' }}
      >
        <div>执行动效</div>
      </Tween>
    </svg>
  );
};
