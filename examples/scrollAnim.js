webpackJsonp([15],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(200);


/***/ },

/***/ 200:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _rcTweenOne = __webpack_require__(2);
	
	var _rcTweenOne2 = _interopRequireDefault(_rcTweenOne);
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(37);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _ScrollOverPack = __webpack_require__(201);
	
	var _ScrollOverPack2 = _interopRequireDefault(_ScrollOverPack);
	
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
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'div',
	        { style: { height: 800 } },
	        '往下滚动'
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
	          '执行动画'
	        ),
	        _react2.default.createElement(
	          _rcTweenOne2.default,
	          {
	            key: '2',
	            animation: { y: 30, delay: 100, ease: 'easeOutQuart', type: 'from', opacity: 0 },
	            reverseDelay: 100,
	            style: { background: '#000fff' }
	          },
	          '执行动画'
	        )
	      )
	    );
	  };
	
	  return Demo;
	}(_react2.default.Component);
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ },

/***/ 201:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(37);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _EventDispatcher = __webpack_require__(202);
	
	var _EventDispatcher2 = _interopRequireDefault(_EventDispatcher);
	
	var _Mapped = __webpack_require__(203);
	
	var _Mapped2 = _interopRequireDefault(_Mapped);
	
	var _util = __webpack_require__(204);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	function noop() {}
	
	function toArrayChildren(children) {
	  var ret = [];
	  _react2["default"].Children.forEach(children, function (c) {
	    ret.push(c);
	  });
	  return ret;
	}
	
	var ScrollOverPack = function (_React$Component) {
	  _inherits(ScrollOverPack, _React$Component);
	
	  function ScrollOverPack() {
	    _classCallCheck(this, ScrollOverPack);
	
	    var _this = _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	
	    _this.children = toArrayChildren(_this.props.children);
	    _this.oneEnter = false;
	    _this.state = {
	      show: false,
	      children: toArrayChildren(_this.props.children)
	    };
	    ['scrollEventListener'].forEach(function (method) {
	      return _this[method] = _this[method].bind(_this);
	    });
	    return _this;
	  }
	
	  ScrollOverPack.prototype.componentDidMount = function componentDidMount() {
	    this.dom = _reactDom2["default"].findDOMNode(this);
	    this.computedStyle = document.defaultView.getComputedStyle(this.dom);
	    if (this.props.scrollName) {
	      _Mapped2["default"].register(this.props.scrollName, this.dom);
	    }
	    var date = Date.now();
	    var length = _EventDispatcher2["default"]._listeners.scroll ? _EventDispatcher2["default"]._listeners.scroll.length : 0;
	    this.eventType = 'scroll.scrollEvent' + date + length;
	    this.scrollEventListener();
	    _EventDispatcher2["default"].addEventListener(this.eventType, this.scrollEventListener);
	  };
	
	  ScrollOverPack.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    this.setState({
	      children: toArrayChildren(nextProps.children)
	    });
	  };
	
	  ScrollOverPack.prototype.componentWillUnmount = function componentWillUnmount() {
	    _Mapped2["default"].unRegister(this.props.scrollName);
	    _EventDispatcher2["default"].removeEventListener(this.eventType, this.scrollEventListener);
	  };
	
	  ScrollOverPack.prototype.scrollEventListener = function scrollEventListener(e) {
	    var clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	    var scrollTop = (0, _util.currentScrollTop)();
	    // 屏幕缩放时的响应，所以放回这里，这个是pack，只处理子级里面的动画，所以marginTop无关系，所以不需减掉；
	    var domRect = this.dom.getBoundingClientRect();
	    var offsetTop = domRect.top + scrollTop;
	    var elementShowHeight = scrollTop - offsetTop + clientHeight;
	    var playScale = (0, _util.transformArguments)(this.props.playScale);
	    var playHeight = clientHeight * playScale[0];
	
	    var enter = elementShowHeight >= playHeight && elementShowHeight <= clientHeight + playHeight;
	    var bottomLeave = elementShowHeight < playHeight;
	    // 设置往上时的出场点...
	    var leaveHeight = domRect.height > clientHeight ? clientHeight : domRect.height;
	    var topLeave = this.props.replay ? elementShowHeight > clientHeight + leaveHeight * playScale[1] : null;
	    var mode = 'scroll';
	    if (enter) {
	      if (!this.state.show) {
	        this.setState({
	          show: true
	        });
	        mode = 'enter';
	        this.props.onChange({ mode: mode, scrollName: this.props.scrollName });
	      }
	      if (!this.props.always) {
	        _EventDispatcher2["default"].removeEventListener(this.eventType, this.scrollEventListener);
	      }
	    }
	    if (topLeave || bottomLeave) {
	      if (this.state.show) {
	        this.setState({
	          show: false
	        });
	        mode = 'leave';
	        this.props.onChange({ mode: mode, scrollName: this.props.scrollName });
	      }
	    }
	
	    if (e) {
	      this.props.scrollEvent({ mode: mode, scrollName: this.props.scrollName, e: e });
	    }
	  };
	
	  ScrollOverPack.prototype.render = function render() {
	    var _this2 = this;
	
	    var placeholderProps = _objectWithoutProperties(this.props, []);
	
	    ['scrollName', 'playScale', 'replay', 'component', 'playScale', 'always', 'scrollEvent', 'hideProps'].forEach(function (key) {
	      return delete placeholderProps[key];
	    });
	    var childToRender = void 0;
	    if (!this.oneEnter && !this.state.show) {
	      childToRender = (0, _react.createElement)(this.props.component, _extends({}, placeholderProps), null);
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
	            element = _react2["default"].cloneElement(item, _extends({}, hideProps));
	            return element;
	          }
	          element = _react2["default"].cloneElement(item, {}, null);
	          return element;
	        });
	      } else {
	        this.children = this.state.children;
	      }
	      childToRender = (0, _react.createElement)(this.props.component, _extends({}, placeholderProps), this.children);
	    }
	    return childToRender;
	  };
	
	  return ScrollOverPack;
	}(_react2["default"].Component);
	
	var objectOrArray = _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.object, _react2["default"].PropTypes.array]);
	var numberOrArray = _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.number, _react2["default"].PropTypes.array]);
	ScrollOverPack.propTypes = {
	  component: _react2["default"].PropTypes.string,
	  playScale: numberOrArray,
	  always: _react2["default"].PropTypes.bool,
	  scrollEvent: _react2["default"].PropTypes.func,
	  children: objectOrArray,
	  className: _react2["default"].PropTypes.string,
	  style: objectOrArray,
	  scrollName: _react2["default"].PropTypes.string,
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
	  onChange: noop
	};
	
	exports["default"] = ScrollOverPack;
	module.exports = exports['default'];

