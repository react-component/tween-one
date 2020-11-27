import Tween from 'rc-tween-one';
import React from 'react';
import { Form, InputNumber, Input, Button, Checkbox, Select, AutoComplete } from 'antd';
import 'antd/dist/antd.css';

const { Option } = Select;

const ValueComp = props => {
  const { value, onChange } = props;
  const [name, setName] = React.useState(value.name || 'x');
  const [param, setParam] = React.useState(parseFloat(value.value) || 300);
  const [uint, setUint] = React.useState(value.uint || 'px');

  const onNameChange = e => {
    setName(e);
    const v: any = {
      name: e,
    };
    switch (e) {
      case 'x':
      case 'y':
      case 'margin':
      case 'left':
        setParam(300);
        setUint('px');
        v.value = '300px';
        break;
      case 'color':
        v.value = '#fff000';
        setParam(v.value);
        setUint(null);
        break;
      case 'textShadow':
        v.value = '5px 5px 5px rgba(0,0,0,0.3)';
        setParam(v.value);
        setUint(null);
        break;
      default:
        break;
    }
    onChange(v);
  };
  const onValueChange = e => {
    setParam(e);
    onChange({ ...value, value: e });
  };
  const onUintChange = e => {
    setUint(e);
    onChange({ ...value, uint: e });
  };
  return (
    <Input.Group compact>
      <Select value={name} style={{ width: '100px' }} onChange={onNameChange}>
        <Option value="x">x</Option>
        <Option value="y">y</Option>
        <Option value="left">left</Option>
        <Option value="margin">margin</Option>
        <Option value="color">color</Option>
        <Option value="textShadow">shadow</Option>
      </Select>
      <Input style={{ width: '200px' }} value={param} onChange={onValueChange} />
      {uint && (
        <Select value={uint} onChange={onUintChange}>
          <Option value="px">px</Option>
          <Option value="em">em</Option>
          <Option value="%">%</Option>
        </Select>
      )}
    </Input.Group>
  );
};

export default () => {
  const [anim, setAnim] = React.useState();
  const [paused, setPaused] = React.useState(true);

  const onFinish = values => {
    console.log('Received values from form: ', values);
    setPaused(false);
    const { value, ...v } = values;
    setAnim({
      [value.name]: `${value.value}${value.uint || ''}`,
      ...v,
    });
  };

  return (
    <div style={{ minHeight: 200, padding: 24 }}>
      <Tween animation={anim} reverse={paused} resetStyle style={{ position: 'relative' }}>
        <div>执行动效</div>
      </Tween>
      <Form
        name="customized_form_controls"
        layout="inline"
        onFinish={onFinish}
        initialValues={{
          repeat: 2,
          value: { name: 'x', value: 300, uint: 'px' },
        }}
        style={{ marginTop: 32 }}
      >
        <Form.Item name="value" label="value">
          <ValueComp />
        </Form.Item>
        <Form.Item name="repeat" label="repeat">
          <InputNumber />
        </Form.Item>
        <Form.Item name="yoyo" valuePropName="checked">
          <Checkbox>yoyo</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            开始动画
          </Button>
        </Form.Item>
      </Form>
      <div style={{ marginTop: 12 }}>
        注：
        <br />
        1. 更多动画参数请参考{' '}
        <a href="https://motion.ant.design/language/animate-term-cn" target="_blank">
          ant motion 动画参数
        </a>
        <br />
        2. 动画值可以为 '+=300' 或 '-=300'，表示当前值增加或减少。
        <br />
        3. repeat 为 n + 1 次，如 2 则播放 3 次动画， -1 时为无限循环
        <br />
        4. 参数不变，开始动画无效，请保证每次动画的参数
      </div>
    </div>
  );
};
