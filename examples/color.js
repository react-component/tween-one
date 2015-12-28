import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';
class Demo extends React.Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return <Tween vars={[{height:300,backgroundColor:'hsla(360,50%,50%,0.5)'},{color:'white'},{borderColor:'red'}]} style={{border:'1px solid #000'}}>
      <div>执行动效</div>
    </Tween>
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
