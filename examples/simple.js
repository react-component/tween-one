import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';

class Demo extends React.Component {
  constructor() {
    super(...arguments);
  }

  bbb() {
    // console.log(e);
  }

  render() {
    const children = [];
    for (let i = 0; i < 500; i++) {
      children.push(<Tween animation={{ x: 300, duration: 2000 }}
        onChange={this.bbb.bind(this)}
        style={{opacity: 1, marginLeft: '50px'}}
        key={i}
      >
        <div>执行动效</div>
      </Tween>);
    }
    return (<div>{children}</div>);
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
