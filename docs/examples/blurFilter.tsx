import Tween from 'rc-tween-one';
import React from 'react';

export default function Demo() {
  return (
    <div style={{ padding: 24 }}>
      <h3 style={{ marginBottom: 24 }}>
        filter 里的滤镜，&apos;grayScale&apos;, &apos;sepia&apos;,
        &apos;hueRotate&apos;, &apos;invert&apos;, &apos;brightness&apos;,
        &apos;contrast&apos;, &apos;blur&apos;
      </h3>
      <Tween
        animation={{ blur: '5px', sepia: 1, duration: 2000 }}
        style={{ filter: 'blur(30px)' }}
      >
        <img
          width="500"
          src="https://t.alipayobjects.com/images/T1CFtgXb0jXXXXXXXX.jpg"
          alt="img"
        />
      </Tween>
    </div>
  );
}
