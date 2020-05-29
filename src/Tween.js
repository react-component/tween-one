/* eslint-disable func-names */
/**
 * Created by jljsj on 16/1/27.
 */
import {
  getColor,
  parseColor,
  toFixed,
  stylesToCss,
  createMatrix,
  getGsapType,
  isTransform,
  checkStyleName,
  toCssLowerCase,
} from 'style-utils';

import easingTypes from './easing';
import _plugin from './plugins';
import StylePlugin from './plugin/StylePlugin';
import { startConvertToEndUnit, transformOrFilter, dataToArray } from './util.js';

const DEFAULT_EASING = 'easeInOutQuad';
const DEFAULT_DURATION = 450;
const DEFAULT_DELAY = 0;
function noop() {
}
_plugin.push(StylePlugin);
// 设置默认数据
function defaultData(vars, now) {
  const duration = vars.duration || vars.duration === 0 ? vars.duration : DEFAULT_DURATION;
  return {
    duration: vars.type === 'set' ? 0 : duration,
    delay: vars.delay || DEFAULT_DELAY,
    ease: typeof vars.ease === 'function' ? vars.ease : easingTypes[vars.ease || DEFAULT_EASING],
    onUpdate: vars.onUpdate || noop,
    onComplete: vars.onComplete || noop,
    onStart: vars.onStart || noop,
    onRepeat: vars.onRepeat || noop,
    repeat: vars.repeat || 0,
    repeatDelay: vars.repeatDelay || 0,
    yoyo: vars.yoyo || false,
    type: vars.type === 'from' ? 'from' : 'to',
    initTime: now,
    appearTo: typeof vars.appearTo === 'number' ? vars.appearTo : null,
    perTime: 0,
    currentRepeat: 0,
  };
}

