import TweenOneGroup from 'rc-tween-one/src/TweenOneGroup';
import React from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import '../../assets/index.less';

const imgArray = [
  'https://os.alipayobjects.com/rmsportal/IhCNTqPpLeTNnwr.jpg',
  'https://os.alipayobjects.com/rmsportal/uaQVvDrCwryVlbb.jpg',
];
export default () => {
  const [int, setInt] = React.useState(0);
  return (
    <div>
      <Button
        onClick={() => {
          let i = int;
          i++;
          if (i >= imgArray.length) {
            i = 0;
          }
          setInt(i);
        }}
      >
        切换
      </Button>
      <TweenOneGroup style={{ position: 'relative' }} className="demo-group">
        <div key={int.toString()}>
          <img src={imgArray[int]} height="200" alt="img" />
        </div>
      </TweenOneGroup>
    </div>
  );
};
