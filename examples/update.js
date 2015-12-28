import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';
class Demo extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      tweenData: { translateX: '100px', duration: 300},
    };
  }

  componentDidMount() {
    setTimeout(()=> {
      this.setState({
        tweenData: {opacity: 0.5, marginTop: 100, duration: 1000},
      });
    }, 1000);
  }

  render() {
    return (<Tween vars={this.state.tweenData}>
      <div>执行动效</div>
    </Tween>);
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