const Tween = function (target, to, attr) {
  const toData = dataToArray(to);
  this.target = target;
  this.attr = attr || 'style';
  // 时间精度补齐；
  this.accuracy = 0.00001;
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
  // svg元素
  this.isSvg = this.target.ownerSVGElement;
  // 设置 style
  const data = this.setAttrIsStyle();
  // 设置默认动画数据;
  this.setDefaultData(data);
};
const p = Tween.prototype;
p.setAttrIsStyle = function () {
  const data = [];
  const defaultParam = defaultData({}, 0);
  this.data.forEach((d, i) => {
    const _d = { ...d };
    if (this.attr === 'style') {
      data[i] = {};
      Object.keys(_d).forEach(key => {
        if (key in defaultParam) {
          data[i][key] = _d[key];
          delete _d[key];
        }
      });
      data[i].style = _d;
      this.startDefaultData.style = this.target.getAttribute('style') || '';
    } else if (this.attr === 'attr') {
      Object.keys(_d).forEach(key => {
        if (key === 'style' && Array.isArray(d[key])) {
          throw new Error('Style should be the object.');
        }
        if (key === 'bezier') {
          _d.style = { ..._d.style, bezier: _d[key] };
          delete _d[key];
          this.startDefaultData.style = this.target.getAttribute('style') || '';
        } else {
          if (key in defaultParam) {
            return;
          }
          this.startDefaultData[key] = this.getValue(key);
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
        } else if ((_key === 'd' || _key === 'points') && 'SVGMorph' in _plugin) {
          tweenData.vars[_key] = new _plugin.SVGMorph(this.target, _data, _key);
        } else if (_key.match(/color/i) || _key === 'stroke' || _key === 'fill') {
          tweenData.vars[_key] = { type: 'color', vars: parseColor(_data) };
        } else if (typeof _data === 'number' || _data.split(/[,|\s]/g).length <= 1) {
          const vars = parseFloat(_data);
          const unit = _data.toString().replace(/[^a-z|%]/g, '');
          const count = _data.toString().replace(/[^+|=|-]/g, '');
          tweenData.vars[_key] = { unit, vars, count };
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
    } else if (tweenData.delay < -tweenData.duration) {
      // 如果延时小于 负时间时,,不加,再减回延时;
      now -= tweenData.delay;
    } else {
      // repeat 为 -1 只记录一次。不能跟 reverse 同时使用;
      now += tweenData.duration * (repeat + 1) + tweenData.repeatDelay * repeat;
    }
    tweenData.mode = '';
    return tweenData;
  });
  this.totalTime = repeatMax ? Number.MAX_VALUE : now;
  this.defaultData = data;
};
p.getComputedStyle = function () {
  const style = typeof window !== 'undefined' && document.defaultView ?
    document.defaultView.getComputedStyle(this.target) : {};
  // 如果是 SVG, 样式全部提出为 transformSVG, 兼容 safari 不能获取 transform;
  if (this.isSvg) {
    let transform = style[checkStyleName('transform')] || 'none';
    if (transform === 'none') {
      const attrStyle = this.target.getAttribute('style');
      if (attrStyle && attrStyle.indexOf('transform:') >= 0) {
        transform = attrStyle.split(';')
          .filter(k => k.indexOf('transform:') >= 0)
          .map(item => createMatrix(item.split(':')[1].trim()).toString())[0];
      } else if (this.target.getAttribute('transform')) {
        // 暂时不支持标签上的 transform，后期增加;
        console.warn('Do not add transform on the label, otherwise it will be invalid.');// eslint-disable-line no-console
      }
    }
    style.transformSVG = transform;
  }
  return style;
};
p.getAnimStartData = function (item) {
  const start = {};
  Object.keys(item).forEach(_key => {
    if (_key in _plugin || (this.attr === 'attr' && (_key === 'd' || _key === 'points'))) {
      this.computedStyle = this.computedStyle || (!this.target.getAttribute ? { ...this.target } : this.getComputedStyle());
      start[_key] = item[_key].getAnimStart(this.computedStyle, this.tween, this.isSvg);
      return;
    }
    if (this.attr === 'attr') {
      // 除了d和这points外的标签动画；
      const attribute = this.getValue(_key);
      const s = _key.match(/opacity/ig) ? 1 : 0
      let data = attribute === 'null' || !attribute ? s : attribute;
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
      endData.vars[_key].setRatio(ratio, this.tween, this.isSvg && this.computedStyle);
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
        this.setValue(_key, endVars.unit ? data : parseFloat(data));
      } else if (endVars.type === 'color') {
        if (endVars.vars.length === 3 && startVars.length === 4) {
          endVars.vars[3] = 1;
        }
        data = endVars.vars.map((_endData, _i) => {
          const startData = startVars[_i] || 0;
          return (_endData - startData) * ratio + startData;
        });
        this.setValue(_key, getColor(data));
      }
    }
  });
  this.setAnimData(this.tween);
};
p.getValue = function (key) {
  return this.target.getAttribute ? this.target.getAttribute(key) : this.target[key];
}
p.setValue = function (key, value) {
  if (this.target.setAttribute) {
    this.target.setAttribute(key, value);
  } else {
    this.target[key] = value;
  }
}
p.render = function () {
  const reverse = this.reverse;
  this.defaultData.forEach((item, i) => {
    let initTime = item.initTime;
    const duration = toFixed(item.duration);
    // 处理 yoyo 和 repeat; yoyo 是在时间轴上的, 并不是倒放
    let repeatNum = Math.ceil((this.progressTime - initTime) /
      (duration + item.repeatDelay)) - 1 || 0;
    repeatNum = repeatNum < 0 ? 0 : repeatNum;
    if (item.repeat) {
      if (item.repeat < repeatNum && item.repeat !== -1) {
        return;
      }
      if (item.repeat || item.repeat <= repeatNum) {
        initTime += repeatNum * (duration + item.repeatDelay);
      }
    }
    let startData = item.yoyo && repeatNum % 2 ? 1 : 0;
    let endData = item.yoyo && repeatNum % 2 ? 0 : 1;
    startData = item.type === 'from' ? 1 - startData : startData;
    endData = item.type === 'from' ? 1 - endData : endData;
    //  精度损失，只取小数点后10位。
    let progressTime = toFixed(this.progressTime - initTime);

    let ratio;

    // 开始注册;
    // from 时需先执行参数位置;
    const fromDelay = item.type === 'from' ? item.delay : 0;
    if (progressTime + fromDelay >= 0) {
      if (!this.start[i]) {
        // 设置 start
        this.start[i] = this.getAnimStartData(item.vars);
        if (progressTime < this.perFrame) {
          ratio = !item.duration && !item.delay ? item.ease(1, startData, endData, 1)
            : item.ease(0, startData, endData, 1);
          this.setRatio(ratio, item, i);
        } else if (progressTime > duration) {
          ratio = item.ease(1, startData, endData, 1);
          this.setRatio(ratio, item, i);
        }
        if (!this.register || i && !initTime) {
          this.register = true;
          if (progressTime === 0 && item.duration && item.delay) {
            return;
          }
        }
      }
    }

    const e = {
      index: i,
      target: this.target,
    };
    const cb = {
      moment: this.progressTime,
      ...e,
    };
    const maxPer = this.perFrame - this.accuracy;
    const startTime = item.delay && reverse ? -maxPer : 0;
    if ((progressTime >= startTime &&
      !(progressTime > duration && item.mode === 'onComplete')
      || (progressTime < startTime && item.mode && item.mode !== 'onStart')
    ) &&
      this.start[i]) {
      const updateAnim = this.updateAnim === 'update';
      progressTime = (progressTime < maxPer) && !reverse
        && item.duration >= this.perFrame ? 0 : progressTime;
      if (((progressTime >= duration - this.accuracy && !reverse) || (reverse && progressTime <= 0))
        && repeatNum >= item.repeat) {
        if (item.mode === 'onComplete') {
          return;
        }
        // onReveresComplete 和 onComplete 统一用 onComplete;
        ratio = item.ease(reverse ? 0 : 1, startData, endData, 1);
        this.setRatio(ratio, item, i, item.currentRepeat !== repeatNum);
        if ((!item.reset || item.reset && progressTime >= duration) && !updateAnim) {
          // duration 为 0 时的一个回调；
          if (duration < maxPer) {
            if (!duration) {
              item.onStart(e);
              cb.mode = 'onStart';
              this.onChange(cb);
            }
            item.onUpdate({ ratio, ...e });
            cb.mode = 'onUpdate';
            this.onChange(cb);
          }
          item.onComplete(e);
        } else if (progressTime >= duration + maxPer) {
          return;
        }
        item.mode = 'onComplete';
      } else if (duration > maxPer) {
        let currentProgress = progressTime < 0 ? 0 : progressTime;
        currentProgress = currentProgress > duration ? duration : currentProgress;
        ratio = item.ease(currentProgress, startData, endData, duration);
        this.setRatio(ratio, item, i);
        if (!updateAnim) {
          if (item.repeat && repeatNum > 0 && item.currentRepeat !== repeatNum) {
            item.mode = 'onRepeat';
            item.currentRepeat = repeatNum;
            item.onRepeat({ ...e, repeatNum });
          } else if ((item.perTime <= 0 ||
            (reverse && (item.perTime >= this.reverseStartTime - initTime)))
            && item.mode !== 'onStart') {
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
        cb.mode = item.mode;
        this.onChange(cb);
      }
      item.perTime = progressTime;
      if (item.reset) {
        delete item.reset;
      }
    }
  });
};
// 播放帧
p.frame = function (moment) {
  this.progressTime = moment;
  this.defaultData.forEach(item => {
    const t = this.progressTime - item.duration - item.initTime;
    if (t < this.perFrame && t > 0) {
      this.progressTime = item.duration + item.initTime;
    }
  });
  this.render();
};

p.init = p.frame;

p.resetAnimData = function () {
  this.tween = {};
  this.start = {};
};

const getDefaultStyle = function (domStyle, defaultStyle, tweenData) {
  const $data = defaultData({}, 0);
  const getStyleToArray = (styleString) => (
    styleString.split(';').filter(c => c).map(str =>
      str.split(':').map(s => s.trim())
    )
  );
  const styleToArray = getStyleToArray(defaultStyle);
  let domStyleToArray = getStyleToArray(domStyle);
  tweenData.forEach(value => {
    Object.keys(value).forEach(name => {
      if (!(name in $data)) {
        const $name = name === 'bezier' ? 'transform' : name;
        const styleName = toCssLowerCase(isTransform(getGsapType($name)));
        domStyleToArray = domStyleToArray.filter(item => {
          // 去除 plugins 的特殊名称。
          if (transformOrFilter[item[0]] && transformOrFilter[styleName]) {
            return false;
          }
          return item[0] !== styleName;
        });
      }
    })
  });
  styleToArray.forEach(item => {
    domStyleToArray = domStyleToArray.filter($item => {
      if ($item[0] === item[0]) {
        return false;
      }
      return true;
    });
  })
  return styleToArray.concat(domStyleToArray).map(item => item.join(':')).join(';');
}

p.resetDefaultStyle = function () {
  this.tween = {};
  this.defaultData = this.defaultData.map(item => {
    item.reset = true;
    delete item.mode;
    return item;
  });
  const data = defaultData({}, 0);
  Object.keys(this.startDefaultData).forEach(key => {
    if (!(key in data)) {
      if (key === 'style') {
        const value = getDefaultStyle(this.target.style.cssText,
          this.startDefaultData.style,
          this.data);
        this.setValue(key, value);
      } else {
        this.setValue(key, this.startDefaultData[key]);
      }
      this.computedStyle = null;
    }
  });
};

p.reStart = function (style, preStyle, isTween) {
  this.start = {};
  this.tween = {};
  Object.keys(style || {}).forEach(key => {
    if (isTween || !preStyle || style[key] !== preStyle[key]) {
      this.target.style[key] = stylesToCss(key, style[key]);
    }
  });
  this.setAttrIsStyle();
  this.computedStyle = null;
};

p.onChange = noop;
export default Tween;
