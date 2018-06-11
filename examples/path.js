import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';
import PathPlugin from '../src/plugin/PathPlugin';

Tween.plugins.push(PathPlugin);

function Demo() {
  const p = `M50.952,85.619C31.729,84.841,23.557,73.62,24.095,42.952
    c0.381-21.714,6.667-33.714,30.286-34.476
    c36.572-1.18,59.81,77.714,102.667,76.381c30.108-0.937,34.268-32.381,34.095-41.714
    C190.762,22.571,180.493,6.786,159.524,6C113.81,4.286,98,87.524,50.952,85.619z`;
  return (
    <div style={{ position: 'relative', width: 200, margin: 'auto' }}>
      <Tween
        animation={{ duration: 3000, path: p, repeat: -1, ease: 'linear' }}
        style={{
          opacity: 1,
          position: 'absolute',
          width: '30px',
          height: '30px',
          left: '-15px',
          top: '-15px',
          background: '#fff000',
        }}
      />
      <svg>
        <path fill="none" stroke="#000" d={p} />
      </svg>
    </div>);
}

ReactDom.render(<Demo />, document.getElementById('__react-content'));
