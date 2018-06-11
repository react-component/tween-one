webpackJsonp([4],{

/***/ 193:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(194);


/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rc_tween_one__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_dom__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_plugin_SvgDrawPlugin__ = __webpack_require__(54);








__WEBPACK_IMPORTED_MODULE_3_rc_tween_one__["b" /* default */].plugins.push(__WEBPACK_IMPORTED_MODULE_6__src_plugin_SvgDrawPlugin__["a" /* default */]);

var dataStartArr = ['100%', '30 450', '50% 50%', '30% 400', '50 30%', 0];
var i = 0;

var Demo = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default()(Demo, _React$Component);

  function Demo(props) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Demo);

    var _this = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default()(this, _React$Component.call(this, props));

    _this.onClick = function () {
      var tweenData = dataStartArr[i];
      _this.setState({
        tweenData: tweenData
      });
      i++;
      i = i >= dataStartArr.length ? 0 : i;
    };

    _this.state = {
      tweenData: '50 30%'
    };
    return _this;
  }

  Demo.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
      'div',
      null,
      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        'button',
        { onClick: this.onClick },
        '\u70B9\u51FB\u5207\u6362'
      ),
      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        'p',
        null,
        '\u5F53\u524D\u53C2\u6570\uFF1A',
        this.state.tweenData
      ),
      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        'svg',
        { width: '100%', height: '600', version: '1.2' },
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_rc_tween_one__["b" /* default */], {
          animation: { style: { SVGDraw: this.state.tweenData }, duration: 1000 },
          style: { fill: '#fff000', strokeWidth: 5,
            stroke: '#000fff', transform: 'translate(10px, 10px)'
          },
          width: '100',
          height: '100',
          component: 'rect'
        }),
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_rc_tween_one__["b" /* default */], {
          animation: { style: { SVGDraw: this.state.tweenData }, duration: 1000 },
          style: { fill: '#fff000', strokeWidth: 5, stroke: '#000fff' },
          component: 'polygon',
          points: '120,10 200,10 230,110 150,110',
          attr: 'attr'
        }),
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_rc_tween_one__["b" /* default */], {
          animation: { style: { SVGDraw: this.state.tweenData }, duration: 1000 },
          style: { fill: '#fff000', strokeWidth: 5, stroke: '#000fff' },
          component: 'circle',
          cx: '300', cy: '55', r: '50',
          attr: 'attr'
        }),
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_rc_tween_one__["b" /* default */], {
          animation: { SVGDraw: this.state.tweenData, duration: 1000 },
          style: { fill: '#fff000', strokeWidth: 5, stroke: '#000fff' },
          component: 'ellipse',
          cx: '500', cy: '55', rx: '100', ry: '50'
        }),
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_rc_tween_one__["b" /* default */], {
          animation: { SVGDraw: this.state.tweenData, duration: 1000 },
          style: { fill: '#fff000', strokeWidth: 5, stroke: '#000fff' },
          component: 'line',
          x1: '0', y1: '150', x2: '500', y2: '150'
        })
      )
    );
  };

  return Demo;
}(__WEBPACK_IMPORTED_MODULE_4_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_5_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
    var pointsArray = [];
    (this.target.getAttribute('points') || '').split(/[\s+|,]/).forEach(function (item, i) {
      var arr = pointsArray[Math.floor(i / 2)] || [];
      arr.push(parseFloat(item));
      if (!(i % 2)) {
        pointsArray.push(arr);
      }
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
    var _this2 = this;

    var getAttribute = function getAttribute(str) {
      return _this2.target.getAttribute(str);
    };
    switch (this.tagName) {
      case 'circle':
        this.length = Math.PI * 2 * getAttribute('r');
        break;
      case 'line':
        this.length = this.getLineLength(getAttribute('x1'), getAttribute('y1'), getAttribute('x2'), getAttribute('y2'));
        break;
      case 'polyline':
      case 'polygon':
        this.length = this.getPolyLength(this.tagName);
        break;
      case 'ellipse':
        this.length = this.getEllipseLength();
        break;
      case 'rect':
        this.length = getAttribute('width') * 2 + getAttribute('height') * 2;
        break;
      case 'path':
        this.length = this.target.getTotalLength();
        break;
      default:
        throw new Error('The label is not a label in the SVG.');
    }
    this.length = parseFloat(this.length.toFixed(3));
    this.start.strokeDasharray = computedStyle.strokeDasharray === 'none' || !computedStyle.strokeDasharray ? '100% 100%' : computedStyle.strokeDasharray;
    this.start.strokeDashoffset = parseFloat(computedStyle.strokeDashoffset);
    this.start.strokeDasharray = this.setVars(this.start.strokeDasharray);
    this.vars = this.setVars(this.vars);
  },
  setRatio: function setRatio(r, t) {
    t.style.strokeDasharray = (this.vars.end - this.vars.start - this.start.strokeDasharray.start) * r + this.start.strokeDasharray.start + 'px, ' + this.length + 'px';
    t.style.strokeDashoffset = -((this.vars.start + this.start.strokeDashoffset) * r - this.start.strokeDashoffset);
  }
};
/* harmony default export */ __webpack_exports__["a"] = (SvgDrawPlugin);

/***/ })

},[193]);
//# sourceMappingURL=svgDrawShape.js.map