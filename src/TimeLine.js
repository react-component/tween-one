/**
 * Created by jljsj on 16/1/27.
 */
import assign from 'object-assign';
import easingTypes from 'tween-functions';
import Css from 'style-utils';
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
    repeat: vars.repeat || 0,
    repeatDelay: vars.repeatDelay || 0,
    yoyo: vars.yoyo || false,
    type: vars.type || 'to',
    initTime: now,
  };
}
const timeLine = function(startData, toData) {
  // 记录总时间;
  this.totalTime = 0;
  // 记录当前时间;
  this.progressTime = 0;
  // 记录时间轴数据;
  this.defaultData = [];
  // 默认状态数据;
  this.startData = {};
  // 每个的开始数据；
  this.start = {};
  // 动画过程
  this.tween = {};
  // 最后样式；
  this.animStyle = {};
  // 每帧的时间;
  this.perFrame = Math.round(1000 / 60);
  // 设置默认动画数据;
  this.setDefaultData(startData, toData);
};
const p = timeLine.prototype;

p.setDefaultData = function(start, vars) {
  let now = 0;
  let repeatMax = false;
  const data = vars.map((item, i)=> {
    now += item.delay || 0;// 加上延时，在没有播放过时；
    const tweenData = defaultData(item, now);
    tweenData.data = {};
    Object.keys(item).forEach(_key => {
      if (!(_key in tweenData)) {
        // const key = Css.getGsapType(_key);
        // const cssName = Css.isTransform(key);
        // this.startData[cssName] = start[cssName];
        tweenData.data[_key] = item[_key];
      }
    });
    if (tweenData.yoyo && !tweenData.repeat) {
      console.warn('Warning: yoyo must be used together with repeat;');
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
    this.startData = { ...this.startData, ...this.getAnimStartData(start, item, i) };
    return tweenData;
  });
  this.totalTime = repeatMax ? Number.MAX_VALUE : now;
  this.defaultData = data;
};
p.splitData = function(cssName, data, item, _key, i) {
  let transform = data.split(' ');
  const startData = {};
  if (!data) {
    return startData;
  }
  if (cssName === 'bezier') {
    const bezier = this['bezier' + i];
    transform = item.type === 'from' ? bezier.set(1) : bezier.set(0);
    transform = transform.split(' ');
  }
  const transformArr = Css.splitStyle(transform);
  transformArr.forEach(style => {
    const stylaArr = style.split('(');
    const styleName = stylaArr[0];
    const styleData = stylaArr[1].replace(')', '');

    startData[styleName] = styleData;
  });
  return startData;
};
p.getAnimStartData = function(start, item, i, one) {
  let _start = one ? start : {};
  Object.keys(item).filter(key => !(key in defaultData({})))
    .forEach(_key => {
      const key = Css.getGsapType(_key);
      const cssName = Css.isConvert(key);
      let startData = start[one ? key : cssName];
      if (!startData || startData === 'none' || startData === 'auto') {
        startData = '';
      }
      if (cssName === 'transform' || cssName === 'filter' || cssName === 'bezier') {
        if (one) {
          _start[key] = startData;
        } else {
          _start = assign(_start || {}, this.splitData(cssName, startData, item, _key, i));
        }
      } else {
        _start[cssName] = startData || 0;
      }
    });
  return _start;
};
p.setAnimData = function() {
  const style = assign({}, this.startData, this.tween);
  Object.keys(style).forEach(key => {
    const cssName = Css.isConvert(key);
    if (cssName === 'transform') {
      this.animStyle[cssName] = Css.mergeStyleNew(this.animStyle[cssName] || '', Css.getParam(key, style[key]));
    } else if (cssName === 'filter') {
      const _key = key in Css.filterConvert ? Css.filterConvert[key] : key;
      this.animStyle[cssName] = Css.mergeStyleNew(this.animStyle[cssName] || '', Css.getParam(_key, style[key]));
    } else {
      this.animStyle[cssName] = style[key];
    }
  });
};
p.setRatio = function(ratio, endData, i) {
  Object.keys(endData).forEach(_key => {
    const key = Css.getGsapType(_key);
    let endVars = endData[_key];
    let startVars = (this.start[i] || this.startData)[key];
    let differ;
    if (key.indexOf('color') >= 0 || key.indexOf('Color') >= 0) {
      startVars = Css.parseColor(startVars);
      endVars = Css.parseColor(endVars);
      startVars[3] = typeof startVars[3] !== 'number' ? 1 : startVars[3];
      endVars[3] = typeof endVars[3] !== 'number' ? 1 : endVars[3];
      differ = endVars.map((data, ii)=> {
        return (data - startVars[ii]) * ratio + startVars[ii];
      });
    } else if (key.indexOf('shadow') >= 0 || key.indexOf('Shadow') >= 0) {
      startVars = startVars === 'none' || !startVars ? '0 0 0 transparent' : startVars;
      startVars = Css.parseShadow(startVars);
      endVars = Css.parseShadow(endVars);
      differ = endVars.map((data, ii)=> {
        return (parseFloat(data) - parseFloat(startVars[ii])) * ratio + parseFloat(startVars[ii]);
      });
    } else {
      endVars = parseFloat(endVars.toString().replace('=', ''));
      startVars = key === 'opacity' && startVars !== 0 ? 1 : startVars;
      startVars = key.indexOf('scale') >= 0 ? 1 : startVars;
      startVars = parseFloat(startVars || 0);
      differ = typeof endData[_key] === 'string' && endData[_key].charAt(1) === '=' ?
      startVars + endVars * ratio : (endVars - startVars) * ratio + startVars;
    }
    const unit = endData[_key].toString().replace(/[^a-z|%]/ig, '') || 0;
    const cssName = Css.isTransform(key);
    if (cssName === 'bezier') {
      const bezier = this['bezier' + i] = this['bezier' + i] || new Bezier(startVars, endData[_key]);
      this.tween = assign(this.tween || {}, this.splitData('transform', bezier.set(ratio)));
    } else if (cssName === 'filter' || cssName === 'transform') {
      this.tween[key] = differ + unit;
    } else {
      this.tween[key] = Css.getParam(key, endData[key], differ);
    }
  });
  this.setAnimData();
};
p.render = function() {
  let onChange = [];
  this.defaultData.forEach((item, i)=> {
    let initTime = item.initTime;
    // 处理 yoyo 和 repeat; yoyo 是在时间轴上的, 并不是倒放
    let repeatNum = Math.ceil((this.progressTime - initTime) / (item.duration + item.repeatDelay)) - 1;
    repeatNum = repeatNum < 0 ? 0 : repeatNum;
    repeatNum = this.progressTime === 0 ? repeatNum + 1 : repeatNum;
    if (item.repeat) {
      if (item.repeat || item.repeat <= repeatNum) {
        initTime = initTime + repeatNum * (item.duration + item.repeatDelay );
      }
    }
    let progressTime = this.progressTime - initTime;
    // onRepeat 处理
    if (item.repeat && repeatNum > 0 && progressTime < this.perFrame) {
      // 重新开始, 在第一秒触发时调用;
      item.onRepeat();
    }
    // 状态
    let mode = 'onUpdate';
    // 开始 onStart
    if (progressTime >= 0 && progressTime < this.perFrame) {
      item.onStart();
      mode = 'onStart';
    }
    const delay = item.delay >= 0 ? item.delay : -item.delay;
    const fromDelay = item.type === 'from' ? delay : 0;
    if (progressTime + fromDelay >= 0 && !this.start[i]) {
      this.start[i] = this.getAnimStartData(assign({}, this.startData, this.tween), item.data, i, true);
      const st = progressTime / (item.duration + fromDelay) > 1 ? 1 : (progressTime / (item.duration + fromDelay));
      this.setRatio(item.type === 'from' ? 1 - st : st, item.data, i);
    }
    if (progressTime >= 0 && progressTime < item.duration + this.perFrame) {
      progressTime = progressTime < 0 ? 0 : progressTime;
      progressTime = progressTime > item.duration ? item.duration : progressTime;
      let ratio = easingTypes[item.ease](progressTime, 0, 1, item.duration);
      if (item.yoyo && repeatNum % 2 || item.type === 'from') {
        ratio = easingTypes[item.ease](progressTime, 1, 0, item.duration);
      }

      // 当前点生成样式;
      this.setRatio(ratio, item.data, i);

      mode = progressTime === item.duration ? 'onComplete' : mode;

      if (mode === 'onUpdate') {
        // update 事件
        item.onUpdate(ratio);
      }
      onChange.push(this.onChange.bind(this, {
        moment: this.progressTime,
        item: item,
        tween: this.tween,
        index: i,
        mode,
      }));

      // complete 事件
      if (mode === 'onComplete') {
        // setState 后处理，扔到 onChange 里一起处理;
        // 以前去掉 onStart onUpdate onComplete;
        onChange.push(item.onComplete);
      }
    }
  });
  this.onChange = ()=> {
    onChange.forEach(func => func());
    onChange = null;
  };
};
// 播放帧
p.frame = function(moment) {
  this.progressTime = moment;
  this.render();
  return this.animStyle;
};
p.resetAnimData = function() {
  this.tween = {};
  this.start = {};
  this.animStyle = {};
};

p.onChange = noop;
export default timeLine;
