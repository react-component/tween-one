webpackJsonp([5],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(189);


/***/ },

/***/ 189:
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
	            '执行动效'
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

/***/ }

});
//# sourceMappingURL=control.js.map