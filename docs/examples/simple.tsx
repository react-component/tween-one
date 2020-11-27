import Tween from 'rc-tween-one';
import React from 'react';

export default () => {
  const bbb = (e: any) => {
    console.log(e); // eslint-disable-line no-console
  };
  return (
    <Tween
      onChange={bbb}
      animation={[{ top: 100 }, { left: 100 }, { top: 1 }, { left: 1 }]}
      style={{ position: 'relative' }}
    >
      <div>执行动效</div>
    </Tween>
  );
};
