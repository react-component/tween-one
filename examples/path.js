webpackJsonp([7],{

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_style_utils__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_style_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_style_utils__);




function PathPlugin(target, vars) {
  this.target = target;
  var path = typeof vars === 'string' ? vars : vars.x || vars.y || vars.rotate;
  this.vars = vars;
  this.path = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* parsePath */])(path);
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
  getAnimStart: function getAnimStart(computedStyle) {
    var transform = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_style_utils__["getTransform"])(computedStyle[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_style_utils__["checkStyleName"])('transform')]);
    this.start = transform;
    this.data = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, transform);
  },
  setRatio: function setRatio(r, t) {
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
    t.style.transform = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util__["j" /* getTransformValue */])(this.data);
  }
};

/* harmony default export */ __webpack_exports__["a"] = (PathPlugin);

/***/ }),

/***/ 202:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(94);


/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_tween_one__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_plugin_PathPlugin__ = __webpack_require__(112);








__WEBPACK_IMPORTED_MODULE_4_rc_tween_one__["a" /* default */].plugins.push(__WEBPACK_IMPORTED_MODULE_7__src_plugin_PathPlugin__["a" /* default */]);

var Demo = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Demo, _React$Component);

  function Demo() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Demo);

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Demo, [{
    key: 'render',
    value: function render() {
      var p = 'M50.952,85.619C31.729,84.841,23.557,73.62,24.095,42.952\n    c0.381-21.714,6.667-33.714,30.286-34.476\n    c36.572-1.18,59.81,77.714,102.667,76.381c30.108-0.937,34.268-32.381,34.095-41.714\n    C190.762,22.571,180.493,6.786,159.524,6C113.81,4.286,98,87.524,50.952,85.619z';
      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'div',
        { style: { position: 'relative', width: 200, margin: 'auto' } },
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_rc_tween_one__["a" /* default */], {
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
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'svg',
          null,
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('path', { fill: 'none', stroke: '#000', d: p })
        )
      );
    }
  }]);

  return Demo;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_6_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ })

},[202]);
//# sourceMappingURL=path.js.map