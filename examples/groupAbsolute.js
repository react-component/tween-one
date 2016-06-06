webpackJsonp([10],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(192);


/***/ },

/***/ 192:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _rcTweenOne = __webpack_require__(2);
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(37);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	__webpack_require__(193);
	
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
	
	    _this.imgArray = ['https://os.alipayobjects.com/rmsportal/IhCNTqPpLeTNnwr.jpg', 'https://os.alipayobjects.com/rmsportal/uaQVvDrCwryVlbb.jpg'];
	    _this.state = {
	      int: 0
	    };
	    ['onClick'].forEach(function (method) {
	      return _this[method] = _this[method].bind(_this);
	    });
	    return _this;
	  }
	
	  Demo.prototype.onClick = function onClick() {
	    var int = this.state.int;
	    int++;
	    if (int >= this.imgArray.length) {
	      int = 0;
	    }
	    this.setState({ int: int });
	  };
	
	  Demo.prototype.render = function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'button',
	        { onClick: this.onClick },
	        '切换'
	      ),
	      _react2.default.createElement(
	        _rcTweenOne.TweenOneGroup,
	        null,
	        _react2.default.createElement(
	          'div',
	          { key: this.state.int },
	          _react2.default.createElement('img', { src: this.imgArray[this.state.int], height: '200' })
	        )
	      )
	    );
	  };
	
	  return Demo;
	}(_react2.default.Component);
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ },

/***/ 193:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=groupAbsolute.js.map