webpackJsonp([0],{

/***/ 176:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(177);


/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rc_tween_one__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rc_scroll_anim_es_ScrollOverPack__ = __webpack_require__(178);





function Demo() {
  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
    'div',
    null,
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      'div',
      { style: { height: 800 } },
      '\u5F80\u4E0B\u6EDA\u52A8'
    ),
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_3_rc_scroll_anim_es_ScrollOverPack__["a" /* default */],
      {
        style: { height: 800 }
      },
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_0_rc_tween_one__["b" /* default */],
        {
          key: '1',
          animation: { y: 30, type: 'from', ease: 'easeOutQuart', opacity: 0 },
          reverseDelay: 200,
          style: { background: '#fff000' }
        },
        '\u6267\u884C\u52A8\u753B'
      ),
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_0_rc_tween_one__["b" /* default */],
        {
          key: '2',
          id: '12',
          animation: { y: 30, delay: 100, ease: 'easeOutQuart', type: 'from', opacity: 0, id: 12 },
          reverseDelay: 100,
          style: { background: '#000fff' }
        },
        '\u6267\u884C\u52A8\u753B'
      )
    )
  );
}

__WEBPACK_IMPORTED_MODULE_2_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__EventDispatcher__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ScrollElement__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__util__ = __webpack_require__(50);












var ScrollOverPack = function (_ScrollElement) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(ScrollOverPack, _ScrollElement);

  function ScrollOverPack(props) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, ScrollOverPack);

    var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (ScrollOverPack.__proto__ || Object.getPrototypeOf(ScrollOverPack)).call(this, props));

    _this.scrollEventListener = function (e) {
      _this.getParam(e);
      var isTop = _this.elementShowHeight > _this.clientHeight + _this.leavePlayHeight;
      if (_this.enter || !_this.props.replay && isTop) {
        if (!_this.state.show) {
          _this.setState({
            show: true
          });
        }
        if (!_this.props.always && _this.eventType) {
          __WEBPACK_IMPORTED_MODULE_8__EventDispatcher__["a" /* default */].removeEventListener(_this.eventType, _this.scrollEventListener, _this.target);
        }
      } else {
        var bottomLeave = _this.elementShowHeight < _this.playHeight;
        // 设置往上时的出场点...
        var topLeave = _this.props.replay ? isTop : null;
        if (topLeave || bottomLeave) {
          if (_this.state.show) {
            _this.setState({
              show: false
            });
          }
        }
      }
    };

    _this.children = Object(__WEBPACK_IMPORTED_MODULE_10__util__["d" /* toArrayChildren */])(props.children);
    _this.oneEnter = false;
    _this.enter = false;
    _this.state = {
      show: false,
      children: Object(__WEBPACK_IMPORTED_MODULE_10__util__["d" /* toArrayChildren */])(props.children)
    };
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(ScrollOverPack, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      this.setState({
        children: Object(__WEBPACK_IMPORTED_MODULE_10__util__["d" /* toArrayChildren */])(nextProps.children)
      }, function () {
        var inListener = __WEBPACK_IMPORTED_MODULE_8__EventDispatcher__["a" /* default */]._listeners.scroll && __WEBPACK_IMPORTED_MODULE_8__EventDispatcher__["a" /* default */]._listeners.scroll.some(function (c) {
          return c.n === _this2.eventType.split('.')[1];
        });
        if (nextProps.always && !inListener) {
          _this2.addScrollEvent();
        } else {
          _this2.scrollEventListener();
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var props = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default()(this.props, []);

      var componentProps = props.componentProps,
          appear = props.appear,
          component = props.component;

      ['playScale', 'replay', 'component', 'always', 'scrollEvent', 'appear', 'location', 'targetId', 'onScroll', 'onChange', 'componentProps'].forEach(function (key) {
        return delete props[key];
      });
      var childToRender = void 0;
      if (!this.oneEnter) {
        var show = !appear;
        var children = Object(__WEBPACK_IMPORTED_MODULE_10__util__["d" /* toArrayChildren */])(props.children).map(function (item) {
          if (!item) {
            return null;
          }
          return item.type.isTweenOne ? __WEBPACK_IMPORTED_MODULE_6_react___default.a.cloneElement(item, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, item.props, { paused: !show })) : __WEBPACK_IMPORTED_MODULE_6_react___default.a.cloneElement(item, item.props, show && item.props.children);
        });
        childToRender = Object(__WEBPACK_IMPORTED_MODULE_6_react__["createElement"])(component, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, props, componentProps), children);
        this.oneEnter = true;
      } else {
        if (!this.state.show) {
          this.children = this.children.map(function (item) {
            if (!item) {
              return null;
            }
            // 判断 TweenOne;
            if (item.type.isTweenOne) {
              return __WEBPACK_IMPORTED_MODULE_6_react___default.a.cloneElement(item, { reverse: true });
            }
            return __WEBPACK_IMPORTED_MODULE_6_react___default.a.cloneElement(item, {}, null);
          });
        } else {
          this.children = this.state.children;
        }
        childToRender = Object(__WEBPACK_IMPORTED_MODULE_6_react__["createElement"])(component, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, props, componentProps), this.children);
      }
      return childToRender;
    }
  }]);

  return ScrollOverPack;
}(__WEBPACK_IMPORTED_MODULE_9__ScrollElement__["a" /* default */]);

