import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';

class Demo extends React.Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return (<Tween animation={[{translateX: '50em', delay: 1000}, {delay: -350, y: 150}]}
                   style={{opacity: 1, height: 300, transform: 'translate(50px,30px)'}}>
      <div>执行动效</div>
    </Tween>);
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
