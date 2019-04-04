/* eslint no-console:0 */
import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import expect from 'expect.js';
import TestUtils from 'react-dom/test-utils';
import { checkStyleName } from 'style-utils';

import TweenOne, { easing, plugins } from '../src';
import ticker from '../src/ticker';
import BezierPlugin from '../src/plugin/BezierPlugin';

plugins.push(BezierPlugin);

const Div = (props) => {
  return props.show ? <div>text</div> : null;
};

Div.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.any,
}

describe('rc-tween-one', () => {
  let div;
  let instance;

  function createTweenInstance(props) {
    class TweenDemo extends React.Component {
      constructor(componentProps) {
        super(componentProps);
        this.state = {
          animation: this.props.animation,
          style: this.props.style,
          reverse: false,
          paused: this.props.paused,
          moment: null,
          showChild: false,
        };
      }

      render() {
        if (this.props.component === 'rect') {
          return (<svg>
            <TweenOne
              {...this.props}
              reverse={this.state.reverse}
              animation={this.state.animation} style={this.state.style}
              moment={this.state.moment}
              width="100px"
              height="100px"
              fill="#000"
            />
          </svg>);
        }
        return (<TweenOne {...this.props}
          reverse={this.state.reverse}
          animation={this.state.animation}
          style={this.state.style}
          moment={this.state.moment}
          componentProps={this.props.component === Div ? { show: this.state.showChild } : null}
          paused={this.state.paused}
        >
          <span>demo</span>
        </TweenOne>);
      }
    }
    const objectOrArray = PropTypes.oneOfType([PropTypes.object,
    PropTypes.array]);

    TweenDemo.propTypes = {
      animation: objectOrArray,
      style: PropTypes.object,
      component: PropTypes.any,
      paused: PropTypes.bool,
    };

    return ReactDom.render(<TweenDemo {...props} />, div);
  }

  beforeEach(() => {
    div = document.createElement('div');
    document.body.appendChild(div);
  });

  afterEach(() => {
    try {
      ReactDom.unmountComponentAtNode(div);
      document.body.removeChild(div);
    } catch (e) {
      console.log(e);
    }
  });

  function getFloat(str) {
    return parseFloat(str);
  }

  it('single tween-one', (done) => {
    instance = createTweenInstance({
      animation: {
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
      },
      style: { top: 0, left: '10vw', width: '5vh', height: '10%', margin: '10rem' },
    });
    const child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    console.log('start:', child.style.top);
    expect(getFloat(child.style.top)).to.be(0);
    ticker.timeout(() => {
      // 默认时间为450,用500是肯定过值；
      console.log('end:', child.style.top);
      expect(getFloat(child.style.top)).to.be(100);
      done();
    }, 600);
  });

  it('tween-one repeat -1 and yoyo', (done) => {
    instance = createTweenInstance({
      animation: {
        top: 100,
        repeat: -1,
        yoyo: true,
      },
      style: { top: 0},
    });
    const child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    console.log('start:', child.style.top);
    expect(getFloat(child.style.top)).to.be(0);
    ticker.timeout(() => {
      console.log('end:', child.style.top);
      expect(getFloat(child.style.top)).to.above(0);
      done();
    }, 200);
  });

  it('single tween-one duration is 0', (done) => {
    let start;
    let update;
    let complete;
    instance = createTweenInstance({
      animation: {
        scale: '+=0.1',
        x: '20%',
        left: '+=20',
        duration: 0,
        onStart() {
          start = 1;
        },
        onUpdate() {
          update = 1;
        },
        onComplete() {
          complete = 1;
        }
      },
    });
    ticker.timeout(() => {
      expect(start).to.be(1);
      expect(update).to.be(1);
      expect(complete).to.be(1);
      done();
    }, 34);
  });

  it('timeline tween-one', (done) => {
    instance = createTweenInstance({
      animation: [{ top: 100 }, { left: 100 }, { top: 0 }, { left: 0 }],
      style: { position: 'relative' },
    });
    const child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    ticker.timeout(() => {
      console.log('top===100,data:', child.style.top, '########',
        'left>0,data:', child.style.left);
      expect(getFloat(child.style.top)).to.be(100);
      expect(getFloat(child.style.left)).to.above(0);
      ticker.timeout(() => {
        console.log('top<100,data:', child.style.top, '########',
          'left===0,data:', child.style.left);
        expect(getFloat(child.style.left)).to.be(100);
        expect(getFloat(child.style.top)).to.below(100);
        ticker.timeout(() => {
          console.log('top===0,data:', child.style.top, '########',
            'left<100,data:', child.style.left);
          expect(getFloat(child.style.left)).to.below(100);
          expect(getFloat(child.style.top)).to.be(0);
          ticker.timeout(() => {
            console.log('top===0,data:', child.style.top,
              '########', 'left===0,data:', child.style.left);
            expect(getFloat(child.style.top)).to.be(0);
            expect(getFloat(child.style.left)).to.be(0);
            done();
          }, 450);
        }, 450);
      }, 450);
    }, 500);
  });

  it('repeat tween-one', (done) => {
    instance = createTweenInstance({
      animation: { top: 100, repeat: 1, repeatDelay: 300 },
      style: { position: 'relative', top: 0 },
    });
    const child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    console.log('start:', child.style.top);
    expect(getFloat(child.style.top)).to.be(0);
    ticker.timeout(() => {
      expect(getFloat(child.style.top)).to.above(95);
      console.log('20 milliseconds before the first repeat end, top>95, data:', child.style.top);
      ticker.timeout(() => {
        expect(getFloat(child.style.top)).to.below(10);
        console.log('20 ms after the beginning of the second repeat, top<10, data',
          child.style.top);
        ticker.timeout(() => {
          expect(getFloat(child.style.top)).to.be(100);
          console.log('repeat end,top:', child.style.top);
          done();
        }, 450);
      }, 340);
    }, 430);
  });

  it('repeat yoyo tween-one', (done) => {
    instance = createTweenInstance({
      animation: { top: 100, repeat: 1, yoyo: true },
      style: { position: 'relative', top: 0 },
    });
    const child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    console.log('start:', child.style.top);
    expect(getFloat(child.style.top)).to.be(0);
    ticker.timeout(() => {
      expect(getFloat(child.style.top)).to.above(95);
      console.log('20 milliseconds before the first repeat end, top>95, data:', child.style.top);
      ticker.timeout(() => {
        expect(getFloat(child.style.top)).to.below(101).above(95);
        console.log('20 ms after the beginning of the second repeat, 95<top<100, data',
          child.style.top);
        ticker.timeout(() => {
          expect(getFloat(child.style.top)).to.be(0);
          console.log('repeat end,top:', child.style.top);
          done();
        }, 450);
      }, 40);
    }, 430);
  });

  it('type is from tween-one', (done) => {
    instance = createTweenInstance({
      animation: { top: 100, type: 'from' },
      style: { position: 'relative', top: 0 },
    });
    const child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    console.log(`default:${child.style.top}`);
    expect(getFloat(child.style.top)).to.be(100);
    ticker.timeout(() => {
      expect(getFloat(child.style.top)).to.above(95);
      console.log(`start:${child.style.top}`);
      ticker.timeout(() => {
        expect(getFloat(child.style.top)).to.be(0);
        console.log(`end:${child.style.top}`);
        done();
      }, 450);
    }, 30);
  });

  it('is Bezier', (done) => {
    instance = createTweenInstance({
      animation: {
        bezier: {
          type: 'soft',
          autoRotate: true,
          vars: [{ x: 100, y: 100 }, { x: 200, y: 0 }],
        },
        duration: 1000,
      },
      style: { position: 'absolute' },
    });
    const child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    ticker.timeout(() => {
      let transform = child.style[checkStyleName('transform')];
      let xy = transform.split(')').filter(item => item).map(item => item.split('(')[1]);
      let rotate = xy[1];
      let x = xy[0].split(',')[0];
      let y = xy[0].split(',')[1];
      console.log(`x:${x}, y: ${y}, rotate:${rotate}`);
      expect(getFloat(x)).to.above(-0.5).below(5);
      expect(getFloat(y)).to.above(-0.5).below(5);
      expect(getFloat(rotate)).to.above(44).below(45.1);

      ticker.timeout(() => {
        transform = child.style[checkStyleName('transform')];
        xy = transform.split(')').filter(item => item).map(item => item.split('(')[1]);
        rotate = xy[1];
        x = xy[0].split(',')[0];
        y = xy[0].split(',')[1];
        expect(getFloat(x)).to.above(80).below(120);
        expect(getFloat(y)).to.above(40).below(60);
        expect(getFloat(rotate)).to.above(-15).below(15);
        console.log(`x:${x}, y: ${y}, rotate:${rotate}`);
        ticker.timeout(() => {
          transform = child.style[checkStyleName('transform')];
          xy = transform.split(')').filter(item => item).map(item => item.split('(')[1]);
          x = xy[0].split(',')[0];
          y = xy[0].split(',')[1];
          expect(getFloat(x)).to.be(200);
          expect(getFloat(y)).to.be(0);
          console.log(`x:${x}, y: ${y}`);
          done();
        }, 530);
      }, 470);
    }, 30);
  });

  it('is Bezier type is cubic', (done) => {
    instance = createTweenInstance({
      animation: {
        bezier: {
          type: 'cubic',
          vars: [{ x: 100, y: 0 }, { x: 300, y: 400 }, { x: 500, y: 0 }, { x: 700, y: 400 }],
        },
        duration: 1000,
      },
      style: { position: 'absolute' },
    });
    BezierPlugin.cubicToQuadratic(0, 100, 200, 300);
    const child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    ticker.timeout(() => {
      let transform = child.style[checkStyleName('transform')];
      let xy = transform.split(')').filter(item => item).map(item => item.split('(')[1]);
      let x = xy[0].split(',')[0];
      let y = xy[0].split(',')[1];
      console.log(`x:${x},y:${y}`);
      expect(getFloat(x)).to.above(99);
      expect(getFloat(y)).to.above(-1);
      ticker.timeout(() => {
        transform = child.style[checkStyleName('transform')];
        xy = transform.split(')').filter(item => item).map(item => item.split('(')[1]);
        x = xy[0].split(',')[0];
        y = xy[0].split(',')[1];
        console.log(`x:${x},y:${y}`);
        expect(getFloat(x)).to.be(700);
        expect(getFloat(y)).to.be(400);
        done();
      }, 1030);
    }, 30);
  });

  it('is Bezier type is thru', (done) => {
    instance = createTweenInstance({
      animation: {
        bezier: {
          type: 'thru',
          vars: [{ x: 100, y: 0 }, { x: 300, y: 400 }],
        },
        duration: 1000,
      },
      style: { position: 'absolute' },
    });
    const child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    ticker.timeout(() => {
      let transform = child.style[checkStyleName('transform')];
      let xy = transform.split(')').filter(item => item).map(item => item.split('(')[1]);
      let x = xy[0].split(',')[0];
      let y = xy[0].split(',')[1];
      console.log(`x:${x},y:${y}`);
      expect(getFloat(x)).to.above(-1);
      expect(getFloat(y)).to.above(-1);
      ticker.timeout(() => {
        transform = child.style[checkStyleName('transform')];
        xy = transform.split(')').filter(item => item).map(item => item.split('(')[1]);
        x = xy[0].split(',')[0];
        y = xy[0].split(',')[1];
        console.log(`x:${x},y:${y}`);
        expect(Math.round(getFloat(x))).to.be(300);
        expect(Math.round(getFloat(y))).to.be(400);
        done();
      }, 1050);
    }, 30);
  });

  it('is update Animation and filter', (done) => {
    instance = createTweenInstance({
      animation: { top: 100, x: 100, color: '#fff', sepia: '100%', blur: '2px', duration: 1000 },
      style: { position: 'relative', top: 0 },
    });
    const child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    ticker.timeout(() => {
      expect(getFloat(child.style.top)).to.above(99);
      console.log(`child top:${child.style.top}`);
      instance.setState({
        animation: { left: 100, y: 100 },
      });
      ticker.timeout(() => {
        expect(getFloat(child.style.left)).to.above(99);
        console.log(`child left:${child.style.left}`);
        done();
      }, 540);
    }, 1040);
  });

  it('is update style', (done) => {
    instance = createTweenInstance({
      animation: {
        top: 100,
        textShadow: '0 1em 5px rgba(0,0,0,1)',
        boxShadow: '0 0 30px rgba(255,125,0,0.5)',
        duration: 1000,
      },
      style: { position: 'relative', top: 0 },
    });
    const child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    ticker.timeout(() => {
      expect(getFloat(child.style.top)).to.above(50);
      instance.setState({
        style: {
          top: 40,
          left: 100,
          position: 'relative',
        },
      });
      ticker.timeout(() => {
        expect(getFloat(child.style.left)).to.be(100);
        console.log('child left:', child.style.left);
        ticker.timeout(() => {
          done();
        }, 400);
      }, 30);
    }, 600);
  });

  it('is update animation', (done) => {
    instance = createTweenInstance({
      animation: {
        top: 100,
      },
      style: { position: 'relative', top: 0 },
    });
    const child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    ticker.timeout(() => {
      expect(getFloat(child.style.top)).to.above(0);
      instance.setState({
        animation: {
          left: 100,
        },
      });
      ticker.timeout(() => {
        expect(getFloat(child.style.left)).to.be(100);
        console.log('child left:', child.style.left);
        done();
      }, 500);
    }, 200);
  });

  it('update animation is array', (done) => {
    instance = createTweenInstance({
      animation: [{ top: 100, onStart: () => { console.log('update'); } }, { left: 100 }],
      style: { top: 0, position: 'relative' },
    });
    const child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    console.log('start:', child.style.top);
    expect(getFloat(child.style.top)).to.be(0);
    ticker.timeout(() => {
      instance.setState({
        animation: [{ top: 100, onStart: () => { console.log('update'); } }, { left: 100 }],
      });
      // 默认时间为450,用500是肯定过值；
      console.log('end:', child.style.top);
      expect(getFloat(child.style.top)).to.be(100);
      ticker.timeout(() => {
        expect(getFloat(child.style.left)).to.be(100);
        done();
      }, 500);
    }, 600);
  });

  it('is reverse', (done) => {
    instance = createTweenInstance({
      animation: {
        top: 100,
      },
      style: { position: 'relative', top: 0 },
    });
    ticker.timeout(() => {
      instance.setState({
        reverse: true,
        animation: {
          top: 100,
        },
      });
      ticker.timeout(() => {
        const child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
        console.log(getFloat(child.style.top));
        expect(getFloat(child.style.top)).to.be(0);
        done();
      }, 350);
    }, 300);
  });

  it('is reverse delay', (done) => {
    instance = createTweenInstance({
      animation: {
        top: 100,
        color: '#fff000',
      },
      reverseDelay: 500,
      style: { position: 'relative', top: 0 },
    });
    const child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    console.log(getFloat(child.style.top));
    ticker.timeout(() => {
      instance.setState({
        reverse: true,
      });
      const top = getFloat(child.style.top);
      console.log(top);
      ticker.timeout(() => {
        console.log(getFloat(child.style.top));
        expect(getFloat(child.style.top)).to.be(top);
        ticker.timeout(() => {
          console.log(getFloat(child.style.top))
          expect(getFloat(child.style.top)).to.be(0);
          done();
        }, 700);
      }, 300);
    }, 300);
  });

  it('is paused', (done) => {
    instance = createTweenInstance({
      animation: { top: 100 },
      forcedJudg: { isComp: true },
    });

    ticker.timeout(() => {
      let child = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
      const top = getFloat(child.style.top);
      expect(top).to.above(50);
      instance.setState({
        paused: true,
      });
      ticker.timeout(() => {
        child = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
        console.log('top:', child.style.top);
        expect(getFloat(child.style.top)).to.be(top);
        done();
      }, 100);
    }, 300);
  });

  it('is moment', (done) => {
    instance = createTweenInstance({
      animation: {
        top: 100,
        duration: 1000,
      },
      style: { position: 'relative', top: 0 },
    });
    const child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    ticker.timeout(() => {
      instance.setState({
        moment: 1000,
      }, () => {
        instance.setState({
          moment: null,
        });
      });
      ticker.timeout(() => {
        console.log(child.style.top);
        expect(getFloat(child.style.top)).to.be(100);
        done();
      }, 10);
    }, 100);
  });

  it('is moment tween end re', (done) => {
    instance = createTweenInstance({
      animation: {
        top: 100,
        duration: 500,
      },
      style: { position: 'relative', top: 0 },
    });
    const child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    ticker.timeout(() => {
      instance.setState({
        moment: 10,
      }, () => {
        instance.setState({
          moment: null,
        });
      });
      ticker.timeout(() => {
        console.log(child.style.top);
        expect(getFloat(child.style.top)).to.be(100);
        done();
      }, 550);
    }, 600);
  });

  it('is timerout', (done) => {
    instance = createTweenInstance({
      animation: {
        top: 100,
        duration: 500,
      },
      style: { position: 'relative', top: 0 },
    });
    const child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    ticker.timeout(() => {
      console.log(child.style.top);
      expect(getFloat(child.style.top)).to.be(100);
      const t = ticker.interval(() => {
        ticker.clear(t);
        done();
      }, 500);
    }, 500);
  });

  it('is attr', (done) => {
    instance = createTweenInstance({
      animation: {
        width: 100,
        color: '#fff000',
      },
      attr: 'attr',
    });
    const child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    ticker.timeout(() => {
      const width = child.getAttribute('width');
      console.log(width);
      expect(getFloat(width)).to.be(100);
      done();
    }, 500);
  });

  it('single tween-one component is svg', (done) => {
    const ease = easing.path('M0,100L100,0');
    instance = createTweenInstance({
      animation: { translateX: 100, ease },
      component: 'rect',
    });
    const child = TestUtils.findRenderedDOMComponentWithTag(instance, 'rect');
    console.log('start:', child.style[checkStyleName('transform')]);
    expect(child.style[checkStyleName('transform')]).to.be('translate(0px, 0px)');
    ticker.timeout(() => {
      // 默认时间为450,用500是肯定过值；
      console.log('end:', child.style[checkStyleName('transform')]);
      expect(child.style[checkStyleName('transform')]).to.be('translate(100px, 0px)');
      done();
    }, 500);
  });

  it('child component is null', (done) => {
    instance = createTweenInstance({
      animation: { x: 100 },
      component: Div,
    });
    let child = TestUtils.scryRenderedDOMComponentsWithTag(instance);
    expect(child.length).to.be(0);
    ticker.timeout(() => {
      instance.setState({
        showChild: true,
      });
      child = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div');
      expect(child.length).to.be(1);
      done();
    }, 1000);
  });

  it('timeline repeat and yoyo', (done) => {
    instance = createTweenInstance({
      animation: [{ x: 100, duration: 200 }, { y: 100, duration: 200 }],
      yoyo: true,
      repeat: 2,
    });
    const child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    console.log(child.style[checkStyleName('transform')]);
    expect(child.style[checkStyleName('transform')]).to.be('translate(0px, 0px)');
    ticker.timeout(() => {
      console.log(child.style[checkStyleName('transform')]);
      expect(child.style[checkStyleName('transform')]).to.be('translate(100px, 100px)');
      ticker.timeout(() => {
        console.log(child.style[checkStyleName('transform')]);
        expect(child.style[checkStyleName('transform')]).to.be('translate(0px, 0px)');
        ticker.timeout(() => {
          console.log(child.style[checkStyleName('transform')]);
          expect(child.style[checkStyleName('transform')]).to.be('translate(100px, 100px)');
          done();
        }, 400);
      }, 400);
    }, 400);
  });
});
