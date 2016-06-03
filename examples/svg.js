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
          animation={{
            d: 'M294.863,134.137c0,0,49.599-76.923,26.082,0,' +
            's-55.142,119.658-55.142,19.658S161.53,19.521,294.863,34.137z',
          }}
          style={{ fill: '#fff000', storkeWidth: 1, stroke: '#000fff' }}
          component="path"
          d="M294.863,134.137c0,0,49.599-76.923,126.082,0s-55.142,
          119.658-55.142,119.658S161.53,149.521,294.863,134.137z"
          attr="attr"
        />
      </svg>);
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
