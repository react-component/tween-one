import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';

class Demo extends React.Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return (<div>
      <div style={{ height: 800 }}>往下滚动</div>
      <ScrollOverPack
        hideProps={{ 1: { reverse: true }, 2: { reverse: true } }}
        style={{ height: 800 }}
      >
        <Tween
          key="1"
          animation={{ y: 30, type: 'from', ease: 'easeOutQuart', opacity: 0 }}
          reverseDelay={200}
          style={{ background: '#fff000' }}
        >
          执行动画
        </Tween>
        <Tween
          key="2"
          animation={{ y: 30, delay: 100, ease: 'easeOutQuart', type: 'from', opacity: 0 }}
          reverseDelay={100}
          style={{ background: '#000fff' }}
        >
          执行动画
        </Tween>
      </ScrollOverPack>
    </div>);
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
