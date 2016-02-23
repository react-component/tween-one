/**
 * Created by jljsj on 16/1/27.
 */
import easingTypes from 'tween-functions';
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
  // 1秒时间;
  this.oneSecond = 1000 / 60;
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
};
p.setAnimStartData = function(endData) {
  const obj = {};

  function setStyle(_obj, data, key) {
    const cssStyleArr = data.toString().split(' ');
    cssStyleArr.forEach(__item=> {
      const _item = __item.replace(/[(|)]/ig, '$').split('$');
      _obj[_item[0]] = _item[1];
    });
    _obj[key] = Css.mergeTransformName(cssStyleArr, key) || _obj[key] || 0;
  }

  Object.keys(endData).forEach(_key=> {
    const key = Css.getGsapType(_key);
    const cssName = Css.isTransform(key);
    if (this.startData[cssName] === 'none' || this.startData[cssName] === 'auto') {
      this.startData[cssName] = '';
    }
    if (cssName === 'transform' || cssName === 'filter') {
      if (cssName === 'transform') {
        // 设置了style
        if (this.animData.tween && this.animData.tween[cssName]) {
          setStyle(obj, this.animData.tween[cssName] || 0, key);
        } else {
          setStyle(obj, this.startData[cssName] || 0, key);
        }
      } else {
        // 是filter时
        let cssStyleArr;
        if (this.animData.tween && this.animData.tween[cssName]) {
          cssStyleArr = (this.animData.tween[cssName] || '').split(' ');
          obj[key] = cssStyleArr.length ? cssStyleArr.join(' ') : 0;
        } else {
          cssStyleArr = (this.startData[cssName] || '').split(' ');
          obj[key] = cssStyleArr.length ? cssStyleArr.join(' ') : 0;
        }
      }
    } else {
      // 不是以上两种情况时
      if (this.animData.tween && this.animData.tween[cssName]) {
        obj[key] = this.animData.tween[cssName];
      } else {
        obj[key] = this.startData[cssName] || 0;
      }
    }
  });
  return obj;
};
p.setNewStyle = function(easeValue, endData, i) {
  const start = this.animData.start[i];
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
      endVars = parseFloat(endVars.toString().replace(/[^0-9|.|-]/ig, ''));
      startVars = parseFloat((startVars || 0).toString().replace(/[^0-9|.|-]/ig, ''));
      differ = (endVars - startVars) * easeValue + startVars;
      if (typeof endData[_key] === 'string' && endData[_key].charAt(1) === '=') {
        differ = startVars + endVars * easeValue;
      }
    }
    const cssName = Css.isTransform(key);
    this.startData[cssName] = this.startData[cssName] === 'none' ? '' : this.startData[cssName];
    if (cssName === 'bezier') {
      const bezier = this.animData['bezier' + i] = this.animData['bezier' + i] || new Bezier(this.startData.transform, endData[_key]);
      this.startData.transform = this.startData.transform === 'none' ? '' : this.startData.transform;
      this.animData.tween.transform = Css.mergeStyle(this.startData.transform, this.animData.tween.transform || '');
      this.animData.tween.transform = Css.mergeStyle(this.animData.tween.transform, bezier.set(easeValue));
    } else if (cssName === 'filter') {
      this.animData.tween[cssName] = Css.mergeStyle(this.startData[cssName] || '', this.animData.tween[cssName] || '');
      this.animData.tween[cssName] = Css.mergeStyle(this.animData.tween[cssName], Css.getFilterParam(start[_key], endData[_key], easeValue));
    } else if (cssName === 'transform') {
      this.animData.tween[cssName] = Css.mergeStyle(this.startData[cssName] || '', this.animData.tween[cssName] || '');
      this.animData.tween[cssName] = Css.mergeStyle(this.animData.tween[cssName], Css.getParam(key, endData[_key], differ));
    } else {
      this.animData.tween[cssName] = Css.getParam(key, endData[_key], differ);
    }
  });
};
p.getStyle = function() {
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
    if (item.repeat && repeatNum > 0 && progressTime < this.oneSecond) {
      // 重新开始, 在第一秒触发时调用;
      item.onRepeat();
    }
    // 状态
    let mode = 'onUpdate';
    // 开始 onStart
    if (i === 0 && progressTime < 5 || i !== 0 && progressTime > 0 && progressTime < this.oneSecond) {
      item.onStart();
      mode = 'onStart';
    }
    if (progressTime > -this.oneSecond) {
      // 设置 animData
      this.animData.start[i] = this.animData.start[i] || this.setAnimStartData(item.data);
    }
    if (progressTime > item.duration && !this.animData.start['bool' + i]) {
      this.setNewStyle(1, item.data, i);
      this.animData.start['bool' + i] = this.animData.start['bool' + i] || 1;
    }
    if (progressTime > -this.oneSecond && progressTime < item.duration + this.oneSecond) {
      this.animData.start['bool' + i] = this.animData.start['bool' + i] || 1;
      progressTime = progressTime < 0 ? 0 : progressTime;
      progressTime = progressTime > item.duration ? item.duration : progressTime;
      let easeVars = easingTypes[item.ease](progressTime, 0, 1, item.duration);
      if (item.yoyo && repeatNum % 2 || item.type === 'from') {
        easeVars = easingTypes[item.ease](progressTime, 1, 0, item.duration);
      }
      // update 事件
      item.onUpdate(easeVars);

      // 当前点生成样式;
      this.setNewStyle(easeVars, item.data, i);
      // complete 事件
      if (progressTime === item.duration) {
        item.onComplete();
        mode = 'onComplete';
      }
      // onChange
      this.onChange({
        moment: this.progressTime,
        item: item,
        tween: this.animData.tween,
        index: i,
        mode,
      });
    }
  });
};
// 播放帧
p.frame = function(moment) {
  this.progressTime = moment;
  this.getStyle();
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
