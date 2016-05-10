import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';

class Demo extends React.Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return (<div>
      <div>模糊与其它filter里滤镜，只支持xxx(10),可以多个</div>
      <Tween animation={{blur: '10px', sepia: '100%', duration: 2000}} style={{ filter: 'blur(30px)'}}>
        <img width="500" src="https://t.alipayobjects.com/images/T1CFtgXb0jXXXXXXXX.jpg"/>
      </Tween>
    </div>);
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
