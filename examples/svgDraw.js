webpackJsonp([19],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(206);


/***/ },

/***/ 206:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _rcTweenOne = __webpack_require__(2);
	
	var _rcTweenOne2 = _interopRequireDefault(_rcTweenOne);
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(37);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _SvgDrawPlugin = __webpack_require__(207);
	
	var _SvgDrawPlugin2 = _interopRequireDefault(_SvgDrawPlugin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	_rcTweenOne2.default.plugins.push(_SvgDrawPlugin2.default);
	
	var dataStartArr = ['100%', '30 450', '50% 50%', '30% 400', '50 30%', 0];
	var i = 0;
	
	var Demo = function (_React$Component) {
	  _inherits(Demo, _React$Component);
	
	  function Demo() {
	    _classCallCheck(this, Demo);
	
	    var _this = _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	
	    _this.state = {
	      tweenData: '50 30%'
	    };
	    return _this;
	  }
	
	  Demo.prototype.onClick = function onClick() {
	    var tweenData = dataStartArr[i];
	    this.setState({
	      tweenData: tweenData
	    });
	    i++;
	    i = i >= dataStartArr.length ? 0 : i;
	  };
	
	  Demo.prototype.render = function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'button',
	        { onClick: this.onClick.bind(this) },
	        '点击切换'
	      ),
	      _react2.default.createElement(
	        'p',
	        null,
	        '当前参数：',
	        this.state.tweenData
	      ),
	      _react2.default.createElement(
	        'svg',
	        { width: '100%', height: '600', version: '1.2', xmlns: 'http://www.w3.org/2000/svg' },
	        _react2.default.createElement(_rcTweenOne2.default, {
	          animation: { style: { SVGDraw: this.state.tweenData }, duration: 1000 },
	          style: { fill: 'none', strokeWidth: 20, stroke: '#000fff' },
	          component: 'path',
	          d: 'M9.13,99.99c0,0,18.53-41.58,49.91-65.11c30-22.5,65.81-24.88,77.39-24.88c33.87, 0,57.55,11.71,77.05,28.47c23.09,19.85,40.33,46.79,61.71,69.77c24.09,25.89,53.44, 46.75,102.37,46.75c22.23,0,40.62-2.83,55.84-7.43c27.97-8.45,44.21-22.88, 54.78-36.7c14.35-18.75,16.43-36.37,16.43-36.37',
	          attr: 'attr'
	        })
	      )
	    );
	  };
	
	  return Demo;
	}(_react2.default.Component);
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ },

/***/ 207:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/* eslint-disable func-names */
	var SvgDrawPlugin = function SvgDrawPlugin(target, vars) {
	  this.target = target;
	  this.vars = vars;
	  this.start = {};
	  this.tagName = this.target.tagName.toLowerCase();
	};
	SvgDrawPlugin.prototype = {
	  name: 'SVGDraw',
	  setVars: function setVars(vars) {
	    var _vars = { start: 0 };
	    if (typeof vars === 'number') {
	      _vars.end = vars;
	      return _vars;
	    }
	    var data = vars.split(' ');
	    if (data.length > 1) {
	      _vars.start = data[0].indexOf('%') >= 0 ? parseFloat(data[0]) / 100 * this.length : parseFloat(data[0]);
	      _vars.end = data[1].indexOf('%') >= 0 ? parseFloat(data[1]) / 100 * this.length : parseFloat(data[1]);
	    } else if (parseFloat(vars)) {
	      _vars.end = vars.indexOf('%') >= 0 ? parseFloat(vars) / 100 * this.length : parseFloat(vars);
	    } else {
	      throw new Error('SVGDraw data[' + vars + '] error.');
	    }
	    return _vars;
	  },
	  getComputedStyle: function getComputedStyle() {
	    return document.defaultView ? document.defaultView.getComputedStyle(this.target) : {};
	  },
	  getLineLength: function getLineLength(x1, y1, x2, y2) {
	    var _x2 = parseFloat(x2) - parseFloat(x1);
	    var _y2 = parseFloat(y2) - parseFloat(y1);
	    return Math.sqrt(_x2 * _x2 + _y2 * _y2);
	  },
	  getPolyLength: function getPolyLength(name) {
	    var _this = this;
	
	    // .match(/(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi)
	    var pointsArray = (this.target.getAttribute('points') || '').split(/\s+/).map(function (item) {
	      return item.split(',').map(function (n) {
	        return parseFloat(n);
	      });
	    });
	    if (name === 'polygon') {
	      pointsArray.push(pointsArray[0]);
	    }
	    var length = 0;
	    pointsArray.forEach(function (item, i) {
	      if (i < pointsArray.length - 1) {
	        var nextPoint = pointsArray[i + 1];
	        length += _this.getLineLength(item[0], item[1], nextPoint[0], nextPoint[1]);
	      }
	    });
	    return length;
	  },
	  getEllipseLength: function getEllipseLength() {
	    var rx = parseFloat(this.target.getAttribute('rx'));
	    var ry = parseFloat(this.target.getAttribute('ry'));
	    if (!rx || !ry) {
	      throw new Error('ellipse rx or ry error.');
	    }
	    return Math.PI * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (3 * ry + rx)));
	  },
	  getAnimStart: function getAnimStart() {
	    // console.log(this.target.getTotalLength(), this.target.getBBox())
	    var computedStyle = this.getComputedStyle();
	    switch (this.tagName) {
	      case 'rect':
	        this.length = this.target.getAttribute('width') * 2 + this.target.getAttribute('height') * 2;
	        break;
	      case 'circle':
	        this.length = Math.PI * 2 * this.target.getAttribute('r');
	        break;
	      case 'line':
	        this.length = this.getLineLength(this.target.getAttribute('x1'), this.target.getAttribute('y1'), this.target.getAttribute('x2'), this.target.getAttribute('y2'));
	        break;
	      case 'polyline':
	      case 'polygon':
	        this.length = this.getPolyLength(this.tagName);
	        break;
	      case 'ellipse':
	        this.length = this.getEllipseLength();
	        break;
	      default:
	        this.length = this.target.getTotalLength();
	        break;
	    }
	    this.start.strokeDasharray = computedStyle.strokeDasharray === 'none' ? '100% 100%' : computedStyle.strokeDasharray;
	    this.start.strokeDashoffset = parseFloat(computedStyle.strokeDashoffset);
	    this.start.strokeDasharray = this.setVars(this.start.strokeDasharray);
	    this.vars = this.setVars(this.vars);
	  },
	  setRatio: function setRatio(r, t) {
	    t.style.strokeDasharray = (this.vars.end - this.vars.start - this.start.strokeDasharray.start) * r + this.start.strokeDasharray.start + 'px, ' + this.length + 'px';
	    t.style.strokeDashoffset = -((this.vars.start + this.start.strokeDashoffset) * r - this.start.strokeDashoffset);
	  }
	};
	exports.default = SvgDrawPlugin;
	module.exports = exports['default'];

/***/ }

});
//# sourceMappingURL=svgDraw.js.map