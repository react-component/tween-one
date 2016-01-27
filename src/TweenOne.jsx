import React, {PropTypes, Component} from 'react';
import ReactDom from 'react-dom';
import assign from 'object-assign';
import easingTypes from 'tween-functions';
import requestAnimationFrame from 'raf';
import {dataToArray, objectEqual} from './util';
import Css from './Css';
import Bezier from './BezierPlugin';

const DEFAULT_EASING = 'easeInOutQuad';
const DEFAULT_DURATION = 450;
const DEFAULT_DELAY = 0;
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

// 设置默认数据
function defaultData(vars, now) {
  return {
    duration: vars.duration || vars.duration === 0 ? vars.duration : DEFAULT_DURATION,
    delay: vars.delay || DEFAULT_DELAY,
    ease: vars.ease || DEFAULT_EASING,
    onUpdate: vars.onUpdate || noop,
    onComplete: vars.onComplete || noop,
    onStart: vars.onStart || noop,
    onRepeat: vars.onRepeat || noop,
    repeat: vars.repeat || 1,
    repeatDelay: vars.repeatDelay || 0,
    repeatAnnal: 1,
    yoyo: vars.yoyo || false,
    type: vars.type || 'to',
    initTime: now,
  };
}

class TweenOne extends Component {
  constructor() {
    super(...arguments);
    this.rafID = null;
    this.type = this.props.type;
    this.style = this.props.style || {};
    this.setDefaultTweenData();
    // 记录播放时间
    this.progressTime = {};
    this.defaultData = [];
    this.setDefaultData(this.props.vars || {});
    this.state = {
      style: this.style,
    };
    [
      'raf',
      'handleVisibilityChange',
      'setDefaultData',
      'setDefaultTweenData',
      'setTweenData',
      'onEndComplete',
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  componentDidMount() {
    const dom = ReactDom.findDOMNode(this);
    this.computedStyle = assign({}, document.defaultView.getComputedStyle(dom));
    if (this.defaultData.length && this.props.vars && (this.type === 'play' || this.type === 'restart')) {
      // 开始动画
      this.rafID = requestAnimationFrame(this.raf);
    }
    document.addEventListener(visibilityChange, this.handleVisibilityChange, false);
  }

  componentWillReceiveProps(nextProps) {
    const styleEqual = objectEqual(this.props.style, nextProps.style);
    if (!styleEqual) {
      // 为保留动画的样式。。。
      this.style = assign({}, this.style, nextProps.style);
      if (this.rafID === -1) {
        this.setState({
          style: this.style,
        });
      } else {
        // 改变在变化的样式,重新跑一遍;
        // this.tweenData.startBool = {};
      }
    }

    const newType = nextProps.type;
    const equal = objectEqual(this.props.vars, nextProps.vars);
    if (!equal) {
      this.setDefaultTweenData();
      this.defaultData = [];
      this.progressTime = {};
    }
    const tweenKeysFunc = (style, key)=> {
      const s = this.tweenData.data['start' + 0][key].split(',').length > 1 ? key + '(' + this.tweenData.data['start' + 0][key] + ')' : Css.getParam(key, this.tweenData.data['start' + 0][key], parseFloat(this.tweenData.data['start' + 0][key]));
      style[Css.isTransform(key)] = Css.mergeStyle(style[Css.isTransform(key)], s);
    };
    if (newType === 'restart') {
      const style = {};
      if (!this.tweenData.data['start' + 0]) {
        throw new Error('Please use "play" for the first time;');
      }
      Object.keys(this.tweenData.data['start' + 0]).forEach(tweenKeysFunc.bind(this, style));
      this.style = style;
      this.setDefaultTweenData();
      this.defaultData = [];
      this.progressTime = {};
    }
    if (!equal || newType !== this.type || newType === 'restart') {
      this.type = newType;
      this.setDefaultData(nextProps.vars || {});
      this.cancelRequestAnimationFram();
      this.rafID = requestAnimationFrame(this.raf);
    }
  }

  componentWillUnmount() {
    this.cancelRequestAnimationFram();
  }

  onEndComplete(item, i) {
    this.tweenData.endBool[i] = true;
    if (!item.onComplete.only) {
      item.onComplete();
      item.onComplete.only = true;
    }
  }

  setDefaultData(_vars) {
    const vars = dataToArray(_vars);
    let now = Date.now();
    const varsForIn = (item, i)=> {
      const progressTime = this.progressTime[i] < 0 || !this.progressTime[i] ? 0 : this.progressTime[i];
      now += (!progressTime ? (item.delay || 0) : 0);// 加上延时，在没有播放过时；
      if (this.type === 'reverse') {
        // 如果反向播放时，now加上已播放了的时间；
        now += progressTime > 0 ? progressTime : 0;
      } else {
        now -= progressTime;// 如果在播放中停止重启时，加上已播放的时间；
      }
      const tweenData = defaultData(item, now);
      tweenData.tween = {};
      for (const p in item) {
        if (!(p in tweenData)) {
          tweenData.tween[p] = item[p];
        }
      }
      if (tweenData.yoyo && !tweenData.repeat) {
        console.warn('Warning: yoyo must be used together with repeat;');
      }
      if (this.type === 'reverse' && progressTime || this.type !== 'reverse') {
        if (this.type === 'reverse') {
          // 如果已播放过了停止，再倒放时减掉已播放；
          const repeatAnnalNum = this.defaultData[i] ? this.defaultData[i].repeatAnnal - 1 : 0;
          now += repeatAnnalNum * tweenData.duration + repeatAnnalNum * tweenData.repeatDelay;
        } else {
          // 加上此时用的时间，遍历下个时要用
          now += tweenData.duration * tweenData.repeat + tweenData.repeatDelay * (tweenData.repeat - 1);
        }
      }
      if (this.defaultData[i]) {
        this.defaultData[i].initTime = tweenData.initTime;
        this.tweenData.endBool[i] = !((this.type === 'reverse' && progressTime) || (this.type !== 'reverse' && progressTime !== tweenData.duration));
      } else {
        tweenData.onComplete.only = false;
        if (this.type !== 'reverse') {
          tweenData.onStart.only = false;
        }
        this.defaultData[i] = tweenData;
      }
    };
    if (this.type === 'reverse') {
      for (let ii = vars.length - 1; ii >= 0; ii--) {
        varsForIn(vars[ii], ii);
      }
    } else {
      vars.forEach(varsForIn);
    }
  }

  setTweenData(item, i) {
    const tweenData = this.tweenData || {};
    if (!tweenData.startBool[i]) {
      tweenData.data['start' + i] = {};
      tweenData.data['end' + i] = {};
      Object.keys(item.tween).forEach(_key=> {
        const key = Css.getGsapType(_key);
        const cssName = Css.isTransform(key);
        if (cssName === 'transform' || cssName === 'filter') {
          if (cssName === 'transform') {
            // 设置了style
            if (this.style && this.style[cssName]) {
              const cssStyleArr = this.style[cssName].split(' ');
              cssStyleArr.forEach(__item=> {
                const _item = __item.replace(/[(|)]/ig, '$').split('$');
                tweenData.data['start' + i][_item[0]] = _item[1];
              });
              tweenData.data['start' + i][key] = Css.mergeTransformName(cssStyleArr, key) || tweenData.data['start' + i][key] || 0;
            } else {
              // 如果没设置,直接用0,不去取距阵;
              tweenData.data['start' + i][key] = 0;
            }
          } else {
            // 是filter时
            if (this.style && this.style[cssName]) {
              const cssStyleArr = this.style[cssName].split(' ');
              tweenData.data['start' + i][key] = cssStyleArr.length ? cssStyleArr.join(' ') : 0;
            } else {
              tweenData.data['start' + i][key] = item.tween[key].replace(/\d+/ig, 0);
            }
          }
        } else {
          // 不是以上两种情况时
          tweenData.data['start' + i][key] = this.style[cssName] || this.computedStyle[key] || 0;
        }
        // set end data
        tweenData.data['end' + i] = item.tween;
      });
      tweenData.startBool[i] = true;
    }
    return tweenData;
  }

  setNewStyle(easeValue, i) {
    const end = this.tweenData.data['end' + i];
    const start = this.tweenData.data['start' + i];
    Object.keys(end).forEach(_key=> {
      const key = Css.getGsapType(_key);
      let endVars = end[_key];
      let startVars = start[key];
      let differ;
      if (key.indexOf('color') >= 0 || key.indexOf('Color') >= 0) {
        startVars = Css.parseColor(startVars);
        endVars = Css.parseColor(endVars);
        startVars[3] = typeof startVars[3] !== 'number' ? 1 : startVars[3];
        endVars[3] = typeof endVars[3] !== 'number' ? 1 : endVars[3];
        differ = endVars.map((data, ii)=> {
          return (data - startVars[ii]) * easeValue + startVars[ii];
        });
      } else if (key.indexOf('shadow') >= 0 || key.indexOf('Shadow') >= 0) {
        startVars = startVars === 'none' ? '0 0 0 transparent' : startVars;
        startVars = Css.parseShadow(startVars);
        endVars = Css.parseShadow(endVars);
        differ = endVars.map((data, ii)=> {
          return (parseFloat(data) - parseFloat(startVars[ii])) * easeValue + parseFloat(startVars[ii]);
        });
      } else {
        endVars = parseFloat(endVars.toString().replace(/[^0-9|.]/ig, ''));
        startVars = parseFloat((startVars || 0).toString().replace(/[^0-9|.]/ig, ''));
        differ = (endVars - startVars) * easeValue + startVars;
        if (typeof end[_key] === 'string' && end[_key].charAt(1) === '=') {
          differ = startVars + parseFloat(end[_key].charAt(0) + 1) * endVars * easeValue;
        }
      }
      const cssName = Css.isTransform(key);
      if (cssName === 'bezier') {
        const bezier = this.tweenData['bezier' + i] = this.tweenData['bezier' + i] || new Bezier(this.computedStyle.transform, end[_key]);
        this.style.transform = Css.mergeStyle(this.style.transform || '', bezier.set(easeValue));
      } else if (cssName === 'filter') {
        this.style[cssName] = Css.mergeStyle(this.style[cssName] || '', Css.getFilterParam(start[_key], end[_key], easeValue));
      } else if (cssName === 'transform') {
        this.style[cssName] = Css.mergeStyle(this.style[cssName] || '', Css.getParam(key, end[_key], differ));
      } else {
        this.style[cssName] = Css.getParam(key, end[_key], differ);
      }
    });
  }

  setDefaultTweenData() {
    this.tweenData = {};
    // 记录 start 和 end
    this.tweenData.data = {};
    // 记录开始
    this.tweenData.startBool = {};
    // 记录是否结束
    this.tweenData.endBool = {};
  }

  handleVisibilityChange() {
    // 不在当前窗口时
    if (document[hidden] && this.rafID !== -1) {
      this.cancelRequestAnimationFram();
      this.rafHide = true;
    } else if (this.rafID === -1 && this.rafHide) {
      this.setDefaultData(this.props.vars || {});
      this.rafID = requestAnimationFrame(this.raf);
      this.rafHide = false;
    }
  }

  raf() {
    if (this.rafID === -1 || this.type === 'pause') {
      return;
    }
    this.defaultData.forEach((item, i)=> {
      if (!item || !item.tween) {
        return;
      }
      // 当前时间;
      const now = Date.now();
      let progressTime = now - item.initTime > item.duration ? item.duration : now - item.initTime;
      if (this.type === 'reverse') {
        progressTime = item.initTime - now > 0 ? item.initTime - now : 0;
      }
      const sBool = this.type === 'reverse' ? progressTime <= item.duration : progressTime >= 0;
      if (sBool) {
        // 设置开始参数与结束参数;
        this.tweenData = this.setTweenData(item, i);
      }
      // 记录当前时间,暂停与反向用
      this.progressTime[i] = progressTime;
      if (!this.tweenData.endBool[i] && sBool) {
        // 开始事件处理
        if (!item.onStart.only) {
          item.onStart();
          item.onStart.only = true;
        }
        // 生成当前easeVars;
        let easeVars = easingTypes[item.ease](progressTime, 0, 1, item.duration);
        if (item.yoyo && !(item.repeatAnnal % 2) || item.type === 'from') {
          easeVars = easingTypes[item.ease](progressTime, 1, 0, item.duration);
        }
        // update 事件
        item.onUpdate(easeVars);
        // 生成样式;
        this.setNewStyle(easeVars, i);
      }
      // 结束状态;
      if (progressTime === item.duration && this.type !== 'reverse') {
        if (item.repeat && item.repeatAnnal !== item.repeat) {
          item.repeatAnnal++;
          item.initTime += item.duration + item.repeatDelay;
          item.onRepeat();
          this.cancelRequestAnimationFram();
        } else {
          this.onEndComplete(item, i);
        }
      } else if (this.type === 'reverse' && progressTime === 0) {
        if (item.repeat && item.repeatAnnal !== 1) {
          item.repeatAnnal--;
          item.initTime += item.duration + item.repeatDelay;
          item.onRepeat();
          this.cancelRequestAnimationFram();
        } else {
          this.onEndComplete(item, i);
        }
      }
    });
    this.setState({
      style: this.style,
    });
    if (this.defaultData.every((e, i)=>this.tweenData.endBool[i])) {
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
  vars: objectOrArray,
  type: PropTypes.string,
  children: objectOrArrayOrString,
  style: PropTypes.object,
};

TweenOne.defaultProps = {
  component: 'div',
  type: 'play',
};

export default TweenOne;
