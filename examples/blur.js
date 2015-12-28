import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';

class Demo extends React.Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return (<div>
      <div style={{height: 200}}>模糊与其它filter里滤镜，只支持xxx(10),可以多个</div>
      <Tween vars={{filter: 'blur(10px)', translateX: 1000, duration: 1000}}
             style={{height: 100, transform: 'translateX(100px)'}}>
        <div>执行动效</div>
      </Tween>
      <Tween vars={{filter: 'sepia(100%)', duration: 2000}}>
        <img width="500" src="https://t.alipayobjects.com/images/T1CFtgXb0jXXXXXXXX.jpg"/>
      </Tween>
    </div>);
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
