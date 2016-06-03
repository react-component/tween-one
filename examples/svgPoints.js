import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';
import SvgMorphPlugin from '../src/plugin/SvgMorphPlugin';
Tween.plugins.push(SvgMorphPlugin);

class Demo extends React.Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return (
      <svg width="100%" height="600" version="1.2" xmlns="http://www.w3.org/2000/svg">
        <Tween
          animation={[
            { points: '300,10 500,200 120,230 450,220 0,20' },
            { points: '100,10 200,200 120,430 450,220 0,20' },
          ]}
          style={{ fill: '#fff000', storkeWidth: 1, stroke: '#000fff' }}
          component="polygon"
          points="220,100 300,210 170,250 123,234"
          attr="attr"
        />
      </svg>);
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
