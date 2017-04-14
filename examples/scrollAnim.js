webpackJsonp([16],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(317);


/***/ }),

/***/ 297:
/***/ (function(module, exports) {

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

/***/ 317:
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
	
	var _ScrollOverPack = __webpack_require__(318);
	
	var _ScrollOverPack2 = _interopRequireDefault(_ScrollOverPack);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Demo = function (_React$Component) {
	  (0, _inherits3.default)(Demo, _React$Component);
	
	  function Demo() {
	    (0, _classCallCheck3.default)(this, Demo);
	    return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));
	  }
	
	  Demo.prototype.render = function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'div',
	        { style: { height: 800 } },
	        '\u5F80\u4E0B\u6EDA\u52A8'
	      ),
	      _react2.default.createElement(
	        _ScrollOverPack2.default,
	        {
	          hideProps: { 1: { reverse: true }, 2: { reverse: true } },
	          style: { height: 800 }
	        },
	        _react2.default.createElement(
	          _rcTweenOne2.default,
	          {
	            key: '1',
	            animation: { y: 30, type: 'from', ease: 'easeOutQuart', opacity: 0 },
	            reverseDelay: 200,
	            style: { background: '#fff000' }
	          },
	          '\u6267\u884C\u52A8\u753B'
	        ),
	        _react2.default.createElement(
	          _rcTweenOne2.default,
	          {
	            key: '2',
	            animation: { y: 30, delay: 100, ease: 'easeOutQuart', type: 'from', opacity: 0 },
	            reverseDelay: 100,
	            style: { background: '#000fff' }
	          },
	          '\u6267\u884C\u52A8\u753B'
	        )
	      )
	    );
	  };
	
	  return Demo;
	}(_react2.default.Component);
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }),

/***/ 318:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(83);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(297);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(3);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(72);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(88);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _EventDispatcher = __webpack_require__(319);
	
	var _EventDispatcher2 = _interopRequireDefault(_EventDispatcher);
	
	var _ScrollElement2 = __webpack_require__(321);
	
	var _ScrollElement3 = _interopRequireDefault(_ScrollElement2);
	
	var _util = __webpack_require__(320);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function noop() {}
	
	var ScrollOverPack = function (_ScrollElement) {
	  (0, _inherits3["default"])(ScrollOverPack, _ScrollElement);
	
	  function ScrollOverPack(props) {
	    (0, _classCallCheck3["default"])(this, ScrollOverPack);
	
	    var _this = (0, _possibleConstructorReturn3["default"])(this, _ScrollElement.call(this, props));
	
	    _this.scrollEventListener = function (e) {
	      _this.getParam(e);
	      if (_this.enter) {
	        if (!_this.state.show) {
	          _this.setState({
	            show: true
	          });
	        }
	        if (!_this.props.always) {
	          _EventDispatcher2["default"].removeEventListener(_this.eventType, _this.scrollEventListener);
	        }
	      }
	      var bottomLeave = _this.elementShowHeight < _this.playHeight;
	      // 设置往上时的出场点...
	      var topLeave = _this.props.replay ? _this.elementShowHeight > _this.clientHeight + _this.leavePlayHeight : null;
	      if (topLeave || bottomLeave) {
	        if (_this.state.show) {
	          _this.setState({
	            show: false
	          });
	        }
	      }
	    };
	
	    _this.children = (0, _util.toArrayChildren)(_this.props.children);
	    _this.oneEnter = false;
	    _this.enter = false;
	    _this.state = {
	      show: false,
	      children: (0, _util.toArrayChildren)(_this.props.children)
	    };
	    return _this;
	  }
	
	  ScrollOverPack.prototype.render = function render() {
	    var _this2 = this;
	
	    var placeholderProps = (0, _objectWithoutProperties3["default"])(this.props, []);
	
	    ['playScale', 'replay', 'component', 'always', 'scrollEvent', 'hideProps', 'location'].forEach(function (key) {
	      return delete placeholderProps[key];
	    });
	    var childToRender = void 0;
	    if (!this.oneEnter && !this.state.show) {
	      childToRender = (0, _react.createElement)(this.props.component, (0, _extends3["default"])({}, placeholderProps), null);
	      this.oneEnter = true;
	    } else {
	      if (!this.state.show) {
	        this.children = this.children.map(function (item) {
	          if (!item || !item.key) {
	            return null;
	          }
	          var element = void 0;
	          var hideProps = _this2.props.hideProps[item.key];
	          if (hideProps) {
	            element = _react2["default"].cloneElement(item, (0, _extends3["default"])({}, hideProps));
	            return element;
	          }
	          element = _react2["default"].cloneElement(item, {}, null);
	          return element;
	        });
	      } else {
	        this.children = this.state.children;
	      }
	      childToRender = (0, _react.createElement)(this.props.component, (0, _extends3["default"])({}, placeholderProps), this.children);
	    }
	    return childToRender;
	  };
	
	  return ScrollOverPack;
	}(_ScrollElement3["default"]);
	
	ScrollOverPack.propTypes = {
	  component: _react2["default"].PropTypes.string,
	  playScale: _react2["default"].PropTypes.any,
	  always: _react2["default"].PropTypes.bool,
	  scrollEvent: _react2["default"].PropTypes.func,
	  children: _react2["default"].PropTypes.any,
	  className: _react2["default"].PropTypes.string,
	  style: _react2["default"].PropTypes.any,
	  replay: _react2["default"].PropTypes.bool,
	  onChange: _react2["default"].PropTypes.func,
	  hideProps: _react2["default"].PropTypes.object
	};
	
	ScrollOverPack.defaultProps = {
	  component: 'div',
	  playScale: 0.5,
	  always: true,
	  scrollEvent: noop,
	  replay: false,
	  onChange: noop,
	  hideProps: {}
	};
	
	exports["default"] = ScrollOverPack;
	module.exports = exports['default'];

