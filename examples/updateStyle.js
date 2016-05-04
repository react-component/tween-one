webpackJsonp([17],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(195);


/***/ },

/***/ 195:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _rcTweenOne = __webpack_require__(2);
	
	var _rcTweenOne2 = _interopRequireDefault(_rcTweenOne);
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(36);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var Demo = (function (_React$Component) {
	  _inherits(Demo, _React$Component);
	
	  function Demo() {
	    _classCallCheck(this, Demo);
	
	    _get(Object.getPrototypeOf(Demo.prototype), 'constructor', this).apply(this, arguments);
	    this.testText = '刚开始的样式:';
	    this.state = {
	      style: { opacity: 1, height: 200, marginLeft: 0, transform: 'translateY(0px)' },
	      test: '',
	      animation: { translateY: 200, marginLeft: 500, duration: 5000 }
	    };
	  }
	
	  _createClass(Demo, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this = this;
	
	      setTimeout(function () {
	        _this.setState({
	          style: { opacity: 1, height: 250, transform: 'translateY(100px)', marginLeft: 100 }
	        });
	        _this.testText = '变更后的样式:';
	        _this.bool = false;
	      }, 1000);
	    }
	  }, {
	    key: 'onChange',
	    value: function onChange(e) {
	      if (!this.bool) {
	        var text = _react2['default'].createElement(
	          'div',
	          null,
	          this.testText + JSON.stringify(e.tween),
	          ', 当前时间 moment: ',
	          e.moment
	        );
	        if (this.state.test) {
	          text = _react2['default'].createElement(
	            'div',
	            null,
	            this.state.test,
	            _react2['default'].createElement(
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
	    }
	  }, {
	    key: 'onClick',
	    value: function onClick() {
	      this.setState({
	        style: { transform: 'translateY(10px)', marginLeft: 30, height: 300 },
	        animation: { translateY: 100, marginLeft: 100, duration: 1000 }
	      });
	      this.bool = false;
	    }
	  }, {
	    key: 'onClick2',
	    value: function onClick2() {
	      this.setState({
	        style: { transform: 'translateY(0px)', marginLeft: 130, height: 300 },
	        animation: { translateY: 200, marginLeft: 500, duration: 1000 }
	      });
	      this.bool = false;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'div',
	        null,
	        _react2['default'].createElement(
	          'p',
	          null,
	          '在动画时, 变化 style, 将重新计算为 start '
	        ),
	        _react2['default'].createElement(
	          'div',
	          null,
	          _react2['default'].createElement(
	            'button',
	            { onClick: this.onClick.bind(this) },
	            '点击改变样式'
	          ),
	          _react2['default'].createElement(
	            'button',
	            { onClick: this.onClick2.bind(this) },
	            '点击改变样式2'
	          )
	        ),
	        _react2['default'].createElement(
	          _rcTweenOne2['default'],
	          { animation: this.state.animation,
	            style: this.state.style,
	            onChange: this.onChange.bind(this) },
	          _react2['default'].createElement(
	            'div',
	            null,
	            '变化的样式'
	          )
	        ),
	        _react2['default'].createElement(
	          'div',
	          null,
	          this.state.test
	        )
	      );
	    }
	  }]);
	
	  return Demo;
	})(_react2['default'].Component);
	
	_reactDom2['default'].render(_react2['default'].createElement(Demo, null), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=updateStyle.js.map