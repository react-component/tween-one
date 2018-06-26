webpackJsonp([4],{

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(139);


/***/ }),

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rc_tween_one__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_plugin_ChildrenPlugin__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assets_index_less__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__assets_index_less__);







__WEBPACK_IMPORTED_MODULE_0_rc_tween_one__["b" /* default */].plugins.push(__WEBPACK_IMPORTED_MODULE_3__src_plugin_ChildrenPlugin__["a" /* default */]);
function Demo() {
  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
    'div',
    null,
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      'h2',
      null,
      '\u5B50\u7EA7\u7684\u6570\u503C\u53D8\u5316\u7684\u52A8\u753B - children plugin'
    ),
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      'div',
      { style: { marginBottom: 20 } },
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'span',
        null,
        '\u57FA\u672C\u6570\u5B57\uFF1A'
      ),
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_rc_tween_one__["b" /* default */], {
        animation: { Children: { value: 10000 } }
      })
    ),
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      'div',
      { style: { marginBottom: 20 } },
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'span',
        null,
        '\u8BBE\u7F6E\u5F00\u59CB\u6570\u5B57\uFF1A'
      ),
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_0_rc_tween_one__["b" /* default */],
        {
          animation: { Children: { value: 10000 } }
        },
        '9990'
      )
    ),
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      'div',
      { style: { marginBottom: 20 } },
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'span',
        null,
        '\u53EA\u53D6\u6574\u6570\uFF1A'
      ),
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_rc_tween_one__["b" /* default */], {
        animation: { Children: { value: 10000, floatLength: 0 } }
      })
    ),
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      'div',
      { style: { marginBottom: 20 } },
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'span',
        null,
        '\u57FA\u672C\u6570\u5B57, \u5C0F\u6570\u540E\u53D6\u4E24\u4F4D, float length 2\uFF1A'
      ),
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_rc_tween_one__["b" /* default */], {
        animation: { Children: { value: 10000, floatLength: 2 } }
      })
    ),
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      'div',
      { style: { marginBottom: 20 } },
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'span',
        null,
        '\u683C\u5F0F\u5316\u94B1\u7B26\uFF1A'
      ),
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'span',
          null,
          '\xA5'
        ),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_0_rc_tween_one__["b" /* default */],
          {
            animation: { Children: { value: 10000, floatLength: 2, formatMoney: true } },
            component: 'span'
          },
          '20,000.12'
        )
      )
    ),
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      'div',
      { style: { marginBottom: 20 } },
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'span',
        null,
        '\u81EA\u5B9A\u4E49\u94B1\u7B26\u683C\u5F0F\uFF1A'
      ),
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'span',
          null,
          '\xA5'
        ),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_0_rc_tween_one__["b" /* default */],
          {
            animation: {
              Children: {
                value: 10000,
                floatLength: 2,
                formatMoney: { thousand: '.', decimal: ',' }
              }
            },
            component: 'span'
          },
          '20.000,12'
        )
      )
    )
  );
}

__WEBPACK_IMPORTED_MODULE_2_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }),

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_style_utils__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_style_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_style_utils__);
/* eslint-disable func-names */


var ChildrenPlugin = function ChildrenPlugin(target, vars) {
  this.target = target;
  this.vars = vars;
};

ChildrenPlugin.prototype = {
  name: 'Children',
  getAnimStart: function getAnimStart() {
    var formatMoney = this.vars.formatMoney;

    var opts = {
      thousand: formatMoney && formatMoney.thousand || ',',
      decimal: formatMoney && formatMoney.decimal || '.'
    };
    var rep = new RegExp('\\' + opts.thousand, 'g');
    this.start = this.vars.startAt || {
      value: parseFloat(this.target.innerHTML.replace(rep, '').replace(opts.decimal, '.')) || 0
    };
  },
  toMoney: function toMoney(v, _opts) {
    var opts = {
      thousand: _opts.thousand || ',',
      decimal: _opts.decimal || '.'
    };
    var negative = parseFloat(v) < 0 ? '-' : '';
    var numberArray = v.toString().split('.');
    var base = Math.abs(parseInt(numberArray[0], 10)).toString();
    var mod = base.length > 3 ? base.length % 3 : 0;
    var decimal = numberArray[1];
    return '' + negative + (mod ? '' + base.substr(0, mod) + opts.thousand : '') + base.substr(mod).replace(/(\d{3})(?=\d)/g, '$1' + opts.thousand) + (decimal ? '' + opts.decimal + decimal : '');
  },
  setRatio: function setRatio(ratio) {
    var _vars = this.vars,
        value = _vars.value,
        floatLength = _vars.floatLength,
        formatMoney = _vars.formatMoney;

    var v = (value - this.start.value) * ratio + this.start.value;
    if (typeof floatLength === 'number') {
      if (floatLength) {
        v = Object(__WEBPACK_IMPORTED_MODULE_0_style_utils__["toFixed"])(v, floatLength);
        var numberArray = v.toString().split('.');
        var decimal = numberArray[1] || '';
        decimal = decimal.length > floatLength ? decimal.substring(0, floatLength) : decimal;
        var l = floatLength - decimal.length;
        if (l) {
          Array(l).fill(0).forEach(function (num) {
            decimal += '' + num;
          });
        }
        v = numberArray[0] + '.' + decimal;
      } else {
        v = Math.round(v);
      }
    }
    v = formatMoney ? this.toMoney(v, formatMoney) : v;
    this.target.innerHTML = v;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (ChildrenPlugin);

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[138]);
//# sourceMappingURL=children.js.map