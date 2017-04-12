webpackJsonp([6],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(290);


/***/ },

/***/ 290:
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
	
	var p1 = 'M0,100 L25,100 C34,20 40,0 100,0';
	var p = 'M0,100 C5,120 25,130 25,100 C30,60 40,75 58,90 C69,98.5 83,99.5 100,100';
	var t = _rcTweenOne2.default.easing.path(p);
	var t1 = _rcTweenOne2.default.easing.path(p1);
	var anim = [{
	  repeatDelay: 1000,
	  duration: 1000,
	  scaleX: 0,
	  scaleY: 2,
	  repeat: -1,
	  yoyo: true,
	  ease: t
	}, {
	  repeatDelay: 1000,
	  duration: 1000,
	  y: -30,
	  appearTo: 0,
	  repeat: -1,
	  yoyo: true,
	  ease: t1
	}];
	
	var Demo = function (_React$Component) {
	  (0, _inherits3.default)(Demo, _React$Component);
	
	  function Demo() {
	    (0, _classCallCheck3.default)(this, Demo);
	    return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));
	  }
	
	  Demo.prototype.render = function render() {
	    return _react2.default.createElement(
	      'div',
	      { style: { height: 300 } },
	      _react2.default.createElement(_rcTweenOne2.default, {
	        animation: anim,
	        style: {
	          position: 'absolute',
	          opacity: 1,
	          height: 50,
	          width: 50,
	          transform: 'translate(150px,150px)',
	          background: '#000',
	          transformOrigin: 'center bottom'
	        }
	      }),
	      _react2.default.createElement('div', { style: { width: 100, height: 100, background: '#fff000', position: 'absolute' } }),
	      _react2.default.createElement(
	        'svg',
	        { style: { position: 'absolute' } },
	        _react2.default.createElement('path', { fill: 'none', stroke: '#000', d: p }),
	        _react2.default.createElement('path', { d: p1, fill: 'none', stroke: '#000' })
	      )
	    );
	  };
	
	  return Demo;
	}(_react2.default.Component);
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=easingPath.js.map