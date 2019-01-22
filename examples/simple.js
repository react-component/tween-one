import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';
import '../assets/index.less';

class Demo extends React.Component {
  bbb = (e) => {
    console.log(e);// eslint-disable-line no-console
  }

  render() {
    return (<Tween
      animation={{ x: 300}}
      style={{ opacity: 1, height: 100, display: 'inline-block' }}
      onChange={this.bbb}
    >
      <div>执行动效</div>
    </Tween>);
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
