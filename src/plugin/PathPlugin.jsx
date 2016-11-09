import { parsePath, getTransformValue } from '../util';
import {
  checkStyleName,
  getTransform,
} from 'style-utils';

const PathPlugin = function (target, vars) {
  this.target = target;
  const path = typeof vars === 'string' ? vars : vars.x || vars.y || vars.rotate;
  this.vars = vars;
  this.path = parsePath(path);
  this.start = {};
  this.pathLength = this.path.getTotalLength();
};

PathPlugin.prototype = {
  name: 'path',
  useStyle: 'transform',
  getComputedStyle() {
    return document.defaultView ? document.defaultView.getComputedStyle(this.target) : {};
  },
  getPoint(offset) {
    const o = offset || 0;
    const p = this.pathLength * this.progress + o;
    return this.path.getPointAtLength(p);
  },
  getAnimStart() {
    const computedStyle = this.getComputedStyle();
    const transform = getTransform(computedStyle[checkStyleName('transform')]);
    this.start = transform;
    this.data = { ...transform };
  },
  setRatio(r, t) {
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
  },
};

export default PathPlugin;
