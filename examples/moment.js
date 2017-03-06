webpackJsonp([13,29],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(292);


/***/ },

/***/ 292:
/***/ function(module, exports) {

	'use strict';
	
	var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = require('babel-runtime/helpers/inherits');
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _rcTweenOne = require('rc-tween-one');
	
	var _rcTweenOne2 = _interopRequireDefault(_rcTweenOne);
	
	var _react = require('react');
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = require('react-dom');
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Demo = function (_React$Component) {
	  (0, _inherits3.default)(Demo, _React$Component);
	
	  function Demo() {
	    (0, _classCallCheck3.default)(this, Demo);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));
	
	    _this.state = {
	      moment: 2500 };
	    return _this;
	  }
	
	  Demo.prototype.componentDidMount = function componentDidMount() {
	    var _this2 = this;
	
	    setTimeout(function () {
	      _this2.setState({
	        moment: 200
	      });
	    }, 1000);
	  };
	
	  Demo.prototype.render = function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'div',
	        null,
	        'moment\u521D\u59CB\u4E3A2500,\u6240\u4EE5\u7B2C\u4E00\u4E2A\u65F6\u95F4\u5DF2\u8FC7,\u800C\u4E14\u7B2C\u4E8C\u4E2A\u5DF2\u64AD\u4E862000'
	      ),
	      _react2.default.createElement(
	        _rcTweenOne2.default,
	        {
	          animation: [{ marginLeft: '500px', duration: 1500 }, { y: 300, duration: 5000 }],
	          moment: this.state.moment,
	          style: { opacity: 1, height: 500, transform: 'translate(50px,30px)' }
	        },
	        _react2.default.createElement(
	          'div',
	          null,
	          '\u6267\u884C\u52A8\u6548'
	        )
	      )
	    );
	  };
	
	  return Demo;
	}(_react2.default.Component);
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=moment.js.map