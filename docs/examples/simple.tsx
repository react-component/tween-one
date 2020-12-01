import Tween from 'rc-tween-one';
import React from 'react';

export default () => {
  const bbb = (e: any) => {
    console.log(e); // eslint-disable-line no-console
  };
  return (
    <Tween
      onChange={bbb}
      animation={{x: 300}}
      style={{ position: 'relative' }}
    >
      <div>执行动效</div>
    </Tween>
  );
};
