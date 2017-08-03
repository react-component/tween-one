/* eslint-disable func-names */
/**
 * Created by jljsj on 16/1/27.
 */
import easingTypes from './easing';
import _plugin from './plugins';
import StylePlugin from './plugin/StylePlugin';
import { getColor, parseColor, toFixed, stylesToCss } from 'style-utils';
import { startConvertToEndUnit } from './util.js';
const DEFAULT_EASING = 'easeInOutQuad';
const DEFAULT_DURATION = 450;
const DEFAULT_DELAY = 0;
function noop() {
}
_plugin.push(StylePlugin);
// 设置默认数据
function defaultData(vars, now) {
  return {
    duration: vars.duration || vars.duration === 0 ? vars.duration : DEFAULT_DURATION,
    delay: vars.delay || DEFAULT_DELAY,
    ease: typeof vars.ease === 'function' ? vars.ease : easingTypes[vars.ease || DEFAULT_EASING],
    onUpdate: vars.onUpdate || noop,
    onComplete: vars.onComplete || noop,
    onStart: vars.onStart || noop,
    onRepeat: vars.onRepeat || noop,
    repeat: vars.repeat || 0,
    repeatDelay: vars.repeatDelay || 0,
    yoyo: vars.yoyo || false,
    type: vars.type || 'to',
    initTime: now,
    appearTo: typeof vars.appearTo === 'number' ? vars.appearTo : null,
    perTime: 0,
    currentRepeat: 0,
  };
}

