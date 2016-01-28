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
      }

      render() {
        return (<Tween {...this.props}>
          <span>demo</span>
        </Tween>);
      }
    }
    return ReactDom.render(<TweenDemo {...props}/>, div);
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
      animation: {top: 100},
      style: {top: 0},
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
      animation: [{top: 100}, {left: 100}, {top: 0}, {left: 0}],
      style: {position: 'relative'},
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

  it.only('repeat tween-one', function(done) {
    instance = createTweenInstance({
      animation: {top: 100, repeat: 1},
      style: {position: 'relative', top: 0},
    });
    const child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    console.log('start:' + child.style.top);
    expect(getFloat(child.style.top)).to.be(0);
    setTimeout(function() {
      expect(getFloat(child.style.top)).to.above(95);
      console.log('20 milliseconds before the first repeat end, top>95, data:', child.style.top);
      setTimeout(function() {
        expect(getFloat(child.style.top)).to.below(5);
        console.log('20 ms after the beginning of the second repeat, top<5, data', child.style.top);
        setTimeout(function() {
          expect(getFloat(child.style.top)).to.be(100);
          console.log('repeat end,top:', child.style.top);
          done();
        }, 450);
      }, 40);
    }, 430);
  });

  it('repeat yoyo tween-one', function(done) {
    instance = createTweenInstance({
      animation: {top: 100, repeat: 1, yoyo: true},
      style: {position: 'relative', top: 0},
    });
    const child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    console.log('start:' + child.style.top);
    expect(getFloat(child.style.top)).to.be(0);
    setTimeout(function() {
      expect(getFloat(child.style.top)).to.above(95);
      console.log('20 milliseconds before the first repeat end, top>95, data:', child.style.top);
      setTimeout(function() {
        expect(getFloat(child.style.top)).to.below(100).above(95);
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
      animation: {top: 100, type: 'from'},
      style: {position: 'relative', top: 0},
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
});
