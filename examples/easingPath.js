import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';
import PathPlugin from '../src/plugin/PathPlugin';
Tween.plugins.push(PathPlugin);

class Demo extends React.Component {
  constructor() {
    super(...arguments);
  }

  render() {
    const p = 'M0,100 C30,60 0,20 50,50 C70,70 60,0 100,0';
    return (<div>
      <Tween
        animation={{ duration: 2000, x: 500, ease: Tween.easing.path(p) }}
        style={{ opacity: 1, height: 100, transform: 'translate(50px,30px)' }}
      >
        <div>执行动效</div>
      </Tween>
      <svg>
        <path fill="none" stroke="#000" d={p} />
      </svg>
    </div>);
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
