/* eslint-disable func-names */
const SvgDrawPlugin = function (target, vars) {
  this.target = target;
  this.vars = vars;
  this.start = {};
  this.tagName = this.target.tagName.toLowerCase();
};
SvgDrawPlugin.prototype = {
  name: 'SVGDraw',
  useStyle: 'stroke-dasharray, stroke-dashoffset',
  setVars(vars) {
    const _vars = { start: 0 };
    if (typeof vars === 'number') {
      _vars.end = vars;
      return _vars;
    }
    const data = vars.split(' ');
    if (data.length > 1) {
      _vars.start = data[0].indexOf('%') >= 0 ?
      parseFloat(data[0]) / 100 * this.length : parseFloat(data[0]);
      _vars.end = data[1].indexOf('%') >= 0 ?
      parseFloat(data[1]) / 100 * this.length : parseFloat(data[1]);
    } else if (parseFloat(vars)) {
      _vars.end = vars.indexOf('%') >= 0 ?
      parseFloat(vars) / 100 * this.length : parseFloat(vars);
    } else {
      throw new Error(`SVGDraw data[${vars}] error.`);
    }
    return _vars;
  },
  getComputedStyle() {
    return document.defaultView ? document.defaultView.getComputedStyle(this.target) : {};
  },
  getLineLength(x1, y1, x2, y2) {
    const _x2 = parseFloat(x2) - parseFloat(x1);
    const _y2 = parseFloat(y2) - parseFloat(y1);
    return Math.sqrt(_x2 * _x2 + _y2 * _y2);
  },
  getPolyLength(name) {
    // .match(/(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi)
    const pointsArray = (this.target.getAttribute('points') || '').split(/\s+/)
      .map(item => item.split(',').map(n => parseFloat(n)));
    if (name === 'polygon') {
      pointsArray.push(pointsArray[0]);
    }
    let length = 0;
    pointsArray.forEach((item, i) => {
      if (i < pointsArray.length - 1) {
        const nextPoint = pointsArray[i + 1];
        length += this.getLineLength(item[0], item[1], nextPoint[0], nextPoint[1]);
      }
    });
    return length;
  },
  getEllipseLength() {
    const rx = parseFloat(this.target.getAttribute('rx'));
    const ry = parseFloat(this.target.getAttribute('ry'));
    if (!rx || !ry) {
      throw new Error(`ellipse rx or ry error.`);
    }
    return Math.PI * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (3 * ry + rx)));
  },
  getAnimStart() {
    const computedStyle = this.getComputedStyle();
    switch (this.tagName) {
      case 'rect':
        this.length = this.target.getAttribute('width') * 2 +
          this.target.getAttribute('height') * 2;
        break;
      case 'circle':
        this.length = Math.PI * 2 * this.target.getAttribute('r');
        break;
      case 'line':
        this.length = this.getLineLength(this.target.getAttribute('x1'),
          this.target.getAttribute('y1'), this.target.getAttribute('x2'),
          this.target.getAttribute('y2'));
        break;
      case 'polyline':
      case 'polygon':
        this.length = this.getPolyLength(this.tagName);
        break;
      case 'ellipse':
        this.length = this.getEllipseLength();
        break;
      default:
        this.length = this.target.getTotalLength();
        break;
    }
    this.start.strokeDasharray = computedStyle.strokeDasharray === 'none'
      ? '100% 100%' : computedStyle.strokeDasharray;
    this.start.strokeDashoffset = parseFloat(computedStyle.strokeDashoffset);
    this.start.strokeDasharray = this.setVars(this.start.strokeDasharray);
    this.vars = this.setVars(this.vars);
  },
  setRatio(r, t) {
    t.style.strokeDasharray = `${(this.vars.end - this.vars.start -
      this.start.strokeDasharray.start) * r +
      this.start.strokeDasharray.start}px, ${this.length}px`;
    t.style.strokeDashoffset = -((this.vars.start + this.start.strokeDashoffset) * r
      - this.start.strokeDashoffset);
  },
};
export default SvgDrawPlugin;
