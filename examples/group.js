webpackJsonp([10],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(288);


/***/ },

/***/ 288:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(3);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(72);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _rcTweenOne = __webpack_require__(80);
	
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
	          '\u6267\u884C\u52A8\u6548'
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
	          '\u6267\u884C\u52A8\u6548'
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
	        '\u6267\u884C\u52A8\u6548'
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
	        '\u6267\u884C\u52A8\u6548'
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
	        '\u5207\u6362'
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