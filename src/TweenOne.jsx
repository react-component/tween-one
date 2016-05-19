import React, {PropTypes, Component} from 'react';
import ReactDom from 'react-dom';
import assign from 'object-assign';
import {dataToArray, objectEqual} from './util';
import TimeLine from './TimeLine';
import ticker from './ticker';


function noop() {
}

const perFrame = Math.round(1000 / 60);

class TweenOne extends Component {
  constructor() {
    super(...arguments);
    this.rafID = -1;
    // 加这个是防 setState 后 this.props.style 和 nextProps.style 是全等的情况, 走马灯里或滚动组件 React.cloneElement(item, showProps) 情况;
    this.propsStyle = this.props.style ? assign({}, this.props.style) : this.props.style;
    this.startStyle = this.props.style || {};
    this.startAnimation = this.props.animation ? assign({}, this.props.animation) : this.props.animation;
    this.moment = this.props.moment || 0;
    this.state = {
      style: this.props.style || {},
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
    // this.computedStyle = document.defaultView.getComputedStyle(this.dom);
    this.start(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const newStyle = nextProps.style;
    const styleEqual = objectEqual(this.propsStyle, newStyle);
    // 如果在动画时,改变了 style 将改变 timeLine 的初始值;
    if (!styleEqual) {
      // 重置开始的样式;
      this.startStyle = assign({}, this.startStyle, this.timeLine.animStyle, newStyle);
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
      if (nextProps.paused) {
        this.oneMoment = true;
        this.timeLine = new TimeLine(this.dom, assign({}, this.computedStyle, this.startStyle), dataToArray(nextProps.animation));
        const style = assign({}, this.startStyle, this.timeLine.frame(nextProps.moment));
        this.setState({ style });
      } else {
        this.state.style = {};
        this.start(nextProps);
      }
      this.setState({
        startMoment: newMoment,
        startFrame: ticker.frame,
      });
    }
    // 动画处理
    const newAnimation = nextProps.animation;
    const equal = objectEqual(this.startAnimation, newAnimation);
    if (!equal) {
      // 如果样式不相等, 那么用新样式做为开始样式;
      if (!styleEqual) {
        this.startStyle = assign({}, this.startStyle, this.timeLine.animStyle, newStyle);
      } else {
        this.startStyle = assign({}, this.startStyle, this.timeLine.animStyle);
      }
      this.startAnimation = newAnimation;
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
          this.cancelRequestAnimationFrame();
          const startFrame = ticker.frame;
          const timeoutKey = `delay${Date.now() + Math.random()}`;
          ticker.wake(timeoutKey, ()=> {
            const _frame = ticker.frame - startFrame;
            const time = _frame * perFrame;
            if (time >= nextProps.reverseDelay) {
              ticker.clear(timeoutKey);
              this.restart();
            }
          });
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
    this.timeLine = new TimeLine(this.dom, dataToArray(props.animation));
    /*    setTimeout(()=> {
     if (this.timeLine.defaultData.length && props.animation) {
     // 开始动画
     this.play();
     }
     })*/
    this.play();
  }

  play() {
    this.cancelRequestAnimationFrame();
    this.rafID = `tween${Date.now() + Math.random()}`;
    ticker.wake(this.rafID, this.raf);
  }

  frame() {
    let moment = (ticker.frame - this.state.startFrame) * perFrame + (this.state.startMoment || 0);
    if (this.props.reverse) {
      moment = (this.state.startMoment || 0) - (ticker.frame - this.state.startFrame) * perFrame;
    }
    moment = moment > this.timeLine.totalTime ? this.timeLine.totalTime : moment;
    moment = moment <= 0 ? 0 : moment;
    this.moment = moment;
    this.timeLine.onChange = this.props.onChange;
    // this.timeLine.frame(moment);
    this.dom.style.marginLeft = `${moment / 3}px`;
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
    let props = assign({}, this.props);
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
    // 进入时闪屏，清除子级；
    // props.children = !this.dom ? null : props.children;
    props.children = this.props.animation ? props.children : this.props.children;
    if (!Object.keys(this.props.animation || {}).length) {
      props = this.props;
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
export default TweenOne;
