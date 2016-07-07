webpackJsonp([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(187);


/***/ },

/***/ 187:
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
	      tweenData: { translateX: '100px', duration: 3000 },
	      childTweenData: { translateY: 200, duration: 1000 }
	    };
	    return _this;
	  }
	
	  Demo.prototype.componentDidMount = function componentDidMount() {
	    var _this2 = this;
	
	    setTimeout(function () {
	      _this2.setState({
	        tweenData: { opacity: 0.5, marginTop: 100, duration: 1000 }
	      });
	    }, 1000);
	    setTimeout(function () {
	      _this2.setState({
	        childTweenData: [{ translateY: 100 }, { rotateY: 180, duration: 1000 }, { rotateY: 0, duration: 1000 }, { delay: -800, translateY: 0 }]
	      });
	    }, 2000);
	  };
	
	  Demo.prototype.render = function render() {
	    return _react2.default.createElement(
	      _rcTweenOne2.default,
	      { animation: this.state.tweenData,
	        style: { height: 300, width: 60, textAlign: 'center' }
	      },
	      _react2.default.createElement(
	        'div',
	        null,
	        '大面包'
	      ),
	      _react2.default.createElement(
	        _rcTweenOne2.default,
	        { animation: this.state.childTweenData, key: 'tween' },
	        '小馒头'
	      )
	    );
	  };
	
	  return Demo;
	}(_react2.default.Component);
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=childrenUpdate.js.map