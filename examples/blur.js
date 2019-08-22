webpackJsonp([32],{

/***/ 471:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(472);


/***/ }),

/***/ 472:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rc_tween_one__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom__);




function Demo() {
  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
    'div',
    null,
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      'div',
      null,
      'filter \u91CC\u7684\u6EE4\u955C\uFF0C\'grayScale\', \'sepia\', \'hueRotate\', \'invert\', \'brightness\', \'contrast\', \'blur\''
    ),
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_0_rc_tween_one__["b" /* default */],
      { animation: { blur: '10px', sepia: '100%', duration: 2000 },
        style: { filter: 'blur(30px)' }
      },
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('img', {
        width: '500',
        src: 'https://t.alipayobjects.com/images/T1CFtgXb0jXXXXXXXX.jpg',
        alt: 'img'
      })
    )
  );
}

__WEBPACK_IMPORTED_MODULE_2_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ })

},[471]);
//# sourceMappingURL=blur.js.map