const Tween = function (target, toData, props) {
  this.target = target;
  this.attr = props.attr || 'style';
  // 记录总时间;
  this.totalTime = 0;
  // 记录当前时间;
  this.progressTime = 0;
  // 记录时间轴数据;
  this.defaultData = [];
  // 每个的开始数据；
  this.start = {};
  // 开始默认的数据；
  this.startDefaultData = {};
  // 动画过程
  this.tween = {};
  // toData;
  this.data = toData;
  // 每帧的时间;
  this.perFrame = Math.round(1000 / 60);
  // 注册，第一次进入执行注册
  this.register = false;
  // 设置 style
  const data = this.setAttrIsStyle();
  // 设置默认动画数据;
  this.setDefaultData(data);
};
const p = Tween.prototype;
p.setAttrIsStyle = function () {
  const data = [];
  this.data.forEach((d, i) => {
    const _d = { ...d };
    if (this.attr === 'style') {
      data[i] = {};
      Object.keys(_d).forEach(key => {
        if (key in defaultData({}, 0)) {
          data[i][key] = _d[key];
          delete _d[key];
        }
      });
      data[i].style = _d;
      this.startDefaultData.style = this.target.getAttribute('style');
    } else if (this.attr === 'attr') {
      Object.keys(_d).forEach(key => {
        if (key === 'style' && Array.isArray(d[key])) {
          throw new Error('Style should be the object.');
        }
        if (key === 'bezier') {
          _d.style = { ..._d.style, bezier: _d[key] };
          delete _d[key];
          this.startDefaultData.style = this.target.getAttribute('style');
        } else {
          this.startDefaultData[key] = this.target.getAttribute(key);
        }
      });
      data[i] = _d;
    }
  });
  return data;
};
p.setDefaultData = function (_vars) {
  let now = 0;
  let repeatMax = false;
  const data = _vars.map(item => {
    const appearToBool = typeof item.appearTo === 'number';
    // 加上延时，在没有播放过时；
    if (!appearToBool) {
      now += item.delay || 0;
    }
    const appearToTime = (item.appearTo || 0) + (item.delay || 0);
    // 获取默认数据
    const tweenData = defaultData(item, appearToBool ? appearToTime : now);
    tweenData.vars = {};
    Object.keys(item).forEach(_key => {
      if (!(_key in tweenData)) {
        const _data = item[_key];
        if (_key in _plugin) {
          tweenData.vars[_key] = new _plugin[_key](this.target, _data, tweenData.type);
        } else if (_key.match(/color/i) || _key === 'stroke' || _key === 'fill') {
          tweenData.vars[_key] = { type: 'color', vars: parseColor(_data) };
        } else if (typeof _data === 'number' || _data.split(/[,|\s]/g).length <= 1) {
          const vars = parseFloat(_data);
          const unit = _data.toString().replace(/[^a-z|%]/g, '');
          const count = _data.toString().replace(/[^+|=|-]/g, '');
          tweenData.vars[_key] = { unit, vars, count };
        } else if ((_key === 'd' || _key === 'points') && 'SVGMorph' in _plugin) {
          tweenData.vars[_key] = new _plugin.SVGMorph(this.target, _data, _key);
        }
      }
    });
    if (tweenData.yoyo && !tweenData.repeat) {
      console.warn('Warning: yoyo must be used together with repeat;');// eslint-disable-line
    }
    if (tweenData.repeat === -1) {
      repeatMax = true;
    }
    const repeat = tweenData.repeat === -1 ? 0 : tweenData.repeat;
    if (appearToBool) {
      // 如果有 appearTo 且这条时间比 now 大时，，总时间用这条；
      const appearNow = item.appearTo + (item.delay || 0) +
        tweenData.duration * (repeat + 1) + tweenData.repeatDelay * repeat;
      now = appearNow >= now ? appearNow : now;
    } else {
      if (tweenData.delay < -tweenData.duration) {
        // 如果延时小于 负时间时,,不加,再减回延时;
        now -= tweenData.delay;
      } else {
        // repeat 为 -1 只记录一次。不能跟 reverse 同时使用;
        now += tweenData.duration * (repeat + 1) + tweenData.repeatDelay * repeat;
      }
    }
    tweenData.mode = '';
    return tweenData;
  });
  this.totalTime = repeatMax ? Number.MAX_VALUE : now;
  this.defaultData = data;
};
p.getComputedStyle = function () {
  return document.defaultView ? document.defaultView.getComputedStyle(this.target) : {};
};
p.getAnimStartData = function (item) {
  const start = {};
  this.computedStyle = this.computedStyle || this.getComputedStyle();
  Object.keys(item).forEach(_key => {
    if (_key in _plugin || (this.attr === 'attr' && (_key === 'd' || _key === 'points'))) {
      start[_key] = item[_key].getAnimStart(this.computedStyle);
      return;
    }
    if (this.attr === 'attr') {
      // 除了d和这points外的标签动画；
      const attribute = this.target.getAttribute(_key);
      let data = attribute === 'null' || !attribute ? 0 : attribute;
      if (_key.match(/color/i) || _key === 'stroke' || _key === 'fill') {
        data = !data && _key === 'stroke' ? 'rgba(255, 255, 255, 0)' : data;
        data = parseColor(data);
        start[_key] = data;
      } else if (parseFloat(data) || parseFloat(data) === 0 || data === 0) {
        const unit = data.toString().replace(/[^a-z|%]/g, '');
        start[_key] = unit !== item[_key].unit ?
          startConvertToEndUnit(this.target, _key, parseFloat(data), unit, item[_key].unit)
          : parseFloat(data);
      }
      return;
    }
    start[_key] = this.target[_key] || 0;
  });
  return start;
};
p.setAnimData = function (data) {
  Object.keys(data).forEach(key => {
    if (key in _plugin || (this.attr === 'attr' && (key === 'd' || key === 'points'))) {
      return;
    }
    this.target[key] = data[key];
  });
};
p.setRatio = function (ratio, endData, i) {
  Object.keys(endData.vars).forEach(_key => {
    if (_key in _plugin || (this.attr === 'attr' && (_key === 'd' || _key === 'points'))) {
      endData.vars[_key].setRatio(ratio, this.tween);
      return;
    }
    const endVars = endData.vars[_key];
    const startVars = this.start[i][_key];
    let data;
    if (this.attr === 'attr') {
      // 除了d和这points外的标签动画；
      if (!endVars.type) {
        data = endVars.unit.charAt(1) === '=' ? startVars + endVars.vars * ratio + endVars.unit :
          (endVars.vars - startVars) * ratio + startVars + endVars.unit;
        this.target.setAttribute(_key, data);
      } else if (endVars.type === 'color') {
        if (endVars.vars.length === 3 && startVars.length === 4) {
          endVars.vars[3] = 1;
        }
        data = endVars.vars.map((_endData, _i) => {
          const startData = startVars[_i] || 0;
          return (_endData - startData) * ratio + startData;
        });
        this.target.setAttribute(_key, getColor(data));
      }
    }
  });
  this.setAnimData(this.tween);
};
p.render = function () {
  const reverse = this.reverse;
  this.defaultData.forEach((item, i) => {
    let initTime = item.initTime;
    const duration = toFixed(item.duration);
    // 处理 yoyo 和 repeat; yoyo 是在时间轴上的, 并不是倒放
    let repeatNum = Math.ceil((this.progressTime - initTime) /
        (duration + item.repeatDelay)) - 1;
    repeatNum = repeatNum < 0 ? 0 : repeatNum;
    if (item.repeat) {
      if (item.repeat < repeatNum && item.repeat !== -1) {
        return;
      }
      if (item.repeat || item.repeat <= repeatNum) {
        initTime = initTime + repeatNum * (duration + item.repeatDelay);
      }
    }
    let startData = item.yoyo && repeatNum % 2 ? 1 : 0;
    let endData = item.yoyo && repeatNum % 2 ? 0 : 1;
    startData = item.type === 'from' ? 1 - startData : startData;
    endData = item.type === 'from' ? 1 - endData : endData;
    //  精度损失，只取小数点后10位。
    const progressTime = toFixed(this.progressTime - initTime);

    let ratio;

    // 开始注册;
    // from 时需先执行参数位置;
    const fromDelay = item.type === 'from' ? item.delay : 0;
    if (progressTime + fromDelay > -this.perFrame) {
      if (!this.start[i]) {
        // 设置 start
        this.start[i] = this.getAnimStartData(item.vars);
        if (progressTime < this.perFrame) {
          ratio = !item.duration && !item.delay ? item.ease(1, startData, endData, 1)
            : item.ease(0, startData, endData, 1);
          this.setRatio(toFixed(ratio), item, i);
        } else if (progressTime > duration) {
          ratio = item.ease(1, startData, endData, 1);
          this.setRatio(ratio, item, i);
        }
        if (!this.register) {
          this.register = true;
          if (progressTime === 0) {
            return;
          }
        }
      }
    }

    const e = {
      index: i,
      target: this.target,
    };

    if (progressTime > -this.perFrame && !(progressTime > duration && item.mode === 'onComplete')) {
      const updateAnim = this.updateAnim === 'update';
      if ((progressTime >= duration && !reverse) || (reverse && progressTime <= 0)) {
        // onReveresComplete 和 onComplete 统一用 onComplete;
        ratio = item.ease(reverse ? 0 : 1, startData, endData, 1);
        this.setRatio(toFixed(ratio), item, i);
        if (item.mode !== 'reset' && !updateAnim) {
          item.onComplete(e);
        }
        item.mode = 'onComplete';
      } else if (duration) {
        ratio = item.ease(progressTime < 0 ? 0 : progressTime, startData, endData, duration);
        this.setRatio(ratio, item, i);
        if (!updateAnim) {
          if (item.repeat && repeatNum > 0 && item.currentRepeat !== repeatNum) {
            item.mode = 'onRepeat';
            item.currentRepeat = repeatNum;
            item.onRepeat({ ...e, repeatNum });
          } else if (!item.perTime ||
            (reverse && (item.perTime >= this.reverseStartTime - initTime))) {
            // onReveresStart 和 onStart 统一用 onStart;
            item.mode = 'onStart';
            item.onStart(e);
          } else {
            item.mode = 'onUpdate';
            item.onUpdate({ ratio, ...e });
          }
        }
      }

      if (!updateAnim) {
        this.onChange({
          moment: this.progressTime,
          mode: item.mode,
          ...e,
        });
      }
      item.perTime = progressTime;
    }
  });
};
// 播放帧
p.frame = function (moment) {
  this.progressTime = moment;
  this.render();
};
p.resetAnimData = function () {
  this.tween = {};
  this.start = {};
};

p.resetDefaultStyle = function () {
  this.tween = {};
  this.defaultData = this.defaultData.map(item => {
    item.mode = 'reset';
    return item;
  });
  Object.keys(this.startDefaultData).forEach(key => {
    if (!(key in defaultData({}, 0))) {
      this.target.setAttribute(key, this.startDefaultData[key]);
    }
  });
};

p.reStart = function (style) {
  this.start = {};
  Object.keys(style).forEach(key => {
    this.target.style[key] = stylesToCss(key, style[key]);
  });
  this.setAttrIsStyle();
  this.resetDefaultStyle();
};

p.onChange = noop;
export default Tween;
