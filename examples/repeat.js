import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';
class Demo extends React.Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return <Tween vars={{opacity:1,translateX:'100px',repeat:3,duration:1000}} style={{opacity:0}}>
      <div>执行动效</div>
    </Tween>
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
