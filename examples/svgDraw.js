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
        <svg width="100%" height="600" version="1.2" xmlns="http://www.w3.org/2000/svg">
          <Tween
            animation={{ style: { SVGDraw: this.state.tweenData }, duration: 1000}}
            style={{ fill: 'none', strokeWidth: 20, stroke: '#000fff' }}
            component="path"
            d="M9.13,99.99c0,0,18.53-41.58,49.91-65.11c30-22.5,65.81-24.88,77.39-24.88c33.87,0,57.55,11.71,77.05,28.47c23.09,19.85,40.33,46.79,61.71,69.77c24.09,25.89,53.44,46.75,102.37,46.75c22.23,0,40.62-2.83,55.84-7.43c27.97-8.45,44.21-22.88,54.78-36.7c14.35-18.75,16.43-36.37,16.43-36.37"
            attr="attr"
          />
        </svg>
      </div>);
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
