webpackJsonp([9],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(187);


/***/ },

/***/ 187:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _rcTweenOne = __webpack_require__(2);
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(36);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var Demo = (function (_React$Component) {
	  _inherits(Demo, _React$Component);
	
	  function Demo() {
	    var _this = this;
	
	    _classCallCheck(this, Demo);
	
	    _get(Object.getPrototypeOf(Demo.prototype), 'constructor', this).apply(this, arguments);
	    this.state = {
	      children: [_react2['default'].createElement(
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
	        _react2['default'].createElement(
	          'div',
	          null,
	          '执行动效'
	        )
	      ), _react2['default'].createElement(
	        'div',
	        { key: 'a',
	          style: { opacity: 1,
	            backgroundColor: '#000',
	            float: 'left',
	            height: 200
	          }
	        },
	        _react2['default'].createElement(
	          'div',
	          null,
	          '执行动效'
	        )
	      )]
	    };
	    ['onClick', 'enterType', 'onEnd'].forEach(function (method) {
	      return _this[method] = _this[method].bind(_this);
	    });
	  }
	
	  _createClass(Demo, [{
	    key: 'onClick',
	    value: function onClick() {
	      var children = !this.state.children ? [_react2['default'].createElement(
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
	        _react2['default'].createElement(
	          'div',
	          null,
	          '执行动效'
	        )
	      ), _react2['default'].createElement(
	        'div',
	        { key: 'a',
	          style: { opacity: 1,
	            backgroundColor: '#000',
	            float: 'left',
	            height: 200
	          }
	        },
	        _react2['default'].createElement(
	          'div',
	          null,
	          '执行动效'
	        )
	      )] : null;
	      this.setState({
	        children: children
	      });
	    }
	  }, {
	    key: 'onEnd',
	    value: function onEnd(e) {
	      console.log(e);
	    }
	  }, {
	    key: 'enterType',
	    value: function enterType(e) {
	      if (e.key === 'a') {
	        return { x: 100, opacity: 0, type: 'from' };
	      }
	      return { y: 80, opacity: 0, type: 'from' };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'div',
	        null,
	        _react2['default'].createElement(
	          'button',
	          { onClick: this.onClick },
	          '切换'
	        ),
	        _react2['default'].createElement(
	          _rcTweenOne.TweenOneGroup,
	          {
	            style: { height: 300 },
	            enter: this.enterType,
	            leave: [{ y: 90 }, { x: -100, opacity: 0 }],
	            onEnd: this.onEnd
	          },
	          this.state.children
	        )
	      );
	    }
	  }]);
	
	  return Demo;
	})(_react2['default'].Component);
	
	_reactDom2['default'].render(_react2['default'].createElement(Demo, null), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=group.js.map