ScrollOverPack.propTypes = {
  component: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.any,
  playScale: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.any,
  always: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool,
  scrollEvent: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
  children: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.any,
  className: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.string,
  style: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.any,
  replay: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool,
  onChange: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
  onScroll: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
  appear: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool,
  componentProps: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.object
};
ScrollOverPack.defaultProps = {
  component: 'div',
  playScale: 0.5,
  always: true,
  scrollEvent: __WEBPACK_IMPORTED_MODULE_10__util__["c" /* noop */],
  replay: false,
  onChange: __WEBPACK_IMPORTED_MODULE_10__util__["c" /* noop */],
  onScroll: __WEBPACK_IMPORTED_MODULE_10__util__["c" /* noop */],
  appear: true,
  componentProps: {}
};

ScrollOverPack.isScrollOverPack = true;

/* harmony default export */ __webpack_exports__["a"] = (ScrollOverPack);

/***/ }),

/***/ 179:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(180), __esModule: true };

/***/ }),

/***/ 180:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(181);
var $Object = __webpack_require__(9).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ 181:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(14);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(11), 'Object', { defineProperty: __webpack_require__(10).f });


/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_dom__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_prop_types__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Mapped__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__EventDispatcher__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__util__ = __webpack_require__(50);













var ScrollElement = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(ScrollElement, _React$Component);

  function ScrollElement() {
    var _ref;

    var _temp, _this, _ret;

    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, ScrollElement);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_ref = ScrollElement.__proto__ || Object.getPrototypeOf(ScrollElement)).call.apply(_ref, [this].concat(args))), _this), _this.getParam = function (e) {
      _this.clientHeight = _this.target ? _this.target.clientHeight : Object(__WEBPACK_IMPORTED_MODULE_11__util__["f" /* windowHeight */])();
      var scrollTop = _this.target ? _this.target.scrollTop : Object(__WEBPACK_IMPORTED_MODULE_11__util__["a" /* currentScrollTop */])();
      var domRect = _this.dom.getBoundingClientRect();
      var targetTop = _this.target ? _this.target.getBoundingClientRect().top : 0;
      var offsetTop = domRect.top + scrollTop - targetTop;
      _this.elementShowHeight = scrollTop - offsetTop + _this.clientHeight;
      var playScale = Object(__WEBPACK_IMPORTED_MODULE_11__util__["e" /* transformArguments */])(_this.props.playScale);
      var playScaleEnterArray = /([\+\-]?[0-9#\.]+)(px|vh|%)?/.exec(String(playScale[0]));
      if (!playScaleEnterArray[2]) {
        _this.playHeight = _this.clientHeight * parseFloat(playScale[0]);
      } else if (playScaleEnterArray[2] === 'px') {
        _this.playHeight = parseFloat(playScaleEnterArray[1]);
      } else {
        _this.playHeight = _this.clientHeight * parseFloat(playScaleEnterArray[1]) / 100;
      }
      var leaveHeight = domRect.height;
      var playScaleLeaveArray = /([\+\-]?[0-9#\.]+)(px|vh|%)?/.exec(String(playScale[1]));
      if (!playScaleLeaveArray[2]) {
        _this.leavePlayHeight = leaveHeight * parseFloat(playScale[1]);
      } else if (playScaleLeaveArray[2] === 'px') {
        _this.leavePlayHeight = parseFloat(playScaleLeaveArray[1]);
      } else {
        _this.leavePlayHeight = leaveHeight * parseFloat(playScaleLeaveArray[1]) / 100;
      }
      var enter = _this.props.replay ? _this.elementShowHeight >= _this.playHeight && _this.elementShowHeight <= _this.clientHeight + _this.leavePlayHeight : _this.elementShowHeight >= _this.playHeight;
      var enterOrLeave = enter ? 'enter' : 'leave';
      var mode = _this.enter !== enter || typeof _this.enter !== 'boolean' ? enterOrLeave : null;
      if (mode) {
        _this.props.onChange({ mode: mode, id: _this.props.id });
      }
      _this.props.onScroll({
        domEvent: e,
        scrollTop: scrollTop,
        showHeight: _this.elementShowHeight,
        offsetTop: offsetTop,
        id: _this.props.id
      });
      _this.enter = enter;
    }, _this.addScrollEvent = function () {
      __WEBPACK_IMPORTED_MODULE_10__EventDispatcher__["a" /* default */].addEventListener(_this.eventType, _this.scrollEventListener, _this.target);
      var scrollTop = Object(__WEBPACK_IMPORTED_MODULE_11__util__["a" /* currentScrollTop */])();
      if (!scrollTop) {
        _this.scrollEventListener();
      }
    }, _this.scrollEventListener = function (e) {
      _this.getParam(e);
    }, _temp), __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(_this, _ret);
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(ScrollElement, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.dom = __WEBPACK_IMPORTED_MODULE_7_react_dom___default.a.findDOMNode(this);
      if (this.props.location) {
        this.dom = document.getElementById(this.props.location);
        __WEBPACK_IMPORTED_MODULE_9__Mapped__["a" /* default */].register(this.props.location, this.dom);
      } else if (this.props.id) {
        __WEBPACK_IMPORTED_MODULE_9__Mapped__["a" /* default */].register(this.props.id, this.dom);
      }
      var date = Date.now();
      this.target = this.props.targetId && document.getElementById(this.props.targetId);

      var length = __WEBPACK_IMPORTED_MODULE_10__EventDispatcher__["a" /* default */]._listeners.scroll ? __WEBPACK_IMPORTED_MODULE_10__EventDispatcher__["a" /* default */]._listeners.scroll.length : 0;
      this.eventType = 'scroll.scrollEvent' + date + length;
      this.addScrollEvent();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      this.scrollEventListener();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      __WEBPACK_IMPORTED_MODULE_9__Mapped__["a" /* default */].unRegister(this.props.id);
      __WEBPACK_IMPORTED_MODULE_10__EventDispatcher__["a" /* default */].removeEventListener(this.eventType, this.scrollEventListener, this.target);
    }
  }, {
    key: 'render',
    value: function render() {
      var props = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default()(this.props, []);

      var componentProps = props.componentProps,
          component = props.component;

      ['component', 'playScale', 'location', 'targetId', 'onScroll', 'onChange', 'replay', 'componentProps'].forEach(function (key) {
        return delete props[key];
      });
      return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(component, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, props, componentProps));
    }
  }]);

  return ScrollElement;
}(__WEBPACK_IMPORTED_MODULE_6_react___default.a.Component);

