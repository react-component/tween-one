webpackJsonp([23],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(211);


/***/ },

/***/ 211:
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
	      _this2.testText = '变更后的样式:';
	      _this2.bool = false;
	    }, 1000);
	  };
	
	  Demo.prototype.onChange = function onChange(e) {
	    if (!this.bool) {
	      var text = _react2.default.createElement(
	        'div',
	        null,
	        this.testText + JSON.stringify(e.tween),
	        ', 当前时间 moment: ',
	        e.moment
	      );
	      if (this.state.test) {
	        text = _react2.default.createElement(
	          'div',
	          null,
	          this.state.test,
	          _react2.default.createElement(
	            'p',
	            null,
	            this.testText + JSON.stringify(e.tween),
	            ', 当前时间 moment: ',
	            e.moment
	          )
	        );
	      }
	      this.setState({
	        test: text
	      });
	      this.bool = true;
	    }
	  };
	
	  Demo.prototype.onClick = function onClick() {
	    this.setState({
	      style: { transform: 'translateY(10px)', marginLeft: 30, height: 300 },
	      animation: { translateY: 100, marginLeft: 100, duration: 1000 }
	    });
	    this.bool = false;
	  };
	
	  Demo.prototype.onClick2 = function onClick2() {
	    this.setState({
	      style: { transform: 'translateY(0px)', marginLeft: 130, height: 300 },
	      animation: { translateY: 200, marginLeft: 500, duration: 1000 }
	    });
	    this.bool = false;
	  };
	
	  Demo.prototype.render = function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'p',
	        null,
	        '在动画时, 变化 style, 将重新计算为 start '
	      ),
	      _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'button',
	          { onClick: this.onClick.bind(this) },
	          '点击改变样式'
	        ),
	        _react2.default.createElement(
	          'button',
	          { onClick: this.onClick2.bind(this) },
	          '点击改变样式2'
	        )
	      ),
	      _react2.default.createElement(
	        _rcTweenOne2.default,
	        { animation: this.state.animation,
	          style: this.state.style,
	          onChange: this.onChange.bind(this)
	        },
	        _react2.default.createElement(
	          'div',
	          null,
	          '变化的样式'
	        )
	      ),
	      _react2.default.createElement(
	        'div',
	        null,
	        this.state.test
	      )
	    );
	  };
	
	  return Demo;
	}(_react2.default.Component);
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=updateStyle.js.map