webpackJsonp([28],{

/***/ 147:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(148);


/***/ }),

/***/ 148:
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

    _this.onPlay = function () {
      _this.setState({
        paused: false,
        reverse: false,
        moment: null
      });
    };

    _this.onPause = function () {
      _this.setState({
        paused: true,
        moment: null
      });
    };

    _this.onReverse = function () {
      _this.setState({
        reverse: true,
        reverseDelay: 0,
        paused: false,
        moment: null
      });
    };

    _this.onReverseDelay = function () {
      _this.setState({
        reverse: true,
        reverseDelay: 1000,
        paused: false,
        moment: null
      });
    };

    _this.onRestart = function () {
      _this.setState({
        moment: 0,
        paused: false,
        reverse: false
      });
    };

    _this.onMoment = function () {
      _this.setState({
        moment: 500
      });
    };

    _this.state = {
      paused: true,
      reverse: false,
      reverseDelay: 0
    };
    return _this;
  }

  Demo.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      'div',
      null,
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'div',
        { style: { height: 200 } },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_0_rc_tween_one__["b" /* default */],
          { animation: [{ translateX: '500px', duration: 1000 }, { y: 100 }, { x: 100 }],
            paused: this.state.paused,
            reverse: this.state.reverse,
            reverseDelay: this.state.reverseDelay,
            moment: this.state.moment,
            style: { opacity: 1, width: 100, transform: 'translate(50px,30px)' }
          },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'div',
            null,
            '\u6267\u884C\u52A8\u6548'
          )
        )
      ),
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'button',
        { onClick: this.onPlay },
        'play'
      ),
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'button',
        { onClick: this.onPause },
        'pause'
      ),
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'button',
        { onClick: this.onReverse },
        'reverse'
      ),
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'button',
        { onClick: this.onReverseDelay },
        'reverse Delay 1000'
      ),
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'button',
        { onClick: this.onRestart },
        'restart'
      ),
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'button',
        { onClick: this.onMoment },
        'moment to 500'
      )
    );
  };

  return Demo;
}(__WEBPACK_IMPORTED_MODULE_1_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_2_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ })

},[147]);
//# sourceMappingURL=control.js.map