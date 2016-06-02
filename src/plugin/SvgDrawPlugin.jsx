const SvgDrawPlugin = function(target, vars) {
  this.target = target;
  this.vars = vars;
  this.start = {};
  this.tagName = this.target.tagName.toLowerCase();
};
SvgDrawPlugin.prototype = {
  name: 'SVGDraw',
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
  getAnimStart() {
    // console.log(this.target.getTotalLength(), this.target.getBBox())
    const computedStyle = this.getComputedStyle();
    this.length = this.target.getTotalLength();
    this.start.strokeDasharray = computedStyle.strokeDasharray === 'none'
      ? '100% 100%' : computedStyle.strokeDasharray;
    this.start.strokeDashoffset = parseFloat(computedStyle.strokeDashoffset);
    this.start.strokeDasharray = this.setVars(this.start.strokeDasharray);
    this.vars = this.setVars(this.vars);
  },
  setRatio(r, t) {
    t.style.strokeDasharray = `${(this.vars.end - this.vars.start - this.start.strokeDasharray.start) * r + this.start.strokeDasharray.start}px, ${this.length}px`;
    t.style.strokeDashoffset = -((this.vars.start + this.start.strokeDashoffset) * r - this.start.strokeDashoffset);
  },
};
export default SvgDrawPlugin;
