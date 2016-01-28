import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';

class Demo extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      style: {opacity: 1, height: 100, marginLeft: 0, transform: 'translateY(0px)'},
    };
  }

  componentDidMount() {
    setTimeout(()=> {
      this.setState({
        style: {opacity: 1, height: 250, transform: 'translateY(100px)', marginLeft: 100},
      });
    }, 1000);
  }

  render() {
    return (<Tween animation={{ translateY: 200, marginLeft: 500, duration: 5000}}
                   style={this.state.style}>
      <div>变化的样式不做改变</div>
    </Tween>);
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
