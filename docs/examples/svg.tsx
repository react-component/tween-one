import Tween, { Plugins } from 'rc-tween-one';
import React from 'react';
import SvgMorphPlugin from 'rc-tween-one/es/plugin/SvgMorphPlugin';

// Tween.plugins.push(SvgMorphPlugin);
Plugins.push(SvgMorphPlugin);

export default function Demo() {
  return (
    <div>
      <svg width="300" height="300" version="1.2" viewBox="0 0 600 600">
        <g>
          <Tween
            animation={[
              { SVGMorph: { path: '300,10 500,200 120,230 450,220 0,20' } },
              { SVGMorph: { path: '100,10 200,200 120,430 450,220 0,20' } },
            ]}
            style={{ fill: '#019BF0' }}
            component="polygon"
            points="220,100 300,210 170,250 123,234"
          />
        </g>
      </svg>
      <svg width="300" height="300" viewBox="0 0 24 24">
        <Tween
          animation={{
            SVGMorph: {
              maxSegmentLength: 0.15,
              path:
                'M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z',
            },
            duration: 1000,
          }}
          style={{ fill: '#019BF0' }}
          component="path"
          d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
        />
      </svg>
    </div>
  );
}
