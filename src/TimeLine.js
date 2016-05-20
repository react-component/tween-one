/**
 * Created by jljsj on 16/1/27.
 */
import assign from 'object-assign';
import easingTypes from 'tween-functions';
import cssList, {
  checkStyleName,
  getGsapType,
  parseShadow,
  getColor,
  parseColor,
  isTransform,
  isConvert,
  splitFilterToObject,
  getTransform,
} from 'style-utils';
import Bezier from './BezierPlugin';
const DEFAULT_EASING = 'easeInOutQuad';
const DEFAULT_DURATION = 450;
const DEFAULT_DELAY = 0;
import { stylesToCss } from './util';
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

const timeLine = function(target, toData) {
  this.target = target;
  // 记录总时间;
  this.totalTime = 0;
  // 记录当前时间;
  this.progressTime = 0;
  // 记录时间轴数据;
  this.defaultData = [];
  // 每个的开始数据；
  this.start = {};
  // 动画过程
  this.tween = {};
  // 每帧的时间;
  this.perFrame = Math.round(1000 / 60);
  // 设置默认动画数据;
  this.setDefaultData(toData);
};
const p = timeLine.prototype;

p.getComputedStyle = function() {
  return document.defaultView ? document.defaultView.getComputedStyle(this.target) : {};
};

