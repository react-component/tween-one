/* eslint-disable */
/**
 * Created by jljsj on 15/12/22.
 * The algorithm is GSAP BezierPlugin VERSION: beta 1.3.4
 */
import {
  checkStyleName,
  createMatrix,
  getTransform,
} from 'style-utils';
const _RAD2DEG = 180 / Math.PI;
const _r1 = [];
const _r2 = [];
const _r3 = [];
const _corProps = {};
const _correlate = ',x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,';

const GsapBezier = {
  Segment(a, b, c, d) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.da = d - a;
    this.ca = c - a;
    this.ba = b - a;
  },
  cubicToQuadratic(a, b, c, d) {
    const q1 = { a: a };
    const q2 = {};
    const q3 = {};
    const q4 = { c: d };
    const mab = (a + b) / 2;
    const mbc = (b + c) / 2;
    const mcd = (c + d) / 2;
    const mabc = (mab + mbc) / 2;
    const mbcd = (mbc + mcd) / 2;
    const m8 = (mbcd - mabc) / 8;
    q1.b = mab + (a - mab) / 4;
    q2.b = mabc + m8;
    q1.c = q2.a = (q1.b + q2.b) / 2;
    q2.c = q3.a = (mabc + mbcd) / 2;
    q3.b = mbcd - m8;
    q4.b = mcd + (d - mcd) / 4;
    q3.c = q4.a = (q3.b + q4.b) / 2;
    return [q1, q2, q3, q4];
  },
  calculateControlPoints(a, curviness, quad, basic, correlate) {
    const l = a.length - 1;
    let i;
    let ii = 0;
    let p1;
    let p2;
    let p3;
    let seg;
    let m1;
    let m2;
    let mm;
    let cp2;
    let qb;
    let r1;
    let r2;
    let tl;
    let cp1 = a[0].a;
    for (i = 0; i < l; i++) {
      seg = a[ii];
      p1 = seg.a;
      p2 = seg.d;
      p3 = a[ii + 1].d;

      if (correlate) {
        r1 = _r1[i];
        r2 = _r2[i];
        tl = ((r2 + r1) * curviness * 0.25) / (basic ? 0.5 : _r3[i] || 0.5);
        const _aa = (r1 !== 0 ? tl / r1 : 0);
        const _a = (basic ? curviness * 0.5 : _aa);
        m1 = p2 - (p2 - p1) * _a;
        const bb = (r2 !== 0 ? tl / r2 : 0);
        const b = (basic ? curviness * 0.5 : bb);
        m2 = p2 + (p3 - p2) * b;
        mm = p2 - (m1 + (((m2 - m1) * ((r1 * 3 / (r1 + r2)) + 0.5) / 4) || 0));
      } else {
        m1 = p2 - (p2 - p1) * curviness * 0.5;
        m2 = p2 + (p3 - p2) * curviness * 0.5;
        mm = p2 - (m1 + m2) / 2;
      }
      m1 += mm;
      m2 += mm;

      seg.c = cp2 = m1;
      if (i !== 0) {
        seg.b = cp1;
      } else {
        seg.b = cp1 = seg.a + (seg.c - seg.a) * 0.6;
      }

      seg.da = p2 - p1;
      seg.ca = cp2 - p1;
      seg.ba = cp1 - p1;

      if (quad) {
        qb = this.cubicToQuadratic(p1, cp1, cp2, p2);
        a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);
        ii += 4;
      } else {
        ii++;
      }

      cp1 = m2;
    }
    seg = a[ii];
    seg.b = cp1;
    seg.c = cp1 + (seg.d - cp1) * 0.4;
    seg.da = seg.d - seg.a;
    seg.ca = seg.c - seg.a;
    seg.ba = cp1 - seg.a;
    if (quad) {
      qb = this.cubicToQuadratic(seg.a, cp1, seg.c, seg.d);
      a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);
    }
  },
  parseAnchors(_values, p, correlate, prepend) {
    const a = [];
    let l;
    let i;
    let p1;
    let p2;
    let p3;
    let tmp;
    let values = _values;
    if (prepend) {
      values = [prepend].concat(values);
      i = values.length;
      while (--i > -1) {
        tmp = values[i][p];
        if (typeof tmp === 'string' && tmp.charAt(1) === '=') {
          values[i][p] = prepend[p] + Number(tmp.charAt(0) + tmp.substr(2));
        }
      }
    }
    l = values.length - 2;
    if (l < 0) {
      a[0] = new this.Segment(values[0][p], 0, 0, values[(l < -1) ? 0 : 1][p]);
      return a;
    }
    for (i = 0; i < l; i++) {
      p1 = values[i][p];
      p2 = values[i + 1][p];
      a[i] = new this.Segment(p1, 0, 0, p2);
      if (correlate) {
        p3 = values[i + 2][p];
        _r1[i] = (_r1[i] || 0) + (p2 - p1) * (p2 - p1);
        _r2[i] = (_r2[i] || 0) + (p3 - p2) * (p3 - p2);
      }
    }
    a[i] = new this.Segment(values[i][p], 0, 0, values[i + 1][p]);
    return a;
  },
  bezierThrough(_values, _curviness, quadratic, basic, __correlate, _prepend) {
    let values = _values;
    let curviness = _curviness;
    let correlate = __correlate;
    let prepend = _prepend;
    const obj = {};
    const props = [];
    const first = prepend || values[0];
    let i;
    let p;
    let a;
    let j;
    let r;
    let l;
    let seamless;
    let last;
    correlate = (typeof (correlate) === 'string') ? ',' + correlate + ',' : _correlate;
    if (curviness === null) {
      curviness = 1;
    }
    Object.keys(values[0]).forEach(key => {
      props.push(key);
    });
    if (values.length > 1) {
      last = values[values.length - 1];
      seamless = true;
      i = props.length;
      while (--i > -1) {
        p = props[i];
        if (Math.abs(first[p] - last[p]) > 0.05) {
          seamless = false;
          break;
        }
      }
      if (seamless) {
        values = values.concat();
        if (prepend) {
          values.unshift(prepend);
        }
        values.push(values[1]);
        prepend = values[values.length - 3];
      }
    }
    _r1.length = _r2.length = _r3.length = 0;
    i = props.length;
    while (--i > -1) {
      p = props[i];
      _corProps[p] = (correlate.indexOf(',' + p + ',') !== -1);
      obj[p] = this.parseAnchors(values, p, _corProps[p], prepend);
    }
    i = _r1.length;
    while (--i > -1) {
      _r1[i] = Math.sqrt(_r1[i]);
      _r2[i] = Math.sqrt(_r2[i]);
    }
    if (!basic) {
      i = props.length;
      while (--i > -1) {
        if (_corProps[p]) {
          a = obj[props[i]];
          l = a.length - 1;
          for (j = 0; j < l; j++) {
            r = a[j + 1].da / _r2[j] + a[j].da / _r1[j];
            _r3[j] = (_r3[j] || 0) + r * r;
          }
        }
      }
      i = _r3.length;
      while (--i > -1) {
        _r3[i] = Math.sqrt(_r3[i]);
      }
    }
    i = props.length;
    j = quadratic ? 4 : 1;
    while (--i > -1) {
      p = props[i];
      a = obj[p];
      this.calculateControlPoints(a, curviness, quadratic, basic, _corProps[p]);
      if (seamless) {
        a.splice(0, j);
        a.splice(a.length - j, j);
      }
    }
    return obj;
  },
  parseBezierData(data) {
    const values = data.vars.concat();
    const type = data.type;
    const prepend = data.startPoint;

    const obj = {};
    const inc = (type === 'cubic') ? 3 : 2;
    const soft = (type === 'soft');
    let a;
    let b;
    let c;
    let d;
    let cur;
    let l;
    let p;
    let cnt;
    let tmp;
    if (soft) {
      values.splice(0, 0, prepend);
    }

    if (values === null || values.length < inc + 1) {
      return console.error('invalid Bezier data');// eslint-disable-line
    }
    for (let i = 1; i >= 0; i--) {
      p = i ? 'x' : 'y';
      obj[p] = cur = [];
      cnt = 0;
      for (let j = 0; j < values.length; j++) {
        tmp = values[j][p];
        const _a = typeof tmp === 'string' && tmp.charAt(1) === '=' ?
          prepend[p] + Number(tmp.charAt(0) + tmp.substr(2)) : Number(tmp);
        a = (prepend === null) ? values[j][p] : _a;
        if (soft && j > 1 && j < values.length - 1) {
          cur[cnt++] = (a + cur[cnt - 2]) / 2;
        }
        cur[cnt++] = a;
      }
      l = cnt - inc + 1;
      cnt = 0;
      for (let jj = 0; jj < l; jj += inc) {
        a = cur[jj];
        b = cur[jj + 1];
        c = cur[jj + 2];
        d = (inc === 2) ? 0 : cur[jj + 3];
        cur[cnt++] = tmp = (inc === 3) ? new this.Segment(a, b, c, d) :
          new this.Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
      }
      cur.length = cnt;
    }
    return obj;
  },
  addCubicLengths(a, steps, resolution) {
    const inc = 1 / resolution;
    let j = a.length;
    let d;
    let d1;
    let s;
    let da;
    let ca;
    let ba;
    let p;
    let i;
    let inv;
    let bez;
    let index;
    while (--j > -1) {
      bez = a[j];
      s = bez.a;
      da = bez.d - s;
      ca = bez.c - s;
      ba = bez.b - s;
      d = d1 = 0;
      for (i = 1; i <= resolution; i++) {
        p = inc * i;
        inv = 1 - p;
        d = d1 - (d1 = (p * p * da + 3 * inv * (p * ca + inv * ba)) * p);
        index = j * resolution + i - 1;
        steps[index] = (steps[index] || 0) + d * d;
      }
    }
  },
  parseLengthData(obj, _resolution) {
    const resolution = _resolution || 6;
    const a = [];
    const lengths = [];
    const threshold = resolution - 1;
    const segments = [];
    let d = 0;
    let total = 0;
    let curLS = [];
    Object.keys(obj).forEach((key) => {
      this.addCubicLengths(obj[key], a, resolution);
    });
    a.forEach((c, i) => {
      d += Math.sqrt(c);
      let index = i % resolution;
      curLS[index] = d;
      if (index === threshold) {
        total += d;
        index = (i / resolution) >> 0;
        segments[index] = curLS;
        lengths[index] = total;
        d = 0;
        curLS = [];
      }
    });
    return { length: total, lengths: lengths, segments: segments };
  },
};

