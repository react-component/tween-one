import { TweenOneGroup } from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';
import '../assets/index.less';

class Demo extends React.Component {
  constructor() {
    super(...arguments);
    this.imgArray = [
      'https://os.alipayobjects.com/rmsportal/IhCNTqPpLeTNnwr.jpg',
      'https://os.alipayobjects.com/rmsportal/uaQVvDrCwryVlbb.jpg',
    ];
    this.state = {
      int: 0,
    };
    [
      'onClick',
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  onClick() {
    let int = this.state.int;
    int++;
    if (int >= this.imgArray.length) {
      int = 0;
    }
    this.setState({ int });
  }

  render() {
    return (<div>
      <button onClick={this.onClick}>切换</button>
      <TweenOneGroup>
        <div key={this.state.int}>
          <img src={this.imgArray[this.state.int]} height="200" />
        </div>
      </TweenOneGroup>
    </div>);
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
