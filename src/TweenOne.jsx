import React, {PropTypes, Component} from 'react';
import ReactDom from 'react-dom';
import assign from 'object-assign';
import requestAnimationFrame from 'raf';
import {dataToArray, objectEqual} from './util';
import TimeLine from './TimeLine';

function noop() {
}

let hidden;
let visibilityChange;
if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
  hidden = 'hidden';
  visibilityChange = 'visibilitychange';
} else if (typeof document.mozHidden !== 'undefined') {
  hidden = 'mozHidden';
  visibilityChange = 'mozvisibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
  hidden = 'msHidden';
  visibilityChange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
  hidden = 'webkitHidden';
  visibilityChange = 'webkitvisibilitychange';
}


class TweenOne extends Component {
  constructor() {
    super(...arguments);
    this.rafID = -1;
    // 加这个是防 setState 后 this.props.style 和 nextProps.style 是全等的情况, 走马灯里或滚动组件 React.cloneElement(item, showProps) 情况;
    this.propsStyle = this.props.style ? assign({}, this.props.style) : this.props.style;
    this.startStyle = this.props.style || {};
    this.startAnimation = this.props.animation ? assign({}, this.props.animation) : this.props.animation;
    this.startMoment = this.props.moment;
    this.moment = this.props.moment || 0;
    this.state = {
      style: this.props.style || {},
    };
    [
      'raf',
      'handleVisibilityChange',
      'setCurrentDate',
      'frame',
      'start',
      'play',
      'restart',
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  componentDidMount() {
    const dom = ReactDom.findDOMNode(this);
    this.computedStyle = assign({}, document.defaultView.getComputedStyle(dom));
    this.start(this.props);
    document.addEventListener(visibilityChange, this.handleVisibilityChange, false);
  }

  componentWillReceiveProps(nextProps) {
    const newStyle = nextProps.style;
    const styleEqual = objectEqual(this.propsStyle, newStyle);
    // 如果在动画时,改变了 style 将改变 timeLine 的初始值;
    if (!styleEqual) {
      // 重置开始的样式;
      this.startStyle = assign({}, this.startStyle, this.timeLine.animData.tween, newStyle);
      this.propsStyle = newStyle;
      if (this.rafID !== -1) {
        // 重置数据;
        this.timeLine.resetAnimData();
        // 合并当前在做动画的样式
        this.timeLine.setDefaultData(this.startStyle, dataToArray(nextProps.animation));
      } else {
        this.state.style = assign({}, this.state.style, this.startStyle);
      }
    }

    // 跳帧事件 moment;
    const newMoment = nextProps.moment;
    if (typeof newMoment === 'number') {
      this.startMoment = newMoment;
      if (nextProps.paused) {
        this.oneMoment = true;
        this.timeLine = new TimeLine(assign({}, this.computedStyle, this.startStyle), dataToArray(nextProps.animation));
        const style = assign({}, this.startStyle, this.timeLine.frame(nextProps.moment));
        this.setState({ style });
      } else {
        this.state.style = {};
        this.start(nextProps);
      }
    }
    // 动画处理
    const newAnimation = nextProps.animation;
    const equal = objectEqual(this.startAnimation, newAnimation);
    if (!equal) {
      // 如果样式不相等, 那么用新样式做为开始样式;
      if (!styleEqual) {
        this.startStyle = assign({}, this.startStyle, this.timeLine.animData.tween, newStyle);
      } else {
        this.startStyle = assign({}, this.startStyle, this.timeLine.animData.tween);
      }
      this.startAnimation = newAnimation;
      this.start(nextProps);
    }
    // 暂停倒放
    if (this.props.paused !== nextProps.paused || this.props.reverse !== nextProps.reverse) {
      this.restart(nextProps);
    }
  }

  componentWillUnmount() {
    this.cancelRequestAnimationFram();
  }

  setCurrentDate() {
    this.currentNow = Date.now();
  }

  restart(props) {
    this.startMoment = this.timeLine.progressTime;
    this.start(props);
  }

  start(props) {
    this.timeLine = new TimeLine(assign({}, this.computedStyle, this.startStyle), dataToArray(props.animation));
    if (this.timeLine.defaultData.length && props.animation) {
      // 开始动画
      this.setCurrentDate();
      this.play();
    }
  }

  play() {
    this.cancelRequestAnimationFram();
    this.rafID = requestAnimationFrame(this.raf);
  }


  handleVisibilityChange() {
    // 不在当前窗口时
    if (document[hidden] && this.rafID !== -1) {
      this.startMoment = this.timeLine.progressTime;
      this.cancelRequestAnimationFram();
      this.rafHide = true;
    } else if (this.rafID === -1 && this.rafHide) {
      this.setCurrentDate();
      this.rafID = requestAnimationFrame(this.raf);
      this.rafHide = false;
    }
  }

  frame() {
    const now = Date.now() + (this.startMoment || 0);
    let moment = now - this.currentNow;
    if (this.props.reverse) {
      moment = (this.startMoment || 0) - Date.now() + this.currentNow;
    }
    moment = moment > this.timeLine.totalTime ? this.timeLine.totalTime : moment;
    moment = moment <= 0 ? 0 : moment;
    this.moment = moment;
    this.timeLine.onChange = this.props.onChange.bind(this);
    const style = assign({}, this.startStyle, this.timeLine.frame(moment));
    this.setState({
      style,
    });
  }

  raf() {
    if (this.rafID === -1 || this.props.paused) {
      this.rafID = -1;
      return;
    }
    this.frame();
    if ((this.moment >= this.timeLine.totalTime && !this.props.reverse) || this.props.paused || (this.props.reverse && this.moment === 0)) {
      this.cancelRequestAnimationFram();
    } else {
      this.rafID = requestAnimationFrame(this.raf);
    }
  }

  cancelRequestAnimationFram() {
    requestAnimationFrame.cancel(this.rafID);
    this.rafID = -1;
  }

  render() {
    const props = assign({}, this.props);
    props.style = assign({}, this.state.style);
    if (this.oneMoment) {
      this.oneMoment = false;
    }
    for (const p in props.style) {
      if (p.indexOf('filter') >= 0 || p.indexOf('Filter') >= 0) {
        // ['Webkit', 'Moz', 'Ms', 'ms'].forEach(prefix=> style[`${prefix}Filter`] = style[p]);
        const transformArr = ['Webkit', 'Moz', 'Ms', 'ms'];
        for (let i = 0; i < transformArr.length; i++) {
          props.style[`${transformArr[i]}Filter`] = props.style[p];
        }
      }
    }
    return React.createElement(this.props.component, props);
  }
}

const objectOrArray = PropTypes.oneOfType([PropTypes.object, PropTypes.array]);
const objectOrArrayOrString = PropTypes.oneOfType([PropTypes.string, objectOrArray]);

TweenOne.propTypes = {
  component: PropTypes.string,
  animation: objectOrArray,
  children: objectOrArrayOrString,
  style: PropTypes.object,
  paused: PropTypes.bool,
  reverse: PropTypes.bool,
  moment: PropTypes.number,
  onChange: PropTypes.func,
};

TweenOne.defaultProps = {
  component: 'div',
  onChange: noop,
};

export default TweenOne;
