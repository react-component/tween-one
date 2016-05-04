import { TweenOneGroup } from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';

class Demo extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      children: [
        <div
          style={{
            opacity: 1,
            backgroundColor: '#000',
            float: 'left',
            height: 200,
          }}
          key="aa"
        >
          <div>执行动效</div>
        </div>,
        <div key="a"
          style={{opacity: 1,
            backgroundColor: '#000',
            float: 'left',
            height: 200,
          }}
        >
          <div>执行动效</div>
        </div>,
      ],
    };
    [
      'onClick',
      'enterType',
      'onEnd',
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  onClick() {
    const children = !this.state.children ? [
      <div
        style={{
          opacity: 1,
          backgroundColor: '#000',
          float: 'left',
          height: 200,
        }}
        key="aa"
      >
        <div>执行动效</div>
      </div>,
      <div key="a"
        style={{opacity: 1,
            backgroundColor: '#000',
            float: 'left',
            height: 200,
        }}
      >
        <div>执行动效</div>
      </div>,
    ] : null;
    this.setState({
      children,
    });
  }

  onEnd(e) {
    console.log(e);
  }

  enterType(e) {
    if (e.key === 'a') {
      return { x: 100, opacity: 0, type: 'from' };
    }
    return { y: 80, opacity: 0, type: 'from' };
  }

  render() {
    return (<div>
      <button onClick={this.onClick}>切换</button>
      <TweenOneGroup
        style={{ height: 300 }}
        enter={this.enterType}
        leave={[{ y: 90 }, { x: -100, opacity: 0 }]}
        onEnd={this.onEnd}
      >
        {this.state.children}
      </TweenOneGroup>
    </div>);
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
