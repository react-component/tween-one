import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';

const a = '自定义参数';
class Demo extends React.Component {
  constructor() {
    super(...arguments);
  }

  abc(a, e) {
    //update里传回出当前的百分比；
   // console.log('bind:' + a, 'update:' + e)
  }

  render() {
    return <Tween vars={{x:'+=500px',y:'-=40px',onUpdate:this.abc.bind(this,a)}} style={{opacity:1,height:100,transform:'translate(50px,30px)'}}>
      <div>执行动效</div>
    </Tween>
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
