webpackJsonp([16],{

/***/ 200:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(201);


/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rc_tween_one__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var Demo = function (_React$Component) {
  _inherits(Demo, _React$Component);

  function Demo(props) {
    _classCallCheck(this, Demo);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onChange = function (e) {
      console.log(e.timelineMode);
    };

    _this.state = {
      children: [__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'div',
        { key: '1' },
        '\u4F9D\u6B21\u8FDB\u5165'
      ), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
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
        children: [__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'div',
          { key: '1' },
          '121221'
        ), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'div',
          { key: '2' },
          '1122121'
        )]
      });
    }, 1000);
  };

  Demo.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_0_rc_tween_one__["b" /* default */],
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
}(__WEBPACK_IMPORTED_MODULE_1_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_2_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ })

},[200]);
//# sourceMappingURL=timelineRepeat.js.map