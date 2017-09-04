import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import { dataToArray, objectEqual } from './util';
import { stylesToCss } from 'style-utils';
import Tween from './Tween';
import ticker from './ticker';

function noop() {
}

const perFrame = Math.round(1000 / 60);

class TweenOne extends Component {
  constructor(props) {
    super(props);
    this.rafID = -1;
    this.moment = props.moment || 0;
    this.startMoment = props.moment || 0;
    this.startFrame = ticker.frame;
    this.paused = props.paused;
    this.reverse = props.reverse;
    this.onChange = props.onChange;
    this.newMomentAnim = false;
    this.updateAnim = null;
    this.forced = {};
    this.setForcedJudg(props);
  }

  componentDidMount() {
    this.dom = ReactDom.findDOMNode(this);
    this.start();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.resetStyleBool && this.tween && this.rafID === -1) {
      this.tween.resetDefaultStyle();
    }
    this.onChange = nextProps.onChange;
    // 跳帧事件 moment;
    const newMoment = nextProps.moment;
    this.newMomentAnim = false;
    if (typeof newMoment === 'number' && newMoment !== this.moment) {
      this.startMoment = newMoment;
      this.startFrame = ticker.frame;
      if (this.rafID === -1 && !nextProps.paused) {
        this.tween.resetAnimData();
        const style = nextProps.style;
        this.dom.setAttribute('style', '');
        if (style) {
          Object.keys(style).forEach(key => {
            this.dom.style[key] = stylesToCss(key, style[key]);
          });
        }
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
      if (this.tween) {
        this.tween.updateAnim = this.updateAnim;
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

    this.setForcedJudg(nextProps);
  }

  componentDidUpdate() {
    if (this.updateStartStyle && !this.updateAnim) {
      this.tween.reStart(this.props.style);
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

  /**
   * @method setForcedJudg
   * @param props
   * QueueAnim 套在组件下面后导至子级变化。
   * <QueueAnim component={Menu} >
   *   <SubMenu key="a" title="导航">
   *     <Item />
   *   </SubMenu>
   * </QueueAnim>
   * rc-Menu 里是以 isXXX 来判断是 rc-Menu 的子级;
   * 如: 用 isSubMenu 来处理 hover 事件
   * 地址: https://github.com/react-component/menu/blob/master/src/MenuMixin.js#L172
   * 暂时方案: 在组件里添加判断用的值。
   */

  setForcedJudg = (props) => {
    Object.keys(this.forced).forEach(key => {
      delete this[key];
      delete this.forced[key];
    });
    if (props.forcedJudg) {
      Object.keys(props.forcedJudg).forEach(key => {
        if (!this[key]) {
          this[key] = props.forcedJudg[key];
          this.forced[key] = 1;
        }
      });
    }
  }

  restart = () => {
    if (!this.tween) {
      return;
    }
    this.startMoment = this.tween.progressTime;
    this.startFrame = ticker.frame;
    this.tween.reverse = this.reverse;
    this.tween.reverseStartTime = this.startMoment;
    this.play();
  }

  start = () => {
    this.updateAnim = null;
    const props = this.props;
    if (props.animation && Object.keys(props.animation).length) {
      this.tween = new Tween(this.dom, dataToArray(props.animation),
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
      if (this.props.resetStyleBool && this.tween) {
        this.tween.resetDefaultStyle();
      }
      this.startMoment = 0;
    }
  }

  frame = () => {
    let moment = (ticker.frame - this.startFrame) * perFrame + this.startMoment;
    if (this.reverse) {
      moment = (this.startMoment || 0) - (ticker.frame - this.startFrame) * perFrame;
    }
    moment = moment > this.tween.totalTime ? this.tween.totalTime : moment;
    moment = moment <= 0 ? 0 : moment;
    if (moment < this.moment && !this.reverse) {
      this.tween.resetDefaultStyle();
    }
    this.moment = moment;
    this.tween.onChange = this.onChange;
    this.tween.frame(moment);
  }

  raf = () => {
    this.frame();
    if (this.updateAnim) {
      if (this.updateStartStyle) {
        this.tween.reStart(this.props.style);
      }
      this.updateAnimFunc();
      this.start();
    }
    if ((this.moment >= this.tween.totalTime && !this.reverse)
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
      'componentProps',
      'reverseDelay',
      'attr',
      'paused',
      'reverse',
      'moment',
      'resetStyleBool',
      'updateReStart',
      'forcedJudg',
    ].forEach(key => delete props[key]);
    props.style = { ...this.props.style };
    Object.keys(props.style).forEach(p => {
      if (p.match(/filter/i)) {
        ['Webkit', 'Moz', 'Ms', 'ms'].forEach(prefix =>
          props.style[`${prefix}Filter`] = props.style[p]);
      }
    });
    // component 为空时调用子级的。。
    if (!this.props.component) {
      const childrenProps = this.props.children.props;
      const { style, className } = childrenProps;
      // 合并 style 与 className。
      const newStyle = { ...style, ...props.style };
      const newClassName = props.className ? `${props.className} ${className}` : className;
      return React.cloneElement(this.props.children, { style: newStyle, className: newClassName });
    }
    return React.createElement(this.props.component, { ...props, ...this.props.componentProps });
  }
}

const objectOrArray = PropTypes.oneOfType([PropTypes.object, PropTypes.array]);

TweenOne.propTypes = {
  component: PropTypes.any,
  componentProps: PropTypes.any,
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
  forcedJudg: PropTypes.object,
};

TweenOne.defaultProps = {
  component: 'div',
  componentProps: {},
  reverseDelay: 0,
  attr: 'style',
  onChange: noop,
  updateReStart: true,
};
export default TweenOne;
