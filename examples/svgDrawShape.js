import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';
import SvgDrawPlugin from '../src/plugin/SvgDrawPlugin';
Tween.plugins.push(SvgDrawPlugin);

const dataStartArr = ['100%', '30 450', '50% 50%', '30% 400', '50 30%', 0];
let i = 0;
class Demo extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      tweenData: '50 30%',
    };
  }

  onClick() {
    const tweenData = dataStartArr[i];
    this.setState({
      tweenData,
    });
    i++;
    i = i >= dataStartArr.length ? 0 : i;
  }

  render() {
    return (
      <div>
        <button onClick={this.onClick.bind(this)}>点击切换</button>
        <p>当前参数：{this.state.tweenData}</p>
        <svg width="100%" height="600" version="1.2">
          <Tween
            animation={{ style: { SVGDraw: this.state.tweenData }, duration: 1000 }}
            style={{ fill: '#fff000', strokeWidth: 5,
              stroke: '#000fff', transform: 'translate(10px, 10px)',
            }}
            width="100"
            height="100"
            component="rect"
          />
          <Tween
            animation={{ style: { SVGDraw: this.state.tweenData }, duration: 1000 }}
            style={{ fill: '#fff000', strokeWidth: 5, stroke: '#000fff' }}
            component="polygon"
            points="120,10 200,10 230,110 150,110"
            attr="attr"
          />
          <Tween
            animation={{ style: { SVGDraw: this.state.tweenData }, duration: 1000 }}
            style={{ fill: '#fff000', strokeWidth: 5, stroke: '#000fff' }}
            component="circle"
            cx="300" cy="55" r="50"
            attr="attr"
          />
          <Tween
            animation={{ SVGDraw: this.state.tweenData, duration: 1000 }}
            style={{ fill: '#fff000', strokeWidth: 5, stroke: '#000fff' }}
            component="ellipse"
            cx="500" cy="55" rx="100" ry="50"
          />
          <Tween
            animation={{ SVGDraw: this.state.tweenData, duration: 1000 }}
            style={{ fill: '#fff000', strokeWidth: 5, stroke: '#000fff' }}
            component="line"
            x1="0" y1="150" x2="500" y2="150"
          />
        </svg>
      </div>);
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
