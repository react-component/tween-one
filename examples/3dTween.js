import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';
class Demo extends React.Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return <Tween vars={[{rotateY:180,duration:1300},{delay:-900,translateX:100,duration:1000}]} style={{margin:200,width:100,transform:'perspective(100px) rotateY(10deg)',backgroundColor:'#fff000'}}>
      <div>执行动效</div>
    </Tween>
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
