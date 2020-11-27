import Tween from 'rc-tween-one';
import React from 'react';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';

export default function Demo() {
  return (
    <div>
      <div style={{ height: 800 }}>往下滚动</div>
      <ScrollOverPack style={{ height: 800 }}>
        <Tween
          key="1"
          animation={{ y: 30, type: 'from', ease: 'easeOutQuart', opacity: 0 }}
          style={{ background: '#fff000' }}
        >
          执行动画
        </Tween>
        <Tween
          key="2"
          id="12"
          animation={{
            y: 30,
            delay: 100,
            ease: 'easeOutQuart',
            type: 'from',
            opacity: 0,
            id: 12,
          }}
          style={{ background: '#000fff' }}
        >
          执行动画
        </Tween>
      </ScrollOverPack>
    </div>
  );
}
