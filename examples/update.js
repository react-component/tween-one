webpackJsonp([12],{

/***/ 102:
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








var Demo = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Demo, _React$Component);

  function Demo() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Demo);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).apply(this, arguments));

    _this.testText = '刚开始的样式:';
    _this.state = {
      style: { opacity: 1, height: 200, marginLeft: 0, transform: 'translateY(0px)' },
      test: '',
      animation: { translateY: 200, marginLeft: 500, duration: 5000 }
    };
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Demo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        _this2.setState({
          style: { opacity: 1, height: 250, transform: 'translateY(100px)', marginLeft: 100 }
        });
        _this2.bool = false;
      }, 1000);
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      if (!this.bool) {
        var text = __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'div',
          null,
          ' \u5F53\u524D\u65F6\u95F4 moment: ',
          e.moment
        );
        if (this.state.test) {
          text = __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            'div',
            null,
            this.state.test,
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              'p',
              null,
              '\u5F53\u524D\u65F6\u95F4 moment: ',
              e.moment
            )
          );
        }
        this.setState({
          test: text
        });
        this.bool = true;
      }
    }
  }, {
    key: 'onClick',
    value: function onClick() {
      this.setState({
        style: { transform: 'translateY(10px)', marginLeft: 30, height: 300 },
        animation: { translateY: 100, marginLeft: 100, duration: 1000 }
      });
      this.bool = false;
    }
  }, {
    key: 'onClick2',
    value: function onClick2() {
      this.setState({
        style: { transform: 'translateY(0px)', marginLeft: 130, height: 300 },
        animation: { translateY: 200, marginLeft: 500, duration: 1000 }
      });
      this.bool = false;
    }
  }, {
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'p',
          null,
          '\u5728\u52A8\u753B\u65F6, \u53D8\u5316 style, \u5C06\u91CD\u65B0\u8BA1\u7B97\u4E3A start '
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'div',
          null,
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            'button',
            { onClick: this.onClick.bind(this) },
            '\u70B9\u51FB\u6539\u53D8\u6837\u5F0F'
          ),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            'button',
            { onClick: this.onClick2.bind(this) },
            '\u70B9\u51FB\u6539\u53D8\u6837\u5F0F2'
          )
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_4_rc_tween_one__["a" /* default */],
          { animation: this.state.animation,
            style: this.state.style,
            onChange: this.onChange.bind(this)
          },
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            'div',
            null,
            '\u53D8\u5316\u7684\u6837\u5F0F'
          )
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'div',
          null,
          this.state.test
        )
      );
    }
  }]);

  return Demo;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_6_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }),

/***/ 200:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(102);


/***/ })

},[200]);
//# sourceMappingURL=update.js.map