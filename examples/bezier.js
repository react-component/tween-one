webpackJsonp([12],{

/***/ 392:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(393);


/***/ }),

/***/ 393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rc_tween_one__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_plugin_BezierPlugin__ = __webpack_require__(448);





__WEBPACK_IMPORTED_MODULE_0_rc_tween_one__["b" /* default */].plugins.push(__WEBPACK_IMPORTED_MODULE_3__src_plugin_BezierPlugin__["a" /* default */]);
function Demo() {
  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
    'div',
    { style: { position: 'relative', height: 300 } },
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_0_rc_tween_one__["b" /* default */],
      {
        animation: {
          bezier: {
            type: 'thru', autoRotate: true,
            vars: [{ x: 200, y: 200 }, { x: 400, y: 0 }, { x: 600, y: 200 }, { x: 800, y: 0 }]
          },
          duration: 5000
        },
        style: { width: 100 }
      },
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'div',
        null,
        '\u6267\u884C\u52A8\u6548'
      )
    ),
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('div', {
      style: {
        width: 5, height: 5, background: '#000',
        position: 'absolute', top: 0, transform: 'translate(200px,200px)'
      }
    }),
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('div', {
      style: {
        width: 5, height: 5, background: '#000', position: 'absolute',
        top: 0, transform: 'translate(400px,0px)'
      }
    }),
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('div', {
      style: {
        width: 5, height: 5, background: '#000', position: 'absolute',
        top: 0, transform: 'translate(600px,200px)'
      }
    }),
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('div', {
      style: {
        width: 5, height: 5, background: '#000', position: 'absolute',
        top: 0, transform: 'translate(800px,0px)'
      }
    })
  );
}

__WEBPACK_IMPORTED_MODULE_2_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }),

/***/ 448:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_style_utils__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_style_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_style_utils__);
/* eslint-disable */
/**
 * Created by jljsj on 15/12/22.
 * The algorithm is GSAP BezierPlugin VERSION: beta 1.3.4
 */

var _RAD2DEG = 180 / Math.PI;
var _r1 = [];
var _r2 = [];
var _r3 = [];
var _corProps = {};
var _correlate = ',x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,';

