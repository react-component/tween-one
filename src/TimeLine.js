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
  // 动画样式;
  this.animData = {
    start: {},
    tween: {},
  };
  // 每帧的时间;
  this.perFrame = Math.round(1000 / 60);
  // 设置默认动画数据;
  this.setDefaultData(startData, toData);
};
const p = timeLine.prototype;

p.setDefaultData = function(start, vars) {
  let now = 0;
  let repeatMax = false;
  const data = vars.map(item=> {
    now += item.delay || 0;// 加上延时，在没有播放过时；
    const tweenData = defaultData(item, now);
    tweenData.data = {};
    for (const _key in item) {
      if (!(_key in tweenData)) {
        const key = Css.getGsapType(_key);
        const cssName = Css.isTransform(key);
        this.startData[cssName] = start[cssName];
        tweenData.data[_key] = item[_key];
      }
    }
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
    return tweenData;
  });
  this.totalTime = repeatMax ? Number.MAX_VALUE : now;
  this.defaultData = data;
  // 初始 animData.tween, 功能: 解决当 type: 'from' 时出场延时会不归位;
  this.setAnimDataTween();
};
p.setAnimDataTween = function() {
  this.defaultData.forEach((item, i)=> {
    const _item = this.setAnimStartData(item, i);
    if (i === 0) {
      // 第一个先设置, 延时时归位...
      this.animData.start[0] = _item;
    }
    const easeVars = item.type === 'from' ? 1 : 0;
    this.setNewStyle(easeVars, _item, item.data, i);
  });
};
p.setAnimStartData = function(endData, i) {
  const _endData = endData.data;
  const obj = {};

  function setStyle(_obj, data, key) {
    const cssStyleArr = data.toString().split(' ');
    if (data) {
      cssStyleArr.forEach(__item=> {
        const _item = __item.replace(/[(|)]/ig, '$').split('$');
        _obj[_item[0]] = _item[1];
      });
    }
    const num = key.indexOf('scale') >= 0 ? 1 : 0;
    _obj[key] = Css.mergeTransformName(cssStyleArr, key) || _obj[key] || num;
  }

  Object.keys(_endData).forEach(_key=> {
    const key = Css.getGsapType(_key);
    const cssName = Css.isTransform(key);
    const startData = this.animData.tween && this.animData.tween[cssName] ? this.animData.tween : this.startData;
    if (!startData[cssName] || startData[cssName] === 'none' || startData[cssName] === 'auto') {
      startData[cssName] = '';
    }
    if (cssName === 'transform' || cssName === 'filter') {
      if (cssName === 'transform') {
        // 设置了style
        setStyle(obj, startData[cssName], key);
      } else {
        // 是filter时
        const cssStyleArr = (startData[cssName] || '').split(' ');
        obj[key] = cssStyleArr.length ? cssStyleArr.join(' ') : 0;
      }
    } else if (cssName === 'bezier') {
      const bezier = this.animData['bezier' + i] = new Bezier(startData.transform, _endData[_key]);
      obj.transform = bezier.set(0);
      if (endData.type === 'from') {
        obj.transform = bezier.set(1);
      }
    } else {
      // 不是以上两种情况时
      obj[key] = startData[cssName] || 0;
    }
  });
  return obj;
};
p.setNewStyle = function(easeValue, startData, endData, i) {
  const start = startData;
  Object.keys(endData).forEach(_key=> {
    const key = Css.getGsapType(_key);
    let endVars = endData[_key];
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
      startVars = startVars === 'none' || !startVars ? '0 0 0 transparent' : startVars;
      startVars = Css.parseShadow(startVars);
      endVars = Css.parseShadow(endVars);
      differ = endVars.map((data, ii)=> {
        return (parseFloat(data) - parseFloat(startVars[ii])) * easeValue + parseFloat(startVars[ii]);
      });
    } else {
      endVars = parseFloat(endVars);
      startVars = parseFloat(startVars || 0);
      differ = typeof endData[_key] === 'string' && endData[_key].charAt(1) === '=' ?
      startVars + endVars * easeValue : (endVars - startVars) * easeValue + startVars;
    }
    let cssName = Css.isTransform(key);
    this.startData[cssName] = this.startData[cssName] === 'none' || !this.startData[cssName] ? '' : this.startData[cssName];
    cssName = cssName === 'bezier' ? 'transform' : cssName;
    let style = this.animData.tween[cssName];
    if (cssName === 'bezier') {
      const bezier = this.animData['bezier' + i];
      style = Css.mergeStyle(this.startData[cssName], style || '');
      style = Css.mergeStyle(style, bezier.set(easeValue));
    } else if (cssName === 'filter') {
      style = Css.mergeStyle(this.startData[cssName], style || '');
      style = Css.mergeStyle(style, Css.getFilterParam(start[_key], endData[_key], easeValue));
    } else if (cssName === 'transform') {
      style = Css.mergeStyle(this.startData[cssName], style || '');
      style = Css.mergeStyle(style, Css.getParam(key, endData[_key], differ));
    } else {
      style = Css.getParam(key, endData[_key], differ);
    }
    this.animData.tween[cssName] = style;
  });
};
p.render = function() {
  let onChange = [];
  this.defaultData.forEach((item, i)=> {
    let initTime = item.initTime;
    // 处理 yoyo 和 repeat; yoyo 是在时间轴上的, 并不是倒放
    let repeatNum = Math.ceil(this.progressTime / (item.duration + item.repeatDelay)) - 1;
    repeatNum = this.progressTime === 0 ? repeatNum + 1 : repeatNum;
    if (item.repeat) {
      if (item.repeat || item.repeat <= repeatNum) {
        initTime = initTime + repeatNum * (item.duration + item.repeatDelay);
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
    if ((i === 0 && progressTime < this.perFrame) || (i !== 0 && progressTime > 0 && progressTime < this.perFrame)) {
      item.onStart();
      mode = 'onStart';
      this.animData.start = assign({}, this.animData.start, this.animData.tween);
    }
    if (progressTime >= 0) {
      // 设置 animData
      this.animData.start[i] = this.animData.start[i] || this.setAnimStartData(item);
    }
    if (progressTime > item.duration && !this.animData.start['bool' + i]) {
      this.setNewStyle(0, this.animData.start[i], item.data, i);
      this.animData.start['bool' + i] = this.animData.start['bool' + i] || 1;
    }
    if (progressTime >= 0 && progressTime < item.duration + this.perFrame) {
      this.animData.start['bool' + i] = this.animData.start['bool' + i] || 1;
      progressTime = progressTime < 0 ? 0 : progressTime;
      progressTime = progressTime > item.duration ? item.duration : progressTime;
      let easeVars = easingTypes[item.ease](progressTime, 0, 1, item.duration);
      if (item.yoyo && repeatNum % 2 || item.type === 'from') {
        easeVars = easingTypes[item.ease](progressTime, 1, 0, item.duration);
      }

      // 当前点生成样式;
      this.setNewStyle(easeVars, this.animData.start[i], item.data, i);

      // complete 事件
      if (progressTime === item.duration) {
        item.onComplete();
        mode = 'onComplete';
      }
      if (mode === 'onUpdate') {
        // update 事件
        item.onUpdate(easeVars);
      }

      onChange[i] = this.onChange.bind(this, {
        moment: this.progressTime,
        item: item,
        tween: this.animData.tween,
        index: i,
        mode,
      });
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
  return this.animData.tween;
};
p.resetAnimData = function() {
  this.animData = {
    start: {},
    tween: {},
  };
};

p.onChange = noop;
export default timeLine;
