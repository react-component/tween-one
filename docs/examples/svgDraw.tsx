import Tween, { Plugins } from 'rc-tween-one';
import React from 'react';
import SvgDrawPlugin from 'rc-tween-one/es/plugin/SvgDrawPlugin';

Plugins.push(SvgDrawPlugin);

const dataStartArr = ['100%', '30 450', '50% 50%', '30% 400', '50 30%', 0];
let i = 0;

export default () => {
  const [tweenData, setTweenData] = React.useState<string | number>('50 30%');
  const onClick = () => {
    setTweenData(dataStartArr[i]);
    i++;
    i = i >= dataStartArr.length ? 0 : i;
  };
  return (
    <div style={{ padding: 24 }}>
      <button onClick={onClick}>点击切换</button>
      <p>当前参数：{tweenData}</p>
      <svg width="100%" height="600" version="1.2">
        <Tween
          animation={{ SVGDraw: tweenData, duration: 1000 }}
          style={{ fill: 'none', strokeWidth: 20, stroke: '#000fff' }}
          component="path"
          d="M9.13,99.99c0,0,18.53-41.58,49.91-65.11c30-22.5,65.81-24.88,77.39-24.88c33.87,
          0,57.55,11.71,77.05,28.47c23.09,19.85,40.33,46.79,61.71,69.77c24.09,25.89,53.44,
          46.75,102.37,46.75c22.23,0,40.62-2.83,55.84-7.43c27.97-8.45,44.21-22.88,
          54.78-36.7c14.35-18.75,16.43-36.37,16.43-36.37"
        />
        <g style={{ transform: 'translateY(200px)' }}>
          <Tween
            animation={{
              SVGDraw: tweenData,
              duration: 1000,
            }}
            style={{
              fill: '#fff000',
              strokeWidth: 5,
              stroke: '#000fff',
              transform: 'translate(10px, 10px)',
            }}
            width="100"
            height="100"
            component="rect"
          />
          <Tween
            animation={{
              SVGDraw: tweenData,
              duration: 1000,
            }}
            style={{ fill: '#fff000', strokeWidth: 5, stroke: '#000fff' }}
            component="polygon"
            points="120,10 200,10 230,110 150,110"
          />
          <Tween
            animation={{
              SVGDraw: tweenData,
              duration: 1000,
            }}
            style={{ fill: '#fff000', strokeWidth: 5, stroke: '#000fff' }}
            component="circle"
            cx="300"
            cy="55"
            r="50"
          />
          <Tween
            animation={{ SVGDraw: tweenData, duration: 1000 }}
            style={{ fill: '#fff000', strokeWidth: 5, stroke: '#000fff' }}
            component="ellipse"
            cx="500"
            cy="55"
            rx="100"
            ry="50"
          />
          <Tween
            animation={{ SVGDraw: tweenData, duration: 1000 }}
            style={{ fill: '#fff000', strokeWidth: 5, stroke: '#000fff' }}
            component="line"
            x1="0"
            y1="150"
            x2="500"
            y2="150"
          />
        </g>
      </svg>
    </div>
  );
};
