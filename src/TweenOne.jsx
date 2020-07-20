import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import { polyfill } from 'react-lifecycles-compat';

import { objectEqual } from './util';
import Tween from './Tween';
import ticker from './ticker';

function noop() {}

const perFrame = Math.round(1000 / 60);
const objectOrArray = PropTypes.oneOfType([PropTypes.object, PropTypes.array]);

class TweenOne extends Component {
  static propTypes = {
    component: PropTypes.any,
    componentProps: PropTypes.any,
    animation: objectOrArray,
    children: PropTypes.any,
    style: PropTypes.object,
    paused: PropTypes.bool,
    reverse: PropTypes.bool,
    reverseDelay: PropTypes.number,
    yoyo: PropTypes.bool,
    repeat: PropTypes.number,
    moment: PropTypes.number,
    attr: PropTypes.string,
    onChange: PropTypes.func,
    resetStyle: PropTypes.bool,
    forcedJudg: PropTypes.object,
  };

  static defaultProps = {
    component: 'div',
    componentProps: {},
    reverseDelay: 0,
    repeat: 0,
    attr: 'style',
    onChange: noop,
  };

  static getDerivedStateFromProps(props, { prevProps, $self }) {
    const nextState = {
      prevProps: props,
    };
    if (prevProps && props !== prevProps) {
      if (!$self.tween && !$self.dom) {
        $self.updateAnim = true;
        return nextState;
      }

      // 动画处理
      const newAnimation = props.animation;
      const currentAnimation = prevProps.animation;
      const equal = objectEqual(currentAnimation, newAnimation);
      if (!equal) {
        if (props.resetStyle && $self.tween) {
          $self.tween.resetDefaultStyle();
        }
        $self.updateAnim = true;
      }

      // 跳帧事件 moment;
      const nextMoment = props.moment;
      if (typeof nextMoment === 'number' && nextMoment !== prevProps.moment) {
        if ($self.tween && !$self.updateAnim) {
          $self.startMoment = nextMoment;
          $self.startTime = ticker.time;
          if (props.paused) {
            $self.raf();
          }
          if ($self.tween.progressTime >= $self.tween.totalTime) {
            $self.play();
          }
        } else {
          $self.updateAnim = true;
        }
      }

      // 暂停倒放
      if ($self.paused !== props.paused || $self.reverse !== props.reverse) {
        $self.paused = props.paused;
        $self.reverse = props.reverse;
        if ($self.paused) {
          $self.cancelRequestAnimationFrame();
        } else if ($self.reverse && props.reverseDelay) {
          $self.cancelRequestAnimationFrame();
          ticker.timeout($self.restart, props.reverseDelay);
        } else {
          // 在 form 状态下，暂停时拉 moment 时，start 有值恢复播放，在 delay 的时间没有处理。。
          if ($self.tween) {
            $self.tween.resetAnimData();
            $self.tween.resetDefaultStyle();
          }
          if (!$self.updateAnim) {
            $self.restart();
          }
        }
      }

      const styleEqual = objectEqual(prevProps.style, props.style);
      if (!styleEqual) {
        // 在动画时更改了 style, 作为更改开始数值。
        if ($self.tween) {
          $self.tween.reStart(
            props.style,
            prevProps.style,
            $self.tween.progressTime < $self.tween.totalTime,
          );
          if ($self.paused) {
            $self.raf();
          }
        }
      }
      $self.setForcedJudg(props);
    }
    return nextState; // eslint-disable-line
  }

  constructor(props) {
    super(props);
    this.rafID = -1;
    this.paused = props.paused;
    this.reverse = props.reverse;
    this.updateAnim = false;
    this.repeatNum = 0;
    // 定义 ref 给外部使用；
    this.currentRef = null;
    this.forced = {};
    this.setForcedJudg(props);
    this.state = {
      $self: this,
    };
  }

  componentDidMount() {
    this.dom = ReactDom.findDOMNode(this);
    if (this.dom && this.dom.nodeName !== '#text') {
      this.start();
    }
  }

