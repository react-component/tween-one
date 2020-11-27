import Tween from 'rc-tween-one';
import React from 'react';
import { Button, Space } from 'antd';
import 'antd/dist/antd.css';

const animation = [{ translateX: '500px', duration: 1000 }, { y: 100 }];
export default () => {
  const [paused, setPaused] = React.useState(true);
  const [reverse, setReverse] = React.useState(false);
  const [moment, setMoment] = React.useState<number | null>(0);

  return (
    <div>
      <div style={{ height: 200 }}>
        <Tween
          animation={animation}
          paused={paused}
          reverse={reverse}
          moment={moment}
          // onChange={(e) => { console.log(e)}}
          style={{ opacity: 1, width: 100, transform: 'translate(50px,30px)' }}
        >
          <div>执行动效</div>
        </Tween>
      </div>
      <Space style={{ margin: 24 }}>
        <Button
          onClick={() => {
            setPaused(false);
            setReverse(false);
          }}
        >
          play
        </Button>
        <Button
          onClick={() => {
            setPaused(true);
          }}
        >
          pause
        </Button>
        <Button
          onClick={() => {
            setPaused(false);
            setReverse(true);
          }}
        >
          reverse
        </Button>
        <Button
          onClick={() => {
            setMoment(null);
            setTimeout(() => {
              setMoment(0);
            });
          }}
        >
          restart
        </Button>
        <Button
          onClick={() => {
            setMoment(500);
          }}
        >
          moment to 500
        </Button>
      </Space>
    </div>
  );
};
