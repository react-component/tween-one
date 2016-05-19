/**
 * Created by jljsj on 16/1/27.
 */
import assign from 'object-assign';
import easingTypes from 'tween-functions';
import Css from './CSS';
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
        const _data = Css.getTweenData(_key, item[_key]);
        const key = Css.getGsapType(_key);
        if (!(_key in this.target) || Css.filter.indexOf(key) >= 0) {
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
    const key = Css.getGsapType(_key);
    const cssName = Css.isConvert(key);
    let startData = computedStyle[cssName];
    if (!startData || startData === 'none' || startData === 'auto') {
      startData = '';
    }
    let transform;
    let endUnit;
    let startUnit;
    if (cssName === 'transform') {
      this.transform = Css.checkStyleName('transform');
      startData = computedStyle[this.transform];
      transform = Css.getTransform(startData);
      style.transform = transform;
    } else if (cssName === 'bezier') {
      this.transform = Css.checkStyleName('transform');
      startData = computedStyle[this.transform];
      const bezier = style.bezier = new Bezier(startData === 'none' ? '' : startData, vars.bezier);
      transform = vars.type === 'from' ? bezier.set(1) : bezier.set(0);
      transform = Css.getTransform(transform);
    } else if (cssName === 'filter') {
      this.filterName = Css.checkStyleName('filter');
      startData = computedStyle[this.filterName];
      this.filterObject = assign(this.filterObject || {}, Css.splitFilterToObject(startData));
      startData = this.filterObject[_key] || 0;
      startUnit = startData.toString().replace(/[^a-z|%]/g, '');
      endUnit = this.defaultData[i].varsUnit[_key];
      if (endUnit !== startUnit) {
        startData = this.convertToMarks(_key, startData, endUnit);
      }
      style[_key] = parseFloat(startData);
    } else if (key.indexOf('color') >= 0 || key.indexOf('Color') >= 0) {
      style[cssName] = Css.parseColor(startData);
    } else if (key.indexOf('shadow') >= 0 || key.indexOf('Shadow') >= 0) {
      startData = Css.parseShadow(startData);
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
      style[cssName] = parseFloat(startData);
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
          const translateX = typeof t.translateX === 'number' ? `${t.translateX}px` : t.translateX;
          const translateY = typeof t.translateY === 'number' ? `${t.translateY}px` : t.translateY;
          const translateZ = typeof t.translateZ === 'number' ? `${t.translateZ}px` : t.translateZ;
          const xPercent = t.xPercent || 0;
          const yPercent = t.yPercent || 0;
          const percent = `${(xPercent || yPercent) ? `translate(${xPercent},${yPercent})` : ''}`;
          const ss = sx !== 1 || sx !== 1 || sz !== 1 ? `scale3d(${sx},${sy},${sz})` : '';
          const sk = skx || sky ? `skew(${skx}deg,${sky}deg)` : '';
          const a = angle ? `rotate(${angle}deg)` : '';
          const rX = rotateX ? `rotateX(${rotateX}deg)` : '';
          const rY = rotateY ? `rotateY(${rotateY}deg)` : '';
          const per = perspective ? `perspective(${perspective}px)` : '';
          style[this.transform] = `${per} ${percent} translate3d(${translateX},${translateY},${translateZ}) ${ss} ${a} ${rX} ${rY} ${sk}`.trim();
          return;
        } else if (Css.filter.indexOf(_key) >= 0) {
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
    return Css.getColor(_vars);
  } else if (type === 'shadow') {
    const s = _vars.slice(0, 3);
    const c = _vars.slice(3, _vars.length);
    const color = Css.getColor(c);
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
    const isTransform = Css.isTransform(key) === 'transform';
    const startVars = isTransform ? start.transform[key] : start[key];
    const endVars = vars[key];
    let _unit = unit[key] ? unit[key] : 0;
    const _count = count[key];
    if (isTransform) {
      if (_unit === '%' || _unit === 'em' || _unit === 'rem') {
        // translateX translateY => %
        let pName;
        let data;
        if (key === 'translateX') {
          data = style.transform.translateX;
          pName = 'xPercent';
        } else {
          data = style.transform.translateY;
          pName = 'yPercent';
        }
        if (_count.charAt(1) !== '=') {
          style.transform[key] = data - data * ratio;
        }
        style.transform[pName] = endVars * ratio + _unit;
      } else {
        if (_count.charAt(1) === '=') {
          style.transform[key] = startVars + endVars * ratio + _unit;
          return;
        }
        style.transform[key] = (endVars - startVars) * ratio + startVars + _unit;
      }
      return;
    } else if (key === 'bezier') {
      const bezier = start[key];
      style.transform = Css.getTransform(bezier.set(ratio));
      return;
    } else if (Array.isArray(endVars)) {
      const _type = type[key];
      style[key] = this.setArrayRatio(ratio, startVars, endVars, _unit, _type);
      return;
    }
    _unit = _unit || (Css.filter.indexOf(key) >= 0 ? '' : 'px');
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
    const key = Css.getGsapType(_key);
    const endVars = endData.vars[_key];
    const startVars = this.start[i][key];
    const unit = this.defaultData[i].varsUnit;
    const count = this.defaultData[i].varsCount;
    const type = this.defaultData[i].varsType;
    if (typeof endVars === 'object' && _key === 'css') {
      this.tween.css = assign({}, this.tween.css,
        this.setStyleRatio(ratio, startVars, endVars, unit, count, type));
    } else if (Array.isArray(endVars)) {
      console.log('is Array');
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
      const st = progressTime / (item.duration + fromDelay) > 1 ? 1 : (progressTime / (item.duration + fromDelay));
      this.setRatio(item.type === 'from' ? 1 - st : st, item, i);
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
  this.animStyle = {};
};

p.onChange = noop;
export default timeLine;
