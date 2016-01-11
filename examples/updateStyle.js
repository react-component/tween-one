import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';

class Demo extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      style: {opacity: 1, height: 100, transform: 'translate(50px,30px)'},
    };
  }

  componentDidMount() {
    setTimeout(()=> {
      this.setState({
        style: {opacity: 1, height: 200, transform: 'translate(250px,30px)'},
      });
    }, 1000);
    setTimeout(()=> {
      this.setState({
        style: {opacity: 1, height: 300, transform: 'translate(350px,30px)'},
      });
    }, 5500);
  }


  render() {
    return (<Tween vars={{translateX: '500px', duration: 5000}}
                   style={this.state.style}>
      <div>执行动效</div>
    </Tween>);
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
