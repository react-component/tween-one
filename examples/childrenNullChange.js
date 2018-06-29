import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import '../assets/index.less';

function Div({ show, children }) {
  return show ? <div>{children}</div> : null;
}

Div.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.any,
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
    return (
      <Tween
        animation={{ x: 300 }}
        component={Div}
        componentProps={{ show: this.state.show }}
      >
        test
      </Tween>);
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
