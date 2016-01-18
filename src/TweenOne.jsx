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
    this.timeLineProgressData = {};
    this.style = this.props.style || {};
    this.tweenStart = {};
    this.defaultData = [];
    this.setDefaultData(this.props.vars || {});
    this.state = {
      style: this.style,
    };
    this.a = 0;
    [
      'raf',
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  componentDidMount() {
    const dom = ReactDom.findDOMNode(this);
    this.computedStyle = assign({}, document.defaultView.getComputedStyle(dom));
    if (this.defaultData.length && this.props.vars && (this.type === 'play' || this.type === 'restart')) {
      this.rafID = requestAnimationFrame(this.raf);
    }
  }

  componentWillReceiveProps(nextProps) {
    const styleEqual = objectEqual(this.props.style, nextProps.style);
    if (!styleEqual) {
      // 为保留动画的样式。。。
      this.style = assign({}, this.style, nextProps.style);
      if (this.rafID !== -1) {
        if (this.tweenStart.end) {
          Object.keys(this.tweenStart.end).forEach(key=> {
            if (key.indexOf('Bool') >= 0) {
              this.tweenStart.end[key] = false;
            }
          });
        }
      } else {
        this.setState({
          style: this.style,
        });
      }
    }

    const newType = nextProps.type;
    const equal = objectEqual(this.props.vars, nextProps.vars);
    if (!equal) {
      this.tweenStart = {};
      this.defaultData = [];
      this.timeLineProgressData = {};
    }
    const tweenKeysFunc = (style, key)=> {
      const s = this.tweenStart[0][key].split(',').length > 1 ? key + '(' + this.tweenStart[0][key] + ')' : Css.getParam(key, this.tweenStart[0][key], parseFloat(this.tweenStart[0][key]));
      style[Css.isTransform(key)] = Css.mergeStyle(style[Css.isTransform(key)], s);
    };
    if (newType === 'restart') {
      const style = {};
      Object.keys(this.tweenStart[0]).forEach(tweenKeysFunc.bind(this, style));
      this.style = style;
      this.tweenStart = {};
      this.timeLineProgressData = {};
      this.defaultData = [];
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
    this.defaultData[i].end = true;
    if (!item.onComplete.only) {
      item.onComplete();
      item.onComplete.only = true;
    }
  }

  setDefaultData(_vars) {
    const vars = dataToArray(_vars);
    let now = Date.now();
    const varsForIn = (item, i)=> {
      const progressTime = this.timeLineProgressData['progressTime' + i] < 0 || !this.timeLineProgressData['progressTime' + i] ? 0 : this.timeLineProgressData['progressTime' + i];
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
        this.defaultData[i].end = !((this.type === 'reverse' && progressTime) || (this.type !== 'reverse' && progressTime !== tweenData.duration));
      } else {
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

  getTweenStart(item, i) {
    const start = this.tweenStart || {};
    const newStyle = this.style;
    start[i] = start[i] || {};
    start.end = start.end || {};
    if (!start.end['Bool' + i]) {
      Object.keys(item.tween).forEach((_key)=> {
        const key = Css.getGsapType(_key);
        const cssName = Css.isTransform(key);
        if (cssName === 'transform' || cssName === 'filter') {
          if (newStyle && newStyle[cssName]) {
            const cssStyleArr = newStyle[cssName].split(' ');
            if (cssName === 'transform') {
              for (let ii = 0; ii < cssStyleArr.length; ii++) {
                const _item = cssStyleArr[ii].replace(/[(|)]/ig, '$').split('$');
                start[i][_item[0]] = _item[1];
              }
              start[i][key] = Css.mergeTransformName(cssStyleArr, key) || start[i][key] || 0;
            } else {
              start[i][key] = cssStyleArr.length ? cssStyleArr.join(' ') : 0;
            }
          } else {
            if (cssName === 'transform') {
              start[i][key] = 0;
            } else {
              start[i][key] = Css.getFilterParam('', item.tween[key], 0);
            }
          }
        } else {
          start[i][key] = newStyle[cssName] || this.computedStyle[key] || 0;
        }
      });
      start.end['Bool' + i] = true;
    }
    return start;
  }

  getStartAndEnd(_value, i, p) {
    let end;
    let start;
    const cssName = Css.isTransform(p);
    let startData = this.tweenStart[i][p];
    end = dataToArray(parseFloat(_value));
    if (typeof _value === 'string' && _value.charAt(1) === '=') {
      end = dataToArray(parseFloat(this.tweenStart[i][p]) + parseFloat(_value.charAt(0) + 1) * parseFloat(_value.substr(2)));
    }
    if (cssName.indexOf('color') >= 0 || cssName.indexOf('Color') >= 0) {
      start = Css.parseColor(startData);
      end = Css.parseColor(_value);
      start[3] = start[3] || 1;
      end[3] = end[3] || 1;
    } else if (cssName.indexOf('shadow') >= 0 || cssName.indexOf('Shadow') >= 0) {
      startData = startData === 'none' ? '0 0 0 transparent' : startData;
      start = Css.parseShadow(startData);
      end = Css.parseShadow(_value);
    } else if (cssName === 'bezier' || cssName === 'filter') {
      start = [0];
      end = [1];
    } else {
      start = dataToArray(parseFloat(this.tweenStart[i][p] === 'auto' || this.tweenStart[i][p] === 'none' ? 0 : this.tweenStart[i][p]));
    }
    return {start, end};
  }

  setNewStyle(newStyle, easeValue, i, p, _value) {
    const cssName = Css.isTransform(p);
    if (cssName === 'transform') {
      this.tweenStart.end[p] = Css.getParam(p, _value, easeValue);
      const cTransform = newStyle.transform;
      let str = '';
      if (cTransform) {
        cTransform.split(' ').forEach((_str)=> {
          if (_str.indexOf('perspective') >= 0) {
            str = _str;
          }
        });
      }
      for (const _p in newStyle) {
        if (Css.isTransform(_p) === 'transform') {
          str = Css.mergeStyle(newStyle.transform, str);
        }
      }
      for (const _p in this.tweenStart.end) {
        if (Css.isTransform(_p) === 'transform') {
          str = Css.mergeStyle(str, this.tweenStart.end[_p]);
        }
      }
      newStyle[cssName] = str;
    } else if (cssName === 'bezier') {
      const bezier = this.tweenStart['bezier' + i] = this.tweenStart['bezier' + i] || new Bezier(this.computedStyle.transform, _value);
      newStyle.transform = Css.mergeStyle(newStyle.transform || '', bezier.set(easeValue[0]));
    } else if (cssName === 'filter') {
      newStyle[cssName] = Css.mergeStyle(newStyle[cssName] || '', Css.getFilterParam(this.tweenStart[i][p], _value, easeValue[0]));
    } else {
      newStyle[cssName] = Css.getParam(p, _value, easeValue);
    }
  }

  raf() {
    if (this.rafID === -1 || this.type === 'pause') {
      return;
    }

    this.defaultData.forEach((item, i)=> {
      if (!item) {
        return;
      }
      const now = Date.now();
      let progressTime = now - item.initTime > item.duration ? item.duration : now - item.initTime;
      if (this.type === 'reverse') {
        progressTime = item.initTime - now > 0 ? item.initTime - now : 0;
      }
      this.timeLineProgressData['progressTime' + i] = progressTime;
      const sBool = this.type === 'reverse' ? progressTime <= item.duration : progressTime >= 0;

      if (item.tween && sBool && !item.end) {
        if (!item.onStart.only) {
          item.onStart();
          item.onStart.only = true;
        }
        item.onUpdate(easingTypes[item.ease](progressTime, 0, 1, item.duration));
        // 开始设置；与下面分开；
        this.tweenStart = this.getTweenStart(item, i);
        // 生成start
        Object.keys(item.tween).forEach(_p=> {
          if (_p !== 'start') {
            const _value = item.tween[_p];
            const p = Css.getGsapType(_p);

            // 设置start与end的值
            const setStartEnd = this.getStartAndEnd(_value, i, p);
            const start = setStartEnd.start;
            const end = setStartEnd.end;

            // 转成Array可对多个操作；
            let easeValue = [];
            const reverse = item.type === 'from';// 倒放
            for (let ii = 0; ii < start.length; ii++) {
              let startItem = parseFloat(start[ii]);
              let endItem = parseFloat(end[ii]);
              if (reverse) {
                startItem = parseFloat(end[ii]);
                endItem = parseFloat(start[ii]);
              }
              easeValue[ii] = easingTypes[item.ease](progressTime, startItem, endItem, item.duration);
              if (item.yoyo && !(item.repeatAnnal % 2)) {
                easeValue[ii] = easingTypes[item.ease](progressTime, endItem, startItem, item.duration);
              }
            }
            easeValue = item.duration === 0 ? end : easeValue;
            this.tweenStart.end[p] = easeValue;

            // 生成样式
            this.setNewStyle(this.style, easeValue, i, p, _value);
          }
        });
      }

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
    if (this.rafID !== -1) {
      this.setState({
        style: this.style,
      });
    }
    if (this.defaultData.every(c=>c.end)) {
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
  vars: null,
  type: 'play',
  children: [],
};

export default TweenOne;
