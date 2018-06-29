import { TweenOneGroup } from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';
import QueueAnim from 'rc-queue-anim';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      children: [
        <QueueAnim
          style={{
            opacity: 1,
            backgroundColor: '#000fff',
            float: 'left',
            height: 200,
            width: 100,
          }}
          key="aa"
          delay={1000}
        >
          <div key="1">执行动效</div>
          <div key="2">执行动效</div>
        </QueueAnim>,
        <div key="a"
          style={{
            opacity: 1,
            backgroundColor: '#000',
            float: 'left',
            height: 200,
          }}
        >
          <div>执行动效</div>
        </div>,
      ],
    };
  }

  onClick = () => {
    const children = !this.state.children ? [
      (<QueueAnim
        style={{
          opacity: 1,
          backgroundColor: '#000fff',
          float: 'left',
          height: 200,
          width: 100,
        }}
        key="aa"
        delay={1000}
      >
        <div key="1">执行动效</div>
        <div key="2">执行动效</div>
      </QueueAnim>), (<div key="a"
        style={{
          opacity: 1,
          backgroundColor: '#000',
          float: 'left',
          height: 200,
        }}
      >
        <div>执行动效</div>
      </div>)] : null;
    this.setState({
      children,
    });
  }

  onEnd = (e) => {
    console.log(e);// eslint-disable-line no-console
  }

  enterType = (e) => {
    if (e.key === 'a') {
      return { x: 100, opacity: 0, type: 'from' };
    }
    return { y: 80, opacity: 0, type: 'from' };
  }

  render() {
    return (
      <div>
        <button onClick={this.onClick}>切换</button>
        <TweenOneGroup
          style={{ height: 300 }}
          enter={this.enterType}
          leave={[{ y: 90 }, { x: 100, opacity: 0 }]}
          onEnd={this.onEnd}
        >
          {this.state.children}
        </TweenOneGroup>
      </div>);
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
