import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';
import '../assets/index.less';

function Div(props) {
  return props.show ? <div>{props.children}</div> : null;
}

class Demo extends React.Component {
  state = {
    show: false,
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        show: true,
      });
    }, 1000);
  }
  render() {
    return (<Tween
      animation={{ x: 300 }}
      component={Div}
      componentProps={{ show: this.state.show }}
    >
      test
    </Tween>);
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
