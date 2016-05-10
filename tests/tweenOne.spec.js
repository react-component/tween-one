import React from 'react';
import ReactDom from 'react-dom';
import expect from 'expect.js';
import Tween from '../index';
import TestUtils from 'react-addons-test-utils';

describe('rc-tween-one', function() {
  let div;
  let instance;

  function createTweenInstance(props) {
    class TweenDemo extends React.Component {
      constructor() {
        super(...arguments);
        this.state = {
          animation: this.props.animation,
          style: this.props.style,
          reverse: false,
          moment: null,
        };
      }

      render() {
        return (<Tween {...this.props} reverse={this.state.reverse}
          animation={this.state.animation} style={this.state.style}
          moment={this.state.moment}
        >
          <span>demo</span>
        </Tween>);
      }
    }
    const objectOrArray = React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]);

    TweenDemo.propTypes = {
      animation: objectOrArray,
      style: React.PropTypes.object,
    };

    return ReactDom.render(<TweenDemo {...props} />, div);
  }

  beforeEach(function() {
    div = document.createElement('div');
    document.body.appendChild(div);
  });

  afterEach(function() {
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

  it('single tween-one', function(done) {
    instance = createTweenInstance({
      animation: { top: 100 },
      style: { top: 0 },
    });
    const child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    console.log('start:' + child.style.top);
    expect(getFloat(child.style.top)).to.be(0);
    setTimeout(function() {
      // 默认时间为450,用500是肯定过值；
      console.log('end:' + child.style.top);
      expect(getFloat(child.style.top)).to.be(100);
      done();
    }, 500);
  });

  it('timeline tween-one', function(done) {
    instance = createTweenInstance({
      animation: [{ top: 100 }, { left: 100 }, { top: 0 }, { left: 0 }],
      style: { position: 'relative' },
    });
    const child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    setTimeout(function() {
      console.log('top===100,data:', child.style.top, '########', 'left>0,data:', child.style.left);
      expect(getFloat(child.style.top)).to.be(100);
      expect(getFloat(child.style.left)).to.above(0);
      setTimeout(function() {
        console.log('top<100,data:', child.style.top, '########', 'left===0,data:', child.style.left);
        expect(getFloat(child.style.left)).to.be(100);
        expect(getFloat(child.style.top)).to.below(100);
        setTimeout(function() {
          console.log('top===0,data:', child.style.top, '########', 'left<100,data:', child.style.left);
          expect(getFloat(child.style.left)).to.below(100);
          expect(getFloat(child.style.top)).to.be(0);
          setTimeout(function() {
            console.log('top===0,data:', child.style.top, '########', 'left===0,data:', child.style.left);
            expect(getFloat(child.style.top)).to.be(0);
            expect(getFloat(child.style.left)).to.be(0);
            done();
          }, 450);
        }, 450);
      }, 450);
    }, 500);
  });

  it('repeat tween-one', function(done) {
    instance = createTweenInstance({
      animation: { top: 100, repeat: 1, repeatDelay: 300 },
      style: { position: 'relative', top: 0 },
    });
    const child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    console.log('start:' + child.style.top);
    expect(getFloat(child.style.top)).to.be(0);
    setTimeout(function() {
      expect(getFloat(child.style.top)).to.above(95);
      console.log('20 milliseconds before the first repeat end, top>95, data:', child.style.top);
      setTimeout(function() {
        expect(getFloat(child.style.top)).to.below(10);
        console.log('20 ms after the beginning of the second repeat, top<10, data', child.style.top);
        setTimeout(function() {
          expect(getFloat(child.style.top)).to.be(100);
          console.log('repeat end,top:', child.style.top);
          done();
        }, 450);
      }, 340);
    }, 430);
  });

  it('repeat yoyo tween-one', function(done) {
    instance = createTweenInstance({
      animation: { top: 100, repeat: 1, yoyo: true },
      style: { position: 'relative', top: 0 },
    });
    const child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    console.log('start:' + child.style.top);
    expect(getFloat(child.style.top)).to.be(0);
    setTimeout(function() {
      expect(getFloat(child.style.top)).to.above(95);
      console.log('20 milliseconds before the first repeat end, top>95, data:', child.style.top);
      setTimeout(function() {
        expect(getFloat(child.style.top)).to.below(101).above(95);
        console.log('20 ms after the beginning of the second repeat, 95<top<100, data', child.style.top);
        setTimeout(function() {
          expect(getFloat(child.style.top)).to.be(0);
          console.log('repeat end,top:', child.style.top);
          done();
        }, 450);
      }, 40);
    }, 430);
  });

  it('type is from tween-one', function(done) {
    instance = createTweenInstance({
      animation: { top: 100, type: 'from' },
      style: { position: 'relative', top: 0 },
    });
    const child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    console.log('default:' + child.style.top);
    expect(getFloat(child.style.top)).to.be(0);
    setTimeout(()=> {
      expect(getFloat(child.style.top)).to.above(95);
      console.log('start:' + child.style.top);
      setTimeout(()=> {
        expect(getFloat(child.style.top)).to.be(0);
        console.log('end:' + child.style.top);
        done();
      }, 450);
    }, 30);
  });

  it('is Bezier', function(done) {
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
    setTimeout(() => {
      let transform = child.style.transform;
      let xy = transform.split(')').filter(item => item).map(item => item.split('(')[1]);
      let rotate = xy[2];
      let x = xy[0];
      let y = xy[1];
      console.log('x:' + x, 'y:' + y, 'rotate:' + rotate);
      expect(getFloat(x)).to.above(0).below(5);
      expect(getFloat(y)).to.above(0).below(5);
      expect(getFloat(rotate)).to.above(44).below(45);

      setTimeout(()=> {
        transform = child.style.transform;
        xy = transform.split(')').filter(item => item).map(item => item.split('(')[1]);
        rotate = xy[2];
        x = xy[0];
        y = xy[1];
        expect(getFloat(x)).to.above(90).below(105);
        expect(getFloat(y)).to.above(45).below(55);
        expect(getFloat(rotate)).to.above(-5).below(5);
        console.log('x:' + x, 'y:' + y, 'rotate:' + rotate);
        setTimeout(() => {
          transform = child.style.transform;
          xy = transform.split(')').filter(item => item).map(item => item.split('(')[1]);
          rotate = xy[2];
          x = xy[0];
          y = xy[1];
          expect(getFloat(x)).to.be(200);
          expect(getFloat(y)).to.be(0);
          expect(getFloat(rotate)).to.above(-45.0001).below(-44.999);
          console.log('x:' + x, 'y:' + y, 'rotate:' + rotate);
          done();
        }, 530);
      }, 470);
    }, 30);
  });

  it('is Bezier type is cubic', function(done) {
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
    const child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    setTimeout(()=> {
      let transform = child.style.transform;
      let xy = transform.split(')').filter(item => item).map(item => item.split('(')[1]);
      let x = xy[0];
      let y = xy[1];
      console.log(`x:${x},y:${y}`);
      expect(getFloat(x)).to.above(99);
      expect(getFloat(y)).to.above(-1);
      setTimeout(() => {
        transform = child.style.transform;
        xy = transform.split(')').filter(item => item).map(item => item.split('(')[1]);
        x = xy[0];
        y = xy[1];
        console.log(`x:${x},y:${y}`);
        expect(getFloat(x)).to.be(700);
        expect(getFloat(y)).to.be(400);
        done();
      }, 1030);
    }, 30);
  });

  it('is Bezier type is thru', function(done) {
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
    setTimeout(() => {
      let transform = child.style.transform;
      let xy = transform.split(')').filter(item => item).map(item => item.split('(')[1]);
      let x = xy[0];
      let y = xy[1];
      console.log(`x:${x},y:${y}`);
      expect(getFloat(x)).to.above(-1);
      expect(getFloat(y)).to.above(-1);
      setTimeout(() => {
        transform = child.style.transform;
        xy = transform.split(')').filter(item => item).map(item => item.split('(')[1]);
        x = xy[0];
        y = xy[1];
        console.log(`x:${x},y:${y}`);
        expect(Math.round(getFloat(x))).to.be(300);
        expect(Math.round(getFloat(y))).to.be(400);
        done();
      }, 1050);
    }, 30);
  });

  it('is update Animation and filter', function(done) {
    instance = createTweenInstance({
      animation: { top: 100, x: 100, color: '#fff', sepia: '100%', blur: '2px', duration: 1000 },
      style: { position: 'relative', top: 0 },
    });
    const child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    setTimeout(() => {
      expect(getFloat(child.style.top)).to.be(100);
      console.log('child top:' + child.style.top);
      instance.setState({
        animation: { left: 100, y: 100 },
      });
      setTimeout(()=> {
        expect(getFloat(child.style.left)).to.be(100);
        console.log('child left:' + child.style.left);
        done();
      }, 540);
    }, 1040);
  });

  it('is update style', function(done) {
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
    setTimeout(() => {
      expect(getFloat(child.style.top)).to.above(50);
      instance.setState({
        style: {
          top: 40,
          left: 100,
        },
      });
      setTimeout(()=> {
        expect(getFloat(child.style.left)).to.be(100);
        console.log('child left:', child.style.left);
        setTimeout(()=> {
          done();
        }, 400);
      }, 30);
    }, 600);
  });

  it('is reverse', function(done) {
    instance = createTweenInstance({
      animation: {
        top: 100,
      },
      style: { position: 'relative', top: 0 },
    });
    setTimeout(() => {
      instance.setState({
        reverse: true,
      });
      setTimeout(() => {
        const child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
        console.log(getFloat(child.style.top));
        expect(getFloat(child.style.top)).to.be(0);
        done();
      }, 350);
    }, 300);
  });

  it('is moment', function(done) {
    instance = createTweenInstance({
      animation: {
        top: 100,
        duration: 1000,
      },
      style: { position: 'relative', top: 0 },
    });
    const child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    setTimeout(() => {
      instance.setState({
        moment: 1000,
      }, () => {
        instance.setState({
          moment: null,
        });
      });
      setTimeout(() => {
        console.log(child.style.top);
        expect(getFloat(child.style.top)).to.be(100);
        done();
      }, 10);
    }, 100);
  });
});