var GsapBezier = {
  Segment: function Segment(a, b, c, d) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.da = d - a;
    this.ca = c - a;
    this.ba = b - a;
  },
  cubicToQuadratic: function cubicToQuadratic(a, b, c, d) {
    var q1 = { a: a };
    var q2 = {};
    var q3 = {};
    var q4 = { c: d };
    var mab = (a + b) / 2;
    var mbc = (b + c) / 2;
    var mcd = (c + d) / 2;
    var mabc = (mab + mbc) / 2;
    var mbcd = (mbc + mcd) / 2;
    var m8 = (mbcd - mabc) / 8;
    q1.b = mab + (a - mab) / 4;
    q2.b = mabc + m8;
    q1.c = q2.a = (q1.b + q2.b) / 2;
    q2.c = q3.a = (mabc + mbcd) / 2;
    q3.b = mbcd - m8;
    q4.b = mcd + (d - mcd) / 4;
    q3.c = q4.a = (q3.b + q4.b) / 2;
    return [q1, q2, q3, q4];
  },
  calculateControlPoints: function calculateControlPoints(a, curviness, quad, basic, correlate) {
    var l = a.length - 1;
    var i = void 0;
    var ii = 0;
    var p1 = void 0;
    var p2 = void 0;
    var p3 = void 0;
    var seg = void 0;
    var m1 = void 0;
    var m2 = void 0;
    var mm = void 0;
    var cp2 = void 0;
    var qb = void 0;
    var r1 = void 0;
    var r2 = void 0;
    var tl = void 0;
    var cp1 = a[0].a;
    for (i = 0; i < l; i++) {
      seg = a[ii];
      p1 = seg.a;
      p2 = seg.d;
      p3 = a[ii + 1].d;

      if (correlate) {
        r1 = _r1[i];
        r2 = _r2[i];
        tl = (r2 + r1) * curviness * 0.25 / (basic ? 0.5 : _r3[i] || 0.5);
        var _aa = r1 !== 0 ? tl / r1 : 0;
        var _a = basic ? curviness * 0.5 : _aa;
        m1 = p2 - (p2 - p1) * _a;
        var bb = r2 !== 0 ? tl / r2 : 0;
        var b = basic ? curviness * 0.5 : bb;
        m2 = p2 + (p3 - p2) * b;
        mm = p2 - (m1 + ((m2 - m1) * (r1 * 3 / (r1 + r2) + 0.5) / 4 || 0));
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
  parseAnchors: function parseAnchors(_values, p, correlate, prepend) {
    var a = [];
    var l = void 0;
    var i = void 0;
    var p1 = void 0;
    var p2 = void 0;
    var p3 = void 0;
    var tmp = void 0;
    var values = _values;
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
      a[0] = new this.Segment(values[0][p], 0, 0, values[l < -1 ? 0 : 1][p]);
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
  bezierThrough: function bezierThrough(_values, _curviness, quadratic, basic, __correlate, _prepend) {
    var values = _values;
    var curviness = _curviness;
    var correlate = __correlate;
    var prepend = _prepend;
    var obj = {};
    var props = [];
    var first = prepend || values[0];
    var i = void 0;
    var p = void 0;
    var a = void 0;
    var j = void 0;
    var r = void 0;
    var l = void 0;
    var seamless = void 0;
    var last = void 0;
    correlate = typeof correlate === 'string' ? ',' + correlate + ',' : _correlate;
    if (curviness === null) {
      curviness = 1;
    }
    Object.keys(values[0]).forEach(function (key) {
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
      _corProps[p] = correlate.indexOf(',' + p + ',') !== -1;
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
  parseBezierData: function parseBezierData(data) {
    var values = data.vars.concat();
    var type = data.type;
    var prepend = data.startPoint;

    var obj = {};
    var inc = type === 'cubic' ? 3 : 2;
    var soft = type === 'soft';
    var a = void 0;
    var b = void 0;
    var c = void 0;
    var d = void 0;
    var cur = void 0;
    var l = void 0;
    var p = void 0;
    var cnt = void 0;
    var tmp = void 0;
    if (soft) {
      values.splice(0, 0, prepend);
    }

    if (values === null || values.length < inc + 1) {
      return console.error('invalid Bezier data'); // eslint-disable-line
    }
    for (var i = 1; i >= 0; i--) {
      p = i ? 'x' : 'y';
      obj[p] = cur = [];
      cnt = 0;
      for (var j = 0; j < values.length; j++) {
        tmp = values[j][p];
        var _a = typeof tmp === 'string' && tmp.charAt(1) === '=' ? prepend[p] + Number(tmp.charAt(0) + tmp.substr(2)) : Number(tmp);
        a = prepend === null ? values[j][p] : _a;
        if (soft && j > 1 && j < values.length - 1) {
          cur[cnt++] = (a + cur[cnt - 2]) / 2;
        }
        cur[cnt++] = a;
      }
      l = cnt - inc + 1;
      cnt = 0;
      for (var jj = 0; jj < l; jj += inc) {
        a = cur[jj];
        b = cur[jj + 1];
        c = cur[jj + 2];
        d = inc === 2 ? 0 : cur[jj + 3];
        cur[cnt++] = tmp = inc === 3 ? new this.Segment(a, b, c, d) : new this.Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
      }
      cur.length = cnt;
    }
    return obj;
  },
  addCubicLengths: function addCubicLengths(a, steps, resolution) {
    var inc = 1 / resolution;
    var j = a.length;
    var d = void 0;
    var d1 = void 0;
    var s = void 0;
    var da = void 0;
    var ca = void 0;
    var ba = void 0;
    var p = void 0;
    var i = void 0;
    var inv = void 0;
    var bez = void 0;
    var index = void 0;
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
  parseLengthData: function parseLengthData(obj, _resolution) {
    var _this = this;

    var resolution = _resolution || 6;
    var a = [];
    var lengths = [];
    var threshold = resolution - 1;
    var segments = [];
    var d = 0;
    var total = 0;
    var curLS = [];
    Object.keys(obj).forEach(function (key) {
      _this.addCubicLengths(obj[key], a, resolution);
    });
    a.forEach(function (c, i) {
      d += Math.sqrt(c);
      var index = i % resolution;
      curLS[index] = d;
      if (index === threshold) {
        total += d;
        index = i / resolution >> 0;
        segments[index] = curLS;
        lengths[index] = total;
        d = 0;
        curLS = [];
      }
    });
    return { length: total, lengths: lengths, segments: segments };
  }
};

var Bezier = function Bezier(target, vars) {
  this.vars = this.getDefaultData(vars);
  this.target = target;
  this.transform = Object(__WEBPACK_IMPORTED_MODULE_0_style_utils__["checkStyleName"])('transform');
};
Bezier.prototype = {
  name: 'bezier',
  useStyle: 'transform',
  getDefaultData: function getDefaultData(obj) {
    return {
      type: obj.type || 'soft',
      autoRotate: obj.autoRotate || false,
      vars: obj.vars || {},
      startPoint: null
    };
  },
  init: function init() {
    var vars = this.vars;
    var autoRotate = vars.autoRotate;
    this._timeRes = !vars.timeResolution ? 6 : parseInt(vars.timeResolution, 10);
    var a = autoRotate === true ? 0 : Number(autoRotate);
    var b = autoRotate instanceof Array ? autoRotate : [['x', 'y', 'rotation', a || 0]];
    this._autoRotate = autoRotate ? b : null;
    this._beziers = vars.type !== 'cubic' && vars.type !== 'quadratic' && vars.type !== 'soft' ? GsapBezier.bezierThrough(vars.vars, isNaN(vars.curviness) ? 1 : vars.curviness, false, vars.type === 'thruBasic', vars.correlate, vars.startPoint) : GsapBezier.parseBezierData(vars);
    this._segCount = this._beziers.x.length;
    if (this._timeRes) {
      var ld = GsapBezier.parseLengthData(this._beziers, this._timeRes);
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
  set: function set(v) {
    var segments = this._segCount;
    var XYobj = {};
    var curIndex = void 0;
    var inv = void 0;
    var i = void 0;
    var p = void 0;
    var b = void 0;
    var t = void 0;
    var val = void 0;
    var l = void 0;
    var lengths = void 0;
    var curSeg = void 0;
    var value = void 0;
    var rotate = void 0;
    if (!this._timeRes) {
      var _cur = v >= 1 ? segments - 1 : segments * v >> 0;
      curIndex = v < 0 ? 0 : _cur;
      t = (v - curIndex * (1 / segments)) * segments;
    } else {
      lengths = this._lengths;
      curSeg = this._curSeg;
      value = v * this._length;
      i = this._li;
      if (value > this._l2 && i < segments - 1) {
        l = segments - 1;
        while (i < l && (this._l2 = lengths[++i]) <= value) {}
        this._l1 = lengths[i - 1];
        this._li = i;
        this._curSeg = curSeg = this._segments[i];
        this._s2 = curSeg[this._s1 = this._si = 0];
      } else if (value < this._l1 && i > 0) {
        while (i > 0 && (this._l1 = lengths[--i]) >= value) {}
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
        while (i < l && (this._s2 = curSeg[++i]) <= value) {}
        this._s1 = curSeg[i - 1];
        this._si = i;
      } else if (value < this._s1 && i > 0) {
        while (i > 0 && (this._s1 = curSeg[--i]) >= value) {}
        if (i === 0 && value < this._s1) {
          this._s1 = 0;
        } else {
          i++;
        }
        this._s2 = curSeg[i];
        this._si = i;
      }
      t = (i + (value - this._s1) / (this._s2 - this._s1)) * this._prec || 0;
    }
    inv = 1 - t;
    for (i = 1; i >= 0; i--) {
      p = i ? 'x' : 'y';
      b = this._beziers[p][curIndex];
      val = (t * t * b.da + 3 * inv * (t * b.ca + inv * b.ba)) * t + b.a;
      XYobj[p] = val;
    }
    if (this._autoRotate) {
      var ar = this._autoRotate;
      var b2 = void 0;
      var x1 = void 0;
      var y1 = void 0;
      var x2 = void 0;
      var y2 = void 0;
      var add = void 0;
      var conv = void 0;
      i = ar.length;
      while (--i > -1) {
        p = ar[i][2];
        add = ar[i][3] || 0;
        conv = ar[i][4] === true ? 1 : _RAD2DEG;
        b = this._beziers[ar[i][0]];
        b2 = this._beziers[ar[i][1]];

        if (b && b2) {
          b = b[curIndex];
          b2 = b2[curIndex];

          x1 = b.a + (b.b - b.a) * t;
          x2 = b.b + (b.c - b.b) * t;
          x1 += (x2 - x1) * t;
          x2 += (b.c + (b.d - b.c) * t - x2) * t;

          y1 = b2.a + (b2.b - b2.a) * t;
          y2 = b2.b + (b2.c - b2.b) * t;
          y1 += (y2 - y1) * t;
          y2 += (b2.c + (b2.d - b2.c) * t - y2) * t;
          var _r = Math.atan2(y2 - y1, x2 - x1) * conv;
          rotate = _r + add;
        }
      }
    }
    return rotate ? 'translate(' + XYobj.x + 'px,' + XYobj.y + 'px) rotate(' + rotate + 'deg)' : 'translate(' + XYobj.x + 'px,' + XYobj.y + 'px)';
  },
  getAnimStart: function getAnimStart(computedStyle, isSvg) {
    var transform = computedStyle[isSvg ? 'transformSVG' : this.transform];
    transform = transform === 'none' ? '' : transform;
    var matrix = Object(__WEBPACK_IMPORTED_MODULE_0_style_utils__["createMatrix"])(transform);
    // this.startRotate = parseFloat((-Math.atan2(matrix.m21, matrix.m11) * _RAD2DEG).toFixed(2));
    this.vars.startPoint = { x: matrix.e, y: matrix.f };
    this.init();
  },
  setRatio: function setRatio(r, t, computedStyle) {
    t.style.transform = this.set(r);
    if (computedStyle) {
      computedStyle.transformSVG = Object(__WEBPACK_IMPORTED_MODULE_0_style_utils__["createMatrix"])(t.style.transform).toString();
    }
  }
};
Bezier.bezierThrough = GsapBezier.bezierThrough;
Bezier.cubicToQuadratic = GsapBezier.cubicToQuadratic;
Bezier.quadraticToCubic = function (a, b, c) {
  return new GsapBezier.Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
};

/* harmony default export */ __webpack_exports__["a"] = (Bezier);

/***/ })

},[392]);
//# sourceMappingURL=bezier.js.map