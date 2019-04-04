import * as React from 'react';

import TweenOne from '../typings';

const path = 'M0,100 C30,60 0,20 50,50 C70,70 60,0 100,0';
const ease = TweenOne.easing.path(path, { rect: 100, lengthPixel: 200 });
const Group = TweenOne.TweenOneGroup;
const tween = new TweenOne.Tween({}, { x: 100 });
tween.init();
export default () => (
  <div>
    <TweenOne
      animation={{
        x: 100,
        ease: 'easeInBounce',
        onStart: ({ index, target }) => {
          console.log(index, target);
        },
      }}
    >
      test
    </TweenOne>
    <TweenOne
      animation={[{
        x: 100,
        ease,
        onStart: ({ index, target }) => {
          console.log(index, target);
        },
      }, {
        x: 200,
        ease,
        onComplete: ({ index, target }) => {
          console.log(index, target);
        },
      }]}
    >
      test
    </TweenOne>
    <Group enter={{ x: 100, opacity: 0, type: 'from' }} leave={[{ y: 100, opacity: 0 }]} appear={false}>
      <div key="0">test</div>
    </Group>
  </div>
);
