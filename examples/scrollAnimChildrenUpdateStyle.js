import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Row, Col } from 'antd';

function Demo() {
  return (
    <div>
      <div style={{ height: 800 }}>往下滚动</div>
      <ScrollOverPack
        style={{ height: 800 }}
        component={Row}
        componentProps={{ gutter: { md: 12, sm: 5 } }}
      >
        <Tween
          key="1"
          animation={{ y: 30, type: 'from', ease: 'easeOutQuart', opacity: 0 }}
          reverseDelay={200}
          style={{ background: '#fff000' }}
          component={Col}
        >
          执行动画
        </Tween>
      </ScrollOverPack>
    </div>);
}

ReactDom.render(<Demo />, document.getElementById('__react-content'));
