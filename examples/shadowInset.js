import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';

function Demo() {
  return (
    <Tween animation={{ boxShadow: '0 0 0 #000 inset' }}
      style={{ opacity: 1, height: 100, boxShadow: 'rgba(0, 0, 0, 1) 10px 10px 10px 0px inset' }}
    >
      <div>执行动效</div>
    </Tween>
  );
}

ReactDom.render(<Demo />, document.getElementById('__react-content'));
