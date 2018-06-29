import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';
import ChildrenPlugin from '../src/plugin/ChildrenPlugin';

import '../assets/index.less';

Tween.plugins.push(ChildrenPlugin);
function Demo() {
  return (
    <div>
      <h2>子级的数值变化的动画 - children plugin</h2>
      <div style={{ marginBottom: 20 }}>
        <span>基本数字：</span>
        <Tween
          animation={{ Children: { value: 10000 } }}
        />
      </div>
      <div style={{ marginBottom: 20 }}>
        <span>设置开始数字：</span>
        <Tween
          animation={{ Children: { value: 10000 } }}
        >
          9990
        </Tween>
      </div>
      <div style={{ marginBottom: 20 }}>
        <span>只取整数：</span>
        <Tween
          animation={{ Children: { value: 10000, floatLength: 0 } }}
        />
      </div>
      <div style={{ marginBottom: 20 }}>
        <span>基本数字, 小数后取两位, float length 2：</span>
        <Tween
          animation={{ Children: { value: 10000, floatLength: 2 } }}
        />
      </div>
      <div style={{ marginBottom: 20 }}>
        <span>格式化钱符：</span>
        <div>
          <span>¥</span>
          <Tween
            animation={{ Children: { value: 10000, floatLength: 2, formatMoney: true } }}
            component="span"
          >
            20,000.12
          </Tween>
        </div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <span>自定义钱符格式：</span>
        <div>
          <span>¥</span>
          <Tween
            animation={{
              Children: {
                value: 10000,
                floatLength: 2,
                formatMoney: { thousand: '.', decimal: ',' },
              },
            }}
            component="span"
          >
          20.000,12
          </Tween>
        </div>
      </div>
    </div>);
}

ReactDom.render(<Demo />, document.getElementById('__react-content'));
