webpackJsonp([9],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(191);


/***/ },

/***/ 191:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _rcTweenOne = __webpack_require__(2);
	
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
	        {
	          style: {
	            opacity: 1,
	            backgroundColor: '#000',
	            float: 'left',
	            height: 200
	          },
	          key: 'aa'
	        },
	        _react2.default.createElement(
	          'div',
	          null,
	          '执行动效'
	        )
	      ), _react2.default.createElement(
	        'div',
	        { key: 'a',
	          style: {
	            opacity: 1,
	            backgroundColor: '#000',
	            float: 'left',
	            height: 200
	          }
	        },
	        _react2.default.createElement(
	          'div',
	          null,
	          '执行动效'
	        )
	      )]
	    };
	    ['onClick', 'enterType', 'onEnd'].forEach(function (method) {
	      return _this[method] = _this[method].bind(_this);
	    });
	    return _this;
	  }
	
	  Demo.prototype.onClick = function onClick() {
	    var children = !this.state.children ? [_react2.default.createElement(
	      'div',
	      {
	        style: {
	          opacity: 1,
	          backgroundColor: '#000',
	          float: 'left',
	          height: 200
	        },
	        key: 'aa'
	      },
	      _react2.default.createElement(
	        'div',
	        null,
	        '执行动效'
	      )
	    ), _react2.default.createElement(
	      'div',
	      { key: 'a',
	        style: {
	          opacity: 1,
	          backgroundColor: '#000',
	          float: 'left',
	          height: 200
	        }
	      },
	      _react2.default.createElement(
	        'div',
	        null,
	        '执行动效'
	      )
	    )] : null;
	    this.setState({
	      children: children
	    });
	  };
	
	  Demo.prototype.onEnd = function onEnd(e) {
	    console.log(e); // eslint-disable-line no-console
	  };
	
	  Demo.prototype.enterType = function enterType(e) {
	    if (e.key === 'a') {
	      return { x: 100, opacity: 0, type: 'from' };
	    }
	    return { y: 80, opacity: 0, type: 'from' };
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
	        {
	          style: { height: 300 },
	          enter: this.enterType,
	          leave: [{ y: 90 }, { x: 100, opacity: 0 }],
	          onEnd: this.onEnd
	        },
	        this.state.children
	      )
	    );
	  };
	
	  return Demo;
	}(_react2.default.Component);
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=group.js.map