ScrollElement.propTypes = {
  component: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.any,
  playScale: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.any,
  id: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.string,
  onChange: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func,
  onScroll: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func,
  location: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.string,
  targetId: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.string,
  replay: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.bool,
  componentProps: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.object
};
ScrollElement.defaultProps = {
  component: 'div',
  onChange: __WEBPACK_IMPORTED_MODULE_11__util__["c" /* noop */],
  onScroll: __WEBPACK_IMPORTED_MODULE_11__util__["c" /* noop */],
  playScale: 0.5,
  replay: false,
  componentProps: {}
};

ScrollElement.isScrollElement = true;
/* harmony default export */ __webpack_exports__["a"] = (ScrollElement);

/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var __mapped = {
  __arr: []
};

/* harmony default export */ __webpack_exports__["a"] = ({
  unMount: function unMount() {
    __mapped = { __arr: [] };
  },
  register: function register(name, element) {
    __mapped[name] = element;
    __mapped.__arr.push(name);
  },
  unRegister: function unRegister(name) {
    var index = __mapped.__arr.indexOf(name);
    if (index >= 0) {
      __mapped.__arr.splice(__mapped.__arr.indexOf(name), 1);
      delete __mapped[name];
    }
  },
  get: function get(name) {
    return __mapped[name];
  },
  getMapped: function getMapped() {
    return __mapped;
  }
});