const Bezier = function (target, vars) {
  this.vars = this.getDefaultData(vars);
  this.target = target;
  this.transform = checkStyleName('transform');
};
Bezier.prototype = {
  name: 'bezier',
  useStyle: 'transform',
  getDefaultData(obj) {
    return {
      type: obj.type || 'soft',
      autoRotate: obj.autoRotate || false,
      vars: obj.vars || {},
      startPoint: null,
    };
  },
  init() {
    const vars = this.vars;
    const autoRotate = vars.autoRotate;
    this._timeRes = !vars.timeResolution ? 6 : parseInt(vars.timeResolution, 10);
    const a = (autoRotate === true) ? 0 : Number(autoRotate);
    const b = (autoRotate instanceof Array) ? autoRotate : [['x', 'y', 'rotation', (a || 0)]];
    this._autoRotate = autoRotate ? b : null;
    this._beziers = (vars.type !== 'cubic' && vars.type !== 'quadratic' && vars.type !== 'soft') ?
      GsapBezier.bezierThrough(vars.vars, isNaN(vars.curviness) ? 1 : vars.curviness, 
        false, (vars.type === 'thruBasic'), vars.correlate, vars.startPoint) :
      GsapBezier.parseBezierData(vars);
    this._segCount = this._beziers.x.length;
    if (this._timeRes) {
      const ld = GsapBezier.parseLengthData(this._beziers, this._timeRes);
      this._length = ld.length;
      this._lengths = ld.lengths;
      this._segments = ld.segments;
      this._l1 = this._li = this._s1 = this._si = 0;
      this._l2 = this._lengths[0];
      this._curSeg = this._segments[0];
      this._s2 = this._curSeg[0];
      this._prec = 1 / this._curSeg.length;
    }
  },
  set(v) {
    const segments = this._segCount;
    const XYobj = {};
    let curIndex;
    let inv;
    let i;
    let p;
    let b;
    let t;
    let val;
    let l;
    let lengths;
    let curSeg;
    let value;
    let rotate;
    if (!this._timeRes) {
      const _cur = (v >= 1) ? segments - 1 : (segments * v) >> 0;
      curIndex = (v < 0) ? 0 : _cur;
      t = (v - (curIndex * (1 / segments))) * segments;
    } else {
      lengths = this._lengths;
      curSeg = this._curSeg;
      value = v * this._length;
      i = this._li;
      if (value > this._l2 && i < segments - 1) {
        l = segments - 1;
        while (i < l && (this._l2 = lengths[++i]) <= value) { }
        this._l1 = lengths[i - 1];
        this._li = i;
        this._curSeg = curSeg = this._segments[i];
        this._s2 = curSeg[(this._s1 = this._si = 0)];
      } else if (value < this._l1 && i > 0) {
        while (i > 0 && (this._l1 = lengths[--i]) >= value) { }
        if (i === 0 && value < this._l1) {
          this._l1 = 0;
        } else {
          i++;
        }
        this._l2 = lengths[i];
        this._li = i;
        this._curSeg = curSeg = this._segments[i];
        this._s1 = curSeg[(this._si = curSeg.length - 1) - 1] || 0;
        this._s2 = curSeg[this._si];
      }
      curIndex = i;
      value -= this._l1;
      i = this._si;
      if (value > this._s2 && i < curSeg.length - 1) {
        l = curSeg.length - 1;
        while (i < l && (this._s2 = curSeg[++i]) <= value) { }
        this._s1 = curSeg[i - 1];
        this._si = i;
      } else if (value < this._s1 && i > 0) {
        while (i > 0 && (this._s1 = curSeg[--i]) >= value) { }
        if (i === 0 && value < this._s1) {
          this._s1 = 0;
        } else {
          i++;
        }
        this._s2 = curSeg[i];
        this._si = i;
      }
      t = ((i + (value - this._s1) / (this._s2 - this._s1)) * this._prec) || 0;
    }
    inv = 1 - t;
    for (i = 1; i >= 0; i--) {
      p = i ? 'x' : 'y';
      b = this._beziers[p][curIndex];
      val = (t * t * b.da + 3 * inv * (t * b.ca + inv * b.ba)) * t + b.a;
      XYobj[p] = val;
    }
    if (this._autoRotate) {
      const ar = this._autoRotate;
      let b2;
      let x1;
      let y1;
      let x2;
      let y2;
      let add;
      let conv;
      i = ar.length;
      while (--i > -1) {
        p = ar[i][2];
        add = ar[i][3] || 0;
        conv = (ar[i][4] === true) ? 1 : _RAD2DEG;
        b = this._beziers[ar[i][0]];
        b2 = this._beziers[ar[i][1]];

        if (b && b2) {
          b = b[curIndex];
          b2 = b2[curIndex];

          x1 = b.a + (b.b - b.a) * t;
          x2 = b.b + (b.c - b.b) * t;
          x1 += (x2 - x1) * t;
          x2 += ((b.c + (b.d - b.c) * t) - x2) * t;

          y1 = b2.a + (b2.b - b2.a) * t;
          y2 = b2.b + (b2.c - b2.b) * t;
          y1 += (y2 - y1) * t;
          y2 += ((b2.c + (b2.d - b2.c) * t) - y2) * t;
          const _r = Math.atan2(y2 - y1, x2 - x1) * conv;
          rotate = _r + add;
        }
      }
    }
    return rotate ? 'translate(' + XYobj.x + 'px,' + XYobj.y + 'px) rotate(' + rotate + 'deg)' : 'translate(' + XYobj.x + 'px,' + XYobj.y + 'px)';
  },
  getAnimStart(computedStyle, isSvg) {
    let transform = computedStyle[isSvg ? 'transformSVG' : this.transform];
    transform = transform === 'none' ? '' : transform;
    const matrix = createMatrix(transform);
    // this.startRotate = parseFloat((-Math.atan2(matrix.m21, matrix.m11) * _RAD2DEG).toFixed(2));
    this.vars.startPoint = { x: matrix.e, y: matrix.f };
    this.init();
  },
  setRatio(r, t, computedStyle) {
    const transform = getTransform(this.set(r));
    // 只覆盖 3 个属性；
    t.style.transform = {
      ...t.style.transform,
      translateX: transform.translateX,
      translateY: transform.translateY,
      rotate: transform.rotate,
    };
    if (computedStyle) {
      computedStyle.transformSVG = createMatrix(t.style.transform).toString();
    }
  },
};
Bezier.bezierThrough = GsapBezier.bezierThrough;
Bezier.cubicToQuadratic = GsapBezier.cubicToQuadratic;
Bezier.quadraticToCubic = (a, b, c) => {
  return new GsapBezier.Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
};

export default Bezier;
