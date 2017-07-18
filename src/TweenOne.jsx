import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import { dataToArray, objectEqual } from './util';
import { stylesToCss } from 'style-utils';
import TimeLine from './TimeLine';
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
    this.newMomentAnim = false;
    this.updateAnim = null;
  }

  componentDidMount() {
    this.dom = ReactDom.findDOMNode(this);
    this.start();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.resetStyleBool && this.timeLine && this.rafID === -1) {
      this.timeLine.resetDefaultStyle();
    }
    this.onChange = nextProps.onChange;
    // 跳帧事件 moment;
    const newMoment = nextProps.moment;
    this.newMomentAnim = false;
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
        this.newMomentAnim = true;
      }
    }
    // 动画处理
    const newAnimation = nextProps.animation;
    const currentAnimation = this.props.animation;
    const equal = objectEqual(currentAnimation, newAnimation);
    const styleEqual = objectEqual(this.props.style, nextProps.style);
    // 如果 animation 不同， 在下一帧重新动画
    if (!equal) {
      if (this.rafID !== -1) {
        this.updateAnim = 'update';
      } else if (nextProps.updateReStart) {
        this.startFrame = ticker.frame;
        this.updateAnim = 'start';
      }
      // 只做动画，不做回调处理。。。
      if (this.timeLine) {
        this.timeLine.updateAnim = this.updateAnim;
      }
    }

    if (!styleEqual) {
      // 在动画时更改了 style, 作为更改开始数值。
      if (this.rafID !== -1) {
        this.updateStartStyle = true;
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
    if (this.updateStartStyle && !this.updateAnim) {
      this.timeLine.reStart(this.props.style);
      this.updateStartStyle = false;
    }

    if (this.newMomentAnim) {
      this.raf();
    }

    // 样式更新了后再执行动画；
    if (this.updateAnim === 'start') {
      this.start();
    }
  }

  componentWillUnmount() {
    this.cancelRequestAnimationFrame();
  }

  restart = () => {
    if (!this.timeLine) {
      return;
    }
    this.startMoment = this.timeLine.progressTime;
    this.startFrame = ticker.frame;
    this.play();
  }

  start = () => {
    this.updateAnim = null;
    const props = this.props;
    if (props.animation && Object.keys(props.animation).length) {
      this.timeLine = new TimeLine(this.dom, dataToArray(props.animation),
        { attr: props.attr });
      // 预先注册 raf, 初始动画数值。
      this.raf();
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

  updateAnimFunc = () => {
    this.cancelRequestAnimationFrame();
    this.startFrame = ticker.frame;
    if (this.updateAnim === 'update') {
      if (this.props.resetStyleBool && this.timeLine) {
        this.timeLine.resetDefaultStyle();
      }
      this.startMoment = 0;
    }
  }

  frame = () => {
    let moment = (ticker.frame - this.startFrame) * perFrame + this.startMoment;
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

  raf = () => {
    this.frame();
    if (this.updateAnim) {
      if (this.updateStartStyle) {
        this.timeLine.reStart(this.props.style);
      }
      this.updateAnimFunc();
      this.start();
    }
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
      'componentReplace',
      'reverseDelay',
      'attr',
      'paused',
      'reverse',
      'moment',
      'resetStyleBool',
      'updateReStart',
    ].forEach(key => delete props[key]);
    props.style = { ...this.props.style };
    Object.keys(props.style).forEach(p => {
      if (p.match(/filter/i)) {
        ['Webkit', 'Moz', 'Ms', 'ms'].forEach(prefix =>
          props.style[`${prefix}Filter`] = props.style[p]);
      }
    });
    // 子级是组件，生成组件需要替换的 component;
    props.component = typeof props.component === 'function' ?
      this.props.componentReplace : props.component;
    if (!props.component) {
      delete props.component;
    }
    // component 为空时调用子级的。。
    if (!this.props.component) {
      const childrenProps = this.props.children.props;
      const { style, className } = childrenProps;
      // 合并 style 与 className。
      const newStyle = { ...style, ...props.style };
      const newClassName = props.className ? `${props.className} ${className}` : className;
      return React.cloneElement(this.props.children, { style: newStyle, className: newClassName });
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
  updateReStart: PropTypes.bool,
};

TweenOne.defaultProps = {
  component: 'div',
  reverseDelay: 0,
  attr: 'style',
  onChange: noop,
  updateReStart: true,
};
export default TweenOne;
