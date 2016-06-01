import React, {PropTypes, Component} from 'react';
import ReactDom from 'react-dom';
import assign from 'object-assign';
import { dataToArray, objectEqual } from './util';
import { stylesToCss } from 'style-utils';
import TimeLine from './TimeLine';
import plugins from './plugins';
import ticker from './ticker';

function noop() {
}

const perFrame = Math.round(1000 / 60);

let tickerIdNum = 0;
class TweenOne extends Component {
  constructor() {
    super(...arguments);
    this.rafID = -1;
    this.moment = this.props.moment || 0;
    this.state = {
      startMoment: this.props.moment,
      startFrame: ticker.frame,
      paused: this.props.paused,
    };
    [
      'raf',
      'frame',
      'start',
      'play',
      'restart',
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  componentDidMount() {
    this.dom = ReactDom.findDOMNode(this);
    this.start(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const newStyle = nextProps.style;
    const styleEqual = objectEqual(this.props.style, newStyle);
    // 如果在动画时,改变了 style 将改变 timeLine 的初始值;
    if (!styleEqual) {
      if (this.rafID !== -1) {
        this.start(nextProps);
      }
    }

    // 跳帧事件 moment;
    const newMoment = nextProps.moment;
    if (typeof newMoment === 'number' && newMoment !== this.moment) {
      this.setState({
        startMoment: newMoment,
        startFrame: ticker.frame,
      }, ()=> {
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
      });
    }
    // 动画处理
    const newAnimation = nextProps.animation;
    const currentAnimation = this.props.animation;
    const equal = objectEqual(currentAnimation, newAnimation);
    if (!equal) {
      this.setState({
        startFrame: ticker.frame,
      }, () => {
        this.start(nextProps);
      });
    }
    // 暂停倒放
    if (this.props.paused !== nextProps.paused || this.props.reverse !== nextProps.reverse) {
      if (nextProps.paused) {
        this.cancelRequestAnimationFrame();
      } else {
        if (nextProps.reverse && nextProps.reverseDelay) {
          ticker.timeout(this.restart, nextProps.reverseDelay);
        } else {
          this.restart();
        }
      }
    }
  }

  componentWillUnmount() {
    this.cancelRequestAnimationFrame();
  }

  restart() {
    this.setState({
      startMoment: this.timeLine.progressTime,
      startFrame: ticker.frame,
    }, () => {
      this.play();
    });
  }

  start(props) {
    if (props.animation && Object.keys(props.animation).length) {
      this.timeLine = new TimeLine(this.dom, dataToArray(props.animation), this.props.attr);
      // 开始动画
      this.play();
    }
  }

  play() {
    this.cancelRequestAnimationFrame();
    this.rafID = `tween${Date.now()}-${tickerIdNum}`;
    this.raf();
    ticker.wake(this.rafID, this.raf);
    tickerIdNum++;
  }

  frame() {
    let moment = (ticker.frame - this.state.startFrame) * perFrame + (this.state.startMoment || 0);
    if (this.props.reverse) {
      moment = (this.state.startMoment || 0) - (ticker.frame - this.state.startFrame) * perFrame;
    }
    moment = moment > this.timeLine.totalTime ? this.timeLine.totalTime : moment;
    moment = moment <= 0 ? 0 : moment;
    if (moment < this.moment) {
      this.timeLine.resetDefaultStyle();
    }
    this.moment = moment;
    this.timeLine.onChange = this.props.onChange;
    this.timeLine.frame(moment);
  }

  raf() {
    this.frame();
    if ((this.moment >= this.timeLine.totalTime && !this.props.reverse)
      || this.props.paused || (this.props.reverse && this.moment === 0)) {
      return this.cancelRequestAnimationFrame();
    }
  }

  cancelRequestAnimationFrame() {
    ticker.clear(this.rafID);
    this.rafID = -1;
  }

  render() {
    const props = assign({}, this.props);
    props.style = assign({}, this.props.style);
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

TweenOne.propTypes = {
  component: PropTypes.any,
  animation: objectOrArray,
  children: PropTypes.any,
  style: PropTypes.object,
  paused: PropTypes.bool,
  reverse: PropTypes.bool,
  reverseDelay: PropTypes.number,
  moment: PropTypes.number,
  attr: PropTypes.string,
  onChange: PropTypes.func,
};

TweenOne.defaultProps = {
  component: 'div',
  reverseDelay: 0,
  attr: 'style',
  onChange: noop,
};
TweenOne.plugins = plugins;
export default TweenOne;
