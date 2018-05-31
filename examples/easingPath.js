webpackJsonp([25],{

/***/ 185:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(84);


/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_tween_one__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_dom__);








var p1 = 'M0,100 L25,100 C34,20 40,0 100,0';
var p = 'M0,100 C5,120 25,130 25,100 C30,60 40,75 58,90 C69,98.5 83,99.5 100,100';
var t = __WEBPACK_IMPORTED_MODULE_4_rc_tween_one__["a" /* default */].easing.path(p);
var t1 = __WEBPACK_IMPORTED_MODULE_4_rc_tween_one__["a" /* default */].easing.path(p1);
var anim = [{
  repeatDelay: 1000,
  duration: 1000,
  scaleX: 0,
  scaleY: 2,
  repeat: -1,
  yoyo: true,
  ease: t
}, {
  repeatDelay: 1000,
  duration: 1000,
  y: -30,
  appearTo: 0,
  repeat: -1,
  yoyo: true,
  ease: t1
}];

var Demo = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Demo, _React$Component);

  function Demo() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Demo);

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Demo, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'div',
        { style: { height: 300 } },
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_rc_tween_one__["a" /* default */], {
          animation: anim,
          style: {
            position: 'absolute',
            opacity: 1,
            height: 50,
            width: 50,
            transform: 'translate(150px,150px)',
            background: '#000',
            transformOrigin: 'center bottom'
          }
        }),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('div', { style: { width: 100, height: 100, background: '#fff000', position: 'absolute' } }),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'svg',
          { style: { position: 'absolute' } },
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('path', { fill: 'none', stroke: '#000', d: p }),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('path', { d: p1, fill: 'none', stroke: '#000' })
        )
      );
    }
  }]);

  return Demo;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_6_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ })

},[185]);
//# sourceMappingURL=easingPath.js.map