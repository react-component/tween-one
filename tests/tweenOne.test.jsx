/* eslint no-console:0 */
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TweenOne, { Plugins, Ticker } from '../src';

import ChildrenPlugin from '../src/plugin/ChildrenPlugin';

import PathMotionPlugin from '../src/plugin/PathMotionPlugin';

Plugins.push(ChildrenPlugin);

Plugins.push(PathMotionPlugin);

Enzyme.configure({ adapter: new Adapter() });

const TweenComp = (props) => {
  return (
    <div className="wrapper">
      <TweenOne {...props}>
        <div>动画</div>
      </TweenOne>
    </div>
  );
};

describe('rc-tween-one', () => {
  let instance;
  it('single tween-one', (done) => {
    instance = mount(
      <div>
        <TweenOne
          animation={{
            top: 100,
            left: '100vw',
            width: '10vh',
            height: '100%',
            boxShadow: '0 0 30px rgba(255,125,0,0.5)',
            margin: '30rem',
            scale: 1.5,
            x: '+=100',
            transformOrign: '30% 10%',
            delay: 100,
            yoyo: true,
          }}
          style={{ top: 0, left: '10vw', width: '5vh', height: '10%', margin: '10rem' }}
        >
          <div>动画</div>
        </TweenOne>
      </div>,
    );
    const TweenNode = instance.instance().children[0];
    console.log('start:', TweenNode.style.top);
    expect(parseFloat(TweenNode.style.top)).toBe(0);
    Ticker.timeout(() => {
      // 默认时间为450,用500是肯定过值；
      console.log('end:', TweenNode.style.top);
      expect(parseFloat(TweenNode.style.top)).toBe(100);
      done();
    }, 600);
  });
  it('tween-one repeat -1 and yoyo', (done) => {
    instance = mount(
      <div>
        <TweenOne
          animation={{
            top: 100,
            repeat: -1,
            yoyo: true,
          }}
          style={{ top: 0 }}
        >
          <div>动画</div>
        </TweenOne>
      </div>,
    );
    const TweenNode = instance.instance().children[0];
    console.log('start:', TweenNode.style.top);
    expect(parseFloat(TweenNode.style.top)).toBe(0);
    Ticker.timeout(() => {
      console.log('end:', TweenNode.style.top);
      expect(parseFloat(TweenNode.style.top)).toBeLessThan(2);
      done();
    }, 900);
  });
  it('single tween-one duration is 0', (done) => {
    let complete;
    instance = mount(
      <div>
        <TweenOne
          animation={{
            x: 100,
            duration: 0,
            onComplete() {
              complete = 1;
            },
          }}
        >
          <div>动画</div>
        </TweenOne>
      </div>,
    );
    Ticker.timeout(() => {
      console.log(complete);
      expect(complete).toBe(1);
      done();
    }, 34);
  });
  it('timeline tween-one', (done) => {
    instance = mount(
      <div>
        <TweenOne
          animation={[{ top: 100 }, { left: 100 }, { top: 0 }, { left: 0 }]}
          style={{ position: 'relative' }}
        >
          <div>动画</div>
        </TweenOne>
      </div>,
    );
    const child = instance.instance().children[0];

    Ticker.timeout(() => {
      console.log('top===100,data:', child.style.top, '########', 'left>0,data:', child.style.left);
      expect(parseFloat(child.style.top)).toBe(100);
      expect(parseFloat(child.style.left)).toBeGreaterThan(0);
      Ticker.timeout(() => {
        console.log(
          'top<100,data:',
          child.style.top,
          '########',
          'left===0,data:',
          child.style.left,
        );
        expect(parseFloat(child.style.left)).toBe(100);
        expect(parseFloat(child.style.top)).toBeLessThan(100);
        Ticker.timeout(() => {
          console.log(
            'top===0,data:',
            child.style.top,
            '########',
            'left<100,data:',
            child.style.left,
          );
          expect(parseFloat(child.style.left)).toBeLessThan(100);
          expect(parseFloat(child.style.top)).toBe(0);
          Ticker.timeout(() => {
            console.log(
              'top===0,data:',
              child.style.top,
              '########',
              'left===0,data:',
              child.style.left,
            );
            expect(parseFloat(child.style.top)).toBe(0);
            expect(parseFloat(child.style.left)).toBe(0);
            done();
          }, 450);
        }, 450);
      }, 450);
    }, 500);
  });
  it('repeat tween-one', (done) => {
    instance = mount(
      <div>
        <TweenOne
          animation={{ top: 100, repeat: 1, repeatDelay: 300 }}
          style={{ position: 'relative' }}
        >
          <div>动画</div>
        </TweenOne>
      </div>,
    );
    const child = instance.instance().children[0];
    console.log('start:', child.style.top);
    expect(parseFloat(child.style.top)).toBe(0);
    Ticker.timeout(() => {
      expect(parseFloat(child.style.top)).toBeGreaterThan(95);
      console.log('20 milliseconds before the first repeat end, top>95, data:', child.style.top);
      Ticker.timeout(() => {
        expect(parseFloat(child.style.top)).toBeLessThan(10);
        console.log(
          '20 ms after the beginning of the second repeat, top<10, data',
          child.style.top,
        );
        Ticker.timeout(() => {
          expect(parseFloat(child.style.top)).toBe(100);
          console.log('repeat end,top:', child.style.top);
          done();
        }, 450);
      }, 340);
    }, 430);
  });
  it('attr is true tween-one', (done) => {
    instance = mount(
      <svg width="300" height="300">
        <TweenOne
          animation={{ cx: 50 }}
          attr
          component="circle"
          cx="300"
          cy="55"
          r="50"
          style={{ fill: '#fff000', strokeWidth: 5, stroke: '#000fff' }}
        ></TweenOne>
      </svg>,
    );
    const child = instance.instance().children[0];
    Ticker.timeout(() => {
      const cx = child.getAttribute('cx');
      console.log('svg cx:', cx);
      expect(parseFloat(cx)).toBe(50);
      done();
    }, 500);
  });
  it('type is from tween-one', (done) => {
    instance = mount(
      <div>
        <TweenOne animation={{ top: 100, type: 'from' }} style={{ position: 'relative' }}>
          <div>动画</div>
        </TweenOne>
      </div>,
    );
    const child = instance.instance().children[0];
    console.log(`default:${child.style.top}`);
    expect(parseFloat(child.style.top)).toBe(100);
    Ticker.timeout(() => {
      expect(parseFloat(child.style.top)).toBeGreaterThan(95);
      console.log(`start:${child.style.top}`);
      Ticker.timeout(() => {
        expect(parseFloat(child.style.top)).toBe(0);
        console.log(`end:${child.style.top}`);
        done();
      }, 450);
    }, 30);
  });
  it('is update Animation', (done) => {
    instance = mount(
      <TweenComp
        animation={{ top: 100, x: 100, color: '#fff', sepia: '100%', blur: '2px', duration: 1000 }}
        style={{ position: 'relative' }}
      />,
    );
    let child = instance.find('.wrapper').instance().children[0];
    Ticker.timeout(() => {
      expect(parseFloat(child.style.top)).toBeGreaterThan(99);
      console.log(`child top:${child.style.top}`);
      instance.setProps({
        animation: { left: 100, y: 100 },
      });
      expect(instance.props().animation.left).toBe(100);
      child = instance.find('.wrapper').instance().children[0];
      Ticker.timeout(() => {
        expect(parseFloat(child.style.left)).toBeGreaterThan(99);
        console.log(`child left:${child.style.left}`);
        done();
      }, 540);
    }, 1040);
  });
  it('is update Animation2', (done) => {
    instance = mount(<TweenComp animation={[{ top: 100 }]} style={{ position: 'relative' }} />);
    let child = instance.find('.wrapper').instance().children[0];
    Ticker.timeout(() => {
      expect(parseFloat(child.style.top)).toBeGreaterThan(99);
      console.log(`child top:${child.style.top}`);
      instance.setProps({
        animation: { left: 100 },
      });
      expect(instance.props().animation.left).toBe(100);
      child = instance.find('.wrapper').instance().children[0];
      Ticker.timeout(() => {
        expect(parseFloat(child.style.left)).toBeGreaterThan(99);
        console.log(`child left:${child.style.left}`);
        done();
      }, 540);
    }, 1040);
  });
  it('is update Animation no change', (done) => {
    instance = mount(
      <TweenComp
        animation={[
          {
            top: 100,
            color: 'red',
            onStart: () => {
              console.log('start');
            },
          },
          { y: 100, a: [100, 100] },
        ]}
        style={{ position: 'relative' }}
      />,
    );
    const child = instance.find('.wrapper').instance().children[0];
    Ticker.timeout(() => {
      console.log(`child top:${child.style.top}`);
      expect(parseFloat(child.style.top)).toBeGreaterThan(90);

      instance.setProps({
        animation: [
          {
            top: 100,
            color: 'red',
            onStart: () => {
              console.log('start');
            },
          },
          { y: 100, a: [100, 100] },
        ],
      });

      Ticker.timeout(() => {
        console.log(`child top:${child.style.top}`);
        expect(parseFloat(child.style.top)).toBe(100);
        done();
      }, 50);
    }, 440);
  });
  it('component is null tween-one', (done) => {
    instance = mount(
      <div>
        <TweenOne component={null} animation={{ top: 100 }} style={{ position: 'relative' }}>
          <div className="child">动画</div>
        </TweenOne>
      </div>,
    );
    const child = instance.find('.child').instance();
    console.log(`start: ${child.style.top}`);
    expect(parseFloat(child.style.top)).toBe(0);
    Ticker.timeout(() => {
      expect(parseFloat(child.style.top)).toBe(100);
      console.log(`end: ${child.style.top}`);
      done();
    }, 450);
  });
  it('component is null children is string warning', () => {
    instance = mount(
      <div>
        <TweenOne component={null} animation={{ top: 100 }} style={{ position: 'relative' }}>
          动画
        </TweenOne>
      </div>,
    );
    const child = instance.find('div').instance().children;
    console.log(child.length, instance.text());

    expect(child.length).toBe(0);
    expect(instance.text()).toEqual('动画');
  });
  it('is resetStyle tween-one', (done) => {
    instance = mount(
      <TweenComp resetStyle animation={{ top: 100 }} style={{ position: 'relative' }} />,
    );
    let child = instance.find('.wrapper').instance().children[0];
    // eslint-disable-next-line no-underscore-dangle
    console.log('top', child._tweenOneVars, child.style, child.id);
    Ticker.timeout(() => {
      instance.setProps({
        animation: [{ left: 100 }, { opacity: 0 }],
      });
      Ticker.timeout(() => {
        child = instance.find('.wrapper').instance().children[0];
        // eslint-disable-next-line no-underscore-dangle
        console.log('top', child._tweenOneVars, child.style, child.id);
        // eslint-disable-next-line no-underscore-dangle
        expect(child._tweenOneVars.style.top).toEqual(undefined);
        done();
      }, 500);
    }, 100);
  });
  it('is reverse', (done) => {
    instance = mount(
      <TweenComp
        animation={{
          top: 100,
        }}
        style={{ position: 'relative' }}
      />,
    );

    Ticker.timeout(() => {
      instance.setProps({
        reverse: true,
        animation: {
          top: 100,
        },
      });
      Ticker.timeout(() => {
        const child = instance.find('.wrapper').instance().children[0];
        console.log(parseFloat(child.style.top));
        expect(parseFloat(child.style.top)).toBe(0);
        done();
      }, 350);
    }, 300);
  });
  it('is paused', (done) => {
    instance = mount(
      <TweenComp
        animation={{
          top: 100,
        }}
        style={{ position: 'relative' }}
      />,
    );

    Ticker.timeout(() => {
      let child = instance.find('.wrapper').instance().children[0];
      const top = parseFloat(child.style.top);
      expect(top).toBeGreaterThan(50);
      instance.setProps({
        paused: true,
      });
      Ticker.timeout(() => {
        child = instance.find('.wrapper').instance().children[0];
        console.log('top:', child.style.top);
        expect(parseFloat(child.style.top)).toBe(top);
        done();
      }, 100);
    }, 300);
  });
  it('is moment', (done) => {
    instance = mount(
      <TweenComp
        animation={{
          top: 100,
          duration: 1000,
        }}
        paused
        style={{ position: 'relative' }}
      />,
    );
    const child = instance.find('.wrapper').instance().children[0];
    Ticker.timeout(() => {
      instance.setProps({
        moment: 1000,
      });
      Ticker.timeout(() => {
        console.log(child.style.top);
        expect(parseFloat(child.style.top)).toBe(100);
        done();
      }, 10);
    }, 100);
  });

  it('plugin: children plugin tween-one', (done) => {
    instance = mount(
      <div>
        <TweenOne animation={{ Children: { value: 1000, floatLength: 0 } }}>0</TweenOne>
      </div>,
    );
    console.log(`default:${instance.text()}`);
    expect(instance.text()).toEqual('0');
    Ticker.timeout(() => {
      expect(instance.text()).toEqual('1000');
      console.log(`end:${instance.text()}`);
      done();
    }, 450);
  });
  it('plugin: children plugin toMoney tween-one', (done) => {
    instance = mount(
      <div>
        <TweenOne animation={{ Children: { value: 1000, floatLength: 2, formatMoney: true } }}>
          0
        </TweenOne>
      </div>,
    );
    console.log(`default:${instance.text()}`);
    expect(instance.text()).toEqual('0.00');
    Ticker.timeout(() => {
      expect(instance.text()).toEqual('1,000.00');
      console.log(`end:${instance.text()}`);
      done();
    }, 450);
  });

  it('plugin: pathMotion plugin tween-one', (done) => {
    instance = mount(
      <TweenComp
        style={{
          opacity: 1,
          position: 'absolute',
          width: '30px',
          height: '30px',
          background: '#fff000',
        }}
        animation={{
          PathMotion: { path: 'M0,0,L100, 0L100, 100L0, 100Z', center: ['15px', '15px'] },
        }}
      />,
    );
    Ticker.timeout(() => {
      const child = instance.find('.wrapper').instance().children[0];
      console.log('transform:', child.style.transform);
      expect(child.style.transform).toEqual('translate(-15px,-15px)  rotate(90deg)');
      done();
    }, 450);
  });
});
