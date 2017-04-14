webpackJsonp([24],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(333);


/***/ }),

/***/ 333:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(3);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(72);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _rcTweenOne = __webpack_require__(80);
	
	var _rcTweenOne2 = _interopRequireDefault(_rcTweenOne);
	
	var _react = __webpack_require__(88);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(125);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Demo = function (_React$Component) {
	  (0, _inherits3.default)(Demo, _React$Component);
	
	  function Demo() {
	    (0, _classCallCheck3.default)(this, Demo);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));
	
	    _this.state = {
	      children: [_react2.default.createElement(
	        'div',
	        { key: '1' },
	        '\u4F9D\u6B21\u8FDB\u5165'
	      ), _react2.default.createElement(
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
	        children: [_react2.default.createElement(
	          'div',
	          { key: '1' },
	          '121221'
	        ), _react2.default.createElement(
	          'div',
	          { key: '2' },
	          '1122121'
	        )]
	      });
	    }, 1000);
	  };
	
	  Demo.prototype.render = function render() {
	    return _react2.default.createElement(
	      _rcTweenOne2.default,
	      {
	        animation: [{ translateX: 100, rotate: 10 }, { translateY: 100, translateX: 500, rotate: 0 }, { translateX: 0, marginTop: 100 }, { translateY: 0, marginLeft: 100 }, { marginLeft: 0, marginTop: 0 }],
	        style: { height: 400 }
	      },
	      this.state.children
	    );
	  };
	
	  return Demo;
	}(_react2.default.Component);
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ })

});
//# sourceMappingURL=timeline.js.map