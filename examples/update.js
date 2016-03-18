import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';
class Demo extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      tweenData: { translateX: '100px', duration: 2000},
    };
  }

  componentDidMount() {
    setTimeout(()=> {
      this.setState({
        style: {transform: 'translateX(500px)', marginTop: 300},
      });
    }, 1100);
  }git

  render() {
    return (<Tween animation={this.state.tweenData} style={this.state.style}>
      <div>执行动效</div>
    </Tween>);
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
