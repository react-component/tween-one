webpackJsonp([4],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(290);


/***/ }),

/***/ 290:
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
	
	var _reactDom = __webpack_require__(126);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Demo = function (_React$Component) {
	  (0, _inherits3.default)(Demo, _React$Component);
	
	  function Demo() {
	    (0, _classCallCheck3.default)(this, Demo);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));
	
	    _this.state = {
	      paused: true,
	      reverse: false,
	      reverseDelay: 0,
	      restart: false
	    };
	    ['onPlay', 'onPause', 'onReverse', 'onReverseDelay', 'onRestart', 'onMoment'].forEach(function (method) {
	      return _this[method] = _this[method].bind(_this);
	    });
	    return _this;
	  }
	
	  Demo.prototype.onPlay = function onPlay() {
	    this.setState({
	      paused: false,
	      reverse: false,
	      moment: null
	    });
	  };
	
	  Demo.prototype.onPause = function onPause() {
	    this.setState({
	      paused: true,
	      moment: null
	    });
	  };
	
	  Demo.prototype.onReverse = function onReverse() {
	    this.setState({
	      reverse: true,
	      reverseDelay: 0,
	      paused: false,
	      moment: null
	    });
	  };
	
	  Demo.prototype.onReverseDelay = function onReverseDelay() {
	    this.setState({
	      reverse: true,
	      reverseDelay: 1000,
	      paused: false,
	      moment: null
	    });
	  };
	
	  Demo.prototype.onRestart = function onRestart() {
	    this.setState({
	      moment: 0,
	      paused: false,
	      reverse: false
	    });
	  };
	
	  Demo.prototype.onMoment = function onMoment() {
	    this.setState({
	      moment: 500
	    });
	  };
	
	  Demo.prototype.render = function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'div',
	        { style: { height: 200 } },
	        _react2.default.createElement(
	          _rcTweenOne2.default,
	          { animation: [{ translateX: '500px', duration: 1000 }, { y: 100 }, { x: 100 }],
	            paused: this.state.paused,
	            reverse: this.state.reverse,
	            reverseDelay: this.state.reverseDelay,
	            moment: this.state.moment,
	            style: { opacity: 1, width: 100, transform: 'translate(50px,30px)' }
	          },
	          _react2.default.createElement(
	            'div',
	            null,
	            '\u6267\u884C\u52A8\u6548'
	          )
	        )
	      ),
	      _react2.default.createElement(
	        'button',
	        { onClick: this.onPlay },
	        'play'
	      ),
	      _react2.default.createElement(
	        'button',
	        { onClick: this.onPause },
	        'pause'
	      ),
	      _react2.default.createElement(
	        'button',
	        { onClick: this.onReverse },
	        'reverse'
	      ),
	      _react2.default.createElement(
	        'button',
	        { onClick: this.onReverseDelay },
	        'reverse Delay 1000'
	      ),
	      _react2.default.createElement(
	        'button',
	        { onClick: this.onRestart },
	        'restart'
	      ),
	      _react2.default.createElement(
	        'button',
	        { onClick: this.onMoment },
	        'moment to 500'
	      )
	    );
	  };
	
	  return Demo;
	}(_react2.default.Component);
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ })

});
//# sourceMappingURL=control.js.map