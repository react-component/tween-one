import React, { PropTypes, Component } from 'react';
import ReactDom from 'react-dom';
import { dataToArray, objectEqual } from './util';
import { stylesToCss } from 'style-utils';
import TimeLine from './TimeLine';
import plugins from './plugins';
import ticker from './ticker';

function noop() {
}

const perFrame = Math.round(1000 / 60);

class TweenOne extends Component {
  constructor() {
    super(...arguments);
    this.rafID = -1;
    this.moment = this.props.moment || 0;
    this.startMoment = this.props.moment || 0;
    this.startFrame = ticker.frame;
    this.paused = this.props.paused;
    this.reverse = this.props.reverse;
    this.onChange = this.props.onChange;
  }

  componentDidMount() {
    this.dom = ReactDom.findDOMNode(this);
    this.start();
  }

  componentWillReceiveProps(nextProps) {
    this.onChange = nextProps.onChange;
    // 跳帧事件 moment;
    const newMoment = nextProps.moment;
    if (typeof newMoment === 'number' && newMoment !== this.moment) {
      this.startMoment = newMoment;
      this.startFrame = ticker.frame;
      if (this.rafID === -1 && !nextProps.paused) {
        this.timeLine.resetAnimData();
        const style = nextProps.style;
        this.dom.setAttribute('style', '');
        Object.keys(style).forEach(key => {
          this.dom.style[key] = stylesToCss(key, style[key]);
        });
        this.play();
      } else {
        this.raf();
      }
    }
    // 动画处理
    const newAnimation = nextProps.animation;
    const currentAnimation = this.props.animation;
    const equal = objectEqual(currentAnimation, newAnimation);
    const styleEqual = objectEqual(this.props.style, nextProps.style);
    // 如果 animation 不同， 重新动画
    this.restartAnim = false;
    if (!equal) {
      this.cancelRequestAnimationFrame();
      if (nextProps.resetStyleBool && this.timeLine) {
        this.timeLine.resetDefaultStyle();
      }
      this.startMoment = 0;
      this.startFrame = ticker.frame;
      this.restartAnim = true;
      // this.start(nextProps);
    } else if (!styleEqual) {
      // 如果 animation 相同，，style 不同，从当前时间开放。
      if (this.rafID !== -1) {
        this.cancelRequestAnimationFrame();
        this.startMoment = this.timeLine.progressTime;
        this.startFrame = ticker.frame;
        this.restartAnim = true;
        // this.start(nextProps);
      }
    }
    // 暂停倒放
    if (this.paused !== nextProps.paused || this.reverse !== nextProps.reverse) {
      this.paused = nextProps.paused;
      this.reverse = nextProps.reverse;
      if (this.paused) {
        this.cancelRequestAnimationFrame();
      } else {
        if (this.reverse && nextProps.reverseDelay) {
          this.cancelRequestAnimationFrame();
          ticker.timeout(this.restart, nextProps.reverseDelay);
        } else {
          this.restart();
        }
      }
    }
  }

  componentDidUpdate() {
    // 样式更新了后再执行动画；
    if (this.restartAnim) {
      this.start();
    }
  }

  componentWillUnmount() {
    this.cancelRequestAnimationFrame();
  }

  restart = () => {
    this.startMoment = this.timeLine.progressTime;
    this.startFrame = ticker.frame;
    this.play();
  }

  start = () => {
    const props = this.props;
    if (props.animation && Object.keys(props.animation).length) {
      this.timeLine = new TimeLine(this.dom, dataToArray(props.animation), props.attr);
      // 预先注册 raf, 初始动画数值。
      this.raf(0, true);
      // 开始动画
      this.play();
    }
  }

  play = () => {
    this.cancelRequestAnimationFrame();
    if (this.paused) {
      return;
    }
    this.rafID = ticker.add(this.raf);
  }

  frame = (date, register) => {
    const registerMoment = register ? date : 0;
    let moment = (ticker.frame - this.startFrame) * perFrame + registerMoment + this.startMoment;
    if (!register && moment < perFrame) {
      // 注册完后，第一帧预先跑动， 鼠标跟随
      moment = perFrame;
    }
    if (this.reverse) {
      moment = (this.startMoment || 0) - (ticker.frame - this.startFrame) * perFrame;
    }
    moment = moment > this.timeLine.totalTime ? this.timeLine.totalTime : moment;
    moment = moment <= 0 ? 0 : moment;
    if (moment < this.moment && !this.reverse) {
      this.timeLine.resetDefaultStyle();
    }
    this.moment = moment;
    this.timeLine.onChange = this.onChange;
    this.timeLine.frame(moment);
  }

  raf = (date, register) => {
    this.frame(date, register);
    if ((this.moment >= this.timeLine.totalTime && !this.reverse)
      || this.paused || (this.reverse && this.moment === 0)) {
      return this.cancelRequestAnimationFrame();
    }
  }

  cancelRequestAnimationFrame = () => {
    ticker.clear(this.rafID);
    this.rafID = -1;
  }

  render() {
    const props = { ...this.props };
    [
      'animation',
      'component',
      'reverseDelay',
      'attr',
      'paused',
      'reverse',
      'moment',
      'resetStyleBool',
    ].forEach(key => delete props[key]);
    props.style = { ...this.props.style };
    Object.keys(props.style).forEach(p => {
      if (p.match(/filter/i)) {
        ['Webkit', 'Moz', 'Ms', 'ms'].forEach(prefix =>
          props.style[`${prefix}Filter`] = props.style[p]);
      }
    });
    props.component = typeof props.component === 'function' ?
      this.props.componentReplace : props.component;
    if (!props.component) {
      delete props.component;
    }
    return React.createElement(this.props.component, props);
  }
}

const objectOrArray = PropTypes.oneOfType([PropTypes.object, PropTypes.array]);

TweenOne.propTypes = {
  component: PropTypes.any,
  componentReplace: PropTypes.string,
  animation: objectOrArray,
  children: PropTypes.any,
  style: PropTypes.object,
  paused: PropTypes.bool,
  reverse: PropTypes.bool,
  reverseDelay: PropTypes.number,
  moment: PropTypes.number,
  attr: PropTypes.string,
  onChange: PropTypes.func,
  resetStyleBool: PropTypes.bool,
};

TweenOne.defaultProps = {
  component: 'div',
  reverseDelay: 0,
  attr: 'style',
  onChange: noop,
};
TweenOne.plugins = plugins;
export default TweenOne;
