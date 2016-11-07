webpackJsonp([15],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(201);


/***/ },

/***/ 201:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _rcTweenOne = __webpack_require__(2);
	
	var _rcTweenOne2 = _interopRequireDefault(_rcTweenOne);
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(37);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _PathPlugin = __webpack_require__(202);
	
	var _PathPlugin2 = _interopRequireDefault(_PathPlugin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	_rcTweenOne2.default.plugins.push(_PathPlugin2.default);
	
	var Demo = function (_React$Component) {
	  _inherits(Demo, _React$Component);
	
	  function Demo() {
	    _classCallCheck(this, Demo);
	
	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }
	
	  Demo.prototype.render = function render() {
	    var p = 'M50.952,85.619C31.729,84.841,23.557,73.62,24.095,42.952\n    c0.381-21.714,6.667-33.714,30.286-34.476\n    c36.572-1.18,59.81,77.714,102.667,76.381c30.108-0.937,34.268-32.381,34.095-41.714\n    C190.762,22.571,180.493,6.786,159.524,6C113.81,4.286,98,87.524,50.952,85.619z';
	    return _react2.default.createElement(
	      'div',
	      { style: { position: 'relative', width: 200, margin: 'auto' } },
	      _react2.default.createElement(_rcTweenOne2.default, {
	        animation: { duration: 3000, path: p, repeat: -1, ease: 'linear' },
	        style: {
	          opacity: 1,
	          position: 'absolute',
	          width: '30px',
	          height: '30px',
	          left: '-15px',
	          top: '-15px',
	          background: '#fff000'
	        }
	      }),
	      _react2.default.createElement(
	        'svg',
	        null,
	        _react2.default.createElement('path', { fill: 'none', stroke: '#000', d: p })
	      )
	    );
	  };
	
	  return Demo;
	}(_react2.default.Component);
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ },

/***/ 202:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _util = __webpack_require__(174);
	
	var _styleUtils = __webpack_require__(175);
	
	var PathPlugin = function PathPlugin(target, vars) {
	  this.target = target;
	  var path = typeof vars === 'string' ? vars : vars.x || vars.y || vars.rotate;
	  this.vars = vars;
	  this.path = (0, _util.parsePath)(path);
	  this.start = {};
	  this.pathLength = this.path.getTotalLength();
	};
	
	PathPlugin.prototype = {
	  name: 'path',
	  getComputedStyle: function getComputedStyle() {
	    return document.defaultView ? document.defaultView.getComputedStyle(this.target) : {};
	  },
	  getPoint: function getPoint(offset) {
	    var o = offset || 0;
	    var p = this.pathLength * this.progress + o;
	    return this.path.getPointAtLength(p);
	  },
	  getAnimStart: function getAnimStart() {
	    var computedStyle = this.getComputedStyle();
	    var transform = (0, _styleUtils.getTransform)(computedStyle[(0, _styleUtils.checkStyleName)('transform')]);
	    this.willChange = 'transform';
	    this.start = transform;
	    this.data = _extends({}, transform);
	  },
	  setRatio: function setRatio(r, t) {
	    this.progress = r;
	    var p = this.getPoint();
	    var p0 = this.getPoint(-1);
	    var p1 = this.getPoint(1);
	    if (typeof this.vars === 'string') {
	      this.data.translateX = p.x + this.start.translateX;
	      this.data.translateY = p.y + this.start.translateY;
	      this.data.rotate = Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
	    } else {
	      this.data.translateX = this.vars.x ? p.x + this.start.translateX : this.data.translateX;
	      this.data.translateY = this.vars.y ? p.y + this.start.translateY : this.data.translateY;
	      this.data.rotate = this.vars.rotate ? Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI : this.data.rotate;
	    }
	    t.style.transform = (0, _util.getTransformValue)(this.data);
	  }
	};
	
	exports.default = PathPlugin;
	module.exports = exports['default'];

/***/ }

});
//# sourceMappingURL=path.js.map