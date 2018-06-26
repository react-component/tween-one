webpackJsonp([8],{

/***/ 171:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(172);


/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rc_tween_one__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_plugin_PathPlugin__ = __webpack_require__(173);





__WEBPACK_IMPORTED_MODULE_0_rc_tween_one__["b" /* default */].plugins.push(__WEBPACK_IMPORTED_MODULE_3__src_plugin_PathPlugin__["a" /* default */]);

function Demo() {
  var p = 'M50.952,85.619C31.729,84.841,23.557,73.62,24.095,42.952\n    c0.381-21.714,6.667-33.714,30.286-34.476\n    c36.572-1.18,59.81,77.714,102.667,76.381c30.108-0.937,34.268-32.381,34.095-41.714\n    C190.762,22.571,180.493,6.786,159.524,6C113.81,4.286,98,87.524,50.952,85.619z';

  var p2 = "M0,0,L100, 0L100, 100L0, 100Z";
  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
    'div',
    { style: { position: 'relative', width: 200, margin: 'auto' } },
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_rc_tween_one__["b" /* default */], {
      animation: { duration: 3000, path: p, repeat: -1, ease: 'linear' },
      style: {
        opacity: 1,
        position: 'absolute',
        width: '30px',
        height: '30px',
        left: '-15px',
        top: '-15px',
        background: '#fff000'
      }
    }),
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_rc_tween_one__["b" /* default */], {
      animation: { duration: 3000, path: p2, repeat: -1, ease: 'linear' },
      style: {
        opacity: 1,
        position: 'absolute',
        width: '30px',
        height: '30px',
        left: '-15px',
        top: '-15px',
        background: '#fff000'
      }
    }),
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      'svg',
      null,
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('path', { fill: 'none', stroke: '#000', d: p }),
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('path', { fill: 'none', stroke: '#000', d: p2 })
    )
  );
}

__WEBPACK_IMPORTED_MODULE_2_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_style_utils__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_style_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_style_utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(23);




function PathPlugin(target, vars) {
  this.target = target;
  var path = typeof vars === 'string' ? vars : vars.x || vars.y || vars.rotate;
  this.vars = vars;
  this.path = Object(__WEBPACK_IMPORTED_MODULE_2__util__["g" /* parsePath */])(path);
  this.start = {};
  this.pathLength = this.path.getTotalLength();
}

PathPlugin.prototype = {
  name: 'path',
  useStyle: 'transform',
  getPoint: function getPoint(offset) {
    var o = offset || 0;
    var p = this.pathLength * this.progress + o;
    return this.path.getPointAtLength(p);
  },
  getAnimStart: function getAnimStart(computedStyle, isSvg) {
    var transform = Object(__WEBPACK_IMPORTED_MODULE_1_style_utils__["getTransform"])(computedStyle[isSvg ? 'transformSVG' : Object(__WEBPACK_IMPORTED_MODULE_1_style_utils__["checkStyleName"])('transform')]);
    this.start = transform;
    this.data = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, transform);
  },
  setRatio: function setRatio(r, t, computedStyle) {
    this.progress = r;
    var p = this.getPoint();
    var p0 = this.getPoint(-1);
    var p1 = this.getPoint(1);
    if (typeof this.vars === 'string') {
      this.data.translateX = p.x + this.start.translateX;
      this.data.translateY = p.y + this.start.translateY;
      this.data.rotate = Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
    } else {
      this.data.translateX = this.vars.x ? p.x + this.start.translateX : this.data.translateX;
      this.data.translateY = this.vars.y ? p.y + this.start.translateY : this.data.translateY;
      this.data.rotate = this.vars.rotate ? Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI : this.data.rotate;
    }
    t.style.transform = Object(__WEBPACK_IMPORTED_MODULE_2__util__["d" /* getTransformValue */])(this.data);
    if (computedStyle) {
      computedStyle.transformSVG = Object(__WEBPACK_IMPORTED_MODULE_1_style_utils__["createMatrix"])(t.style.transform).toString();
    }
  }
};

/* harmony default export */ __webpack_exports__["a"] = (PathPlugin);

/***/ })

},[171]);
//# sourceMappingURL=path.js.map