/***/ }),

/***/ 319:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _util = __webpack_require__(320);
	
	function EventDispatcher(target) {
	  this._listeners = {};
	  this._eventTarget = target || {};
	  this.recoverLists = [];
	}
	EventDispatcher.prototype = {
	  addEventListener: function addEventListener(type, callback) {
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
	    var func = this.dispatchEvent.bind(this, _type);
	    list.splice(index, 0, { c: callback, n: namespaces, t: _type, func: func });
	    if (this._eventTarget.addEventListener) {
	      this._eventTarget.addEventListener(_type, func, false);
	    } else if (this._eventTarget.attachEvent) {
	      this._eventTarget.attachEvent('on' + _type, func);
	    }
	  },
	  removeEventListener: function removeEventListener(type, callback, force) {
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
	          if (this._eventTarget.removeEventListener) {
	            this._eventTarget.removeEventListener(list[i].t, list[i].func);
	          } else if (this._eventTarget.detachEvent) {
	            this._eventTarget.detachEvent('on' + list[i].t, list[i].func);
	          }
	          list.splice(i, 1);
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
	  removeAllType: function removeAllType(type) {
	    var _this = this;
	
	    var types = type.split('.');
	    var _type = types[0];
	    var namespaces = types[1];
	    var list = this._listeners[_type];
	    this.recoverLists = this.recoverLists.concat((0, _util.dataToArray)(list).filter(function (item) {
	      return item.n && item.n.match(namespaces);
	    }));
	    this.recoverLists.forEach(function (item) {
	      _this.removeEventListener(item.t + '.' + item.n, item.c);
	    });
	  },
	  reAllType: function reAllType(type) {
	    var _this2 = this;
	
	    var types = type.split('.');
	    var _type = types[0];
	    var namespaces = types[1];
	    this.recoverLists = this.recoverLists.map(function (item) {
	      if (item.t === _type && item.n.match(namespaces)) {
	        _this2.addEventListener(item.t + '.' + item.n, item.c);
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
	exports["default"] = event;
	module.exports = exports['default'];

/***/ }),

/***/ 320:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof2 = __webpack_require__(4);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	exports.toArrayChildren = toArrayChildren;
	exports.dataToArray = dataToArray;
	exports.transformArguments = transformArguments;
	exports.objectEqual = objectEqual;
	exports.currentScrollTop = currentScrollTop;
	exports.windowHeight = windowHeight;
	
	var _react = __webpack_require__(88);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function toArrayChildren(children) {
	  var ret = [];
	  _react2["default"].Children.forEach(children, function (c) {
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
	          if ((0, _typeof3["default"])(currentObj[p]) === 'object' && (0, _typeof3["default"])(nextObj[p]) === 'object') {
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
	
	    if ((0, _typeof3["default"])(obj1[key]) === 'object' && (0, _typeof3["default"])(obj2[key]) === 'object') {
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
	    if ((0, _typeof3["default"])(obj2[key]) === 'object' && (0, _typeof3["default"])(obj1[key]) === 'object') {
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

/***/ }),

/***/ 321:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(83);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(297);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(3);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(72);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(88);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(125);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _Mapped = __webpack_require__(322);
	
	var _Mapped2 = _interopRequireDefault(_Mapped);
	
	var _EventDispatcher = __webpack_require__(319);
	
	var _EventDispatcher2 = _interopRequireDefault(_EventDispatcher);
	
	var _util = __webpack_require__(320);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var noop = function noop() {};
	
	var ScrollElement = function (_React$Component) {
	  (0, _inherits3["default"])(ScrollElement, _React$Component);
	
	  function ScrollElement() {
	    var _temp, _this, _ret;
	
	    (0, _classCallCheck3["default"])(this, ScrollElement);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.getParam = function (e) {
	      _this.clientHeight = (0, _util.windowHeight)();
	      var scrollTop = (0, _util.currentScrollTop)();
	      // 屏幕缩放时的响应，所以放回这里，这个是pack，只处理子级里面的动画，所以marginTop无关系，所以不需减掉；
	      var domRect = _this.dom.getBoundingClientRect();
	      var offsetTop = domRect.top + scrollTop;
	      _this.elementShowHeight = scrollTop - offsetTop + _this.clientHeight;
	      var playScale = (0, _util.transformArguments)(_this.props.playScale);
	      _this.playHeight = _this.clientHeight * playScale[0];
	      var leaveHeight = domRect.height;
	      _this.leavePlayHeight = leaveHeight * playScale[1];
	      var enter = _this.elementShowHeight >= _this.playHeight && _this.elementShowHeight <= _this.clientHeight + _this.leavePlayHeight;
	      var enterOrLeave = enter ? 'enter' : 'leave';
	      var mode = _this.enter !== enter || typeof _this.enter !== 'boolean' ? enterOrLeave : null;
	      if (mode) {
	        _this.props.onChange({ mode: mode, id: _this.props.id }, e);
	      }
	      _this.enter = enter;
	    }, _this.scrollEventListener = function (e) {
	      _this.getParam(e);
	    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
	  }
	
	  ScrollElement.prototype.componentDidMount = function componentDidMount() {
	    this.dom = _reactDom2["default"].findDOMNode(this);
	    if (this.props.location) {
	      this.dom = document.getElementById(this.props.location);
	      _Mapped2["default"].register(this.props.location, this.dom);
	    } else if (this.props.id) {
	      _Mapped2["default"].register(this.props.id, this.dom);
	    }
	    var date = Date.now();
	    var length = _EventDispatcher2["default"]._listeners.scroll ? _EventDispatcher2["default"]._listeners.scroll.length : 0;
	    this.eventType = 'scroll.scrollEvent' + date + length;
	    this.scrollEventListener();
	    _EventDispatcher2["default"].addEventListener(this.eventType, this.scrollEventListener);
	  };
	
	  ScrollElement.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    this.setState({
	      children: (0, _util.toArrayChildren)(nextProps.children)
	    });
	  };
	
	  ScrollElement.prototype.componentWillUnmount = function componentWillUnmount() {
	    _Mapped2["default"].unRegister(this.props.id);
	    _EventDispatcher2["default"].removeEventListener(this.eventType, this.scrollEventListener);
	  };
	
	  ScrollElement.prototype.render = function render() {
	    var props = (0, _objectWithoutProperties3["default"])(this.props, []);
	
	    ['component', 'playScale', 'location'].forEach(function (key) {
	      return delete props[key];
	    });
	    return _react2["default"].createElement(this.props.component, (0, _extends3["default"])({}, props));
	  };
	
	  return ScrollElement;
	}(_react2["default"].Component);
	
	ScrollElement.propTypes = {
	  component: _react2["default"].PropTypes.any,
	  playScale: _react2["default"].PropTypes.any,
	  id: _react2["default"].PropTypes.string,
	  onChange: _react2["default"].PropTypes.func,
	  location: _react2["default"].PropTypes.string
	};
	
	ScrollElement.defaultProps = {
	  component: 'div',
	  onChange: noop,
	  playScale: 0.5
	};
	exports["default"] = ScrollElement;
	module.exports = exports['default'];

/***/ }),

/***/ 322:
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var __mapped = {
	  __arr: []
	};
	
	exports["default"] = {
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
	};
	module.exports = exports['default'];

/***/ })

});
//# sourceMappingURL=scrollAnim.js.map