import Tween from 'rc-tween-one';
import React from 'react';

export default () => {
  const [animation, setAnim] = React.useState<any>();
  const mouseMove = e => {
    const x = e.clientX;
    setAnim({ x, duration: 1000, ease: 'easeOutQuad' });
  };
  React.useEffect(() => {
    window.addEventListener('mousemove', mouseMove);
  }, [])
  return (
    <Tween animation={animation} moment={17} style={{ height: 100 }}>
      执行动效
    </Tween>
  );
};
