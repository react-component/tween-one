import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';


class Demo extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      paused: true,
      reverse: false,
      restart: false,
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
      paused: false,
      reverse: false,
      moment: null,
    });
  }

  onPause() {
    this.setState({
      paused: true,
      moment: null,
    });
  }

  onReverse() {
    this.setState({
      reverse: true,
      paused: false,
      moment: null,
    });
  }

  onRestart() {
    this.setState({
      moment: 0,
      paused: false,
      reverse: false,
    });
  }

  render() {
    return (
      <div>
        <div style={{height: 200}}>
          <Tween animation={[{translateX: '500px', duration: 1000}, {y: 100}, {x: 100}]}
                 paused={this.state.paused}
                 reverse={this.state.reverse}
                 moment={this.state.moment}
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
