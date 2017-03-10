/* eslint-disable func-names, no-console */
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
import { startConvertToEndUnit, getTransformValue } from '../util.js';
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
  if (key.match(/colo|fill|storker/i)) {
    data.data[key] = parseColor(vars);
    data.dataType[key] = 'color';
  } else if (key.match(/shadow/i)) {
    data.data[key] = parseShadow(vars);
    data.dataType[key] = 'shadow';
  } else if (typeof vars === 'string' && vars.split(/[\s|,]/).length > 1) {
    data.data[key] = vars.split(/[\s|,]/);
    data.dataSplitStr[key] = vars.replace(/[^\s|,]/g, '');
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

    data.data[key] = data.data[key].map(_item =>
      !parseFloat(_item) && parseFloat(_item) !== 0 ? _item : parseFloat(_item)
    );
  } else {
    data.dataUnit[key] = data.data[key].toString().replace(/[^a-z|%]/g, '');
    data.dataCount[key] = data.data[key].toString().replace(/[^+|=|-]/g, '');
    const d = parseFloat(data.data[key].toString().replace(/[a-z|%|=]/g, ''));
    data.data[key] = !d && d !== 0 ? data.data[key] : d;
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
p.convertToMarksArray = function (unit, key, data, i) {
  const startUnit = data.toString().replace(/[^a-z|%]/g, '');
  const endUnit = unit[i];
  if (startUnit === endUnit) {
    return parseFloat(data);
  } else if (!parseFloat(data) && parseFloat(data) !== 0) {
    return data;
  }
  return startConvertToEndUnit(this.target, key, data,
    startUnit, endUnit, null, key === 'transformOrigin' && !i);
};
p.getAnimStart = function (willChangeBool) {
  const computedStyle = this.getComputedStyle();
  const style = {};
  this.supports3D = checkStyleName('perspective');
  let willChangeArray;
  if (willChangeBool) {
    this.willChange = computedStyle.willChange === 'auto' || !computedStyle.willChange ||
    computedStyle.willChange === 'none' ? '' : computedStyle.willChange;
    willChangeArray = this.willChange.split(',').filter(k => k);
  }
  Object.keys(this.propsData.data).forEach(key => {
    const cssName = isConvert(key);
    if (willChangeBool) {
      const willStyle = key in _plugin ? this.propsData.data[key].useStyle || cssName : cssName;
      if (willChangeArray.indexOf(willStyle) === -1 &&
        (willStyle in computedStyle || key in _plugin)) {
        willChangeArray.push(willStyle.replace(/([A-Z])/g, '-$1').toLocaleLowerCase());
      }
      this.willChange = willChangeArray.join(',');
    }
    let startData = computedStyle[cssName];
    const fixed = computedStyle.position === 'fixed';
    if (!startData || startData === 'none' || startData === 'auto') {
      startData = '';
    }
    let transform;
    let endUnit;
    let startUnit;
    if (key in _plugin) {
      if (key === 'bezier') {
        this.transform = checkStyleName('transform');
        startData = computedStyle[this.transform];
        style.transform = style.transform || getTransform(startData);
      }
      this.propsData.data[key].getAnimStart();
    } else if (cssName === 'transform') {
      this.transform = checkStyleName('transform');
      startData = computedStyle[this.transform];
      endUnit = this.propsData.dataUnit[key];
      transform = style.transform || getTransform(startData);
      if (endUnit && endUnit.match(/%|vw|vh|em|rem/i)) {
        const percent = key === 'translateX' ? 'xPercent' : 'yPercent';
        transform[percent] = startConvertToEndUnit(this.target, key, transform[key], null, endUnit);
        transform[key] = 0;
      }
      style.transform = transform;
    } else if (cssName === 'filter') {
      this.filterName = checkStyleName('filter') || 'filter';
      startData = computedStyle[this.filterName];
      this.filterObject = { ...this.filterObject, ...splitFilterToObject(startData) };
      startData = this.filterObject[key] || 0;
      startUnit = startData.toString().replace(/[^a-z|%]/g, '');
      endUnit = this.propsData.dataUnit[key];
      if (endUnit !== startUnit) {
        startData = startConvertToEndUnit(this.target, cssName,
          parseFloat(startData), startUnit, endUnit, fixed);
      }
      style[key] = parseFloat(startData);
    } else if (key.match(/color|fill/i) || key === 'stroke') {
      startData = !startData && key === 'stroke' ? 'rgba(255, 255, 255, 0)' : startData;
      style[cssName] = parseColor(startData);
    } else if (key.match(/shadow/i)) {
      startData = parseShadow(startData);
      endUnit = this.propsData.dataUnit[key];
      startData = startData.map(this.convertToMarksArray.bind(this, endUnit, key));
      style[cssName] = startData;
    } else if (Array.isArray(this.propsData.data[key])) {
      startData = startData.split(/[\s|,]/);
      endUnit = this.propsData.dataUnit[key];
      startData = startData.map(this.convertToMarksArray.bind(this, endUnit, key));
      style[cssName] = startData;
    } else {
      // 计算单位
      endUnit = this.propsData.dataUnit[cssName];
      startUnit = startData.toString().replace(/[^a-z|%]/g, '');
      if (endUnit !== startUnit) {
        startData = startConvertToEndUnit(this.target, cssName,
          parseFloat(startData), startUnit, endUnit, fixed);
      }
      style[cssName] = parseFloat(startData || 0);
    }
  });
  this.start = style;
  return style;
};
p.setArrayRatio = function (ratio, start, vars, unit, type) {
  if (type === 'color' && start.length === 4 && vars.length === 3) {
    vars[3] = 1;
  }
  const startInset = start.indexOf('inset') >= 0;
  const endInset = vars.indexOf('inset') >= 0;
  if (startInset && !endInset || endInset && !startInset) {
    throw console.error('Error: "box-shadow" inset have to exist');
  }
  const length = endInset ? 9 : 8;
  if (start.length === length && vars.length === length - 1) {
    vars.splice(3, 0, 0);
    unit.splice(3, 0, '');
  } else if (vars.length === length && start.length === length - 1) {
    start.splice(3, 0, 0);
  }
  const _vars = vars.map((endData, i) => {
    const startIsAlpha = type === 'color' && i === 3 && !start[i] ? 1 : 0;
    const startData = typeof start[i] === 'number' ? start[i] : startIsAlpha;
    if (typeof endData === 'string') {
      return endData;
    }
    return (endData - startData) * ratio + startData + (unit[i] || 0);
  });
  if (type === 'color') {
    return getColor(_vars);
  } else if (type === 'shadow') {
    const l = _vars.length === length ? 4 : 3;
    const s = _vars.slice(0, l).map(item => {
      if (typeof item === 'number') {
        return `${item}px`;
      }
      return item;
    });
    const c = _vars.slice(l, endInset ? _vars.length - 1 : _vars.length);
    const color = getColor(c);
    return `${s.join(' ')} ${color} ${endInset ? 'inset' : ''}`.trim();
  }
  return _vars;
};

p.setRatio = function (ratio, tween) {
  tween.style = tween.style || {};
  if (this.start.transform) {
    tween.style.transform = tween.style.transform || { ...this.start.transform };
  }
  const style = this.target.style;
  if (this.willChange) {
    if (ratio === (this.type === 'from' ? 0 : 1)) {
      style.willChange = null;
    } else {
      style.willChange = this.willChange;
    }
  }
  Object.keys(this.propsData.data).forEach(key => {
    const _isTransform = isTransform(key) === 'transform';
    let startVars = _isTransform ? this.start.transform[key] : this.start[key];
    const endVars = this.propsData.data[key];
    let unit = this.propsData.dataUnit[key];
    const count = this.propsData.dataCount[key];
    if (key in _plugin) {
      this.propsData.data[key].setRatio(ratio, tween);
      if (key === 'bezier') {
        style[this.transform] = getTransformValue(tween.style.transform, this.supports3D);
      } else {
        Object.keys(tween.style).forEach(css => style[css] = tween.style[css]);
      }
      return;
    } else if (_isTransform) {
      if (unit && unit.match(/%|vw|vh|em|rem/i)) {
        const pName = key === 'translateX' ? 'xPercent' : 'yPercent';
        startVars = this.start.transform[pName];
        if (count.charAt(1) === '=') {
          tween.style.transform[pName] = (startVars + endVars * ratio) + unit;
        } else {
          tween.style.transform[pName] = ((endVars - startVars) * ratio + startVars) + unit;
        }
      } else if (key === 'scale') {
        const xStart = this.start.transform.scaleX;
        const yStart = this.start.transform.scaleY;
        if (count.charAt(1) === '=') {
          tween.style.transform.scaleX = xStart + endVars * ratio;
          tween.style.transform.scaleY = yStart + endVars * ratio;
        } else {
          tween.style.transform.scaleX = (endVars - xStart) * ratio + xStart;
          tween.style.transform.scaleY = (endVars - yStart) * ratio + yStart;
        }
      }
      if (count.charAt(1) === '=') {
        tween.style.transform[key] = startVars + endVars * ratio;
      } else {
        tween.style.transform[key] = (endVars - startVars) * ratio + startVars;
      }
      style[this.transform] = getTransformValue(tween.style.transform, this.supports3D);
      return;
    } else if (Array.isArray(endVars)) {
      const _type = this.propsData.dataType[key];
      tween.style[key] = this.setArrayRatio(ratio, startVars, endVars, unit, _type);
      if (_type === 'string') {
        tween.style[key] = tween.style[key].join(this.propsData.dataSplitStr[key]);
      }
    } else {
      let styleUnit = stylesToCss(key, 0);
      styleUnit = typeof styleUnit === 'number' ? '' : styleUnit.replace(/[^a-z|%]/g, '');
      unit = unit || (cssList.filter.indexOf(key) >= 0 ? '' : styleUnit);
      if (typeof endVars === 'string') {
        tween.style[key] = endVars;
      } else {
        if (count.charAt(1) === '=') {
          tween.style[key] = startVars + endVars * ratio + unit;
        } else {
          tween.style[key] = (endVars - startVars) * ratio + startVars + unit;
        }
      }
    }
    if (cssList.filter.indexOf(key) >= 0) {
      if (!this.filterObject) {
        return;
      }
      this.filterObject[key] = tween.style[key];
      let filterStyle = '';
      Object.keys(this.filterObject).forEach(filterKey => {
        filterStyle += ` ${filterKey}(${this.filterObject[filterKey]})`;
      });
      style[this.filterName] = filterStyle.trim();
      return;
    }
    style[key] = tween.style[key];
  });
};
export default StylePlugin;
