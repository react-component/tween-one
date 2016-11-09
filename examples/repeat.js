import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';
class Demo extends React.Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return (<Tween
      animation={{
        opacity: 1,
        x: '100px',
        repeat: 1,
        repeatDelay: 1000,
        duration: 1000,
      }}
      style={{ opacity: 0 }}
    >
      <div>执行动效</div>
    </Tween>);
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
