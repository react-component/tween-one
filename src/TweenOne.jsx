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
    this.rafID = null;
    this.style = this.props.style || {};
    this.currentStyle = assign({}, this.props.style);
    this.currentMoment = this.props.moment || 0;
    this.moment = this.props.moment || 0;
    this.state = {
      style: this.style,
    };
    [
      'raf',
      'handleVisibilityChange',
      'setCurrentDate',
      'start',
      'play',
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  componentDidMount() {
    const dom = ReactDom.findDOMNode(this);
    this.computedStyle = document.defaultView.getComputedStyle(dom);
    this.start(this.props);
    document.addEventListener(visibilityChange, this.handleVisibilityChange, false);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps 变化
    // style 变化;
    const styleEqual = objectEqual(this.props.style, nextProps.style);
    if (!styleEqual) {
      if (this.rafID === -1) {
        this.style = assign({}, this.style, nextProps.style);
        this.currentStyle = assign({}, this.style);
        this.setState({
          style: this.style,
        });
        this.timeLine.animData.tween = assign({}, this.timeLine.animData.tween, nextProps.style);
      } else {
        // 如果在动画时, 改变做动效的参数
        // 合并当前没有做动画的样式;
        this.currentStyle = assign({}, this.timeLine.animData.tween, nextProps.style);
        // 重置数据;
        this.timeLine.resetAnimData();
        // 合并当前在做动画的样式
        this.timeLine.setDefaultData(assign({}, this.timeLine.animData.tween, nextProps.style), dataToArray(nextProps.animation));
      }
    }
    const equal = objectEqual(this.props.animation, nextProps.animation);
    if (!equal) {
      this.currentStyle = assign({}, nextProps.style, this.timeLine.animData.tween);
      this.start(nextProps);
    }

    // 暂停倒放
    if (this.props.reverse !== nextProps.reverse || this.props.paused !== nextProps.reverse) {
      // 如果 animation 发生改变或没改变, 都重置默认数据,
      this.timeLine.setDefaultData(assign({}, this.currentStyle, this.style), dataToArray(nextProps.animation));
      this.currentMoment = this.timeLine.progressTime;
      this.setCurrentDate();
      this.play();
    }
    // moment 事件;
    if (typeof nextProps.moment === 'number') {
      this.currentMoment = nextProps.moment;
      if (!nextProps.paused) {
        // 跳帧需要把 animData 清掉;从新定位;
        this.timeLine.resetAnimData();
        this.timeLine.setDefaultData(this.currentStyle, dataToArray(nextProps.animation));
        this.setCurrentDate();
        this.play();
      } else {
        this.style = assign({}, this.style, this.timeLine.frame(nextProps.moment));
        this.setState({
          style: this.style,
        });
      }
    }
  }

  componentWillUnmount() {
    this.cancelRequestAnimationFram();
  }

  setCurrentDate() {
    this.currentNow = Date.now();
  }

  start(props) {
    this.timeLine = new TimeLine(assign({}, this.computedStyle, this.style), dataToArray(props.animation));
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
      this.currentMoment = this.timeLine.progressTime;
      this.cancelRequestAnimationFram();
      this.rafHide = true;
    } else if (this.rafID === -1 && this.rafHide) {
      this.setCurrentDate();
      this.rafID = requestAnimationFrame(this.raf);
      this.rafHide = false;
    }
  }

  raf() {
    if (this.rafID === -1 || this.props.paused) {
      return;
    }
    const now = Date.now() + this.currentMoment;
    let moment = now - this.currentNow;
    if (this.props.reverse) {
      moment = this.currentMoment - Date.now() + this.currentNow;
    }
    moment = moment > this.timeLine.totalTime ? this.timeLine.totalTime : moment;
    moment = moment <= 0 ? 0 : moment;
    this.moment = moment;
    this.timeLine.onChange = this.props.onChange.bind(this);
    this.style = assign({}, this.currentStyle, this.timeLine.frame(moment));
    this.setState({
      style: this.style,
    });
    if ((moment >= this.timeLine.totalTime && !this.props.reverse) || this.props.paused || (this.props.reverse && moment === 0)) {
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
    const style = assign({}, this.state.style);
    for (const p in style) {
      if (p.indexOf('filter') >= 0 || p.indexOf('Filter') >= 0) {
        // ['Webkit', 'Moz', 'Ms', 'ms'].forEach(prefix=> style[`${prefix}Filter`] = style[p]);
        const transformArr = ['Webkit', 'Moz', 'Ms', 'ms'];
        for (let i = 0; i < transformArr.length; i++) {
          style[`${transformArr[i]}Filter`] = style[p];
        }
      }
    }
    const props = assign({}, this.props);
    props.style = style;
    return React.createElement(this.props.component, props);
  }
}

const objectOrArray = React.PropTypes.oneOfType([PropTypes.object, PropTypes.array]);
const objectOrArrayOrString = React.PropTypes.oneOfType([PropTypes.string, objectOrArray]);

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
