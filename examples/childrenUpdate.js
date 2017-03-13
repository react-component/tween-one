webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(280);


/***/ },

/***/ 280:
/***/ function(module, exports, __webpack_require__) {

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
	
	var _reactDom = __webpack_require__(119);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Demo = function (_React$Component) {
	  (0, _inherits3.default)(Demo, _React$Component);
	
	  function Demo() {
	    (0, _classCallCheck3.default)(this, Demo);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));
	
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
	        '\u5927\u9762\u5305'
	      ),
	      _react2.default.createElement(
	        _rcTweenOne2.default,
	        { animation: this.state.childTweenData, key: 'tween' },
	        '\u5C0F\u9992\u5934'
	      )
	    );
	  };
	
	  return Demo;
	}(_react2.default.Component);
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=childrenUpdate.js.map