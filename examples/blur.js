import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';

class Demo extends React.Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return (<div>
      <div>filter 里的滤镜，'grayScale', 'sepia', 'hueRotate', 'invert', 'brightness', 'contrast', 'blur'</div>
      <Tween animation={{blur: '10px', sepia: '100%', duration: 2000}} style={{ filter: 'blur(3em)'}}>
        <img width="500" src="https://t.alipayobjects.com/images/T1CFtgXb0jXXXXXXXX.jpg"/>
      </Tween>
    </div>);
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
