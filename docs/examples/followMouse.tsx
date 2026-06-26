import Tween from '@rc-component/tween-one';
import React from 'react';

export default () => {
  const [animation, setAnim] = React.useState<any>();
  const mouseMove = (e: any) => {
    const x = e.clientX;
    setAnim({ x, duration: 1000, ease: 'easeOutQuad' });
  };
  React.useEffect(() => {
    window.addEventListener('mousemove', mouseMove);
    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);
  return (
    <Tween animation={animation} moment={17} style={{ height: 100 }}>
      执行动效
    </Tween>
  );
};