p.getTweenData = function(_key, vars) {
  const data = {
    data: {},
    dataType: {},
    dataUnit: {},
    dataCount: {},
  };
  const key = getGsapType(_key);
  if (key.indexOf('color') >= 0 || key.indexOf('Color') >= 0) {
    data.data[key] = parseColor(vars);
    data.dataType[key] = 'color';
  } else if (key.indexOf('shadow') >= 0 || key.indexOf('Shadow') >= 0) {
    data.data[key] = parseShadow(vars);
    data.dataType[key] = 'shadow';
  } else if (key === 'bezier') {
    data.data[key] = vars;
  } else if (key === 'scale') {
    data.data.scaleX = vars;
    data.data.scaleY = vars;
    data.dataType.scaleX = data.dataType.scaleY = 'other';
  } else {
    data.data[key] = vars;
    data.dataType[key] = 'other';
  }
  if (key !== 'bezier') {
    if (Array.isArray(data.data[key])) {
      data.dataUnit[key] = data.data[key]
        .map(_item => _item.toString().replace(/[^a-z|%]/g, ''));
      data.dataCount[key] = data.data[key]
        .map(_item => _item.toString().replace(/[^+|=|-]/g, ''));
      data.data[key] = data.data[key].map(_item => parseFloat(_item));
    } else if (key === 'scale') {
      data.dataUnit.scaleX = data.data.scaleX.toString().replace(/[^a-z|%]/g, '');
      data.dataCount.scaleX = data.data.scaleX.toString().replace(/[^+|=|-]/g, '');
      data.data.scaleX = parseFloat(data.data.scaleX);
      data.dataUnit.scaleY = data.data.scaleY.toString().replace(/[^a-z|%]/g, '');
      data.dataCount.scaleY = data.data.scaleY.toString().replace(/[^+|=|-]/g, '');
      data.data.scaleY = parseFloat(data.data.scaleY);
    } else {
      data.dataUnit[key] = data.data[key].toString().replace(/[^a-z|%]/g, '');
      data.dataCount[key] = data.data[key].toString().replace(/[^+|=|-]/g, '');
      data.data[key] = parseFloat(data.data[key]);
    }
  }
  return data;
};
p.setDefaultData = function(vars) {
  let now = 0;
  let repeatMax = false;
  const data = vars.map(item=> {
    now += item.delay || 0;// 加上延时，在没有播放过时；
    const tweenData = defaultData(item, now);
    tweenData.vars = {};
    tweenData.varsType = {};
    tweenData.varsUnit = {};
    tweenData.varsCount = {};
    Object.keys(item).forEach(_key => {
      if (!(_key in tweenData)) {
        const _data = this.getTweenData(_key, item[_key]);
        const key = getGsapType(_key);
        if (!(_key in this.target) || cssList.filter.indexOf(key) >= 0) {
          tweenData.vars.css = tweenData.vars.css || {};
          if (key === 'scale') {
            tweenData.vars.css.scaleX = _data.data.scaleX;
            tweenData.vars.css.scaleY = _data.data.scaleY;
          } else {
            tweenData.vars.css[key] = _data.data[key];
          }
        } else {
          tweenData.vars[key] = _data.data[key];
        }
        if (key === 'scale') {
          tweenData.varsType.scaleX = _data.dataType.scaleX;
          tweenData.varsUnit.scaleX = _data.dataUnit.scaleX;
          tweenData.varsCount.scaleX = _data.dataCount.scaleX;
          tweenData.varsType.scaleY = _data.dataType.scaleY;
          tweenData.varsUnit.scaleY = _data.dataUnit.scaleY;
          tweenData.varsCount.scaleY = _data.dataCount.scaleY;
          return;
        }
        tweenData.varsType[key] = _data.dataType[key];
        tweenData.varsUnit[key] = _data.dataUnit[key];
        tweenData.varsCount[key] = _data.dataCount[key];
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
    return tweenData;
  });
  this.totalTime = repeatMax ? Number.MAX_VALUE : now;
  this.defaultData = data;
};
p.convertToMarks = function(style, num, unit) {
  const horiz = /(?:Left|Right|Width)/i.test(style);
  const t = style.indexOf('border') !== -1 ? this.target : this.target.parentNode || document.body;
  let pix;
  if (unit === '%') {
    pix = parseFloat(num) * 100 / (horiz ? t.clientWidth : t.clientHeight);
  } else {
    // em rem
    pix = parseFloat(num) / 16;
  }
  return pix;
};
p.convertToMarksArray = function(unit, data, i) {
  const startUnit = data.toString().replace(/[^a-z|%]/g, '');
  const endUnit = unit[i];
  if (startUnit === endUnit) {
    return parseFloat(data);
  }
  return this.convertToMarks('shadow', data, endUnit);
};
p.getAnimStartCssData = function(vars, i) {
  const computedStyle = this.getComputedStyle();
  const style = {};
  Object.keys(vars).forEach(_key => {
    const key = getGsapType(_key);
    const cssName = isConvert(key);
    let startData = computedStyle[cssName];
    if (!startData || startData === 'none' || startData === 'auto') {
      startData = '';
    }
    let transform;
    let endUnit;
    let startUnit;
    if (cssName === 'transform') {
      this.transform = checkStyleName('transform');
      startData = computedStyle[this.transform];
      transform = getTransform(startData);
      style.transform = transform;
    } else if (cssName === 'bezier') {
      this.transform = checkStyleName('transform');
      startData = computedStyle[this.transform];
      const bezier = style.bezier = new Bezier(startData === 'none' ? '' : startData, vars.bezier);
      transform = vars.type === 'from' ? bezier.set(1) : bezier.set(0);
      transform = getTransform(transform);
    } else if (cssName === 'filter') {
      this.filterName = checkStyleName('filter');
      startData = computedStyle[this.filterName];
      this.filterObject = assign(this.filterObject || {}, splitFilterToObject(startData));
      startData = this.filterObject[_key] || 0;
      startUnit = startData.toString().replace(/[^a-z|%]/g, '');
      endUnit = this.defaultData[i].varsUnit[_key];
      if (endUnit !== startUnit) {
        startData = this.convertToMarks(_key, startData, endUnit);
      }
      style[_key] = parseFloat(startData);
    } else if (key.indexOf('color') >= 0 || key.indexOf('Color') >= 0) {
      style[cssName] = parseColor(startData);
    } else if (key.indexOf('shadow') >= 0 || key.indexOf('Shadow') >= 0) {
      startData = parseShadow(startData);
      endUnit = this.defaultData[i].varsUnit[_key];
      startData = startData.map(this.convertToMarksArray.bind(this, endUnit));
      style[cssName] = startData;
    } else {
      // 计算单位， em rem % px;
      endUnit = this.defaultData[i].varsUnit[cssName];
      startUnit = startData.toString().replace(/[^a-z|%]/g, '');
      if (endUnit && (endUnit !== startUnit || endUnit !== 'px')) {
        startData = this.convertToMarks(cssName, startData, endUnit);
      }
      style[cssName] = parseFloat(startData || 0);
    }
  });
  return style;
};
p.getAnimStartData = function(item, i) {
  const start = {};
  Object.keys(item).forEach(_key => {
    if (_key === 'css') {
      start[_key] = this.getAnimStartCssData(item[_key], i);
      return;
    }
    start[_key] = this.target[_key] || 0;
  });
  return start;
};
p.setAnimData = function(data) {
  const style = this.target.style;
  Object.keys(data).forEach(key => {
    if (key === 'css') {
      const _data = data[key];
      Object.keys(_data).forEach(_key => {
        if (_key === 'transform') {
          const t = _data[_key];
          const perspective = t.perspective;
          const angle = t.rotate;
          const rotateX = t.rotateX;
          const rotateY = t.rotateY;
          const sx = t.scaleX;
          const sy = t.scaleY;
          const sz = t.scaleZ;
          const skx = t.skewX;
          const sky = t.skewY;
          const translateX = t.translateX;
          const translateY = t.translateY;
          const translateZ = t.translateZ;
          const xPercent = t.xPercent || 0;
          const yPercent = t.yPercent || 0;
          const percent = `${(xPercent || yPercent) ? `translate(${xPercent},${yPercent})` : ''}`;
          const sk = skx || sky ? `skew(${skx}deg,${sky}deg)` : '';
          const an = angle ? `rotate(${angle}deg)` : '';
          let ss;
          if (!perspective && !rotateX && !rotateY && !translateZ && sz === 1) {
            const matrix = `1,0,0,1,${translateX},${translateY}`;
            ss = sx !== 1 || sy !== 1 ? `scale(${sx},${sy})` : '';
            // IE 9 没 3d;
            style[this.transform] = `${percent} matrix(${matrix}) ${an} ${ss} ${sk}`.trim();
            return;
          }
          ss = sx !== 1 || sy !== 1 || sz !== 1 ? `scale3d(${sx},${sy},${sz})` : '';
          const rX = rotateX ? `rotateX(${rotateX}deg)` : '';
          const rY = rotateY ? `rotateY(${rotateY}deg)` : '';
          const per = perspective ? `perspective(${perspective}px)` : '';
          style[this.transform] = `${per} ${percent} translate3d(${translateX}px,${translateY}px,${translateZ}px) ${ss} ${an} ${rX} ${rY} ${sk}`.trim();
          return;
        } else if (cssList.filter.indexOf(_key) >= 0) {
          this.filterObject[_key] = _data[_key];
          let filterStyle = '';
          Object.keys(this.filterObject).forEach(filterKey => {
            filterStyle += ` ${filterKey}(${this.filterObject[filterKey]})`;
          });
          style[this.filterName] = filterStyle.trim();
          return;
        }
        style[_key] = data[key][_key];
      });
      return;
    }
    this.target[key] = data[key];
  });
};
p.setArrayRatio = function(ratio, start, vars, unit, type) {
  const _vars = vars.map((endData, i) => {
    const startData = start[i] || 0;
    return (endData - startData) * ratio + startData + unit[i];
  });
  if (type === 'color') {
    return getColor(_vars);
  } else if (type === 'shadow') {
    const s = _vars.slice(0, 3);
    const c = _vars.slice(3, _vars.length);
    const color = getColor(c);
    return `${s.join(' ')} ${color}`;
  }
  return _vars;
};

p.setStyleRatio = function(ratio, start, vars, unit, count, type) {
  const style = {};
  if (start.transform) {
    style.transform = assign({}, start.transform, this.tween.css ? this.tween.css.transform : {});
  }
  Object.keys(vars).forEach(key => {
    const _isTransform = isTransform(key) === 'transform';
    const startVars = _isTransform ? start.transform[key] : start[key];
    const endVars = vars[key];
    let _unit = unit[key] ? unit[key] : 0;
    const _count = count[key];
    if (_isTransform) {
      if (_unit === '%' || _unit === 'em' || _unit === 'rem') {
        // translateX translateY => %
        let pName;
        let data;
        if (key === 'translateX') {
          data = start.transform.translateX;
          pName = 'xPercent';
        } else {
          data = start.transform.translateY;
          pName = 'yPercent';
        }
        if (_count.charAt(1) !== '=') {
          style.transform[key] = data - data * ratio;
        }
        style.transform[pName] = endVars * ratio + _unit;
      } else {
        if (_count.charAt(1) === '=') {
          style.transform[key] = startVars + endVars * ratio;
          return;
        }
        style.transform[key] = (endVars - startVars) * ratio + startVars;
      }
      return;
    } else if (key === 'bezier') {
      const bezier = start[key];
      style.transform = getTransform(bezier.set(ratio));
      return;
    } else if (Array.isArray(endVars)) {
      const _type = type[key];
      style[key] = this.setArrayRatio(ratio, startVars, endVars, _unit, _type);
      return;
    }
    let styleUnit = stylesToCss(key, 0);
    styleUnit = typeof styleUnit === 'number' ? '' : styleUnit.replace(/[^a-z|%]/g, '');
    _unit = _unit || (cssList.filter.indexOf(key) >= 0 ? '' : styleUnit);
    if (_count.charAt(1) === '=') {
      style[key] = startVars + endVars * ratio + _unit;
      return;
    }
    style[key] = (endVars - startVars) * ratio + startVars + _unit;
  });
  return style;
};

p.setRatio = function(ratio, endData, i) {
  Object.keys(endData.vars).forEach(_key => {
    const key = getGsapType(_key);
    const endVars = endData.vars[_key];
    const startVars = this.start[i][key];
    const unit = this.defaultData[i].varsUnit;
    const count = this.defaultData[i].varsCount;
    const type = this.defaultData[i].varsType;
    if (typeof endVars === 'object' && _key === 'css') {
      this.tween.css = assign({}, this.tween.css,
        this.setStyleRatio(ratio, startVars, endVars, unit, count, type));
    } else if (Array.isArray(endVars)) {
      this.tween[key] = this.setArrayRatio(ratio, startVars, endVars, unit[key]);
    } else {
      this.tween[key] = count[key].charAt(1) === '=' ? startVars + endVars * ratio
        : (endVars - startVars) * ratio + startVars;
    }
  });
  this.setAnimData(this.tween);
};
p.render = function() {
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
    // 设置 start
    const delay = item.delay >= 0 ? item.delay : -item.delay;
    const fromDelay = item.type === 'from' ? delay : 0;
    if (progressTime + fromDelay >= 0 && !this.start[i]) {
      this.start[i] = this.getAnimStartData(item.vars, i);
      this.setRatio(item.type === 'from' ? 1 : 0, item, i);
    }
    if (progressTime >= 0 && progressTime < item.duration + this.perFrame) {
      // 状态
      let mode = 'onUpdate';
      // 开始 onStart
      if (progressTime < this.perFrame) {
        item.onStart();
        mode = 'onStart';
      }
      progressTime = progressTime < 0 ? 0 : progressTime;
      progressTime = progressTime > item.duration ? item.duration : progressTime;
      let ratio = easingTypes[item.ease](progressTime, 0, 1, item.duration);
      if (item.yoyo && repeatNum % 2 || item.type === 'from') {
        ratio = easingTypes[item.ease](progressTime, 1, 0, item.duration);
      }
      // 当前点生成样式;
      this.setRatio(ratio, item, i);

      mode = progressTime === item.duration ? 'onComplete' : mode;

      if (mode === 'onUpdate') {
        // update 事件
        item.onUpdate(ratio);
      }

      this.onChange({
        moment: this.progressTime,
        item: item,
        tween: this.tween,
        index: i,
        mode,
      });
      // complete 事件
      if (mode === 'onComplete') {
        item.onComplete();
      }
    }
  });
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
};

p.onChange = noop;
export default timeLine;