/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = toArrayChildren;
/* harmony export (immutable) */ __webpack_exports__["b"] = dataToArray;
/* harmony export (immutable) */ __webpack_exports__["e"] = transformArguments;
/* unused harmony export objectEqual */
/* harmony export (immutable) */ __webpack_exports__["a"] = currentScrollTop;
/* harmony export (immutable) */ __webpack_exports__["f"] = windowHeight;
/* harmony export (immutable) */ __webpack_exports__["c"] = noop;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);



function toArrayChildren(children) {
  var ret = [];
  __WEBPACK_IMPORTED_MODULE_1_react___default.a.Children.forEach(children, function (c) {
    ret.push(c);
  });
  return ret;
}

function dataToArray(vars) {
  if (!vars && vars !== 0) {
    return [];
  }
  if (Array.isArray(vars)) {
    return vars;
  }
  return [vars];
}

function transformArguments(arg) {
  if (Array.isArray(arg)) {
    if (arg.length === 2) {
      return arg;
    }
    return [arg.join(), arg.join()];
  }
  return [arg, arg];
}

function objectEqual(obj1, obj2) {
  if (!obj1 || !obj2) {
    return false;
  }
  if (obj1 === obj2) {
    return true;
  }
  var equalBool = true;
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    for (var i = 0; i < obj1.length; i++) {
      var currentObj = obj1[i];
      var nextObj = obj2[i];
      for (var p in currentObj) {
        if (currentObj[p] !== nextObj[p]) {
          if (__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(currentObj[p]) === 'object' && __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(nextObj[p]) === 'object') {
            equalBool = objectEqual(currentObj[p], nextObj[p]);
          } else {
            equalBool = false;
            return false;
          }
        }
      }
    }
  }

  Object.keys(obj1).forEach(function (key) {
    if (!(key in obj2)) {
      equalBool = false;
      return false;
    }

    if (__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(obj1[key]) === 'object' && __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(obj2[key]) === 'object') {
      equalBool = objectEqual(obj1[key], obj2[key]);
    } else if (typeof obj1[key] === 'function' && typeof obj2[key] === 'function') {
      if (obj1[key].name !== obj2[key].name) {
        equalBool = false;
      }
    } else if (obj1[key] !== obj2[key]) {
      equalBool = false;
    }
  });

  Object.keys(obj2).forEach(function (key) {
    if (!(key in obj1)) {
      equalBool = false;
      return false;
    }
    if (__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(obj2[key]) === 'object' && __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(obj1[key]) === 'object') {
      equalBool = objectEqual(obj2[key], obj1[key]);
    } else if (typeof obj1[key] === 'function' && typeof obj2[key] === 'function') {
      if (obj1[key].name !== obj2[key].name) {
        equalBool = false;
      }
    } else if (obj2[key] !== obj1[key]) {
      equalBool = false;
    }
  });

  return equalBool;
}

