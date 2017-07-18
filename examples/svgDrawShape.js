webpackJsonp([22],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(331);


/***/ }),

/***/ 330:
/***/ (function(module, exports) {

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
	  useStyle: 'stroke-dasharray, stroke-dashoffset',
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
	  getAnimStart: function getAnimStart(computedStyle) {
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
	      case 'path':
	        this.length = this.target.getTotalLength();
	        break;
	      default:
	        throw new Error('The label is not a label in the SVG.');
	    }
	    this.length = parseFloat(this.length.toFixed(3));
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

/***/ }),

/***/ 331:
/***/ (function(module, exports, __webpack_require__) {

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
	
	var _SvgDrawPlugin = __webpack_require__(330);
	
	var _SvgDrawPlugin2 = _interopRequireDefault(_SvgDrawPlugin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_rcTweenOne2.default.plugins.push(_SvgDrawPlugin2.default);
	
	var dataStartArr = ['100%', '30 450', '50% 50%', '30% 400', '50 30%', 0];
	var i = 0;
	
	var Demo = function (_React$Component) {
	  (0, _inherits3.default)(Demo, _React$Component);
	
	  function Demo() {
	    (0, _classCallCheck3.default)(this, Demo);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));
	
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
	        '\u70B9\u51FB\u5207\u6362'
	      ),
	      _react2.default.createElement(
	        'p',
	        null,
	        '\u5F53\u524D\u53C2\u6570\uFF1A',
	        this.state.tweenData
	      ),
	      _react2.default.createElement(
	        'svg',
	        { width: '100%', height: '600', version: '1.2' },
	        _react2.default.createElement(_rcTweenOne2.default, {
	          animation: { style: { SVGDraw: this.state.tweenData }, duration: 1000 },
	          style: { fill: '#fff000', strokeWidth: 5,
	            stroke: '#000fff', transform: 'translate(10px, 10px)'
	          },
	          width: '100',
	          height: '100',
	          component: 'rect'
	        }),
	        _react2.default.createElement(_rcTweenOne2.default, {
	          animation: { style: { SVGDraw: this.state.tweenData }, duration: 1000 },
	          style: { fill: '#fff000', strokeWidth: 5, stroke: '#000fff' },
	          component: 'polygon',
	          points: '120,10 200,10 230,110 150,110',
	          attr: 'attr'
	        }),
	        _react2.default.createElement(_rcTweenOne2.default, {
	          animation: { style: { SVGDraw: this.state.tweenData }, duration: 1000 },
	          style: { fill: '#fff000', strokeWidth: 5, stroke: '#000fff' },
	          component: 'circle',
	          cx: '300', cy: '55', r: '50',
	          attr: 'attr'
	        }),
	        _react2.default.createElement(_rcTweenOne2.default, {
	          animation: { SVGDraw: this.state.tweenData, duration: 1000 },
	          style: { fill: '#fff000', strokeWidth: 5, stroke: '#000fff' },
	          component: 'ellipse',
	          cx: '500', cy: '55', rx: '100', ry: '50'
	        }),
	        _react2.default.createElement(_rcTweenOne2.default, {
	          animation: { SVGDraw: this.state.tweenData, duration: 1000 },
	          style: { fill: '#fff000', strokeWidth: 5, stroke: '#000fff' },
	          component: 'line',
	          x1: '0', y1: '150', x2: '500', y2: '150'
	        })
	      )
	    );
	  };
	
	  return Demo;
	}(_react2.default.Component);
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ })

});
//# sourceMappingURL=svgDrawShape.js.map