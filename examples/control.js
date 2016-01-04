import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';


class Demo extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      tweenType: 'pause',
    };
    [
      'onPlay',
      'onPause',
      'onReverse',
      'onRestart',
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  onPlay() {
    this.setState({
      tweenType: 'play',
    });
  }

  onPause() {
    this.setState({
      tweenType: 'pause',
    });
  }

  onReverse() {
    this.setState({
      tweenType: 'reverse',
    });
  }

  onRestart() {
    this.setState({
      tweenType: 'restart',
    });
  }

  render() {
    return (
      <div>
        <div style={{height: 200}}>
          <Tween vars={[{translateX: '500px', duration: 1000}, {y: 100}, {x: 100}]}
                 type={this.state.tweenType}
                 style={{opacity: 1, width: 100, transform: 'translate(50px,30px)'}}>
            <div>执行动效</div>
          </Tween>
        </div>
        <button onClick={this.onPlay}>play</button>
        <button onClick={this.onPause}>pause</button>
        <button onClick={this.onReverse}>reverse</button>
        <button onClick={this.onRestart}>restart</button>
      </div>);
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
