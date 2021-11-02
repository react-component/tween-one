import Tween from 'rc-tween-one';
import React from 'react';
import ReactDOM from 'react-dom';

import { Menu } from 'antd';
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';

const { SubMenu, Item } = Menu;

const T = React.forwardRef((_, ref: any) => <div ref={ref}>Function Component</div>);
class C extends React.Component {
  render() {
    return <div>Class Component</div>;
  }
}

const anim = { x: 300 };

export default () => {
  const dom = React.useRef();

  React.useEffect(() => {
    console.log('useRef:', dom);
  });

  return (
    <div>
      <Tween
        ref={(c: HTMLElement) => {
          // It can also be used React.useRef();
          console.log('function component HTMLElement:', c);
        }}
        component={T}
        animation={anim}
      />

      <Tween
        ref={(c: React.Component) => {
          // It can also be used React.useRef();
          console.log('class component:', c, ReactDOM.findDOMNode(c));
        }}
        component={C}
        animation={anim}
      />
      <Tween ref={dom} animation={anim}>
        UseRef Component is string
      </Tween>
      <h3>ant design menu</h3>
      <div style={{ width: 300 }}>
        <Tween
          component={Menu}
          componentProps={{
            defaultSelectedKeys: ['1'],
            defaultOpenKeys: ['sub1'],
            mode: 'inline',
            theme: 'dark',
          }}
          alt-a="ad"
          animation={anim}
        >
          <Tween
            animation={{ ...anim, opacity: 0, delay: 100, type: 'from' }}
            component={Item}
            componentProps={{ icon: <PieChartOutlined /> }}
            key="1"
          >
            Option 1
          </Tween>
          <Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Item>
          <Item key="3" icon={<ContainerOutlined />}>
            Option 3
          </Item>
          <Tween
            component={SubMenu}
            animation={{ ...anim, opacity: 0, type: 'from', delay: 200 }}
            key="sub1"
            componentProps={{ icon: <MailOutlined />, title: 'Navigation One' }}
          >
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </Tween>
        </Tween>
      </div>
    </div>
  );
};
