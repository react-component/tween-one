/* eslint-disable func-names */
/**
 * Created by jljsj on 16/1/27.
 */
import easingTypes from 'tween-functions';
import _plugin from './plugins';
import StylePlugin from './plugin/StylePlugin';
import {
  getColor,
  parseColor,
} from 'style-utils';
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
    ease: vars.ease || DEFAULT_EASING,
    onUpdate: vars.onUpdate || noop,
    onComplete: vars.onComplete || noop,
    onStart: vars.onStart || noop,
    onRepeat: vars.onRepeat || noop,
    repeat: vars.repeat || 0,
    repeatDelay: vars.repeatDelay || 0,
    yoyo: vars.yoyo || false,
    type: vars.type || 'to',
    initTime: now,
  };
}

const timeLine = function (target, toData, attr) {
  this.target = target;
  this.attr = attr || 'style';
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
  const data = [];
  toData.forEach((d, i) => {
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
  // 动画过程
  this.tween = {};
  // 每帧的时间;
  this.perFrame = Math.round(1000 / 60);
  // 注册，第一次进入执行注册
  this.register = false;
  // 设置默认动画数据;
  this.setDefaultData(data);
};
const p = timeLine.prototype;

p.setDefaultData = function (_vars) {
  let now = 0;
  let repeatMax = false;
  const data = _vars.map(item => {
    now += item.delay || 0;// 加上延时，在没有播放过时；
    const tweenData = defaultData(item, now);
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
    if (tweenData.delay < -tweenData.duration) {
      // 如果延时小于 负时间时,,不加,再减回延时;
      now -= tweenData.delay;
    } else {
      now += tweenData.duration * (tweenData.repeat + 1) + tweenData.repeatDelay * tweenData.repeat;
    }
    tweenData.mode = '';
    return tweenData;
  });
  this.totalTime = repeatMax ? Number.MAX_VALUE : now;
  this.defaultData = data;
};
p.getAnimStartData = function (item) {
  const start = {};
  Object.keys(item).forEach(_key => {
    if (_key in _plugin || (this.attr === 'attr' && (_key === 'd' || _key === 'points'))) {
      start[_key] = item[_key].getAnimStart();
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
      // start[_key] = data;
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
  this.defaultData.forEach((item, i) => {
    let initTime = item.initTime;
    // 处理 yoyo 和 repeat; yoyo 是在时间轴上的, 并不是倒放
    let repeatNum = Math.ceil((this.progressTime - initTime) /
        (item.duration + item.repeatDelay)) - 1;
    repeatNum = repeatNum < 0 ? 0 : repeatNum;
    // repeatNum = this.progressTime === 0 ? repeatNum + 1 : repeatNum;
    if (item.repeat) {
      if (item.repeat || item.repeat <= repeatNum) {
        initTime = initTime + repeatNum * (item.duration + item.repeatDelay);
      }
    }
    let progressTime = this.progressTime - initTime;
    // 设置 start
    const delay = item.delay >= 0 ? item.delay : -item.delay;
    const fromDelay = item.type === 'from' ? delay : 0;
    if (progressTime + fromDelay > -this.perFrame && !this.start[i]) {
      this.start[i] = this.getAnimStartData(item.vars);
      if (!this.register) {
        this.register = true;
        // 在开始跳帧时。。[{x:100,type:'from'},{y:300}]，跳过了from时, moment = 600 => 需要把from合回来
        const st = progressTime / (item.duration + fromDelay) > 1 ? 1 :
          easingTypes[item.ease](progressTime < 0 ? 0 : progressTime, 0, 1, item.duration);
        this.setRatio(item.type === 'from' ? 1 - st : st, item, i);
        return;
      }
    }
    // onRepeat 处理
    if (item.repeat && repeatNum > 0
      && progressTime + fromDelay >= 0 && progressTime < this.perFrame) {
      // 重新开始, 在第一秒触发时调用;
      item.onRepeat();
    }
    if (progressTime < 0 && progressTime + fromDelay > -this.perFrame) {
      this.setRatio(item.type === 'from' ? 1 : 0, item, i);
    } else if (progressTime >= item.duration && item.mode !== 'onComplete') {
      this.setRatio(item.type === 'from' || (repeatNum % 2 && item.yoyo) ? 0 : 1, item, i);
      if (item.mode !== 'reset') {
        item.onComplete();
      }
      item.mode = 'onComplete';
    } else if (progressTime >= 0 && progressTime < item.duration) {
      item.mode = progressTime < this.perFrame ? 'onStart' : 'onUpdate';
      progressTime = progressTime < 0 ? 0 : progressTime;
      progressTime = progressTime > item.duration ? item.duration : progressTime;
      let ratio = easingTypes[item.ease](progressTime, 0, 1, item.duration);
      if (item.yoyo && repeatNum % 2 || item.type === 'from') {
        ratio = easingTypes[item.ease](progressTime, 1, 0, item.duration);
      }
      this.setRatio(ratio, item, i);
      if (progressTime <= this.perFrame) {
        item.onStart();
      } else {
        item.onUpdate(ratio);
      }
    }
    if (progressTime >= 0 && progressTime < item.duration + this.perFrame) {
      this.onChange({
        moment: this.progressTime,
        item,
        tween: this.tween,
        index: i,
        mode: item.mode,
        target: this.target,
      });
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

p.onChange = noop;
export default timeLine;
