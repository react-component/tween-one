import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';
class Demo extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      tweenData: {translateX: '100px', duration: 3000},
      childTweenData: {translateY: 200, duration: 1000},
    };
  }

  componentDidMount() {
    setTimeout(()=> {
      this.setState({
        tweenData: {opacity: 0.5, marginTop: 100, duration: 1000},
      });
    }, 1000);
    setTimeout(()=> {
      this.setState({
        childTweenData: [{translateY: 100}, {rotateY: 180, duration: 1000}, {rotateY: 0, duration: 1000}, {delay: -800, translateY: 0}],
      });
    }, 2000);
  }

  render() {
    return (<Tween vars={this.state.tweenData} style={{height: 300, width: 60, textAlign: 'center'}}>
      <div>大面包</div>
      <Tween vars={this.state.childTweenData} key="tween">小馒头</Tween>
    </Tween>);
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
