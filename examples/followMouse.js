import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: {},
    };
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.mouseMove);
  }

  mouseMove = (e) => {
    const x = e.clientX;
    this.setState({
      animation: { x, duration: 1000, ease: 'easeOutQuad' },
    });
  }

  render() {
    return (
      <Tween animation={this.state.animation}
        moment={17}
        style={{ height: 100 }}
      >
        <div>执行动效</div>
      </Tween>);
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
