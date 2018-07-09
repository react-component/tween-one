import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';

function Demo() {
  return (
    <div style={{ position: 'relative', height: 500 }}>
      <Tween
        animation={[
          { x: 200, y: '+=300', blur: '10px', type: 'from', duration: 500 },
          { x: 400, y: 0 },
        ]}
        style={{ opacity: 1, width: 100, transform: 'translateY(100px)' }}
      >
        <div>执行动效</div>
      </Tween></div>);
}

ReactDom.render(<Demo />, document.getElementById('__react-content'));
