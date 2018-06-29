webpackJsonp([16],{

/***/ 200:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(201);


/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rc_tween_one__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_dom__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_dom__);







var Demo = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default()(Demo, _React$Component);

  function Demo(props) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Demo);

    var _this = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default()(this, _React$Component.call(this, props));

    _this.onChange = function (e) {
      console.log(e.timelineMode); // eslint-disable-line no-console
    };

    _this.state = {
      children: [__WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        'div',
        { key: '1' },
        '\u4F9D\u6B21\u8FDB\u5165'
      ), __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        'div',
        { key: '2' },
        '\u4F9D\u6B21\u8FDB\u5165'
      )]
    };
    return _this;
  }

  Demo.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    setTimeout(function () {
      _this2.setState({
        children: [__WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          'div',
          { key: '1' },
          '121221'
        ), __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          'div',
          { key: '2' },
          '1122121'
        )]
      });
    }, 1000);
  };

  Demo.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_3_rc_tween_one__["b" /* default */],
      {
        animation: [{ translateX: 100, rotate: 10 }, { translateY: 100, translateX: 500, rotate: 0 }, { translateX: 0, marginTop: 100 }, { translateY: 0, marginLeft: 100 }, { marginLeft: 0, marginTop: 0 }],
        repeat: 3,
        yoyo: true,
        style: { height: 400 },
        onChange: this.onChange
      },
      this.state.children
    );
  };

  return Demo;
}(__WEBPACK_IMPORTED_MODULE_4_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_5_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ })

},[200]);
//# sourceMappingURL=timelineRepeat.js.map