import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';

class Demo extends React.Component {
  constructor() {
    super(...arguments);
  }

  bbb(e) {
    console.log(e);
  }

  render() {
    return (<Tween animation={{ translateX: '500px' }}
      onChange={this.bbb.bind(this)}
      style={{ opacity: 1, height: 100, transform: 'translate(50px,30px)' }}
    >
      <div>执行动效</div>
    </Tween>);
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
