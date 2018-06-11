import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';

function Demo() {
  return (
    <Tween
      animation={{ x: '+=500px', y: '-=40px' }}
      style={{ opacity: 1, height: 100, transform: 'translate(50px,30px)' }}
    >
      <div>执行动效</div>
    </Tween>);
}

ReactDom.render(<Demo />, document.getElementById('__react-content'));