  componentDidUpdate() {
    if (!this.dom) {
      this.dom = ReactDom.findDOMNode(this);
    }
    // 样式更新了后再执行动画；
    if (this.updateAnim && this.dom && this.dom.nodeName !== '#text') {
      if (this.tween) {
        this.cancelRequestAnimationFrame();
      }
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

  setForcedJudg = props => {
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
  };

  setDefault = props => {
    this.moment = props.moment || 0;
    this.startMoment = props.moment || 0;
    this.startTime = ticker.time;
  };

  restart = () => {
    if (!this.tween) {
      return;
    }
    this.startMoment = this.moment;
    this.startTime = ticker.time;
    this.tween.reverse = this.reverse;
    this.tween.reverseStartTime = this.startMoment;
    this.raf();
    this.play();
  };

  start = () => {
    this.updateAnim = false;
    const props = this.props;
    if (props.animation && Object.keys(props.animation).length) {
      this.setDefault(props);
      this.tween = new Tween(this.dom, props.animation, props.attr);
      this.tween.reverse = this.reverse;
      // 预先注册 raf, 初始动画数值。
      this.raf();
      // 开始动画
      this.play();
    } else {
      this.tween = null;
    }
  };

  play = () => {
    this.cancelRequestAnimationFrame();
    if (this.paused) {
      return;
    }
    this.rafID = ticker.add(this.raf);
  };

  frame = () => {
    const { yoyo } = this.props;
    let { repeat } = this.props;
    const totalTime = repeat === -1 ? Number.MAX_VALUE : this.tween.totalTime * (repeat + 1);
    repeat = repeat >= 0 ? repeat : Number.MAX_VALUE;
    let moment = ticker.time - this.startTime + this.startMoment;
    if (this.reverse) {
      moment = (this.startMoment || 0) - (ticker.time - this.startTime);
    }
    moment = moment > totalTime ? totalTime : moment;
    moment = moment <= 0 ? 0 : moment;
    let repeatNum = Math.floor(moment / this.tween.totalTime) || 0;
    repeatNum = repeatNum > repeat ? repeat : repeatNum;
    let tweenMoment = moment - this.tween.totalTime * repeatNum;
    tweenMoment =
      tweenMoment < perFrame && !this.reverse && totalTime >= perFrame ? 0 : tweenMoment;
    if (repeat && moment && moment - this.tween.totalTime * repeatNum < perFrame) {
      // 在重置样式之前补 complete；
      this.tween.frame(this.tween.totalTime * repeatNum);
    }
    if (
      (moment < this.moment && !this.reverse) ||
      (repeat !== 0 && repeatNum && repeatNum !== this.repeatNum)
    ) {
      // 在 form 状态下，暂停时拉 moment 时，start 有值，，往返方向播放时，在 delay 的时间没有处理。。
      // 与上面的处理一样，删除 start ，重新走一遍 start。。
      this.tween.resetAnimData();
      this.tween.resetDefaultStyle();
    }
    const yoyoReverse = yoyo && repeatNum % 2;
    if (yoyoReverse) {
      tweenMoment = this.tween.totalTime - tweenMoment;
    }
    this.tween.onChange = e => {
      const cb = {
        ...e,
        timelineMode: '',
      };

      if (
        (this.moment === this.startMoment && !this.reverse && !e.index && e.mode === 'onStart') ||
        this.reverse
      ) {
        cb.timelineMode = 'onTimelineStart';
      } else if ((moment >= totalTime && !this.reverse) || (!moment && this.reverse)) {
        cb.timelineMode = 'onTimelineComplete';
      } else if (repeatNum !== this.timelineRepeatNum) {
        cb.timelineMode = 'onTimelineRepeat';
      } else {
        cb.timelineMode = 'onTimelineUpdate';
      }
      this.timelineRepeatNum = repeatNum;
      this.props.onChange(cb);
    };
    this.moment = moment;
    this.repeatNum = repeatNum;
    this.tween.frame(tweenMoment);
  };

  raf = () => {
    const tween = this.tween;
    this.frame();
    if (tween !== this.tween) {
      // 在 onComplete 时更换动画时，raf 没结束，所以需要强制退出，避逸两个时间的冲突。
      return null;
    }
    const { repeat } = this.props;
    const totalTime = repeat === -1 ? Number.MAX_VALUE : this.tween.totalTime * (repeat + 1);
    if (
      (this.moment >= totalTime && !this.reverse) ||
      this.paused ||
      (this.reverse && this.moment === 0)
    ) {
      return this.cancelRequestAnimationFrame();
    }
    return null;
  };

  cancelRequestAnimationFrame = () => {
    ticker.clear(this.rafID);
    this.rafID = -1;
  };

  render() {
    const {
      animation,
      component,
      componentProps,
      reverseDelay,
      attr,
      paused,
      reverse,
      repeat,
      yoyo,
      moment,
      resetStyle,
      forcedJudg,
      ...props
    } = this.props;
    Object.keys(props.style || {}).forEach(p => {
      if (p.match(/filter/i)) {
        ['Webkit', 'Moz', 'Ms', 'ms'].forEach(prefix => {
          props.style[`${prefix}Filter`] = props.style[p];
        });
      }
    });
    const refFunc = (c) => {
      this.currentRef = c;
    }
    // component 为空时调用子级的。。
    const { className, children } = props;
    if (!component && typeof children !== 'string') {
      if (!children) {
        return children;
      }
      const childrenProps = children.props;
      const { style: childStyle, className: childClass } = childrenProps || {};
      // 合并 style 与 className。
      const newStyle = { ...childStyle, ...props.style };
      const newClassName = className ? `${className} ${childClass}` : childClass;
      return React.cloneElement(children, { style: newStyle, ref: refFunc, className: newClassName });
    }
    return React.createElement(component, {
      ref: refFunc,
      ...props,
      ...componentProps,
    });
  }
}
TweenOne.isTweenOne = true;
export default polyfill(TweenOne);
