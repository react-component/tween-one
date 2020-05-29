import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';
import '../assets/index.less';

function Demo() {
  const bbb = (e) => {
    console.log(e);// eslint-disable-line no-console
  }

  return (
    <Tween
      animation={{ x: 300 }}
      onChange={bbb}
      style={{ opacity: 1, height: 100, display: 'inline-block' }}
    >
      <div>执行动效</div>
    </Tween>
  );
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
