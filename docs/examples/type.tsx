import Tween from 'rc-tween-one';
import React from 'react';
import { Button, Space } from 'antd';
import 'antd/dist/antd.css';

export default () => {
  const [anim, setAnim] = React.useState<any>({
    x: 500,
    duration: 1000,
  });
  const [paused, setPaused] = React.useState(true);

  return (
    <div style={{ padding: 24 }}>
      <div style={{ height: 200 }}>
        <Tween
          animation={anim}
          paused={paused}
          // onChange={(e) => { console.log(e)}}
          style={{ opacity: 1, width: 100, transform: 'translate(50px,30px)' }}
        >
          <div>执行动效</div>
        </Tween>
      </div>
      <div>播放类型(type)：</div>
      <Space>
        <Button
          onClick={() => {
            setPaused(false);
            setAnim({
              x: Math.random() * 500,
              duration: 1000,
            });
          }}
        >
          play
        </Button>
        <Button
          onClick={() => {
            setPaused(false);
            setAnim({
              x: Math.random() * 500 + 500,
              type: 'from',
              duration: 1000,
            });
          }}
        >
          from play
        </Button>
        <Button
          onClick={() => {
            setPaused(false);
            setAnim({
              x: 200,
              type: 'set',
            });
          }}
        >
          set
        </Button>
      </Space>
    </div>
  );
};