/***/ },

/***/ 202:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function EventDispatcher(target) {
	  this._listeners = {};
	  this._eventTarget = target || this;
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
	          list.splice(i, 1);
	          if (this._eventTarget.removeEventListener) {
	            this._eventTarget.removeEventListener(list.t, list.func);
	          } else if (this._eventTarget.detachEvent) {
	            this._eventTarget.detachEvent(list.t, list.func);
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
	  }
	};
	
	exports["default"] = new EventDispatcher(window);
	module.exports = exports['default'];

/***/ },

/***/ 203:
/***/ function(module, exports) {

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

/***/ },

/***/ 204:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.dataToArray = dataToArray;
	exports.transformArguments = transformArguments;
	exports.objectEqual = objectEqual;
	exports.currentScrollTop = currentScrollTop;
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
	          if (_typeof(currentObj[p]) === 'object' && _typeof(nextObj[p]) === 'object') {
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
	
	    if (_typeof(obj1[key]) === 'object' && _typeof(obj2[key]) === 'object') {
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
	    if (_typeof(obj2[key]) === 'object' && _typeof(obj1[key]) === 'object') {
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
	  var supportPageOffset = window.pageXOffset !== undefined;
	  var isCSS1Compat = (document.compatMode || '') === 'CSS1Compat';
	  var isCSS1ScrollTop = isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
	  return supportPageOffset ? window.pageYOffset : isCSS1ScrollTop;
	}

/***/ }

});
//# sourceMappingURL=scrollAnim.js.map