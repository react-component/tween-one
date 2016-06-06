webpackJsonp([20],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(206);


/***/ },

/***/ 206:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _rcTweenOne = __webpack_require__(2);
	
	var _rcTweenOne2 = _interopRequireDefault(_rcTweenOne);
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(37);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var Demo = function (_React$Component) {
	  _inherits(Demo, _React$Component);
	
	  function Demo() {
	    _classCallCheck(this, Demo);
	
	    var _this = _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	
	    _this.state = {
	      children: [_react2.default.createElement(
	        'div',
	        { key: '1' },
	        '依次进入'
	      ), _react2.default.createElement(
	        'div',
	        { key: '2' },
	        '依次进入'
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

/***/ }

});
//# sourceMappingURL=timeline.js.map