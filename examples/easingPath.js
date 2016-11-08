webpackJsonp([7],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(192);


/***/ },

/***/ 192:
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
	
	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }
	
	  Demo.prototype.render = function render() {
	    var p1 = 'M0,100 L25,100 C34,20 40,0 100,0';
	    var p = 'M0,100 C5,120 25,130 25,100 C30,60 40,75 58,90 C69,98.5 83,99.5 100,100';
	    return _react2.default.createElement(
	      'div',
	      { style: { height: 300 } },
	      _react2.default.createElement(_rcTweenOne2.default, {
	        animation: [{
	          repeatDelay: 1000,
	          duration: 1000,
	          scaleX: 0,
	          scaleY: 2,
	          repeat: -1,
	          yoyo: true,
	          ease: _rcTweenOne2.default.easing.path(p)
	        }, {
	          repeatDelay: 1000,
	          duration: 1000,
	          y: -30,
	          appearTo: 0,
	          repeat: -1,
	          yoyo: true,
	          ease: _rcTweenOne2.default.easing.path(p1)
	        }],
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