webpackJsonp([23],{

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(161);


/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rc_tween_one__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom__);




function Demo() {
  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
    'div',
    { style: { position: 'relative', height: 500 } },
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_0_rc_tween_one__["b" /* default */],
      {
        animation: [{ x: 200, delay: 1000, y: '300', blur: '10px', duration: 500, type: 'from' }, { x: 400, y: 0 }, { delay: 1000, y: 300, type: 'from' }],
        style: { opacity: 1, width: 100, transform: 'translateY(100px)' }
      },
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'div',
        null,
        '\u6267\u884C\u52A8\u6548'
      )
    )
  );
}

__WEBPACK_IMPORTED_MODULE_2_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ })

},[160]);
//# sourceMappingURL=fromDelay.js.map