function currentScrollTop() {
  return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
}

function windowHeight() {
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

function noop() {}

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(179);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(50);

function EventDispatcher(target) {
  this._listeners = {};
  this._eventTarget = target || {};
  this.recoverLists = [];
  this._listFun = {};
}
EventDispatcher.prototype = {
  addEventListener: function addEventListener(type, callback, target) {
    var types = type.split('.');
    var _type = types[0];
    var namespaces = types[1];
    var list = this._listeners[_type];
    var index = 0;
    var listener = void 0;
    var i = void 0;
    if (!list) {
      this._listeners[_type] = list = [];
    }
    i = list.length;

    while (--i > -1) {
      listener = list[i];
      if (listener.n === namespaces && listener.c === callback) {
        list.splice(i, 1);
      } else if (index === 0) {
        index = i + 1;
      }
    }

    list.splice(index, 0, { c: callback, n: namespaces, t: _type });
    if (!this._listFun[_type]) {
      this._listFun[_type] = this._listFun[_type] || this.dispatchEvent.bind(this, _type);
      if (this._eventTarget.addEventListener) {
        (target || this._eventTarget).addEventListener(_type, this._listFun[_type], false);
      } else if (this._eventTarget.attachEvent) {
        (target || this._eventTarget).attachEvent('on' + _type, this._listFun[_type]);
      }
    }
  },
  removeEventListener: function removeEventListener(type, callback, target, force) {
    var types = type.split('.');
    var _type = types[0];
    var namespaces = types[1];
    var list = this._listeners[_type];
    var i = void 0;
    var _force = force;
    if (!namespaces) {
      _force = true;
    }
    if (list) {
      i = list.length;
      while (--i > -1) {
        if (list[i].c === callback && (_force || list[i].n === namespaces)) {
          list.splice(i, 1);
          if (!list.length) {
            var func = this._listFun[_type];
            delete this._listeners[_type];
            delete this._listFun[_type];
            if (this._eventTarget.removeEventListener) {
              (target || this._eventTarget).removeEventListener(_type, func);
            } else if (this._eventTarget.detachEvent) {
              (target || this._eventTarget).detachEvent('on' + _type, func);
            }
          }
          if (!_force) {
            return;
          }
        }
      }
    }
  },
  dispatchEvent: function dispatchEvent(type, e) {
    var list = this._listeners[type];
    var i = void 0;
    var t = void 0;
    var listener = void 0;
    if (list) {
      i = list.length;
      t = this._eventTarget;
      while (--i > -1) {
        listener = list[i];
        if (listener) {
          var _e = e || { type: type, target: t };
          listener.c.call(t, _e);
        }
      }
    }
  },
  removeAllType: function removeAllType(type, target) {
    var _this = this;

    var types = type.split('.');
    var _type = types[0];
    var namespaces = types[1];
    var list = this._listeners[_type];
    this.recoverLists = this.recoverLists.concat(Object(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* dataToArray */])(list).filter(function (item) {
      return item.n && item.n.match(namespaces);
    }));
    this.recoverLists.forEach(function (item) {
      _this.removeEventListener(item.t + '.' + item.n, item.c, target);
    });
  },
  reAllType: function reAllType(type, target) {
    var _this2 = this;

    var types = type.split('.');
    var _type = types[0];
    var namespaces = types[1];
    this.recoverLists = this.recoverLists.map(function (item) {
      if (item.t === _type && item.n.match(namespaces)) {
        _this2.addEventListener(item.t + '.' + item.n, item.c, target);
        return null;
      }
      return item;
    }).filter(function (item) {
      return item;
    });
  }
};
var event = void 0;
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  event = new EventDispatcher(window);
} else {
  event = new EventDispatcher();
}
/* harmony default export */ __webpack_exports__["a"] = (event);

/***/ })

},[176]);
//# sourceMappingURL=scrollAnim.js.map