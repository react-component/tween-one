/* eslint-disable func-names */
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
  stylesToCss,
} from 'style-utils';
import assign from 'object-assign';
import _plugin from '../plugins';

const StylePlugin = function (target, vars, type) {
  this.target = target;
  this.vars = vars;
  this.type = type;
  this.propsData = {};
  this.setDefaultData();
};
const p = StylePlugin.prototype = {
  name: 'style',
};
p.getComputedStyle = function () {
  return document.defaultView ? document.defaultView.getComputedStyle(this.target) : {};
};
p.getTweenData = function (key, vars) {
  const data = {
    data: {},
    dataType: {},
    dataUnit: {},
    dataCount: {},
    dataSplitStr: {},
  };
  if (key.indexOf('color') >= 0 || key.indexOf('Color') >= 0) {
    data.data[key] = parseColor(vars);
    data.dataType[key] = 'color';
  } else if (key.indexOf('shadow') >= 0 || key.indexOf('Shadow') >= 0) {
    data.data[key] = parseShadow(vars);
    data.dataType[key] = 'shadow';
  } else if (vars.split(/[\s+|,]/).length > 1) {
    data.data[key] = vars.split(/[\s+|,]/);
    data.dataSplitStr[key] = vars.replace(/[^\s+|,]/g, '');
    data.dataType[key] = 'string';
  } else {
    data.data[key] = vars;
    data.dataType[key] = 'other';
  }
  if (Array.isArray(data.data[key])) {
    data.dataUnit[key] = data.data[key]
      .map(_item => _item.toString().replace(/[^a-z|%]/g, ''));
    data.dataCount[key] = data.data[key]
      .map(_item => _item.toString().replace(/[^+|=|-]/g, ''));

    data.data[key] = data.data[key].map(_item => parseFloat(_item));
  } else {
    data.dataUnit[key] = data.data[key].toString().replace(/[^a-z|%]/g, '');
    data.dataCount[key] = data.data[key].toString().replace(/[^+|=|-]/g, '');
    data.data[key] = parseFloat(data.data[key].toString().replace(/[a-z|%|=]/g, ''));
  }
  return data;
};
p.setDefaultData = function () {
  this.propsData.data = {};
  this.propsData.dataType = {};
  this.propsData.dataUnit = {};
  this.propsData.dataCount = {};
  this.propsData.dataSplitStr = {};
  Object.keys(this.vars).forEach(_key => {
    if (_key in _plugin) {
      this.propsData.data[_key] = new _plugin[_key](this.target, this.vars[_key]);
      return;
    }
    const key = getGsapType(_key);
    const _data = this.getTweenData(key, this.vars[_key]);
    this.propsData.data[key] = _data.data[key];
    this.propsData.dataType[key] = _data.dataType[key];
    this.propsData.dataUnit[key] = _data.dataUnit[key];
    this.propsData.dataCount[key] = _data.dataCount[key];
    if (_data.dataSplitStr[key]) {
      this.propsData.dataSplitStr[key] = _data.dataSplitStr[key];
    }
  });
};
p.convertToMarks = function (style, num, unit, isOrigin) {
  const horiz = /(?:Left|Right|Width)/i.test(style);
  const t = style.indexOf('border') !== -1 ? this.target : this.target.parentNode || document.body;
  let pix;
  if (unit === '%') {
    pix = parseFloat(num) * 100 / (horiz || isOrigin ? t.clientWidth : t.clientHeight);
  } else {
    // em rem
    pix = parseFloat(num) / 16;
  }
  return pix;
};
p.convertToMarksArray = function (unit, key, data, i) {
  const startUnit = data.toString().replace(/[^a-z|%]/g, '');
  const endUnit = unit[i];
  if (startUnit === endUnit) {
    return parseFloat(data);
  }
  return this.convertToMarks('array', data, endUnit, key === 'transformOrigin' && !i);
};
p.getAnimStart = function () {
  const computedStyle = this.getComputedStyle();
  const style = {};
  Object.keys(this.propsData.data).forEach(key => {
    const cssName = isConvert(key);
    let startData = computedStyle[cssName];
    if (!startData || startData === 'none' || startData === 'auto') {
      startData = '';
    }
    let transform;
    let endUnit;
    let startUnit;
    if (key in _plugin) {
      if (key === 'bezier') {
        this.transform = checkStyleName('transform');
      }
      this.propsData.data[key].getAnimStart();
    } else if (cssName === 'transform') {
      this.transform = checkStyleName('transform');
      startData = computedStyle[this.transform];
      transform = getTransform(startData);
      style.transform = transform;
    } else if (cssName === 'filter') {
      this.filterName = checkStyleName('filter');
      startData = computedStyle[this.filterName];
      this.filterObject = assign(this.filterObject || {}, splitFilterToObject(startData));
      startData = this.filterObject[key] || 0;
      startUnit = startData.toString().replace(/[^a-z|%]/g, '');
      endUnit = this.propsData.dataUnit[key];
      if (endUnit !== startUnit) {
        startData = this.convertToMarks(key, startData, endUnit);
      }
      style[key] = parseFloat(startData);
    } else if (key.indexOf('color') >= 0 || key.indexOf('Color') >= 0) {
      style[cssName] = parseColor(startData);
    } else if (key.indexOf('shadow') >= 0 || key.indexOf('Shadow') >= 0) {
      startData = parseShadow(startData);
      endUnit = this.propsData.dataUnit[key];
      startData = startData.map(this.convertToMarksArray.bind(this, endUnit, key));
      style[cssName] = startData;
    } else if (Array.isArray(this.propsData.data[key])) {
      startData = startData.split(/[\s+|,]/);
      endUnit = this.propsData.dataUnit[key];
      startData = startData.map(this.convertToMarksArray.bind(this, endUnit, key));
      style[cssName] = startData;
    } else {
      // 计算单位， em rem % px;
      endUnit = this.propsData.dataUnit[cssName];
      startUnit = startData.toString().replace(/[^a-z|%]/g, '');
      if (endUnit && (endUnit !== startUnit || endUnit !== 'px')) {
        startData = this.convertToMarks(cssName, startData, endUnit);
      }
      style[cssName] = parseFloat(startData || 0);
    }
  });
  this.start = style;
  return style;
};
p.setAnimData = function (data) {
  const style = this.target.style;
  Object.keys(data).forEach(_key => {
    if (_key === 'transform') {
      const t = data[_key];
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
      style[this.transform] = `${per} ${percent} translate3d(${translateX}px,${
        translateY}px,${translateZ}px) ${ss} ${an} ${rX} ${rY} ${sk}`.trim();
      return;
    } else if (cssList.filter.indexOf(_key) >= 0) {
      if (!this.filterObject) {
        return;
      }
      this.filterObject[_key] = data[_key];
      let filterStyle = '';
      Object.keys(this.filterObject).forEach(filterKey => {
        filterStyle += ` ${filterKey}(${this.filterObject[filterKey]})`;
      });
      style[this.filterName] = filterStyle.trim();
      return;
    }
    style[_key] = data[_key];
  });
};
p.setArrayRatio = function (ratio, start, vars, unit, type) {
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

p.setRatio = function (ratio, tween) {
  tween.style = tween.style || {};
  if (this.start.transform) {
    tween.style.transform = assign({}, this.start.transform, tween.style.transform || {});
  }
  Object.keys(this.propsData.data).forEach(key => {
    const _isTransform = isTransform(key) === 'transform';
    const startVars = _isTransform ? this.start.transform[key] : this.start[key];
    const endVars = this.propsData.data[key];
    let unit = this.propsData.dataUnit[key];
    const count = this.propsData.dataCount[key];
    if (key in _plugin) {
      this.propsData.data[key].setRatio(ratio, tween);
      return;
    } else if (_isTransform) {
      if (unit === '%' || unit === 'em' || unit === 'rem') {
        const pName = key === 'translateX' ? 'xPercent' : 'yPercent';
        const data = key === 'translateX' ?
          this.start.transform.translateX : this.start.transform.translateY;
        if (count.charAt(1) === '=') {
          tween.style.transform[key] = data - data * ratio;
        }
        tween.style.transform[pName] = endVars * ratio + unit;
        return;
      } else if (key === 'scale') {
        const xStart = this.start.transform.scaleX;
        const yStart = this.start.transform.scaleY;
        if (count.charAt(1) === '=') {
          tween.style.transform.scaleX = xStart + endVars * ratio;
          tween.style.transform.scaleY = yStart + endVars * ratio;
          return;
        }
        tween.style.transform.scaleX = (endVars - xStart) * ratio + xStart;
        tween.style.transform.scaleY = (endVars - yStart) * ratio + yStart;
        return;
      }
      if (count.charAt(1) === '=') {
        tween.style.transform[key] = startVars + endVars * ratio;
        return;
      }
      tween.style.transform[key] = (endVars - startVars) * ratio + startVars;
      return;
    } else if (Array.isArray(endVars)) {
      const _type = this.propsData.dataType[key];
      tween.style[key] = this.setArrayRatio(ratio, startVars, endVars, unit, _type);
      if (_type === 'string') {
        tween.style[key] = tween.style[key].join(this.propsData.dataSplitStr[key]);
      }
      return;
    }
    let styleUnit = stylesToCss(key, 0);
    styleUnit = typeof styleUnit === 'number' ? '' : styleUnit.replace(/[^a-z|%]/g, '');
    unit = unit || (cssList.filter.indexOf(key) >= 0 ? '' : styleUnit);
    if (count.charAt(1) === '=') {
      tween.style[key] = startVars + endVars * ratio + unit;
      return;
    }
    tween.style[key] = (endVars - startVars) * ratio + startVars + unit;
  });
  this.setAnimData(tween.style);
};
export default StylePlugin;
