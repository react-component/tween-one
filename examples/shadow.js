import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';
class Demo extends React.Component {
  constructor() {
    super(...arguments);
  }


  render() {
    return (<Tween
      vars={[{textShadow: '0 1em 5px rgba(0,0,0,1)', duration: 1000}, {boxShadow: '0 0 30px rgba(255,125,0,0.5)', borderRadius: 50, duration: 1000}]}
      style={{height: 100, backgroundColor: '#fff000'}}>
      <div>执行动效</div>
    </Tween>);
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
