import Tween from 'rc-tween-one';
import React, { useEffect } from 'react';
import 'antd/dist/antd.css';

export default () => {
  const [anim, setAnim] = React.useState<any>({
    x: 500,
    duration: 1000,
  });
  useEffect(() => {
    setTimeout(() => {
      setAnim({
        y: 100,
        duration: 1000,
      });
    }, 500);
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <div style={{ height: 200 }}>
        <Tween
          animation={anim}
          resetStyle
          style={{ opacity: 1, width: 100, transform: 'translate(50px,30px)' }}
        >
          <div>执行动效</div>
        </Tween>
      </div>
    </div>
  );
};
