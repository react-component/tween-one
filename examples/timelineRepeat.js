import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      children: [<div key="1">依次进入</div>, <div key="2">依次进入</div>],
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        children: [<div key="1">121221</div>, <div key="2">1122121</div>],
      });
    }, 1000);
  }

  onChange = (e) => {
    console.log(e.timelineMode);// eslint-disable-line no-console
  }

  render() {
    return (
      <Tween
        animation={[
          { translateX: 100, rotate: 10 },
          { translateY: 100, translateX: 500, rotate: 0 },
          { translateX: 0, marginTop: 100 },
          { translateY: 0, marginLeft: 100 },
          { marginLeft: 0, marginTop: 0 },
        ]}
        repeat={3}
        yoyo
        style={{ height: 400 }}
        onChange={this.onChange}
      >
        {this.state.children}
      </Tween>
    );
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
