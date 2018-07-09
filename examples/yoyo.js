import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';

function Demo() {
  return (
    <Tween
      animation={[
        { opacity: 1, duration: 1000 },
        { x: 300, duration: 1000 },
        { translateX: '100px', repeat: -1, duration: 1000, yoyo: true },
      ]} style={{ opacity: 0 }}
    >
      <div>执行动效</div>
    </Tween>
  );
}

ReactDom.render(<Demo />, document.getElementById('__react-content'));
