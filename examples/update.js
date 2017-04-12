webpackJsonp([26],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(328);


/***/ },

/***/ 328:
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
	
	var _reactDom = __webpack_require__(125);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Demo = function (_React$Component) {
	  (0, _inherits3.default)(Demo, _React$Component);
	
	  function Demo() {
	    (0, _classCallCheck3.default)(this, Demo);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));
	
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
	
	  Demo.prototype.onChange = function onChange(e) {
	    if (!this.bool) {
	      var text = _react2.default.createElement(
	        'div',
	        null,
	        ' \u5F53\u524D\u65F6\u95F4 moment: ',
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
	            '\u5F53\u524D\u65F6\u95F4 moment: ',
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
	        '\u5728\u52A8\u753B\u65F6, \u53D8\u5316 style, \u5C06\u91CD\u65B0\u8BA1\u7B97\u4E3A start '
	      ),
	      _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'button',
	          { onClick: this.onClick.bind(this) },
	          '\u70B9\u51FB\u6539\u53D8\u6837\u5F0F'
	        ),
	        _react2.default.createElement(
	          'button',
	          { onClick: this.onClick2.bind(this) },
	          '\u70B9\u51FB\u6539\u53D8\u6837\u5F0F2'
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
	          '\u53D8\u5316\u7684\u6837\u5F0F'
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
//# sourceMappingURL=update.js.map