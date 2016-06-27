/* eslint-disable func-names */
import { path2curve } from './snapsvglite';
const SvgPlugin = function (target, vars, key) {
  this.target = target;
  this.vars = vars;
  this.key = key;
  this.propsData = {};
};

const p = SvgPlugin.prototype = {
  name: 'SVGMorph',
};
p.getPointVars = function (d) {
  return d.split(/\s+/).map(item => item.split(',').map(_item => parseFloat(_item)));
};
p.polygonPoints = function (start, end) {
  const startArray = this.getPointVars(start);
  const endArray = this.getPointVars(end);
  if (startArray.length !== endArray.length) {
    const long = startArray.length > endArray.length ? startArray : endArray;
    const short = long === startArray ? endArray : startArray;
    for (let i = short.length; i < long.length; i++) {
      short[i] = short[short.length - 1];
    }
    return startArray.length > endArray.length ? [long, short] : [short, long];
  }
  return [startArray, endArray];
};
p.getAnimStart = function () {
  this.start = this.target.getAttribute(this.key);
  if (this.key === 'd') {
    this.pathArray = path2curve(this.start, this.vars);
  } else {
    this.pathArray = this.polygonPoints(this.start, this.vars);
  }
  return this.pathArray;
};
p.setArrayRatio = function (ratio, start, item, i) {
  if (typeof item === 'string') {
    return item;
  }
  const startData = start[i];
  return (item - startData) * ratio + startData;
};
p.setRatio = function (ratio, tween) {
  const start = this.pathArray[0];
  const end = this.pathArray[1];
  tween[this.key] = end.map((item, i) => {
    const startData = start[i];
    const t = item.map(this.setArrayRatio.bind(this, ratio, startData));
    const name = t[0];
    if (this.key === 'd') {
      t.shift();
    }
    return this.key === 'd' ? `${name}${t.join(',')}` : t.join(',');
  });
  let vars = ratio === 1 ? this.vars : tween[this.key].join(' ');
  vars = ratio === 0 ? this.start : vars;
  if (vars) {
    this.target.setAttribute(this.key, vars);
  }
};
export default SvgPlugin;
