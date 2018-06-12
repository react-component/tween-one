webpackJsonp([14],{

/***/ 204:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(205);


/***/ }),

/***/ 205:
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
      if (!_this.bool) {
        var text = __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'div',
          null,
          ' \u5F53\u524D\u65F6\u95F4 moment: ',
          e.moment
        );
        if (_this.state.test) {
          text = __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'div',
            null,
            _this.state.test,
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'p',
              null,
              '\u5F53\u524D\u65F6\u95F4 moment: ',
              e.moment
            )
          );
        }
        _this.setState({
          test: text
        });
        _this.bool = true;
      }
    };

    _this.onClick = function () {
      _this.setState({
        style: { transform: 'translateY(10px)', marginLeft: 30, height: 300 },
        animation: { translateY: 100, marginLeft: 100, duration: 1000 }
      });
      _this.bool = false;
    };

    _this.onClick2 = function () {
      _this.setState({
        style: { transform: 'translateY(0px)', marginLeft: 130, height: 300 },
        animation: { translateY: 200, marginLeft: 500, duration: 1000 }
      });
      _this.bool = false;
    };

    _this.testText = '刚开始的样式:';
    _this.state = {
      style: { opacity: 1, height: 200, marginLeft: 0, transform: 'translateY(0px)' },
      test: '',
      animation: { translateY: 200, marginLeft: 500, duration: 5000 }
    };
    return _this;
  }

  Demo.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    setTimeout(function () {
      _this2.setState({
        style: { opacity: 1, height: 250, transform: 'translateY(100px)', marginLeft: 100 }
      });
      _this2.bool = false;
    }, 1000);
  };

  Demo.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      'div',
      null,
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'p',
        null,
        '\u5728\u52A8\u753B\u65F6, \u53D8\u5316 style, \u5C06\u91CD\u65B0\u8BA1\u7B97\u4E3A start '
      ),
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'button',
          { onClick: this.onClick },
          '\u70B9\u51FB\u6539\u53D8\u6837\u5F0F'
        ),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'button',
          { onClick: this.onClick2 },
          '\u70B9\u51FB\u6539\u53D8\u6837\u5F0F2'
        )
      ),
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_0_rc_tween_one__["b" /* default */],
        { animation: this.state.animation,
          style: this.state.style,
          onChange: this.onChange
        },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'div',
          null,
          '\u53D8\u5316\u7684\u6837\u5F0F'
        )
      ),
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'div',
        null,
        this.state.test
      )
    );
  };

  return Demo;
}(__WEBPACK_IMPORTED_MODULE_1_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_2_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ })

},[204]);
//# sourceMappingURL=update.js.map