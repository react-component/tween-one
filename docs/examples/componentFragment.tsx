import Tween from 'rc-tween-one';
import React from 'react';

class D extends React.Component {
  render() {
    return <div>d</div>;
  }
}

const C = React.forwardRef((_, ref: any) => {
  return <div ref={ref}>c</div>;
});

const Comp = React.forwardRef((_, ref: any) => {
  const domRef = React.useRef<any[]>([]);
  const refFunc = (c: any) => {
    if (domRef.current.some((a) => a === c)) {
      return;
    }
    domRef.current.push(c);
    ref(domRef.current);
  };
  return (
    <>
      <div ref={refFunc}>a</div>
      <C ref={refFunc}></C>
      <D ref={refFunc}></D>
    </>
  );
});

export default () => {
  return (
    <Tween
      ref={(c) => {
        console.log(c);
      }}
      animation={{ x: 300 }}
      style={{ position: 'relative' }}
      component={Comp}
    >
      <div>执行动效</div>
    </Tween>
  );
};
