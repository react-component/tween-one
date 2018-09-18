import {
  checkStyleName,
  getTransform,
  createMatrix,
} from 'style-utils';
import { windowIsUndefined, parsePath, getTransformValue } from '../util';

function PathPlugin(target, vars) {
  this.target = target;
  const path = typeof vars === 'string' ? vars : vars.x || vars.y || vars.rotate;
  this.vars = vars;
  this.path = windowIsUndefined ? null : parsePath(path);
  this.start = {};
  this.pathLength = this.path ? this.path.getTotalLength() : 0;
}

PathPlugin.prototype = {
  name: 'path',
  useStyle: 'transform',
  getPoint(offset) {
    const o = offset || 0;
    const p = this.pathLength * this.progress + o;
    return this.path ? this.path.getPointAtLength(p) : 0;
  },
  getAnimStart(computedStyle, isSvg) {
    const transform = getTransform(computedStyle[isSvg ?
      'transformSVG' : checkStyleName('transform')]);
    this.start = transform;
    this.data = { ...transform };
  },
  setRatio(r, t, computedStyle) {
    this.progress = r;
    const p = this.getPoint();
    const p0 = this.getPoint(-1);
    const p1 = this.getPoint(1);
    if (typeof this.vars === 'string') {
      this.data.translateX = p.x + this.start.translateX;
      this.data.translateY = p.y + this.start.translateY;
      this.data.rotate = Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
    } else {
      this.data.translateX = this.vars.x ? p.x + this.start.translateX : this.data.translateX;
      this.data.translateY = this.vars.y ? p.y + this.start.translateY : this.data.translateY;
      this.data.rotate = this.vars.rotate ?
        Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI : this.data.rotate;
    }
    t.style.transform = getTransformValue(this.data);
    if (computedStyle) {
      computedStyle.transformSVG = createMatrix(t.style.transform).toString();
    }
  },
};

export default PathPlugin;
