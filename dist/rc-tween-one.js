(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["rc-tween-one"] = factory(require("react"), require("react-dom"));
	else
		root["rc-tween-one"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_86__, __WEBPACK_EXTERNAL_MODULE_87__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(102);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var TweenOne = __webpack_require__(2);
	TweenOne.TweenOneGroup = __webpack_require__(101);
	TweenOne.easing = __webpack_require__(93);
	module.exports = TweenOne;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(3);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _classCallCheck2 = __webpack_require__(41);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(42);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(78);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(86);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(87);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _util = __webpack_require__(88);
	
	var _styleUtils = __webpack_require__(91);
	
	var _TimeLine = __webpack_require__(92);
	
	var _TimeLine2 = _interopRequireDefault(_TimeLine);
	
	var _plugins = __webpack_require__(95);
	
	var _plugins2 = _interopRequireDefault(_plugins);
	
	var _ticker = __webpack_require__(97);
	
	var _ticker2 = _interopRequireDefault(_ticker);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function noop() {}
	
	var perFrame = Math.round(1000 / 60);
	
	var TweenOne = function (_Component) {
	  (0, _inherits3.default)(TweenOne, _Component);
	
	  function TweenOne() {
	    (0, _classCallCheck3.default)(this, TweenOne);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
	
	    _this.restart = function () {
	      _this.startMoment = _this.timeLine.progressTime;
	      _this.startFrame = _ticker2.default.frame;
	      _this.play();
	    };
	
	    _this.start = function () {
	      var props = _this.props;
	      if (props.animation && Object.keys(props.animation).length) {
	        _this.timeLine = new _TimeLine2.default(_this.dom, (0, _util.dataToArray)(props.animation), { attr: props.attr, willChange: props.willChange });
	        // 预先注册 raf, 初始动画数值。
	        _this.raf(0, true);
	        // 开始动画
	        _this.play();
	      }
	    };
	
	    _this.play = function () {
	      _this.cancelRequestAnimationFrame();
	      if (_this.paused) {
	        return;
	      }
	      _this.rafID = _ticker2.default.add(_this.raf);
	    };
	
	    _this.frame = function (date, register) {
	      var registerMoment = register ? date : 0;
	      var moment = (_ticker2.default.frame - _this.startFrame) * perFrame + registerMoment + _this.startMoment;
	      if (!register && moment < perFrame && typeof _this.props.moment !== 'number') {
	        // 注册完后，第一帧预先跑动， 鼠标跟随
	        moment = perFrame;
	      }
	      if (_this.reverse) {
	        moment = (_this.startMoment || 0) - (_ticker2.default.frame - _this.startFrame) * perFrame;
	      }
	      moment = moment > _this.timeLine.totalTime ? _this.timeLine.totalTime : moment;
	      moment = moment <= 0 ? 0 : moment;
	      if (moment < _this.moment && !_this.reverse) {
	        _this.timeLine.resetDefaultStyle();
	      }
	      _this.moment = moment;
	      _this.timeLine.onChange = _this.onChange;
	      _this.timeLine.frame(moment);
	    };
	
	    _this.raf = function (date, register) {
	      _this.frame(date, register);
	      if (_this.moment >= _this.timeLine.totalTime && !_this.reverse || _this.paused || _this.reverse && _this.moment === 0) {
	        return _this.cancelRequestAnimationFrame();
	      }
	    };
	
	    _this.cancelRequestAnimationFrame = function () {
	      _ticker2.default.clear(_this.rafID);
	      _this.rafID = -1;
	    };
	
	    _this.rafID = -1;
	    _this.moment = _this.props.moment || 0;
	    _this.startMoment = _this.props.moment || 0;
	    _this.startFrame = _ticker2.default.frame;
	    _this.paused = _this.props.paused;
	    _this.reverse = _this.props.reverse;
	    _this.onChange = _this.props.onChange;
	    _this.newMomentAnim = false;
	    return _this;
	  }
	
	  TweenOne.prototype.componentDidMount = function componentDidMount() {
	    this.dom = _reactDom2.default.findDOMNode(this);
	    this.start();
	  };
	
	  TweenOne.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    var _this2 = this;
	
	    this.onChange = nextProps.onChange;
	    // 跳帧事件 moment;
	    var newMoment = nextProps.moment;
	    this.newMomentAnim = false;
	    if (typeof newMoment === 'number' && newMoment !== this.moment) {
	      this.startMoment = newMoment;
	      this.startFrame = _ticker2.default.frame;
	      if (this.rafID === -1 && !nextProps.paused) {
	        (function () {
	          _this2.timeLine.resetAnimData();
	          var style = nextProps.style;
	          _this2.dom.setAttribute('style', '');
	          Object.keys(style).forEach(function (key) {
	            _this2.dom.style[key] = (0, _styleUtils.stylesToCss)(key, style[key]);
	          });
	          _this2.play();
	        })();
	      } else {
	        this.newMomentAnim = true;
	      }
	    }
	    // 动画处理
	    var newAnimation = nextProps.animation;
	    var currentAnimation = this.props.animation;
	    var equal = (0, _util.objectEqual)(currentAnimation, newAnimation);
	    var styleEqual = (0, _util.objectEqual)(this.props.style, nextProps.style);
	    // 如果 animation 不同， 重新动画
	    this.restartAnim = false;
	    if (!equal) {
	      this.cancelRequestAnimationFrame();
	      if (nextProps.resetStyleBool && this.timeLine) {
	        this.timeLine.resetDefaultStyle();
	      }
	      this.startMoment = 0;
	      this.startFrame = _ticker2.default.frame;
	      this.restartAnim = true;
	      // this.start(nextProps);
	    } else if (!styleEqual) {
	      // 如果 animation 相同，，style 不同，从当前时间开放。
	      if (this.rafID !== -1) {
	        this.cancelRequestAnimationFrame();
	        this.startMoment = this.timeLine.progressTime;
	        this.startFrame = _ticker2.default.frame;
	        this.restartAnim = true;
	        // this.start(nextProps);
	      }
	    }
	    // 暂停倒放
	    if (this.paused !== nextProps.paused || this.reverse !== nextProps.reverse) {
	      this.paused = nextProps.paused;
	      this.reverse = nextProps.reverse;
	      if (this.paused) {
	        this.cancelRequestAnimationFrame();
	      } else {
	        if (this.reverse && nextProps.reverseDelay) {
	          this.cancelRequestAnimationFrame();
	          _ticker2.default.timeout(this.restart, nextProps.reverseDelay);
	        } else {
	          this.restart();
	        }
	      }
	    }
	  };
	
	  TweenOne.prototype.componentDidUpdate = function componentDidUpdate() {
	    // 样式更新了后再执行动画；
	    if (this.restartAnim) {
	      this.start();
	    }
	    if (this.newMomentAnim) {
	      this.raf();
	    }
	  };
	
	  TweenOne.prototype.componentWillUnmount = function componentWillUnmount() {
	    this.cancelRequestAnimationFrame();
	  };
	
	  TweenOne.prototype.render = function render() {
	    var props = (0, _extends3.default)({}, this.props);
	    ['animation', 'component', 'reverseDelay', 'attr', 'paused', 'reverse', 'moment', 'resetStyleBool', 'willChange'].forEach(function (key) {
	      return delete props[key];
	    });
	    props.style = (0, _extends3.default)({}, this.props.style);
	    Object.keys(props.style).forEach(function (p) {
	      if (p.match(/filter/i)) {
	        ['Webkit', 'Moz', 'Ms', 'ms'].forEach(function (prefix) {
	          return props.style[prefix + 'Filter'] = props.style[p];
	        });
	      }
	    });
	    props.component = typeof props.component === 'function' ? this.props.componentReplace : props.component;
	    if (!props.component) {
	      delete props.component;
	    }
	    return _react2.default.createElement(this.props.component, props);
	  };
	
	  return TweenOne;
	}(_react.Component);
	
	var objectOrArray = _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.array]);
	
	TweenOne.propTypes = {
	  component: _react.PropTypes.any,
	  componentReplace: _react.PropTypes.string,
	  animation: objectOrArray,
	  children: _react.PropTypes.any,
	  style: _react.PropTypes.object,
	  paused: _react.PropTypes.bool,
	  reverse: _react.PropTypes.bool,
	  reverseDelay: _react.PropTypes.number,
	  moment: _react.PropTypes.number,
	  attr: _react.PropTypes.string,
	  willChange: _react.PropTypes.bool,
	  onChange: _react.PropTypes.func,
	  resetStyleBool: _react.PropTypes.bool
	};
	
	TweenOne.defaultProps = {
	  component: 'div',
	  reverseDelay: 0,
	  attr: 'style',
	  onChange: noop,
	  willChange: true
	};
	TweenOne.plugins = _plugins2.default;
	exports.default = TweenOne;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _assign = __webpack_require__(4);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _assign2.default || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];
	
	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }
	
	  return target;
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(5), __esModule: true };

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(6);
	module.exports = __webpack_require__(9).Object.assign;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(7);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(22)});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(8)
	  , core      = __webpack_require__(9)
	  , ctx       = __webpack_require__(10)
	  , hide      = __webpack_require__(12)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 8 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 9 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(11);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(13)
	  , createDesc = __webpack_require__(21);
	module.exports = __webpack_require__(17) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(14)
	  , IE8_DOM_DEFINE = __webpack_require__(16)
	  , toPrimitive    = __webpack_require__(20)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(17) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(15);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(17) && !__webpack_require__(18)(function(){
	  return Object.defineProperty(__webpack_require__(19)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(18)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(15)
	  , document = __webpack_require__(8).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(15);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(23)
	  , gOPS     = __webpack_require__(38)
	  , pIE      = __webpack_require__(39)
	  , toObject = __webpack_require__(40)
	  , IObject  = __webpack_require__(27)
	  , $assign  = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(18)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(24)
	  , enumBugKeys = __webpack_require__(37);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(25)
	  , toIObject    = __webpack_require__(26)
	  , arrayIndexOf = __webpack_require__(30)(false)
	  , IE_PROTO     = __webpack_require__(34)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(27)
	  , defined = __webpack_require__(29);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(28);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(26)
	  , toLength  = __webpack_require__(31)
	  , toIndex   = __webpack_require__(33);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(32)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(32)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(35)('keys')
	  , uid    = __webpack_require__(36);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(8)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 38 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 39 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(29);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _typeof2 = __webpack_require__(43);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }
	
	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(44);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(64);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(45), __esModule: true };

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(46);
	__webpack_require__(59);
	module.exports = __webpack_require__(63).f('iterator');

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(47)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(48)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(32)
	  , defined   = __webpack_require__(29);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(49)
	  , $export        = __webpack_require__(7)
	  , redefine       = __webpack_require__(50)
	  , hide           = __webpack_require__(12)
	  , has            = __webpack_require__(25)
	  , Iterators      = __webpack_require__(51)
	  , $iterCreate    = __webpack_require__(52)
	  , setToStringTag = __webpack_require__(56)
	  , getPrototypeOf = __webpack_require__(58)
	  , ITERATOR       = __webpack_require__(57)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(12);

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(53)
	  , descriptor     = __webpack_require__(21)
	  , setToStringTag = __webpack_require__(56)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(12)(IteratorPrototype, __webpack_require__(57)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(14)
	  , dPs         = __webpack_require__(54)
	  , enumBugKeys = __webpack_require__(37)
	  , IE_PROTO    = __webpack_require__(34)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(19)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(55).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(13)
	  , anObject = __webpack_require__(14)
	  , getKeys  = __webpack_require__(23);
	
	module.exports = __webpack_require__(17) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(8).document && document.documentElement;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(13).f
	  , has = __webpack_require__(25)
	  , TAG = __webpack_require__(57)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(35)('wks')
	  , uid        = __webpack_require__(36)
	  , Symbol     = __webpack_require__(8).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(25)
	  , toObject    = __webpack_require__(40)
	  , IE_PROTO    = __webpack_require__(34)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(60);
	var global        = __webpack_require__(8)
	  , hide          = __webpack_require__(12)
	  , Iterators     = __webpack_require__(51)
	  , TO_STRING_TAG = __webpack_require__(57)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(61)
	  , step             = __webpack_require__(62)
	  , Iterators        = __webpack_require__(51)
	  , toIObject        = __webpack_require__(26);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(48)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(57);

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(65), __esModule: true };

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(66);
	__webpack_require__(75);
	__webpack_require__(76);
	__webpack_require__(77);
	module.exports = __webpack_require__(9).Symbol;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(8)
	  , has            = __webpack_require__(25)
	  , DESCRIPTORS    = __webpack_require__(17)
	  , $export        = __webpack_require__(7)
	  , redefine       = __webpack_require__(50)
	  , META           = __webpack_require__(67).KEY
	  , $fails         = __webpack_require__(18)
	  , shared         = __webpack_require__(35)
	  , setToStringTag = __webpack_require__(56)
	  , uid            = __webpack_require__(36)
	  , wks            = __webpack_require__(57)
	  , wksExt         = __webpack_require__(63)
	  , wksDefine      = __webpack_require__(68)
	  , keyOf          = __webpack_require__(69)
	  , enumKeys       = __webpack_require__(70)
	  , isArray        = __webpack_require__(71)
	  , anObject       = __webpack_require__(14)
	  , toIObject      = __webpack_require__(26)
	  , toPrimitive    = __webpack_require__(20)
	  , createDesc     = __webpack_require__(21)
	  , _create        = __webpack_require__(53)
	  , gOPNExt        = __webpack_require__(72)
	  , $GOPD          = __webpack_require__(74)
	  , $DP            = __webpack_require__(13)
	  , $keys          = __webpack_require__(23)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(73).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(39).f  = $propertyIsEnumerable;
	  __webpack_require__(38).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(49)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(12)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(36)('meta')
	  , isObject = __webpack_require__(15)
	  , has      = __webpack_require__(25)
	  , setDesc  = __webpack_require__(13).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(18)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(8)
	  , core           = __webpack_require__(9)
	  , LIBRARY        = __webpack_require__(49)
	  , wksExt         = __webpack_require__(63)
	  , defineProperty = __webpack_require__(13).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(23)
	  , toIObject = __webpack_require__(26);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(23)
	  , gOPS    = __webpack_require__(38)
	  , pIE     = __webpack_require__(39);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(28);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(26)
	  , gOPN      = __webpack_require__(73).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(24)
	  , hiddenKeys = __webpack_require__(37).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(39)
	  , createDesc     = __webpack_require__(21)
	  , toIObject      = __webpack_require__(26)
	  , toPrimitive    = __webpack_require__(20)
	  , has            = __webpack_require__(25)
	  , IE8_DOM_DEFINE = __webpack_require__(16)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(17) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 75 */
/***/ function(module, exports) {



/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(68)('asyncIterator');

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(68)('observable');

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _setPrototypeOf = __webpack_require__(79);
	
	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);
	
	var _create = __webpack_require__(83);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _typeof2 = __webpack_require__(43);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }
	
	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(80), __esModule: true };

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(81);
	module.exports = __webpack_require__(9).Object.setPrototypeOf;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(7);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(82).set});

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(15)
	  , anObject = __webpack_require__(14);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(10)(Function.call, __webpack_require__(74).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(84), __esModule: true };

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(85);
	var $Object = __webpack_require__(9).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(7)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(53)});

/***/ },
/* 86 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_86__;

/***/ },
/* 87 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_87__;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof2 = __webpack_require__(43);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	exports.toArrayChildren = toArrayChildren;
	exports.dataToArray = dataToArray;
	exports.objectEqual = objectEqual;
	exports.findChildInChildrenByKey = findChildInChildrenByKey;
	exports.mergeChildren = mergeChildren;
	exports.transformArguments = transformArguments;
	exports.getChildrenFromProps = getChildrenFromProps;
	exports.startConvertToEndUnit = startConvertToEndUnit;
	exports.parsePath = parsePath;
	exports.getTransformValue = getTransformValue;
	
	var _react = __webpack_require__(86);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _deepEql = __webpack_require__(89);
	
	var _deepEql2 = _interopRequireDefault(_deepEql);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function toArrayChildren(children) {
	  var ret = [];
	  _react2.default.Children.forEach(children, function (c) {
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
	
	function objectEqual(obj1, obj2) {
	  if (obj1 === obj2 || (0, _deepEql2.default)(obj1, obj2)) {
	    return true;
	  }
	  if (!obj1 || !obj2) {
	    return false;
	  }
	  // animation 写在标签上的进行判断是否相等， 判断每个参数有没有 function;
	  var equalBool = true;
	  if (Array.isArray(obj1) && Array.isArray(obj2)) {
	    if (obj1.length !== obj2.length) {
	      return false;
	    }
	    for (var i = 0; i < obj1.length; i++) {
	      var currentObj = obj1[i];
	      var nextObj = obj2[i];
	      for (var p in currentObj) {
	        if (currentObj[p] !== nextObj[p]) {
	          if ((0, _typeof3.default)(currentObj[p]) === 'object' && (0, _typeof3.default)(nextObj[p]) === 'object') {
	            equalBool = objectEqual(currentObj[p], nextObj[p]);
	          } else if (typeof currentObj[p] === 'function' && typeof nextObj[p] === 'function') {
	            if (currentObj[p].name !== nextObj[p].name) {
	              equalBool = false;
	            }
	          } else {
	            equalBool = false;
	            return false;
	          }
	        }
	      }
	    }
	  }
	
	  var setEqualBool = function setEqualBool(objA, objB) {
	    Object.keys(objA).forEach(function (key) {
	      if (!(key in objB)) {
	        equalBool = false;
	      }
	
	      if ((0, _typeof3.default)(objA[key]) === 'object' && (0, _typeof3.default)(objB[key]) === 'object') {
	        equalBool = objectEqual(objA[key], objB[key]);
	      } else if (typeof objA[key] === 'function' && typeof objB[key] === 'function') {
	        if (objA[key].name !== objB[key].name) {
	          equalBool = false;
	        }
	      } else if (objA[key] !== objB[key]) {
	        equalBool = false;
	      }
	    });
	  };
	
	  setEqualBool(obj1, obj2);
	  setEqualBool(obj2, obj1);
	  return equalBool;
	}
	
	function findChildInChildrenByKey(children, key) {
	  var ret = null;
	  if (children) {
	    children.forEach(function (c) {
	      if (ret || !c) {
	        return;
	      }
	      if (c.key === key) {
	        ret = c;
	      }
	    });
	  }
	  return ret;
	}
	
	function mergeChildren(prev, next) {
	  var ret = [];
	  // For each key of `next`, the list of keys to insert before that key in
	  // the combined list
	  var nextChildrenPending = {};
	  var pendingChildren = [];
	  var followChildrenKey = void 0;
	  prev.forEach(function (c) {
	    if (!c) {
	      return;
	    }
	    if (findChildInChildrenByKey(next, c.key)) {
	      if (pendingChildren.length) {
	        nextChildrenPending[c.key] = pendingChildren;
	        pendingChildren = [];
	      }
	      followChildrenKey = c.key;
	    } else if (c.key) {
	      pendingChildren.push(c);
	    }
	  });
	  if (!followChildrenKey) {
	    ret = ret.concat(pendingChildren);
	  }
	
	  next.forEach(function (c) {
	    if (!c) {
	      return;
	    }
	    if (nextChildrenPending.hasOwnProperty(c.key)) {
	      ret = ret.concat(nextChildrenPending[c.key]);
	    }
	    ret.push(c);
	    if (c.key === followChildrenKey) {
	      ret = ret.concat(pendingChildren);
	    }
	  });
	
	  return ret;
	}
	
	function transformArguments(arg, key, i) {
	  var result = void 0;
	  if (typeof arg === 'function') {
	    result = arg({
	      key: key,
	      index: i
	    });
	  } else {
	    result = arg;
	  }
	  return result;
	}
	
	function getChildrenFromProps(props) {
	  return props && props.children;
	}
	
	function startConvertToEndUnit(target, style, num, unit, dataUnit, fixed, isOriginWidth) {
	  var horiz = /(?:Left|Right|Width|X)/i.test(style) || isOriginWidth;
	  var t = style.indexOf('border') !== -1 ? target : target.parentNode || document.body;
	  t = fixed ? document.body : t;
	  var pix = void 0;
	
	  if (unit === '%') {
	    pix = parseFloat(num) / 100 * (horiz ? t.clientWidth : t.clientHeight);
	  } else if (unit === 'vw') {
	    pix = parseFloat(num) * document.body.clientWidth / 100;
	  } else if (unit === 'vh') {
	    pix = parseFloat(num) * document.body.clientHeight / 100;
	  } else if (unit && unit.match(/em/i)) {
	    pix = parseFloat(num) * 16;
	  } else {
	    pix = parseFloat(num);
	  }
	  if (dataUnit === '%') {
	    pix = pix * 100 / (horiz ? t.clientWidth : t.clientHeight);
	  } else if (dataUnit === 'vw') {
	    pix = parseFloat(num) / document.body.clientWidth * 100;
	  } else if (dataUnit === 'vh') {
	    pix = parseFloat(num) / document.body.clientHeight * 100;
	  } else if (dataUnit && dataUnit.match(/em/i)) {
	    pix = parseFloat(num) / 16;
	  }
	  return pix;
	}
	
	function parsePath(path) {
	  if (typeof path === 'string') {
	    if (path.charAt(0).match(/m/i)) {
	      var domPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	      domPath.setAttributeNS(null, 'd', path);
	      return domPath;
	    }
	    return document.querySelector(path);
	  } else if (path.style) {
	    return path;
	  }
	  throw new Error('Error while parsing the path');
	}
	
	function getTransformValue(t, supports3D) {
	  if (typeof t === 'string') {
	    return t;
	  }
	  var perspective = t.perspective;
	  var angle = t.rotate;
	  var rotateX = t.rotateX;
	  var rotateY = t.rotateY;
	  var sx = t.scaleX;
	  var sy = t.scaleY;
	  var sz = t.scaleZ;
	  var skx = t.skewX;
	  var sky = t.skewY;
	  var xPercent = t.xPercent || 0;
	  var yPercent = t.yPercent || 0;
	  var translateX = xPercent ? 0 : t.translateX;
	  var translateY = yPercent ? 0 : t.translateY;
	  var translateZ = t.translateZ || 0;
	  var percent = xPercent || yPercent ? 'translate(' + (xPercent || translateX + 'px') + ',' + (yPercent || translateY + 'px') + ')' : '';
	  var sk = skx || sky ? 'skew(' + skx + 'deg,' + sky + 'deg)' : '';
	  var an = angle ? 'rotate(' + angle + 'deg)' : '';
	  var ss = void 0;
	  if (!perspective && !rotateX && !rotateY && !translateZ && sz === 1 || !supports3D) {
	    ss = sx !== 1 || sy !== 1 ? 'scale(' + sx + ',' + sy + ')' : '';
	    var translate = percent || 'translate(' + translateX + 'px,' + translateY + 'px)';
	    return translate + ' ' + an + ' ' + ss + ' ' + sk;
	  }
	  ss = sx !== 1 || sy !== 1 || sz !== 1 ? 'scale3d(' + sx + ',' + sy + ',' + sz + ')' : '';
	  var rX = rotateX ? 'rotateX(' + rotateX + 'deg)' : '';
	  var rY = rotateY ? 'rotateY(' + rotateY + 'deg)' : '';
	  var per = perspective ? 'perspective(' + perspective + 'px)' : '';
	  var translate3d = percent ? percent + ' translate3d(0,0,' + translateZ + 'px)' : 'translate3d(' + translateX + 'px,' + translateY + 'px,' + translateZ + 'px)';
	  return per + ' ' + translate3d + ' ' + ss + ' ' + an + ' ' + rX + ' ' + rY + ' ' + sk;
	}

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/* globals Symbol: true, Uint8Array: true, WeakMap: true */
	/*!
	 * deep-eql
	 * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/*!
	 * Module dependencies
	 */
	
	var type = __webpack_require__(90);
	function FakeMap() {
	  this.clear();
	}
	FakeMap.prototype = {
	  clear: function clearMap() {
	    this.keys = [];
	    this.values = [];
	    return this;
	  },
	  set: function setMap(key, value) {
	    var index = this.keys.indexOf(key);
	    if (index >= 0) {
	      this.values[index] = value;
	    } else {
	      this.keys.push(key);
	      this.values.push(value);
	    }
	    return this;
	  },
	  get: function getMap(key) {
	    return this.values[this.keys.indexOf(key)];
	  },
	  delete: function deleteMap(key) {
	    var index = this.keys.indexOf(key);
	    if (index >= 0) {
	      this.values = this.values.slice(0, index).concat(this.values.slice(index + 1));
	      this.keys = this.keys.slice(0, index).concat(this.keys.slice(index + 1));
	    }
	    return this;
	  },
	};
	
	var MemoizeMap = null;
	if (typeof WeakMap === 'function') {
	  MemoizeMap = WeakMap;
	} else {
	  MemoizeMap = FakeMap;
	}
	
	/*!
	 * Check to see if the MemoizeMap has recorded a result of the two operands
	 *
	 * @param {Mixed} leftHandOperand
	 * @param {Mixed} rightHandOperand
	 * @param {MemoizeMap} memoizeMap
	 * @returns {Boolean|null} result
	*/
	function memoizeCompare(leftHandOperand, rightHandOperand, memoizeMap) {
	  // Technically, WeakMap keys can *only* be objects, not primitives.
	  if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
	    return null;
	  }
	  var leftHandMap = memoizeMap.get(leftHandOperand);
	  if (leftHandMap) {
	    var result = leftHandMap.get(rightHandOperand);
	    if (typeof result === 'boolean') {
	      return result;
	    }
	  }
	  return null;
	}
	
	/*!
	 * Set the result of the equality into the MemoizeMap
	 *
	 * @param {Mixed} leftHandOperand
	 * @param {Mixed} rightHandOperand
	 * @param {MemoizeMap} memoizeMap
	 * @param {Boolean} result
	*/
	function memoizeSet(leftHandOperand, rightHandOperand, memoizeMap, result) {
	  // Technically, WeakMap keys can *only* be objects, not primitives.
	  if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
	    return;
	  }
	  var leftHandMap = memoizeMap.get(leftHandOperand);
	  if (leftHandMap) {
	    leftHandMap.set(rightHandOperand, result);
	  } else {
	    leftHandMap = new MemoizeMap();
	    leftHandMap.set(rightHandOperand, result);
	    memoizeMap.set(leftHandOperand, leftHandMap);
	  }
	}
	
	/*!
	 * Primary Export
	 */
	
	module.exports = deepEqual;
	module.exports.MemoizeMap = MemoizeMap;
	
	/**
	 * Assert deeply nested sameValue equality between two objects of any type.
	 *
	 * @param {Mixed} leftHandOperand
	 * @param {Mixed} rightHandOperand
	 * @param {Object} [options] (optional) Additional options
	 * @param {Array} [options.comparator] (optional) Override default algorithm, determining custom equality.
	 * @param {Array} [options.memoize] (optional) Provide a custom memoization object which will cache the results of
	    complex objects for a speed boost. By passing `false` you can disable memoization, but this will cause circular
	    references to blow the stack.
	 * @return {Boolean} equal match
	 */
	function deepEqual(leftHandOperand, rightHandOperand, options) {
	  // If we have a comparator, we can't assume anything; so bail to its check first.
	  if (options && options.comparator) {
	    return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
	  }
	
	  var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
	  if (simpleResult !== null) {
	    return simpleResult;
	  }
	
	  // Deeper comparisons are pushed through to a larger function
	  return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
	}
	
	/**
	 * Many comparisons can be canceled out early via simple equality or primitive checks.
	 * @param {Mixed} leftHandOperand
	 * @param {Mixed} rightHandOperand
	 * @return {Boolean|null} equal match
	 */
	function simpleEqual(leftHandOperand, rightHandOperand) {
	  // Equal references (except for Numbers) can be returned early
	  if (leftHandOperand === rightHandOperand) {
	    // Handle +-0 cases
	    return leftHandOperand !== 0 || 1 / leftHandOperand === 1 / rightHandOperand;
	  }
	
	  // handle NaN cases
	  if (
	    leftHandOperand !== leftHandOperand && // eslint-disable-line no-self-compare
	    rightHandOperand !== rightHandOperand // eslint-disable-line no-self-compare
	  ) {
	    return true;
	  }
	
	  // Anything that is not an 'object', i.e. symbols, functions, booleans, numbers,
	  // strings, and undefined, can be compared by reference.
	  if (isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
	    // Easy out b/c it would have passed the first equality check
	    return false;
	  }
	  return null;
	}
	
	/*!
	 * The main logic of the `deepEqual` function.
	 *
	 * @param {Mixed} leftHandOperand
	 * @param {Mixed} rightHandOperand
	 * @param {Object} [options] (optional) Additional options
	 * @param {Array} [options.comparator] (optional) Override default algorithm, determining custom equality.
	 * @param {Array} [options.memoize] (optional) Provide a custom memoization object which will cache the results of
	    complex objects for a speed boost. By passing `false` you can disable memoization, but this will cause circular
	    references to blow the stack.
	 * @return {Boolean} equal match
	*/
	function extensiveDeepEqual(leftHandOperand, rightHandOperand, options) {
	  options = options || {};
	  options.memoize = options.memoize === false ? false : options.memoize || new MemoizeMap();
	  var comparator = options && options.comparator;
	
	  // Check if a memoized result exists.
	  var memoizeResultLeft = memoizeCompare(leftHandOperand, rightHandOperand, options.memoize);
	  if (memoizeResultLeft !== null) {
	    return memoizeResultLeft;
	  }
	  var memoizeResultRight = memoizeCompare(rightHandOperand, leftHandOperand, options.memoize);
	  if (memoizeResultRight !== null) {
	    return memoizeResultRight;
	  }
	
	  // If a comparator is present, use it.
	  if (comparator) {
	    var comparatorResult = comparator(leftHandOperand, rightHandOperand);
	    // Comparators may return null, in which case we want to go back to default behavior.
	    if (comparatorResult === false || comparatorResult === true) {
	      memoizeSet(leftHandOperand, rightHandOperand, options.memoize, comparatorResult);
	      return comparatorResult;
	    }
	    // To allow comparators to override *any* behavior, we ran them first. Since it didn't decide
	    // what to do, we need to make sure to return the basic tests first before we move on.
	    var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
	    if (simpleResult !== null) {
	      // Don't memoize this, it takes longer to set/retrieve than to just compare.
	      return simpleResult;
	    }
	  }
	
	  var leftHandType = type(leftHandOperand);
	  if (leftHandType !== type(rightHandOperand)) {
	    memoizeSet(leftHandOperand, rightHandOperand, options.memoize, false);
	    return false;
	  }
	
	  // Temporarily set the operands in the memoize object to prevent blowing the stack
	  memoizeSet(leftHandOperand, rightHandOperand, options.memoize, true);
	
	  var result = extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options);
	  memoizeSet(leftHandOperand, rightHandOperand, options.memoize, result);
	  return result;
	}
	
	function extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options) {
	  switch (leftHandType) {
	    case 'String':
	    case 'Number':
	    case 'Boolean':
	    case 'Date':
	      // If these types are their instance types (e.g. `new Number`) then re-deepEqual against their values
	      return deepEqual(leftHandOperand.valueOf(), rightHandOperand.valueOf());
	    case 'Promise':
	    case 'Symbol':
	    case 'function':
	    case 'WeakMap':
	    case 'WeakSet':
	    case 'Error':
	      return leftHandOperand === rightHandOperand;
	    case 'Arguments':
	    case 'Int8Array':
	    case 'Uint8Array':
	    case 'Uint8ClampedArray':
	    case 'Int16Array':
	    case 'Uint16Array':
	    case 'Int32Array':
	    case 'Uint32Array':
	    case 'Float32Array':
	    case 'Float64Array':
	    case 'Array':
	      return iterableEqual(leftHandOperand, rightHandOperand, options);
	    case 'RegExp':
	      return regexpEqual(leftHandOperand, rightHandOperand);
	    case 'Generator':
	      return generatorEqual(leftHandOperand, rightHandOperand, options);
	    case 'DataView':
	      return iterableEqual(new Uint8Array(leftHandOperand.buffer), new Uint8Array(rightHandOperand.buffer), options);
	    case 'ArrayBuffer':
	      return iterableEqual(new Uint8Array(leftHandOperand), new Uint8Array(rightHandOperand), options);
	    case 'Set':
	      return entriesEqual(leftHandOperand, rightHandOperand, options);
	    case 'Map':
	      return entriesEqual(leftHandOperand, rightHandOperand, options);
	    default:
	      return objectEqual(leftHandOperand, rightHandOperand, options);
	  }
	}
	
	/*!
	 * Compare two Regular Expressions for equality.
	 *
	 * @param {RegExp} leftHandOperand
	 * @param {RegExp} rightHandOperand
	 * @return {Boolean} result
	 */
	
	function regexpEqual(leftHandOperand, rightHandOperand) {
	  return leftHandOperand.toString() === rightHandOperand.toString();
	}
	
	/*!
	 * Compare two Sets/Maps for equality. Faster than other equality functions.
	 *
	 * @param {Set} leftHandOperand
	 * @param {Set} rightHandOperand
	 * @param {Object} [options] (Optional)
	 * @return {Boolean} result
	 */
	
	function entriesEqual(leftHandOperand, rightHandOperand, options) {
	  // IE11 doesn't support Set#entries or Set#@@iterator, so we need manually populate using Set#forEach
	  if (leftHandOperand.size !== rightHandOperand.size) {
	    return false;
	  }
	  if (leftHandOperand.size === 0) {
	    return true;
	  }
	  var leftHandItems = [];
	  var rightHandItems = [];
	  leftHandOperand.forEach(function gatherEntries(key, value) {
	    leftHandItems.push([ key, value ]);
	  });
	  rightHandOperand.forEach(function gatherEntries(key, value) {
	    rightHandItems.push([ key, value ]);
	  });
	  return iterableEqual(leftHandItems.sort(), rightHandItems.sort(), options);
	}
	
	/*!
	 * Simple equality for flat iterable objects such as Arrays, TypedArrays or Node.js buffers.
	 *
	 * @param {Iterable} leftHandOperand
	 * @param {Iterable} rightHandOperand
	 * @param {Object} [options] (Optional)
	 * @return {Boolean} result
	 */
	
	function iterableEqual(leftHandOperand, rightHandOperand, options) {
	  var length = leftHandOperand.length;
	  if (length !== rightHandOperand.length) {
	    return false;
	  }
	  if (length === 0) {
	    return true;
	  }
	  var index = -1;
	  while (++index < length) {
	    if (deepEqual(leftHandOperand[index], rightHandOperand[index], options) === false) {
	      return false;
	    }
	  }
	  return true;
	}
	
	/*!
	 * Simple equality for generator objects such as those returned by generator functions.
	 *
	 * @param {Iterable} leftHandOperand
	 * @param {Iterable} rightHandOperand
	 * @param {Object} [options] (Optional)
	 * @return {Boolean} result
	 */
	
	function generatorEqual(leftHandOperand, rightHandOperand, options) {
	  return iterableEqual(getGeneratorEntries(leftHandOperand), getGeneratorEntries(rightHandOperand), options);
	}
	
	/*!
	 * Determine if the given object has an @@iterator function.
	 *
	 * @param {Object} target
	 * @return {Boolean} `true` if the object has an @@iterator function.
	 */
	function hasIteratorFunction(target) {
	  return typeof Symbol !== 'undefined' &&
	    typeof target === 'object' &&
	    typeof Symbol.iterator !== 'undefined' &&
	    typeof target[Symbol.iterator] === 'function';
	}
	
	/*!
	 * Gets all iterator entries from the given Object. If the Object has no @@iterator function, returns an empty array.
	 * This will consume the iterator - which could have side effects depending on the @@iterator implementation.
	 *
	 * @param {Object} target
	 * @returns {Array} an array of entries from the @@iterator function
	 */
	function getIteratorEntries(target) {
	  if (hasIteratorFunction(target)) {
	    try {
	      return getGeneratorEntries(target[Symbol.iterator]());
	    } catch (iteratorError) {
	      return [];
	    }
	  }
	  return [];
	}
	
	/*!
	 * Gets all entries from a Generator. This will consume the generator - which could have side effects.
	 *
	 * @param {Generator} target
	 * @returns {Array} an array of entries from the Generator.
	 */
	function getGeneratorEntries(generator) {
	  var generatorResult = generator.next();
	  var accumulator = [ generatorResult.value ];
	  while (generatorResult.done === false) {
	    generatorResult = generator.next();
	    accumulator.push(generatorResult.value);
	  }
	  return accumulator;
	}
	
	/*!
	 * Gets all own and inherited enumerable keys from a target.
	 *
	 * @param {Object} target
	 * @returns {Array} an array of own and inherited enumerable keys from the target.
	 */
	function getEnumerableKeys(target) {
	  var keys = [];
	  for (var key in target) {
	    keys.push(key);
	  }
	  return keys;
	}
	
	/*!
	 * Determines if two objects have matching values, given a set of keys. Defers to deepEqual for the equality check of
	 * each key. If any value of the given key is not equal, the function will return false (early).
	 *
	 * @param {Mixed} leftHandOperand
	 * @param {Mixed} rightHandOperand
	 * @param {Array} keys An array of keys to compare the values of leftHandOperand and rightHandOperand against
	 * @param {Object} [options] (Optional)
	 * @return {Boolean} result
	 */
	function keysEqual(leftHandOperand, rightHandOperand, keys, options) {
	  var length = keys.length;
	  if (length === 0) {
	    return true;
	  }
	  for (var i = 0; i < length; i += 1) {
	    if (deepEqual(leftHandOperand[keys[i]], rightHandOperand[keys[i]], options) === false) {
	      return false;
	    }
	  }
	  return true;
	}
	
	/*!
	 * Recursively check the equality of two Objects. Once basic sameness has been established it will defer to `deepEqual`
	 * for each enumerable key in the object.
	 *
	 * @param {Mixed} leftHandOperand
	 * @param {Mixed} rightHandOperand
	 * @param {Object} [options] (Optional)
	 * @return {Boolean} result
	 */
	
	function objectEqual(leftHandOperand, rightHandOperand, options) {
	  var leftHandKeys = getEnumerableKeys(leftHandOperand);
	  var rightHandKeys = getEnumerableKeys(rightHandOperand);
	  if (leftHandKeys.length && leftHandKeys.length === rightHandKeys.length) {
	    leftHandKeys.sort();
	    rightHandKeys.sort();
	    if (iterableEqual(leftHandKeys, rightHandKeys) === false) {
	      return false;
	    }
	    return keysEqual(leftHandOperand, rightHandOperand, leftHandKeys, options);
	  }
	
	  var leftHandEntries = getIteratorEntries(leftHandOperand);
	  var rightHandEntries = getIteratorEntries(rightHandOperand);
	  if (leftHandEntries.length && leftHandEntries.length === rightHandEntries.length) {
	    leftHandEntries.sort();
	    rightHandEntries.sort();
	    return iterableEqual(leftHandEntries, rightHandEntries, options);
	  }
	
	  if (leftHandKeys.length === 0 &&
	      leftHandEntries.length === 0 &&
	      rightHandKeys.length === 0 &&
	      rightHandEntries.length === 0) {
	    return true;
	  }
	
	  return false;
	}
	
	/*!
	 * Returns true if the argument is a primitive.
	 *
	 * This intentionally returns true for all objects that can be compared by reference,
	 * including functions and symbols.
	 *
	 * @param {Mixed} value
	 * @return {Boolean} result
	 */
	function isPrimitive(value) {
	  return value === null || typeof value !== 'object';
	}


/***/ },
/* 90 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	/* !
	 * type-detect
	 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	var getPrototypeOfExists = typeof Object.getPrototypeOf === 'function';
	var promiseExists = typeof Promise === 'function';
	var globalObject = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : self; // eslint-disable-line
	var isDom = 'location' in globalObject && 'document' in globalObject;
	var htmlElementExists = typeof HTMLElement !== 'undefined';
	var isArrayExists = typeof Array.isArray === 'function';
	var symbolExists = typeof Symbol !== 'undefined';
	var mapExists = typeof Map !== 'undefined';
	var setExists = typeof Set !== 'undefined';
	var weakMapExists = typeof WeakMap !== 'undefined';
	var weakSetExists = typeof WeakSet !== 'undefined';
	var dataViewExists = typeof DataView !== 'undefined';
	var symbolIteratorExists = symbolExists && typeof Symbol.iterator !== 'undefined';
	var symbolToStringTagExists = symbolExists && typeof Symbol.toStringTag !== 'undefined';
	var setEntriesExists = setExists && typeof Set.prototype.entries === 'function';
	var mapEntriesExists = mapExists && typeof Map.prototype.entries === 'function';
	var setIteratorPrototype = getPrototypeOfExists && setEntriesExists && Object.getPrototypeOf(new Set().entries());
	var mapIteratorPrototype = getPrototypeOfExists && mapEntriesExists && Object.getPrototypeOf(new Map().entries());
	var arrayIteratorExists = symbolIteratorExists && typeof Array.prototype[Symbol.iterator] === 'function';
	var arrayIteratorPrototype = arrayIteratorExists && Object.getPrototypeOf([][Symbol.iterator]());
	var stringIteratorExists = symbolIteratorExists && typeof Array.prototype[Symbol.iterator] === 'function';
	var stringIteratorPrototype = stringIteratorExists && Object.getPrototypeOf(''[Symbol.iterator]());
	var toStringLeftSliceLength = 8;
	var toStringRightSliceLength = -1;
	/**
	 * ### typeOf (obj)
	 *
	 * Uses `Object.prototype.toString` to determine the type of an object,
	 * normalising behaviour across engine versions & well optimised.
	 *
	 * @param {Mixed} object
	 * @return {String} object type
	 * @api public
	 */
	module.exports = function typeDetect(obj) {
	  /* ! Speed optimisation
	   * Pre:
	   *   string literal     x 3,039,035 ops/sec ±1.62% (78 runs sampled)
	   *   boolean literal    x 1,424,138 ops/sec ±4.54% (75 runs sampled)
	   *   number literal     x 1,653,153 ops/sec ±1.91% (82 runs sampled)
	   *   undefined          x 9,978,660 ops/sec ±1.92% (75 runs sampled)
	   *   function           x 2,556,769 ops/sec ±1.73% (77 runs sampled)
	   * Post:
	   *   string literal     x 38,564,796 ops/sec ±1.15% (79 runs sampled)
	   *   boolean literal    x 31,148,940 ops/sec ±1.10% (79 runs sampled)
	   *   number literal     x 32,679,330 ops/sec ±1.90% (78 runs sampled)
	   *   undefined          x 32,363,368 ops/sec ±1.07% (82 runs sampled)
	   *   function           x 31,296,870 ops/sec ±0.96% (83 runs sampled)
	   */
	  var typeofObj = typeof obj;
	  if (typeofObj !== 'object') {
	    return typeofObj;
	  }
	
	  /* ! Speed optimisation
	   * Pre:
	   *   null               x 28,645,765 ops/sec ±1.17% (82 runs sampled)
	   * Post:
	   *   null               x 36,428,962 ops/sec ±1.37% (84 runs sampled)
	   */
	  if (obj === null) {
	    return 'null';
	  }
	
	  /* ! Spec Conformance
	   * Test: `Object.prototype.toString.call(window)``
	   *  - Node === "[object global]"
	   *  - Chrome === "[object global]"
	   *  - Firefox === "[object Window]"
	   *  - PhantomJS === "[object Window]"
	   *  - Safari === "[object Window]"
	   *  - IE 11 === "[object Window]"
	   *  - IE Edge === "[object Window]"
	   * Test: `Object.prototype.toString.call(this)``
	   *  - Chrome Worker === "[object global]"
	   *  - Firefox Worker === "[object DedicatedWorkerGlobalScope]"
	   *  - Safari Worker === "[object DedicatedWorkerGlobalScope]"
	   *  - IE 11 Worker === "[object WorkerGlobalScope]"
	   *  - IE Edge Worker === "[object WorkerGlobalScope]"
	   */
	  if (obj === globalObject) {
	    return 'global';
	  }
	
	  /* ! Speed optimisation
	   * Pre:
	   *   array literal      x 2,888,352 ops/sec ±0.67% (82 runs sampled)
	   * Post:
	   *   array literal      x 22,479,650 ops/sec ±0.96% (81 runs sampled)
	   */
	  if (isArrayExists && Array.isArray(obj)) {
	    return 'Array';
	  }
	
	  if (isDom) {
	    /* ! Spec Conformance
	     * (https://html.spec.whatwg.org/multipage/browsers.html#location)
	     * WhatWG HTML$7.7.3 - The `Location` interface
	     * Test: `Object.prototype.toString.call(window.location)``
	     *  - IE <=11 === "[object Object]"
	     *  - IE Edge <=13 === "[object Object]"
	     */
	    if (obj === globalObject.location) {
	      return 'Location';
	    }
	
	    /* ! Spec Conformance
	     * (https://html.spec.whatwg.org/#document)
	     * WhatWG HTML$3.1.1 - The `Document` object
	     * Note: Most browsers currently adher to the W3C DOM Level 2 spec
	     *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-26809268)
	     *       which suggests that browsers should use HTMLTableCellElement for
	     *       both TD and TH elements. WhatWG separates these.
	     *       WhatWG HTML states:
	     *         > For historical reasons, Window objects must also have a
	     *         > writable, configurable, non-enumerable property named
	     *         > HTMLDocument whose value is the Document interface object.
	     * Test: `Object.prototype.toString.call(document)``
	     *  - Chrome === "[object HTMLDocument]"
	     *  - Firefox === "[object HTMLDocument]"
	     *  - Safari === "[object HTMLDocument]"
	     *  - IE <=10 === "[object Document]"
	     *  - IE 11 === "[object HTMLDocument]"
	     *  - IE Edge <=13 === "[object HTMLDocument]"
	     */
	    if (obj === globalObject.document) {
	      return 'Document';
	    }
	
	    /* ! Spec Conformance
	     * (https://html.spec.whatwg.org/multipage/webappapis.html#mimetypearray)
	     * WhatWG HTML$8.6.1.5 - Plugins - Interface MimeTypeArray
	     * Test: `Object.prototype.toString.call(navigator.mimeTypes)``
	     *  - IE <=10 === "[object MSMimeTypesCollection]"
	     */
	    if (obj === (globalObject.navigator || {}).mimeTypes) {
	      return 'MimeTypeArray';
	    }
	
	    /* ! Spec Conformance
	     * (https://html.spec.whatwg.org/multipage/webappapis.html#pluginarray)
	     * WhatWG HTML$8.6.1.5 - Plugins - Interface PluginArray
	     * Test: `Object.prototype.toString.call(navigator.plugins)``
	     *  - IE <=10 === "[object MSPluginsCollection]"
	     */
	    if (obj === (globalObject.navigator || {}).plugins) {
	      return 'PluginArray';
	    }
	
	    /* ! Spec Conformance
	     * (https://html.spec.whatwg.org/multipage/webappapis.html#pluginarray)
	     * WhatWG HTML$4.4.4 - The `blockquote` element - Interface `HTMLQuoteElement`
	     * Test: `Object.prototype.toString.call(document.createElement('blockquote'))``
	     *  - IE <=10 === "[object HTMLBlockElement]"
	     */
	    if (htmlElementExists && obj instanceof HTMLElement && obj.tagName === 'BLOCKQUOTE') {
	      return 'HTMLQuoteElement';
	    }
	
	    /* ! Spec Conformance
	     * (https://html.spec.whatwg.org/#htmltabledatacellelement)
	     * WhatWG HTML$4.9.9 - The `td` element - Interface `HTMLTableDataCellElement`
	     * Note: Most browsers currently adher to the W3C DOM Level 2 spec
	     *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-82915075)
	     *       which suggests that browsers should use HTMLTableCellElement for
	     *       both TD and TH elements. WhatWG separates these.
	     * Test: Object.prototype.toString.call(document.createElement('td'))
	     *  - Chrome === "[object HTMLTableCellElement]"
	     *  - Firefox === "[object HTMLTableCellElement]"
	     *  - Safari === "[object HTMLTableCellElement]"
	     */
	    if (htmlElementExists && obj instanceof HTMLElement && obj.tagName === 'TD') {
	      return 'HTMLTableDataCellElement';
	    }
	
	    /* ! Spec Conformance
	     * (https://html.spec.whatwg.org/#htmltableheadercellelement)
	     * WhatWG HTML$4.9.9 - The `td` element - Interface `HTMLTableHeaderCellElement`
	     * Note: Most browsers currently adher to the W3C DOM Level 2 spec
	     *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-82915075)
	     *       which suggests that browsers should use HTMLTableCellElement for
	     *       both TD and TH elements. WhatWG separates these.
	     * Test: Object.prototype.toString.call(document.createElement('th'))
	     *  - Chrome === "[object HTMLTableCellElement]"
	     *  - Firefox === "[object HTMLTableCellElement]"
	     *  - Safari === "[object HTMLTableCellElement]"
	     */
	    if (htmlElementExists && obj instanceof HTMLElement && obj.tagName === 'TH') {
	      return 'HTMLTableHeaderCellElement';
	    }
	  }
	
	  /* ! Speed optimisation
	  * Pre:
	  *   Float64Array       x 625,644 ops/sec ±1.58% (80 runs sampled)
	  *   Float32Array       x 1,279,852 ops/sec ±2.91% (77 runs sampled)
	  *   Uint32Array        x 1,178,185 ops/sec ±1.95% (83 runs sampled)
	  *   Uint16Array        x 1,008,380 ops/sec ±2.25% (80 runs sampled)
	  *   Uint8Array         x 1,128,040 ops/sec ±2.11% (81 runs sampled)
	  *   Int32Array         x 1,170,119 ops/sec ±2.88% (80 runs sampled)
	  *   Int16Array         x 1,176,348 ops/sec ±5.79% (86 runs sampled)
	  *   Int8Array          x 1,058,707 ops/sec ±4.94% (77 runs sampled)
	  *   Uint8ClampedArray  x 1,110,633 ops/sec ±4.20% (80 runs sampled)
	  * Post:
	  *   Float64Array       x 7,105,671 ops/sec ±13.47% (64 runs sampled)
	  *   Float32Array       x 5,887,912 ops/sec ±1.46% (82 runs sampled)
	  *   Uint32Array        x 6,491,661 ops/sec ±1.76% (79 runs sampled)
	  *   Uint16Array        x 6,559,795 ops/sec ±1.67% (82 runs sampled)
	  *   Uint8Array         x 6,463,966 ops/sec ±1.43% (85 runs sampled)
	  *   Int32Array         x 5,641,841 ops/sec ±3.49% (81 runs sampled)
	  *   Int16Array         x 6,583,511 ops/sec ±1.98% (80 runs sampled)
	  *   Int8Array          x 6,606,078 ops/sec ±1.74% (81 runs sampled)
	  *   Uint8ClampedArray  x 6,602,224 ops/sec ±1.77% (83 runs sampled)
	  */
	  var stringTag = (symbolToStringTagExists && obj[Symbol.toStringTag]);
	  if (typeof stringTag === 'string') {
	    return stringTag;
	  }
	
	  if (getPrototypeOfExists) {
	    var objPrototype = Object.getPrototypeOf(obj);
	    /* ! Speed optimisation
	    * Pre:
	    *   regex literal      x 1,772,385 ops/sec ±1.85% (77 runs sampled)
	    *   regex constructor  x 2,143,634 ops/sec ±2.46% (78 runs sampled)
	    * Post:
	    *   regex literal      x 3,928,009 ops/sec ±0.65% (78 runs sampled)
	    *   regex constructor  x 3,931,108 ops/sec ±0.58% (84 runs sampled)
	    */
	    if (objPrototype === RegExp.prototype) {
	      return 'RegExp';
	    }
	
	    /* ! Speed optimisation
	    * Pre:
	    *   date               x 2,130,074 ops/sec ±4.42% (68 runs sampled)
	    * Post:
	    *   date               x 3,953,779 ops/sec ±1.35% (77 runs sampled)
	    */
	    if (objPrototype === Date.prototype) {
	      return 'Date';
	    }
	
	    /* ! Spec Conformance
	     * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-promise.prototype-@@tostringtag)
	     * ES6$25.4.5.4 - Promise.prototype[@@toStringTag] should be "Promise":
	     * Test: `Object.prototype.toString.call(Promise.resolve())``
	     *  - Chrome <=47 === "[object Object]"
	     *  - Edge <=20 === "[object Object]"
	     *  - Firefox 29-Latest === "[object Promise]"
	     *  - Safari 7.1-Latest === "[object Promise]"
	     */
	    if (promiseExists && objPrototype === Promise.prototype) {
	      return 'Promise';
	    }
	
	    /* ! Speed optimisation
	    * Pre:
	    *   set                x 2,222,186 ops/sec ±1.31% (82 runs sampled)
	    * Post:
	    *   set                x 4,545,879 ops/sec ±1.13% (83 runs sampled)
	    */
	    if (setExists && objPrototype === Set.prototype) {
	      return 'Set';
	    }
	
	    /* ! Speed optimisation
	    * Pre:
	    *   map                x 2,396,842 ops/sec ±1.59% (81 runs sampled)
	    * Post:
	    *   map                x 4,183,945 ops/sec ±6.59% (82 runs sampled)
	    */
	    if (mapExists && objPrototype === Map.prototype) {
	      return 'Map';
	    }
	
	    /* ! Speed optimisation
	    * Pre:
	    *   weakset            x 1,323,220 ops/sec ±2.17% (76 runs sampled)
	    * Post:
	    *   weakset            x 4,237,510 ops/sec ±2.01% (77 runs sampled)
	    */
	    if (weakSetExists && objPrototype === WeakSet.prototype) {
	      return 'WeakSet';
	    }
	
	    /* ! Speed optimisation
	    * Pre:
	    *   weakmap            x 1,500,260 ops/sec ±2.02% (78 runs sampled)
	    * Post:
	    *   weakmap            x 3,881,384 ops/sec ±1.45% (82 runs sampled)
	    */
	    if (weakMapExists && objPrototype === WeakMap.prototype) {
	      return 'WeakMap';
	    }
	
	    /* ! Spec Conformance
	     * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-dataview.prototype-@@tostringtag)
	     * ES6$24.2.4.21 - DataView.prototype[@@toStringTag] should be "DataView":
	     * Test: `Object.prototype.toString.call(new DataView(new ArrayBuffer(1)))``
	     *  - Edge <=13 === "[object Object]"
	     */
	    if (dataViewExists && objPrototype === DataView.prototype) {
	      return 'DataView';
	    }
	
	    /* ! Spec Conformance
	     * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%mapiteratorprototype%-@@tostringtag)
	     * ES6$23.1.5.2.2 - %MapIteratorPrototype%[@@toStringTag] should be "Map Iterator":
	     * Test: `Object.prototype.toString.call(new Map().entries())``
	     *  - Edge <=13 === "[object Object]"
	     */
	    if (mapExists && objPrototype === mapIteratorPrototype) {
	      return 'Map Iterator';
	    }
	
	    /* ! Spec Conformance
	     * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%setiteratorprototype%-@@tostringtag)
	     * ES6$23.2.5.2.2 - %SetIteratorPrototype%[@@toStringTag] should be "Set Iterator":
	     * Test: `Object.prototype.toString.call(new Set().entries())``
	     *  - Edge <=13 === "[object Object]"
	     */
	    if (setExists && objPrototype === setIteratorPrototype) {
	      return 'Set Iterator';
	    }
	
	    /* ! Spec Conformance
	     * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%arrayiteratorprototype%-@@tostringtag)
	     * ES6$22.1.5.2.2 - %ArrayIteratorPrototype%[@@toStringTag] should be "Array Iterator":
	     * Test: `Object.prototype.toString.call([][Symbol.iterator]())``
	     *  - Edge <=13 === "[object Object]"
	     */
	    if (arrayIteratorExists && objPrototype === arrayIteratorPrototype) {
	      return 'Array Iterator';
	    }
	
	    /* ! Spec Conformance
	     * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%stringiteratorprototype%-@@tostringtag)
	     * ES6$21.1.5.2.2 - %StringIteratorPrototype%[@@toStringTag] should be "String Iterator":
	     * Test: `Object.prototype.toString.call(''[Symbol.iterator]())``
	     *  - Edge <=13 === "[object Object]"
	     */
	    if (stringIteratorExists && objPrototype === stringIteratorPrototype) {
	      return 'String Iterator';
	    }
	
	    /* ! Speed optimisation
	    * Pre:
	    *   object from null   x 2,424,320 ops/sec ±1.67% (76 runs sampled)
	    * Post:
	    *   object from null   x 5,838,000 ops/sec ±0.99% (84 runs sampled)
	    */
	    if (objPrototype === null) {
	      return 'Object';
	    }
	  }
	
	  return Object
	    .prototype
	    .toString
	    .call(obj)
	    .slice(toStringLeftSliceLength, toStringRightSliceLength);
	};
	
	module.exports.typeDetect = module.exports;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 91 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.toFixed = toFixed;
	exports.createMatrix = createMatrix;
	exports.checkStyleName = checkStyleName;
	exports.getGsapType = getGsapType;
	exports.parseColor = parseColor;
	exports.parseShadow = parseShadow;
	exports.getColor = getColor;
	exports.isTransform = isTransform;
	exports.isConvert = isConvert;
	exports.splitFilterToObject = splitFilterToObject;
	exports.getMatrix = getMatrix;
	exports.getTransform = getTransform;
	exports.stylesToCss = stylesToCss;
	exports.getUnit = getUnit;
	exports.getValues = getValues;
	exports.findStyleByName = findStyleByName;
	exports.mergeStyle = mergeStyle;
	var isUnitlessNumber = {
	  animationIterationCount: true,
	  borderImageOutset: true,
	  borderImageSlice: true,
	  borderImageWidth: true,
	  boxFlex: true,
	  boxFlexGroup: true,
	  boxOrdinalGroup: true,
	  columnCount: true,
	  flex: true,
	  flexGrow: true,
	  flexPositive: true,
	  flexShrink: true,
	  flexNegative: true,
	  flexOrder: true,
	  gridRow: true,
	  gridColumn: true,
	  fontWeight: true,
	  lineClamp: true,
	  lineHeight: true,
	  opacity: true,
	  order: true,
	  orphans: true,
	  tabSize: true,
	  widows: true,
	  zIndex: true,
	  zoom: true,
	
	  // SVG-related properties
	  fillOpacity: true,
	  floodOpacity: true,
	  stopOpacity: true,
	  strokeDasharray: true,
	  strokeDashoffset: true,
	  strokeMiterlimit: true,
	  strokeOpacity: true,
	  strokeWidth: true
	};
	var prefixes = ['Webkit', 'ms', 'Moz', 'O'];
	
	function prefixKey(prefix, key) {
	  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
	}
	
	Object.keys(isUnitlessNumber).forEach(function (prop) {
	  prefixes.forEach(function (prefix) {
	    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
	  });
	});
	
	var unquotedContentValueRegex = /^(normal|none|(\b(url\([^)]*\)|chapter_counter|attr\([^)]*\)|(no-)?(open|close)-quote|inherit)((\b\s*)|$|\s+))+)$/;
	
	var IE = function () {
	  if (typeof document === 'undefined') {
	    return false;
	  }
	  if (navigator && (navigator.userAgent.indexOf("MSIE 8.0") > 0 || navigator.userAgent.indexOf("MSIE 9.0") > 0)) {
	    return true;
	  }
	  return false;
	}();
	
	var rnd = 100000;
	
	var colorLookup = {
	  aqua: [0, 255, 255],
	  lime: [0, 255, 0],
	  silver: [192, 192, 192],
	  black: [0, 0, 0],
	  maroon: [128, 0, 0],
	  teal: [0, 128, 128],
	  blue: [0, 0, 255],
	  navy: [0, 0, 128],
	  white: [255, 255, 255],
	  fuchsia: [255, 0, 255],
	  olive: [128, 128, 0],
	  yellow: [255, 255, 0],
	  orange: [255, 165, 0],
	  gray: [128, 128, 128],
	  purple: [128, 0, 128],
	  green: [0, 128, 0],
	  red: [255, 0, 0],
	  pink: [255, 192, 203],
	  cyan: [0, 255, 255],
	  transparent: [255, 255, 255, 0]
	};
	var _hue = function _hue(hh, m1, m2) {
	  var h = hh > 1 ? hh - 1 : hh;
	  h = hh < 0 ? hh + 1 : h;
	  var a = h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1;
	  var b = h < 0.5 ? m2 : a;
	  var c = h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : b;
	  return c * 255 + 0.5 | 0;
	};
	var DEG2RAD = Math.PI / 180;
	var RAD2DEG = 180 / Math.PI;
	
	var cssList = {
	  _lists: {
	    transformsBase: ['translate', 'translateX', 'translateY', 'scale', 'scaleX', 'scaleY', 'skewX', 'skewY', 'rotateZ', 'rotate'],
	    transforms3D: ['translate3d', 'translateZ', 'scaleZ', 'rotateX', 'rotateY', 'perspective']
	  },
	  transformGroup: { translate: 1, translate3d: 1, scale: 1, scale3d: 1, rotate: 1, rotate3d: 1 },
	  filter: ['grayScale', 'sepia', 'hueRotate', 'invert', 'brightness', 'contrast', 'blur'],
	  filterConvert: { grayScale: 'grayscale', hueRotate: 'hue-rotate' }
	};
	cssList._lists.transformsBase = !IE ? cssList._lists.transformsBase.concat(cssList._lists.transforms3D) : cssList._lists.transformsBase;
	
	function toFixed(num, length) {
	  var _rnd = length ? Math.pow(10, length) : rnd;
	  var n = num | 0;
	  var dec = num - n;
	  return dec ? (dec * _rnd + (num < 0 ? -0.5 : 0.5) | 0) / _rnd + n : num;
	}
	
	function createMatrix(style) {
	  return window.WebKitCSSMatrix && new window.WebKitCSSMatrix(style) || window.MozCSSMatrix && new window.MozCSSMatrix(style) || window.DOMMatrix && new window.DOMMatrix(style) || window.MsCSSMatrix && new window.MsCSSMatrix(style) || window.OCSSMatrix && new window.OCSSMatrix(style) || window.CSSMatrix && new window.CSSMatrix(style) || null;
	}
	
	function checkStyleName(p) {
	  var a = ['O', 'Moz', 'ms', 'Ms', 'Webkit'];
	  if (p !== 'filter' && p in document.body.style) {
	    return p;
	  }
	  var _p = p.charAt(0).toUpperCase() + p.substr(1);
	  var prefixCss = a.filter(function (key) {
	    return '' + key + _p in document.body.style;
	  });
	  return prefixCss[0] ? '' + prefixCss[0] + _p : null;
	}
	
	function getGsapType(_p) {
	  var p = _p;
	  p = p === 'x' ? 'translateX' : p;
	  p = p === 'y' ? 'translateY' : p;
	  p = p === 'z' ? 'translateZ' : p;
	  // p = p === 'r' ? 'rotate' : p;
	  return p;
	}
	
	function parseColor(_v) {
	  var a = void 0;
	  var r = void 0;
	  var g = void 0;
	  var b = void 0;
	  var h = void 0;
	  var s = void 0;
	  var l = void 0;
	  var v = _v;
	  var _numExp = /(?:\d|\-\d|\.\d|\-\.\d)+/g;
	  if (!v) {
	    a = colorLookup.black;
	  } else if (typeof v === 'number') {
	    a = [v >> 16, v >> 8 & 255, v & 255];
	  } else {
	    if (v.charAt(v.length - 1) === ',') {
	      v = v.substr(0, v.length - 1);
	    }
	    if (colorLookup[v]) {
	      a = colorLookup[v];
	    } else if (v.charAt(0) === '#') {
	      // is #FFF
	      if (v.length === 4) {
	        r = v.charAt(1);
	        g = v.charAt(2);
	        b = v.charAt(3);
	        v = '#' + r + r + g + g + b + b;
	      }
	      v = parseInt(v.substr(1), 16);
	      a = [v >> 16, v >> 8 & 255, v & 255];
	    } else if (v.substr(0, 3) === 'hsl') {
	      a = v.match(_numExp);
	      h = Number(a[0]) % 360 / 360;
	      s = Number(a[1]) / 100;
	      l = Number(a[2]) / 100;
	      g = l <= 0.5 ? l * (s + 1) : l + s - l * s;
	      r = l * 2 - g;
	      if (a.length > 3) {
	        a[3] = Number(a[3]);
	      }
	      a[0] = _hue(h + 1 / 3, r, g);
	      a[1] = _hue(h, r, g);
	      a[2] = _hue(h - 1 / 3, r, g);
	    } else {
	      a = v.match(_numExp) || colorLookup.transparent;
	    }
	    a[0] = Number(a[0]);
	    a[1] = Number(a[1]);
	    a[2] = Number(a[2]);
	
	    if (a.length > 3) {
	      a[3] = Number(a[3]);
	    }
	  }
	  return a;
	}
	
	function parseShadow(v) {
	  if (!v) {
	    return [0, 0, 0, 0, 0, 0, 0];
	  }
	  var inset = void 0;
	  if (v.indexOf('rgb') >= 0) {
	    var t = v.match(/rgb+(?:a)?\((.*)\)/);
	    var s = v.replace(t[0], '').trim().split(/\s+/);
	    inset = s.indexOf('inset');
	    if (inset >= 0) {
	      s.splice(inset, 1);
	    }
	    var c = t[1].replace(/\s+/g, '').split(',');
	    if (c.length === 3) {
	      c.push(1);
	    }
	    return s.concat(c, inset >= 0 ? ['inset'] : []);
	  }
	  var vArr = v.split(/\s+/);
	  inset = vArr.indexOf('inset');
	  if (inset >= 0) {
	    vArr.splice(inset, 1);
	  }
	  var color = parseColor(vArr[vArr.length - 1]);
	  color[3] = typeof color[3] === 'number' ? color[3] : 1;
	  vArr = vArr.splice(0, vArr.length - 1);
	  return vArr.concat(color, inset >= 0 ? ['inset'] : []);
	}
	
	function getColor(v) {
	  var rgba = v.length === 4 ? 'rgba' : 'rgb';
	  var _vars = v.map(function (d, i) {
	    return i < 3 ? Math.round(d) : d;
	  });
	  return rgba + '(' + _vars.join(',') + ')';
	}
	
	function isTransform(p) {
	  return cssList._lists.transformsBase.indexOf(p) >= 0 ? 'transform' : p;
	}
	
	function isConvert(p) {
	  var cssName = isTransform(p);
	  return cssList.filter.indexOf(cssName) >= 0 ? 'filter' : cssName;
	}
	
	function splitFilterToObject(data) {
	  if (data === 'none' || !data || data === '') {
	    return null;
	  }
	  var filter = data.replace(' ', '').split(')').filter(function (item) {
	    return item;
	  });
	  var startData = {};
	  filter.forEach(function (item) {
	    var dataArr = item.split('(');
	    startData[dataArr[0]] = dataArr[1];
	  });
	  return startData;
	}
	
	function getMatrix(t) {
	  var arr = t.match(/(?:\-|\b)[\d\-\.e]+\b/gi);
	  var m = {};
	  if (arr.length === 6) {
	    m.m11 = parseFloat(arr[0]);
	    m.m12 = parseFloat(arr[1]);
	    m.m13 = 0;
	    m.m14 = 0;
	    m.m21 = parseFloat(arr[2]);
	    m.m22 = parseFloat(arr[3]);
	    m.m23 = 0;
	    m.m24 = 0;
	    m.m31 = 0;
	    m.m32 = 0;
	    m.m33 = 1;
	    m.m34 = 0;
	    m.m41 = parseFloat(arr[4]);
	    m.m42 = parseFloat(arr[5]);
	    m.m43 = 0;
	    m.m44 = 0;
	  } else {
	    arr.forEach(function (item, i) {
	      var ii = i % 4 + 1;
	      var j = Math.floor(i / 4) + 1;
	      m['m' + j + ii] = parseFloat(item);
	    });
	  }
	  return m;
	}
	
	function getTransform(transform) {
	  var _transform = transform === 'none' || transform === '' ? 'matrix(1, 0, 0, 1, 0, 0)' : transform;
	  var m = getMatrix(_transform);
	  var m11 = m.m11;
	  var m12 = m.m12;
	  var m13 = m.m13;
	  var m14 = m.m14;
	  var m21 = m.m21;
	  var m22 = m.m22;
	  var m23 = m.m23;
	  var m24 = m.m24;
	  var m31 = m.m31;
	  var m32 = m.m32;
	  var m33 = m.m33;
	  var m34 = m.m34;
	  var m43 = m.m43;
	  var t1 = void 0;
	  var t2 = void 0;
	  var t3 = void 0;
	  var tm = {};
	  tm.perspective = m34 ? toFixed(m33 / (m34 < 0 ? -m34 : m34)) : 0;
	  tm.rotateX = toFixed(Math.asin(m23) * RAD2DEG);
	  var angle = tm.rotateX * DEG2RAD;
	  var skewX = Math.tan(m21);
	  var skewY = Math.tan(m12);
	  var cos = m34 * tm.perspective;
	  var sin = void 0;
	  // rotateX
	  if (angle) {
	    cos = Math.cos(-angle);
	    sin = Math.sin(-angle);
	    t1 = m21 * cos + m31 * sin;
	    t2 = m22 * cos + m32 * sin;
	    t3 = m23 * cos + m33 * sin;
	    m31 = m21 * -sin + m31 * cos;
	    m32 = m22 * -sin + m32 * cos;
	    m33 = m23 * -sin + m33 * cos;
	    m34 = m24 * -sin + m34 * cos;
	    m21 = t1;
	    m22 = t2;
	    m23 = t3;
	  }
	  // rotateY
	  angle = Math.atan2(m31, m33);
	  tm.rotateY = toFixed(angle * RAD2DEG);
	  if (angle) {
	    cos = Math.cos(-angle);
	    sin = Math.sin(-angle);
	    t1 = m11 * cos - m31 * sin;
	    t2 = m12 * cos - m32 * sin;
	    t3 = m13 * cos - m33 * sin;
	    m32 = m12 * sin + m32 * cos;
	    m33 = m13 * sin + m33 * cos;
	    m34 = m14 * sin + m34 * cos;
	    m11 = t1;
	    m12 = t2;
	    m13 = t3;
	  }
	  // rotateZ
	  angle = Math.atan2(m12, m11);
	  tm.rotate = toFixed(angle * RAD2DEG);
	  if (angle) {
	    cos = Math.cos(-angle);
	    sin = Math.sin(-angle);
	    m11 = m11 * cos + m21 * sin;
	    t2 = m12 * cos + m22 * sin;
	    m22 = m12 * -sin + m22 * cos;
	    m23 = m13 * -sin + m23 * cos;
	    m12 = t2;
	  }
	
	  if (tm.rotateX && Math.abs(tm.rotateX) + Math.abs(tm.rotate) > 359.9) {
	    tm.rotateX = tm.rotate = 0;
	    tm.rotateY += 180;
	  }
	  tm.scaleX = toFixed(Math.sqrt(m11 * m11 + m12 * m12));
	  tm.scaleY = toFixed(Math.sqrt(m22 * m22 + m32 * m32));
	  tm.scaleZ = toFixed(Math.sqrt(m23 * m23 + m33 * m33));
	  // 不管 skewX skewY了；
	  tm.skewX = skewX === -skewY ? 0 : skewX;
	  tm.skewY = skewY === -skewX ? 0 : skewY;
	  tm.perspective = m34 ? 1 / (m34 < 0 ? -m34 : m34) : 0;
	  tm.translateX = m.m41;
	  tm.translateY = m.m42;
	  tm.translateZ = m43;
	  return tm;
	}
	
	function stylesToCss(key, value) {
	  var _value = void 0;
	  if (!isUnitlessNumber[key] && typeof value === 'number') {
	    _value = ' ' + value + 'px';
	  } else if (key === 'content' && !unquotedContentValueRegex.test(value)) {
	    _value = '\'' + value.replace(/'/g, "\\'") + '\'';
	  }
	  return _value || value;
	}
	
	function getUnit(p, v) {
	  var currentUnit = v && v.toString().replace(/[^a-z|%]/ig, '');
	  var unit = '';
	  if (p.indexOf('translate') >= 0 || p.indexOf('perspective') >= 0 || p.indexOf('blur') >= 0) {
	    unit = 'px';
	  } else if (p.indexOf('skew') >= 0 || p.indexOf('rotate') >= 0) {
	    unit = 'deg';
	  }
	  return currentUnit || unit;
	}
	
	function getValues(p, d, u) {
	  return p + '(' + d + (u || '') + ')';
	}
	
	function findStyleByName(cssArray, name) {
	  var ret = null;
	  if (cssArray) {
	    cssArray.forEach(function (_cname) {
	      if (ret) {
	        return;
	      }
	      var cName = _cname.split('(')[0];
	      var a = cName in cssList.transformGroup && name.substring(0, name.length - 1).indexOf(cName) >= 0;
	      var b = name in cssList.transformGroup && cName.substring(0, cName.length - 1).indexOf(name) >= 0;
	      var c = cName in cssList.transformGroup && name in cssList.transformGroup && (cName.substring(0, cName.length - 2) === name || name.substring(0, name.length - 2) === cName);
	      if (cName === name || a || b || c) {
	        ret = _cname;
	      }
	    });
	  }
	  return ret;
	}
	
	function mergeStyle(current, change) {
	  if (!current || current === '') {
	    return change;
	  }
	  if (!change || change === '') {
	    return current;
	  }
	  var _current = current.replace(/\s/g, '').split(')').filter(function (item) {
	    return item !== '' && item;
	  }).map(function (item) {
	    return item + ')';
	  });
	  var _change = change.replace(/\s/g, '').split(')').filter(function (item) {
	    return item !== '' && item;
	  });
	  _change.forEach(function (changeOnly) {
	    var changeArr = changeOnly.split('(');
	    var changeName = changeArr[0];
	    var currentSame = findStyleByName(_current, changeName);
	    if (!currentSame) {
	      _current.push(changeOnly + ')');
	    } else {
	      var index = _current.indexOf(currentSame);
	      _current[index] = changeOnly + ')';
	    }
	  });
	  _current.forEach(function (item, i) {
	    if (item.indexOf('perspective') >= 0 && i) {
	      _current.splice(i, 1);
	      _current.unshift(item);
	    }
	  });
	  return _current.join(' ').trim();
	}
	
	exports.default = cssList;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(3);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _easing = __webpack_require__(93);
	
	var _easing2 = _interopRequireDefault(_easing);
	
	var _plugins = __webpack_require__(95);
	
	var _plugins2 = _interopRequireDefault(_plugins);
	
	var _StylePlugin = __webpack_require__(96);
	
	var _StylePlugin2 = _interopRequireDefault(_StylePlugin);
	
	var _styleUtils = __webpack_require__(91);
	
	var _util = __webpack_require__(88);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DEFAULT_EASING = 'easeInOutQuad'; /* eslint-disable func-names */
	/**
	 * Created by jljsj on 16/1/27.
	 */
	
	var DEFAULT_DURATION = 450;
	var DEFAULT_DELAY = 0;
	function noop() {}
	_plugins2.default.push(_StylePlugin2.default);
	// 设置默认数据
	function defaultData(vars, now) {
	  return {
	    duration: vars.duration || vars.duration === 0 ? vars.duration : DEFAULT_DURATION,
	    delay: vars.delay || DEFAULT_DELAY,
	    ease: typeof vars.ease === 'function' ? vars.ease : _easing2.default[vars.ease || DEFAULT_EASING],
	    onUpdate: vars.onUpdate || noop,
	    onComplete: vars.onComplete || noop,
	    onStart: vars.onStart || noop,
	    onRepeat: vars.onRepeat || noop,
	    repeat: vars.repeat || 0,
	    repeatDelay: vars.repeatDelay || 0,
	    yoyo: vars.yoyo || false,
	    type: vars.type || 'to',
	    initTime: now,
	    appearTo: typeof vars.appearTo === 'number' ? vars.appearTo : null
	  };
	}
	
	var timeLine = function timeLine(target, toData, props) {
	  var _this = this;
	
	  this.target = target;
	  this.attr = props.attr || 'style';
	  this.willChange = props.willChange;
	  // 记录总时间;
	  this.totalTime = 0;
	  // 记录当前时间;
	  this.progressTime = 0;
	  // 记录时间轴数据;
	  this.defaultData = [];
	  // 每个的开始数据；
	  this.start = {};
	  // 记录动画开始;
	  this.onStart = {};
	  // 开始默认的数据；
	  this.startDefaultData = {};
	  var data = [];
	  toData.forEach(function (d, i) {
	    var _d = (0, _extends3.default)({}, d);
	    if (_this.attr === 'style') {
	      data[i] = {};
	      Object.keys(_d).forEach(function (key) {
	        if (key in defaultData({}, 0)) {
	          data[i][key] = _d[key];
	          delete _d[key];
	        }
	      });
	      data[i].style = _d;
	      _this.startDefaultData.style = _this.target.getAttribute('style');
	    } else if (_this.attr === 'attr') {
	      Object.keys(_d).forEach(function (key) {
	        if (key === 'style' && Array.isArray(d[key])) {
	          throw new Error('Style should be the object.');
	        }
	        if (key === 'bezier') {
	          _d.style = (0, _extends3.default)({}, _d.style, { bezier: _d[key] });
	          delete _d[key];
	          _this.startDefaultData.style = _this.target.getAttribute('style');
	        } else {
	          _this.startDefaultData[key] = _this.target.getAttribute(key);
	        }
	      });
	      data[i] = _d;
	    }
	  });
	  // 动画过程
	  this.tween = {};
	  // 每帧的时间;
	  this.perFrame = Math.round(1000 / 60);
	  // 注册，第一次进入执行注册
	  this.register = false;
	  // 缓动最小值;
	  this.tinyNum = 0.0000000001;
	  // 设置默认动画数据;
	  this.setDefaultData(data);
	};
	var p = timeLine.prototype;
	
	p.setDefaultData = function (_vars) {
	  var _this2 = this;
	
	  var now = 0;
	  var repeatMax = false;
	  var data = _vars.map(function (item) {
	    var appearToBool = typeof item.appearTo === 'number';
	    // 加上延时，在没有播放过时；
	    // !appearToBool && (now += item.delay || 0);
	    if (!appearToBool) {
	      now += item.delay || 0;
	    }
	    var appearToTime = (item.appearTo || 0) + (item.delay || 0);
	    // 获取默认数据
	    var tweenData = defaultData(item, appearToBool ? appearToTime : now);
	    tweenData.vars = {};
	    Object.keys(item).forEach(function (_key) {
	      if (!(_key in tweenData)) {
	        var _data = item[_key];
	        if (_key in _plugins2.default) {
	          tweenData.vars[_key] = new _plugins2.default[_key](_this2.target, _data, tweenData.type);
	        } else if (_key.match(/color/i) || _key === 'stroke' || _key === 'fill') {
	          tweenData.vars[_key] = { type: 'color', vars: (0, _styleUtils.parseColor)(_data) };
	        } else if (typeof _data === 'number' || _data.split(/[,|\s]/g).length <= 1) {
	          var vars = parseFloat(_data);
	          var unit = _data.toString().replace(/[^a-z|%]/g, '');
	          var count = _data.toString().replace(/[^+|=|-]/g, '');
	          tweenData.vars[_key] = { unit: unit, vars: vars, count: count };
	        } else if ((_key === 'd' || _key === 'points') && 'SVGMorph' in _plugins2.default) {
	          tweenData.vars[_key] = new _plugins2.default.SVGMorph(_this2.target, _data, _key);
	        }
	      }
	    });
	    if (tweenData.yoyo && !tweenData.repeat) {
	      console.warn('Warning: yoyo must be used together with repeat;'); // eslint-disable-line
	    }
	    if (tweenData.repeat === -1) {
	      repeatMax = true;
	    }
	    var repeat = tweenData.repeat === -1 ? 0 : tweenData.repeat;
	    if (appearToBool) {
	      // 如果有 appearTo 且这条时间比 now 大时，，总时间用这条；
	      var appearNow = item.appearTo + (item.delay || 0) + tweenData.duration * (repeat + 1) + tweenData.repeatDelay * repeat;
	      now = appearNow >= now ? appearNow : now;
	    } else {
	      if (tweenData.delay < -tweenData.duration) {
	        // 如果延时小于 负时间时,,不加,再减回延时;
	        now -= tweenData.delay;
	      } else {
	        // repeat 为 -1 只记录一次。不能跟 reverse 同时使用;
	        now += tweenData.duration * (repeat + 1) + tweenData.repeatDelay * repeat;
	      }
	    }
	    tweenData.mode = '';
	    return tweenData;
	  });
	  this.totalTime = repeatMax ? Number.MAX_VALUE : now;
	  this.defaultData = data;
	};
	p.getAnimStartData = function (item) {
	  var _this3 = this;
	
	  var start = {};
	  Object.keys(item).forEach(function (_key) {
	    if (_key in _plugins2.default || _this3.attr === 'attr' && (_key === 'd' || _key === 'points')) {
	      start[_key] = item[_key].getAnimStart(_this3.willChange);
	      return;
	    }
	    if (_this3.attr === 'attr') {
	      // 除了d和这points外的标签动画；
	      var attribute = _this3.target.getAttribute(_key);
	      var data = attribute === 'null' || !attribute ? 0 : attribute;
	      if (_key.match(/color/i) || _key === 'stroke' || _key === 'fill') {
	        data = !data && _key === 'stroke' ? 'rgba(255, 255, 255, 0)' : data;
	        data = (0, _styleUtils.parseColor)(data);
	        start[_key] = data;
	      } else if (parseFloat(data) || parseFloat(data) === 0 || data === 0) {
	        var unit = data.toString().replace(/[^a-z|%]/g, '');
	        start[_key] = unit !== item[_key].unit ? (0, _util.startConvertToEndUnit)(_this3.target, _key, parseFloat(data), unit, item[_key].unit) : parseFloat(data);
	      }
	      // start[_key] = data;
	      return;
	    }
	    start[_key] = _this3.target[_key] || 0;
	  });
	  return start;
	};
	p.setAnimData = function (data) {
	  var _this4 = this;
	
	  Object.keys(data).forEach(function (key) {
	    if (key in _plugins2.default || _this4.attr === 'attr' && (key === 'd' || key === 'points')) {
	      return;
	    }
	    _this4.target[key] = data[key];
	  });
	};
	p.setRatio = function (ratio, endData, i) {
	  var _this5 = this;
	
	  Object.keys(endData.vars).forEach(function (_key) {
	    if (_key in _plugins2.default || _this5.attr === 'attr' && (_key === 'd' || _key === 'points')) {
	      endData.vars[_key].setRatio(ratio, _this5.tween);
	      return;
	    }
	    var endVars = endData.vars[_key];
	    var startVars = _this5.start[i][_key];
	    var data = void 0;
	    if (_this5.attr === 'attr') {
	      // 除了d和这points外的标签动画；
	      if (!endVars.type) {
	        data = endVars.unit.charAt(1) === '=' ? startVars + endVars.vars * ratio + endVars.unit : (endVars.vars - startVars) * ratio + startVars + endVars.unit;
	        _this5.target.setAttribute(_key, data);
	      } else if (endVars.type === 'color') {
	        if (endVars.vars.length === 3 && startVars.length === 4) {
	          endVars.vars[3] = 1;
	        }
	        data = endVars.vars.map(function (_endData, _i) {
	          var startData = startVars[_i] || 0;
	          return (_endData - startData) * ratio + startData;
	        });
	        _this5.target.setAttribute(_key, (0, _styleUtils.getColor)(data));
	      }
	    }
	  });
	  this.setAnimData(this.tween);
	};
	p.render = function () {
	  var _this6 = this;
	
	  this.defaultData.forEach(function (item, i) {
	    var initTime = item.initTime;
	    var duration = (0, _styleUtils.toFixed)(item.duration);
	    // 处理 yoyo 和 repeat; yoyo 是在时间轴上的, 并不是倒放
	    var repeatNum = Math.ceil((_this6.progressTime - initTime) / (duration + item.repeatDelay)) - 1;
	    repeatNum = repeatNum < 0 ? 0 : repeatNum;
	    // repeatNum = this.progressTime === 0 ? repeatNum + 1 : repeatNum;
	    if (item.repeat) {
	      if (item.repeat < repeatNum && item.repeat !== -1) {
	        return;
	      }
	      if (item.repeat || item.repeat <= repeatNum) {
	        initTime = initTime + repeatNum * (duration + item.repeatDelay);
	      }
	    }
	    var startData = item.yoyo && repeatNum % 2 || item.type === 'from' ? 1 : 0;
	    var endData = item.yoyo && repeatNum % 2 || item.type === 'from' ? 0 : 1;
	    //  精度损失，只取小数点后10位。
	    var progressTime = (0, _styleUtils.toFixed)(_this6.progressTime - initTime);
	    // 设置 start
	    var delay = item.delay >= 0 ? item.delay : -item.delay;
	    var fromDelay = item.type === 'from' ? delay : 0;
	    if (progressTime + fromDelay > -_this6.perFrame && !_this6.start[i]) {
	      _this6.start[i] = _this6.getAnimStartData(item.vars);
	      if (!_this6.register && progressTime <= _this6.perFrame) {
	        _this6.register = true;
	        // 在开始跳帧时。。[{x:100,type:'from'},{y:300}]，跳过了from时, moment = 600 => 需要把from合回来
	        // 如果 duration 和 delay 都为 0， 判断用set, 直接注册时就结束;
	        var s = delay ? 0 : item.ease(_this6.tinyNum, startData, endData, _this6.tinyNum);
	        var ss = duration ? item.ease(progressTime < 0 ? 0 : progressTime, startData, endData, duration) : s;
	        var st = progressTime / (duration + fromDelay) > 1 ? 1 : ss;
	        _this6.setRatio(st, item, i);
	      }
	    }
	    var e = {
	      index: i,
	      target: _this6.target
	    };
	
	    // onRepeat 处理
	    if (item.repeat && repeatNum > 0 && progressTime + fromDelay >= 0 && progressTime < _this6.perFrame) {
	      // 重新开始, 在第一秒触发时调用;
	      item.onRepeat(e);
	    }
	    if (progressTime < 0 && progressTime + fromDelay > -_this6.perFrame) {
	      _this6.setRatio(item.type === 'from' ? 1 : 0, item, i);
	    } else if (progressTime >= duration && item.mode !== 'onComplete') {
	      var compRatio = duration ? item.ease(duration, startData, endData, duration) : item.ease(_this6.tinyNum, startData, endData, _this6.tinyNum);
	      _this6.setRatio(compRatio, item, i);
	      if (item.mode !== 'reset') {
	        item.onComplete(e);
	      }
	      item.mode = 'onComplete';
	    } else if (progressTime >= 0 && progressTime < duration) {
	      item.mode = progressTime < _this6.perFrame && !_this6.onStart[i] ? 'onStart' : 'onUpdate';
	      progressTime = progressTime < 0 ? 0 : progressTime;
	      progressTime = progressTime > duration ? duration : progressTime;
	      var ratio = item.ease(progressTime, startData, endData, duration);
	      _this6.setRatio(ratio, item, i);
	      _this6.onStart[i] = true;
	      if (progressTime <= _this6.perFrame) {
	        item.onStart(e);
	      } else {
	        item.onUpdate((0, _extends3.default)({ ratio: ratio }, e));
	      }
	    }
	
	    if (progressTime >= 0 && progressTime < duration + _this6.perFrame) {
	      _this6.onChange((0, _extends3.default)({
	        moment: _this6.progressTime,
	        mode: item.mode
	      }, e));
	    }
	  });
	};
	// 播放帧
	p.frame = function (moment) {
	  this.progressTime = moment;
	  this.render();
	};
	p.resetAnimData = function () {
	  this.tween = {};
	  this.start = {};
	  this.onStart = {};
	};
	
	p.resetDefaultStyle = function () {
	  var _this7 = this;
	
	  this.tween = {};
	  this.defaultData = this.defaultData.map(function (item) {
	    item.mode = 'reset';
	    return item;
	  });
	  Object.keys(this.startDefaultData).forEach(function (key) {
	    if (!(key in defaultData({}, 0))) {
	      _this7.target.setAttribute(key, _this7.startDefaultData[key]);
	    }
	  });
	};
	
	p.onChange = noop;
	exports.default = timeLine;
	module.exports = exports['default'];

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _tweenFunctions = __webpack_require__(94);
	
	var _tweenFunctions2 = _interopRequireDefault(_tweenFunctions);
	
	var _util = __webpack_require__(88);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_tweenFunctions2.default.path = function (_path, _param) {
	  var param = _param || {};
	  var pathNode = (0, _util.parsePath)(_path);
	  var pathLength = pathNode.getTotalLength();
	  var rect = param.rect || 100; // path 的大小，100 * 100，
	  var lengthPixel = param.lengthPixel || 1500; // 线上取点像素，默认分为 1500 段。。
	  var points = [];
	  for (var i = 0; i < lengthPixel; i++) {
	    points.push(pathNode.getPointAtLength(pathLength / lengthPixel * i));
	  }
	  return function path(t, b, _c, d) {
	    var p = _tweenFunctions2.default.linear(t, b, _c, d);
	    var timePointX = rect * p; // X 轴的百分比;
	    // 取出 x 轴百分比上的点;
	    var point = points.filter(function (item) {
	      return item.x >= timePointX;
	    })[0] || pathNode.getPointAtLength(p * pathLength);
	    return 1 - point.y / rect;
	  };
	};
	
	exports.default = _tweenFunctions2.default;
	module.exports = exports['default'];

/***/ },
/* 94 */
/***/ function(module, exports) {

	'use strict';
	
	// t: current time, b: beginning value, _c: final value, d: total duration
	var tweenFunctions = {
	  linear: function(t, b, _c, d) {
	    var c = _c - b;
	    return c * t / d + b;
	  },
	  easeInQuad: function(t, b, _c, d) {
	    var c = _c - b;
	    return c * (t /= d) * t + b;
	  },
	  easeOutQuad: function(t, b, _c, d) {
	    var c = _c - b;
	    return -c * (t /= d) * (t - 2) + b;
	  },
	  easeInOutQuad: function(t, b, _c, d) {
	    var c = _c - b;
	    if ((t /= d / 2) < 1) {
	      return c / 2 * t * t + b;
	    } else {
	      return -c / 2 * ((--t) * (t - 2) - 1) + b;
	    }
	  },
	  easeInCubic: function(t, b, _c, d) {
	    var c = _c - b;
	    return c * (t /= d) * t * t + b;
	  },
	  easeOutCubic: function(t, b, _c, d) {
	    var c = _c - b;
	    return c * ((t = t / d - 1) * t * t + 1) + b;
	  },
	  easeInOutCubic: function(t, b, _c, d) {
	    var c = _c - b;
	    if ((t /= d / 2) < 1) {
	      return c / 2 * t * t * t + b;
	    } else {
	      return c / 2 * ((t -= 2) * t * t + 2) + b;
	    }
	  },
	  easeInQuart: function(t, b, _c, d) {
	    var c = _c - b;
	    return c * (t /= d) * t * t * t + b;
	  },
	  easeOutQuart: function(t, b, _c, d) {
	    var c = _c - b;
	    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	  },
	  easeInOutQuart: function(t, b, _c, d) {
	    var c = _c - b;
	    if ((t /= d / 2) < 1) {
	      return c / 2 * t * t * t * t + b;
	    } else {
	      return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	    }
	  },
	  easeInQuint: function(t, b, _c, d) {
	    var c = _c - b;
	    return c * (t /= d) * t * t * t * t + b;
	  },
	  easeOutQuint: function(t, b, _c, d) {
	    var c = _c - b;
	    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	  },
	  easeInOutQuint: function(t, b, _c, d) {
	    var c = _c - b;
	    if ((t /= d / 2) < 1) {
	      return c / 2 * t * t * t * t * t + b;
	    } else {
	      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	    }
	  },
	  easeInSine: function(t, b, _c, d) {
	    var c = _c - b;
	    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	  },
	  easeOutSine: function(t, b, _c, d) {
	    var c = _c - b;
	    return c * Math.sin(t / d * (Math.PI / 2)) + b;
	  },
	  easeInOutSine: function(t, b, _c, d) {
	    var c = _c - b;
	    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	  },
	  easeInExpo: function(t, b, _c, d) {
	    var c = _c - b;
	    return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	  },
	  easeOutExpo: function(t, b, _c, d) {
	    var c = _c - b;
	    return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	  },
	  easeInOutExpo: function(t, b, _c, d) {
	    var c = _c - b;
	    if (t === 0) {
	      return b;
	    }
	    if (t === d) {
	      return b + c;
	    }
	    if ((t /= d / 2) < 1) {
	      return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
	    } else {
	      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	    }
	  },
	  easeInCirc: function(t, b, _c, d) {
	    var c = _c - b;
	    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	  },
	  easeOutCirc: function(t, b, _c, d) {
	    var c = _c - b;
	    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
	  },
	  easeInOutCirc: function(t, b, _c, d) {
	    var c = _c - b;
	    if ((t /= d / 2) < 1) {
	      return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
	    } else {
	      return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	    }
	  },
	  easeInElastic: function(t, b, _c, d) {
	    var c = _c - b;
	    var a, p, s;
	    s = 1.70158;
	    p = 0;
	    a = c;
	    if (t === 0) {
	      return b;
	    } else if ((t /= d) === 1) {
	      return b + c;
	    }
	    if (!p) {
	      p = d * 0.3;
	    }
	    if (a < Math.abs(c)) {
	      a = c;
	      s = p / 4;
	    } else {
	      s = p / (2 * Math.PI) * Math.asin(c / a);
	    }
	    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	  },
	  easeOutElastic: function(t, b, _c, d) {
	    var c = _c - b;
	    var a, p, s;
	    s = 1.70158;
	    p = 0;
	    a = c;
	    if (t === 0) {
	      return b;
	    } else if ((t /= d) === 1) {
	      return b + c;
	    }
	    if (!p) {
	      p = d * 0.3;
	    }
	    if (a < Math.abs(c)) {
	      a = c;
	      s = p / 4;
	    } else {
	      s = p / (2 * Math.PI) * Math.asin(c / a);
	    }
	    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	  },
	  easeInOutElastic: function(t, b, _c, d) {
	    var c = _c - b;
	    var a, p, s;
	    s = 1.70158;
	    p = 0;
	    a = c;
	    if (t === 0) {
	      return b;
	    } else if ((t /= d / 2) === 2) {
	      return b + c;
	    }
	    if (!p) {
	      p = d * (0.3 * 1.5);
	    }
	    if (a < Math.abs(c)) {
	      a = c;
	      s = p / 4;
	    } else {
	      s = p / (2 * Math.PI) * Math.asin(c / a);
	    }
	    if (t < 1) {
	      return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	    } else {
	      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
	    }
	  },
	  easeInBack: function(t, b, _c, d, s) {
	    var c = _c - b;
	    if (s === void 0) {
	      s = 1.70158;
	    }
	    return c * (t /= d) * t * ((s + 1) * t - s) + b;
	  },
	  easeOutBack: function(t, b, _c, d, s) {
	    var c = _c - b;
	    if (s === void 0) {
	      s = 1.70158;
	    }
	    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	  },
	  easeInOutBack: function(t, b, _c, d, s) {
	    var c = _c - b;
	    if (s === void 0) {
	      s = 1.70158;
	    }
	    if ((t /= d / 2) < 1) {
	      return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
	    } else {
	      return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
	    }
	  },
	  easeInBounce: function(t, b, _c, d) {
	    var c = _c - b;
	    var v;
	    v = tweenFunctions.easeOutBounce(d - t, 0, c, d);
	    return c - v + b;
	  },
	  easeOutBounce: function(t, b, _c, d) {
	    var c = _c - b;
	    if ((t /= d) < 1 / 2.75) {
	      return c * (7.5625 * t * t) + b;
	    } else if (t < 2 / 2.75) {
	      return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
	    } else if (t < 2.5 / 2.75) {
	      return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
	    } else {
	      return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
	    }
	  },
	  easeInOutBounce: function(t, b, _c, d) {
	    var c = _c - b;
	    var v;
	    if (t < d / 2) {
	      v = tweenFunctions.easeInBounce(t * 2, 0, c, d);
	      return v * 0.5 + b;
	    } else {
	      v = tweenFunctions.easeOutBounce(t * 2 - d, 0, c, d);
	      return v * 0.5 + c * 0.5 + b;
	    }
	  }
	};
	
	module.exports = tweenFunctions;


/***/ },
/* 95 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/* eslint-disable func-names */
	var Plugins = function Plugins() {};
	var p = Plugins.prototype;
	p.push = function (plugin) {
	  this[plugin.prototype.name] = plugin;
	};
	exports.default = new Plugins();
	module.exports = exports['default'];

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(3);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _styleUtils = __webpack_require__(91);
	
	var _styleUtils2 = _interopRequireDefault(_styleUtils);
	
	var _util = __webpack_require__(88);
	
	var _plugins = __webpack_require__(95);
	
	var _plugins2 = _interopRequireDefault(_plugins);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var StylePlugin = function StylePlugin(target, vars, type) {
	  this.target = target;
	  this.vars = vars;
	  this.type = type;
	  this.propsData = {};
	  this.setDefaultData();
	}; /* eslint-disable func-names, no-console */
	
	var p = StylePlugin.prototype = {
	  name: 'style'
	};
	p.getComputedStyle = function () {
	  return document.defaultView ? document.defaultView.getComputedStyle(this.target) : {};
	};
	p.getTweenData = function (key, vars) {
	  var data = {
	    data: {},
	    dataType: {},
	    dataUnit: {},
	    dataCount: {},
	    dataSplitStr: {}
	  };
	  if (key.match(/colo|fill|storker/i)) {
	    data.data[key] = (0, _styleUtils.parseColor)(vars);
	    data.dataType[key] = 'color';
	  } else if (key.match(/shadow/i)) {
	    data.data[key] = (0, _styleUtils.parseShadow)(vars);
	    data.dataType[key] = 'shadow';
	  } else if (typeof vars === 'string' && vars.split(/[\s|,]/).length > 1) {
	    data.data[key] = vars.split(/[\s|,]/);
	    data.dataSplitStr[key] = vars.replace(/[^\s|,]/g, '');
	    data.dataType[key] = 'string';
	  } else {
	    data.data[key] = vars;
	    data.dataType[key] = 'other';
	  }
	  if (Array.isArray(data.data[key])) {
	    data.dataUnit[key] = data.data[key].map(function (_item) {
	      return _item.toString().replace(/[^a-z|%]/g, '');
	    });
	    data.dataCount[key] = data.data[key].map(function (_item) {
	      return _item.toString().replace(/[^+|=|-]/g, '');
	    });
	
	    data.data[key] = data.data[key].map(function (_item) {
	      return !parseFloat(_item) && parseFloat(_item) !== 0 ? _item : parseFloat(_item);
	    });
	  } else {
	    data.dataUnit[key] = data.data[key].toString().replace(/[^a-z|%]/g, '');
	    data.dataCount[key] = data.data[key].toString().replace(/[^+|=|-]/g, '');
	    var d = parseFloat(data.data[key].toString().replace(/[a-z|%|=]/g, ''));
	    data.data[key] = !d && d !== 0 ? data.data[key] : d;
	  }
	  return data;
	};
	p.setDefaultData = function () {
	  var _this = this;
	
	  this.propsData.data = {};
	  this.propsData.dataType = {};
	  this.propsData.dataUnit = {};
	  this.propsData.dataCount = {};
	  this.propsData.dataSplitStr = {};
	  Object.keys(this.vars).forEach(function (_key) {
	    if (_key in _plugins2.default) {
	      _this.propsData.data[_key] = new _plugins2.default[_key](_this.target, _this.vars[_key]);
	      return;
	    }
	    var key = (0, _styleUtils.getGsapType)(_key);
	    var _data = _this.getTweenData(key, _this.vars[_key]);
	    _this.propsData.data[key] = _data.data[key];
	    _this.propsData.dataType[key] = _data.dataType[key];
	    _this.propsData.dataUnit[key] = _data.dataUnit[key];
	    _this.propsData.dataCount[key] = _data.dataCount[key];
	    if (_data.dataSplitStr[key]) {
	      _this.propsData.dataSplitStr[key] = _data.dataSplitStr[key];
	    }
	  });
	};
	p.convertToMarksArray = function (unit, key, data, i) {
	  var startUnit = data.toString().replace(/[^a-z|%]/g, '');
	  var endUnit = unit[i];
	  if (startUnit === endUnit) {
	    return parseFloat(data);
	  } else if (!parseFloat(data) && parseFloat(data) !== 0) {
	    return data;
	  }
	  return (0, _util.startConvertToEndUnit)(this.target, key, data, startUnit, endUnit, null, key === 'transformOrigin' && !i);
	};
	p.getAnimStart = function (willChangeBool) {
	  var _this2 = this;
	
	  var computedStyle = this.getComputedStyle();
	  var style = {};
	  this.supports3D = (0, _styleUtils.checkStyleName)('perspective');
	  var willChangeArray = void 0;
	  if (willChangeBool) {
	    this.willChange = computedStyle.willChange === 'auto' || !computedStyle.willChange || computedStyle.willChange === 'none' ? '' : computedStyle.willChange;
	    willChangeArray = this.willChange.split(',').filter(function (k) {
	      return k;
	    });
	  }
	  Object.keys(this.propsData.data).forEach(function (key) {
	    var cssName = (0, _styleUtils.isConvert)(key);
	    if (willChangeBool) {
	      var willStyle = key in _plugins2.default ? _this2.propsData.data[key].useStyle || cssName : cssName;
	      willStyle = willStyle === 'transformOrigin' ? 'transform-origin' : willStyle;
	      if (willChangeArray.indexOf(willStyle) === -1 && (willStyle in computedStyle || key in _plugins2.default)) {
	        willChangeArray.push(willStyle);
	      }
	      _this2.willChange = willChangeArray.join(',');
	    }
	    var startData = computedStyle[cssName];
	    var fixed = computedStyle.position === 'fixed';
	    if (!startData || startData === 'none' || startData === 'auto') {
	      startData = '';
	    }
	    var transform = void 0;
	    var endUnit = void 0;
	    var startUnit = void 0;
	    if (key in _plugins2.default) {
	      if (key === 'bezier') {
	        _this2.transform = (0, _styleUtils.checkStyleName)('transform');
	        startData = computedStyle[_this2.transform];
	        style.transform = style.transform || (0, _styleUtils.getTransform)(startData);
	      }
	      _this2.propsData.data[key].getAnimStart();
	    } else if (cssName === 'transform') {
	      _this2.transform = (0, _styleUtils.checkStyleName)('transform');
	      startData = computedStyle[_this2.transform];
	      endUnit = _this2.propsData.dataUnit[key];
	      transform = style.transform || (0, _styleUtils.getTransform)(startData);
	      if (endUnit && endUnit.match(/%|vw|vh|em|rem/i)) {
	        var percent = key === 'translateX' ? 'xPercent' : 'yPercent';
	        transform[percent] = (0, _util.startConvertToEndUnit)(_this2.target, key, transform[key], null, endUnit);
	        transform[key] = 0;
	      }
	      style.transform = transform;
	    } else if (cssName === 'filter') {
	      _this2.filterName = (0, _styleUtils.checkStyleName)('filter') || 'filter';
	      startData = computedStyle[_this2.filterName];
	      _this2.filterObject = (0, _extends3.default)({}, _this2.filterObject, (0, _styleUtils.splitFilterToObject)(startData));
	      startData = _this2.filterObject[key] || 0;
	      startUnit = startData.toString().replace(/[^a-z|%]/g, '');
	      endUnit = _this2.propsData.dataUnit[key];
	      if (endUnit !== startUnit) {
	        startData = (0, _util.startConvertToEndUnit)(_this2.target, cssName, parseFloat(startData), startUnit, endUnit, fixed);
	      }
	      style[key] = parseFloat(startData);
	    } else if (key.match(/color|fill/i) || key === 'stroke') {
	      startData = !startData && key === 'stroke' ? 'rgba(255, 255, 255, 0)' : startData;
	      style[cssName] = (0, _styleUtils.parseColor)(startData);
	    } else if (key.match(/shadow/i)) {
	      startData = (0, _styleUtils.parseShadow)(startData);
	      endUnit = _this2.propsData.dataUnit[key];
	      startData = startData.map(_this2.convertToMarksArray.bind(_this2, endUnit, key));
	      style[cssName] = startData;
	    } else if (Array.isArray(_this2.propsData.data[key])) {
	      startData = startData.split(/[\s|,]/);
	      endUnit = _this2.propsData.dataUnit[key];
	      startData = startData.map(_this2.convertToMarksArray.bind(_this2, endUnit, key));
	      style[cssName] = startData;
	    } else {
	      // 计算单位
	      endUnit = _this2.propsData.dataUnit[cssName];
	      startUnit = startData.toString().replace(/[^a-z|%]/g, '');
	      if (endUnit !== startUnit) {
	        startData = (0, _util.startConvertToEndUnit)(_this2.target, cssName, parseFloat(startData), startUnit, endUnit, fixed);
	      }
	      style[cssName] = parseFloat(startData || 0);
	    }
	  });
	  this.start = style;
	  return style;
	};
	p.setArrayRatio = function (ratio, start, vars, unit, type) {
	  if (type === 'color' && start.length === 4 && vars.length === 3) {
	    vars[3] = 1;
	  }
	  var startInset = start.indexOf('inset') >= 0;
	  var endInset = vars.indexOf('inset') >= 0;
	  if (startInset && !endInset || endInset && !startInset) {
	    throw console.error('Error: "box-shadow" inset have to exist');
	  }
	  var length = endInset ? 9 : 8;
	  if (start.length === length && vars.length === length - 1) {
	    vars.splice(3, 0, 0);
	    unit.splice(3, 0, '');
	  } else if (vars.length === length && start.length === length - 1) {
	    start.splice(3, 0, 0);
	  }
	  var _vars = vars.map(function (endData, i) {
	    var startIsAlpha = type === 'color' && i === 3 && !start[i] ? 1 : 0;
	    var startData = typeof start[i] === 'number' ? start[i] : startIsAlpha;
	    if (typeof endData === 'string') {
	      return endData;
	    }
	    return (endData - startData) * ratio + startData + (unit[i] || 0);
	  });
	  if (type === 'color') {
	    return (0, _styleUtils.getColor)(_vars);
	  } else if (type === 'shadow') {
	    var l = _vars.length === length ? 4 : 3;
	    var s = _vars.slice(0, l).map(function (item) {
	      if (typeof item === 'number') {
	        return item + 'px';
	      }
	      return item;
	    });
	    var c = _vars.slice(l, endInset ? _vars.length - 1 : _vars.length);
	    var color = (0, _styleUtils.getColor)(c);
	    return (s.join(' ') + ' ' + color + ' ' + (endInset ? 'inset' : '')).trim();
	  }
	  return _vars;
	};
	
	p.setRatio = function (ratio, tween) {
	  var _this3 = this;
	
	  tween.style = tween.style || {};
	  if (this.start.transform) {
	    tween.style.transform = tween.style.transform || (0, _extends3.default)({}, this.start.transform);
	  }
	  var style = this.target.style;
	  if (this.willChange) {
	    if (ratio === (this.type === 'from' ? 0 : 1)) {
	      style.willChange = null;
	    } else {
	      style.willChange = this.willChange;
	    }
	  }
	  Object.keys(this.propsData.data).forEach(function (key) {
	    var _isTransform = (0, _styleUtils.isTransform)(key) === 'transform';
	    var startVars = _isTransform ? _this3.start.transform[key] : _this3.start[key];
	    var endVars = _this3.propsData.data[key];
	    var unit = _this3.propsData.dataUnit[key];
	    var count = _this3.propsData.dataCount[key];
	    if (key in _plugins2.default) {
	      _this3.propsData.data[key].setRatio(ratio, tween);
	      if (key === 'bezier') {
	        style[_this3.transform] = (0, _util.getTransformValue)(tween.style.transform, _this3.supports3D);
	      } else {
	        Object.keys(tween.style).forEach(function (css) {
	          return style[css] = tween.style[css];
	        });
	      }
	      return;
	    } else if (_isTransform) {
	      if (unit && unit.match(/%|vw|vh|em|rem/i)) {
	        var pName = key === 'translateX' ? 'xPercent' : 'yPercent';
	        startVars = _this3.start.transform[pName];
	        if (count.charAt(1) === '=') {
	          tween.style.transform[pName] = startVars + endVars * ratio + unit;
	        } else {
	          tween.style.transform[pName] = (endVars - startVars) * ratio + startVars + unit;
	        }
	      } else if (key === 'scale') {
	        var xStart = _this3.start.transform.scaleX;
	        var yStart = _this3.start.transform.scaleY;
	        if (count.charAt(1) === '=') {
	          tween.style.transform.scaleX = xStart + endVars * ratio;
	          tween.style.transform.scaleY = yStart + endVars * ratio;
	        } else {
	          tween.style.transform.scaleX = (endVars - xStart) * ratio + xStart;
	          tween.style.transform.scaleY = (endVars - yStart) * ratio + yStart;
	        }
	      }
	      if (count.charAt(1) === '=') {
	        tween.style.transform[key] = startVars + endVars * ratio;
	      } else {
	        tween.style.transform[key] = (endVars - startVars) * ratio + startVars;
	      }
	      style[_this3.transform] = (0, _util.getTransformValue)(tween.style.transform, _this3.supports3D);
	      return;
	    } else if (Array.isArray(endVars)) {
	      var _type = _this3.propsData.dataType[key];
	      tween.style[key] = _this3.setArrayRatio(ratio, startVars, endVars, unit, _type);
	      if (_type === 'string') {
	        tween.style[key] = tween.style[key].join(_this3.propsData.dataSplitStr[key]);
	      }
	    } else {
	      var styleUnit = (0, _styleUtils.stylesToCss)(key, 0);
	      styleUnit = typeof styleUnit === 'number' ? '' : styleUnit.replace(/[^a-z|%]/g, '');
	      unit = unit || (_styleUtils2.default.filter.indexOf(key) >= 0 ? '' : styleUnit);
	      if (typeof endVars === 'string') {
	        tween.style[key] = endVars;
	      } else {
	        if (count.charAt(1) === '=') {
	          tween.style[key] = startVars + endVars * ratio + unit;
	        } else {
	          tween.style[key] = (endVars - startVars) * ratio + startVars + unit;
	        }
	      }
	    }
	    if (_styleUtils2.default.filter.indexOf(key) >= 0) {
	      if (!_this3.filterObject) {
	        return;
	      }
	      _this3.filterObject[key] = tween.style[key];
	      var filterStyle = '';
	      Object.keys(_this3.filterObject).forEach(function (filterKey) {
	        filterStyle += ' ' + filterKey + '(' + _this3.filterObject[filterKey] + ')';
	      });
	      style[_this3.filterName] = filterStyle.trim();
	      return;
	    }
	    style[key] = tween.style[key];
	  });
	};
	exports.default = StylePlugin;
	module.exports = exports['default'];

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _raf = __webpack_require__(98);
	
	var _raf2 = _interopRequireDefault(_raf);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Ticker = function Ticker() {}; /* eslint-disable func-names */
	
	
	var p = Ticker.prototype = {
	  tickFnObject: {},
	  id: -1,
	  tweenId: 0,
	  frame: 0,
	  perFrame: Math.round(1000 / 60),
	  getTime: Date.now || function () {
	    return new Date().getTime();
	  },
	  elapsed: 0,
	  lastUpdate: 0,
	  skipFrameMax: 166
	};
	p.add = function (fn) {
	  var key = 'tweenOne' + this.tweenId;
	  this.tweenId++;
	  this.wake(key, fn);
	  return key;
	};
	p.wake = function (key, fn) {
	  this.tickFnObject[key] = fn;
	  if (this.id === -1) {
	    this.id = (0, _raf2.default)(this.tick);
	  }
	};
	p.clear = function (key) {
	  delete this.tickFnObject[key];
	};
	p.sleep = function () {
	  _raf2.default.cancel(this.id);
	  this.id = -1;
	  this.frame = 0;
	};
	var ticker = new Ticker();
	p.tick = function (a) {
	  ticker.elapsed = ticker.lastUpdate ? ticker.getTime() - ticker.lastUpdate : 0;
	  ticker.lastUpdate = ticker.lastUpdate ? ticker.lastUpdate + ticker.elapsed : ticker.getTime() + ticker.elapsed;
	  var obj = ticker.tickFnObject;
	  Object.keys(obj).forEach(function (key) {
	    if (obj[key]) {
	      obj[key](a);
	    }
	  });
	  // 如果 object 里没对象了，自动杀掉；
	  if (!Object.keys(obj).length) {
	    ticker.sleep();
	    return;
	  }
	  if (ticker.elapsed > ticker.skipFrameMax || !ticker.frame) {
	    ticker.frame++;
	  } else {
	    ticker.frame += Math.round(ticker.elapsed / ticker.perFrame);
	  }
	  ticker.id = (0, _raf2.default)(ticker.tick);
	};
	var timeoutIdNumber = 0;
	p.timeout = function (fn, time) {
	  var _this = this;
	
	  if (!(typeof fn === 'function')) {
	    return console.warn('Is no function'); // eslint-disable-line
	  }
	  var timeoutID = 'timeout' + Date.now() + '-' + timeoutIdNumber;
	  var startFrame = this.frame;
	  this.wake(timeoutID, function () {
	    var moment = (_this.frame - startFrame) * _this.perFrame;
	    if (moment >= (time || 0)) {
	      _this.clear(timeoutID);
	      fn();
	    }
	  });
	  timeoutIdNumber++;
	  return timeoutID;
	};
	var intervalIdNumber = 0;
	p.interval = function (fn, time) {
	  var _this2 = this;
	
	  if (!(typeof fn === 'function')) {
	    console.warn('Is no function'); // eslint-disable-line
	    return null;
	  }
	  var intervalID = 'interval' + Date.now() + '-' + intervalIdNumber;
	  var starFrame = this.frame;
	  this.wake(intervalID, function () {
	    var moment = (_this2.frame - starFrame) * _this2.perFrame;
	    if (moment >= (time || 0)) {
	      starFrame = _this2.frame;
	      fn();
	    }
	  });
	  intervalIdNumber++;
	  return intervalID;
	};
	exports.default = ticker;
	module.exports = exports['default'];

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var now = __webpack_require__(99)
	  , root = typeof window === 'undefined' ? global : window
	  , vendors = ['moz', 'webkit']
	  , suffix = 'AnimationFrame'
	  , raf = root['request' + suffix]
	  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]
	
	for(var i = 0; !raf && i < vendors.length; i++) {
	  raf = root[vendors[i] + 'Request' + suffix]
	  caf = root[vendors[i] + 'Cancel' + suffix]
	      || root[vendors[i] + 'CancelRequest' + suffix]
	}
	
	// Some versions of FF have rAF but not cAF
	if(!raf || !caf) {
	  var last = 0
	    , id = 0
	    , queue = []
	    , frameDuration = 1000 / 60
	
	  raf = function(callback) {
	    if(queue.length === 0) {
	      var _now = now()
	        , next = Math.max(0, frameDuration - (_now - last))
	      last = next + _now
	      setTimeout(function() {
	        var cp = queue.slice(0)
	        // Clear queue here to prevent
	        // callbacks from appending listeners
	        // to the current frame's queue
	        queue.length = 0
	        for(var i = 0; i < cp.length; i++) {
	          if(!cp[i].cancelled) {
	            try{
	              cp[i].callback(last)
	            } catch(e) {
	              setTimeout(function() { throw e }, 0)
	            }
	          }
	        }
	      }, Math.round(next))
	    }
	    queue.push({
	      handle: ++id,
	      callback: callback,
	      cancelled: false
	    })
	    return id
	  }
	
	  caf = function(handle) {
	    for(var i = 0; i < queue.length; i++) {
	      if(queue[i].handle === handle) {
	        queue[i].cancelled = true
	      }
	    }
	  }
	}
	
	module.exports = function(fn) {
	  // Wrap in a new function to prevent
	  // `cancel` potentially being assigned
	  // to the native rAF function
	  return raf.call(root, fn)
	}
	module.exports.cancel = function() {
	  caf.apply(root, arguments)
	}
	module.exports.polyfill = function() {
	  root.requestAnimationFrame = raf
	  root.cancelAnimationFrame = caf
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.7.1
	(function() {
	  var getNanoSeconds, hrtime, loadTime;
	
	  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
	    module.exports = function() {
	      return performance.now();
	    };
	  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
	    module.exports = function() {
	      return (getNanoSeconds() - loadTime) / 1e6;
	    };
	    hrtime = process.hrtime;
	    getNanoSeconds = function() {
	      var hr;
	      hr = hrtime();
	      return hr[0] * 1e9 + hr[1];
	    };
	    loadTime = getNanoSeconds();
	  } else if (Date.now) {
	    module.exports = function() {
	      return Date.now() - loadTime;
	    };
	    loadTime = Date.now();
	  } else {
	    module.exports = function() {
	      return new Date().getTime() - loadTime;
	    };
	    loadTime = new Date().getTime();
	  }
	
	}).call(this);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(100)))

/***/ },
/* 100 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(3);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _classCallCheck2 = __webpack_require__(41);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(42);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(78);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(86);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _TweenOne = __webpack_require__(2);
	
	var _TweenOne2 = _interopRequireDefault(_TweenOne);
	
	var _util = __webpack_require__(88);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function noop() {}
	
	var TweenOneGroup = function (_Component) {
	  (0, _inherits3.default)(TweenOneGroup, _Component);
	
	  function TweenOneGroup() {
	    (0, _classCallCheck3.default)(this, TweenOneGroup);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
	
	    _initialiseProps.call(_this);
	
	    _this.keysToEnter = [];
	    _this.keysToLeave = [];
	    _this.onEnterBool = false;
	    _this.isTween = {};
	    // 第一进入，appear 为 true 时默认用 enter 或 tween-one 上的效果
	    var children = (0, _util.toArrayChildren)((0, _util.getChildrenFromProps)(_this.props));
	    _this.state = {
	      children: children
	    };
	    return _this;
	  }
	
	  TweenOneGroup.prototype.componentDidMount = function componentDidMount() {
	    this.onEnterBool = true;
	  };
	
	  TweenOneGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    var _this2 = this;
	
	    var nextChildren = (0, _util.toArrayChildren)(nextProps.children);
	    var currentChildren = (0, _util.toArrayChildren)(this.state.children);
	    var newChildren = (0, _util.mergeChildren)(currentChildren, nextChildren);
	
	    this.keysToEnter = [];
	    this.keysToLeave = [];
	    nextChildren.forEach(function (c) {
	      if (!c) {
	        return;
	      }
	      var key = c.key;
	      var hasPrev = (0, _util.findChildInChildrenByKey)(currentChildren, key);
	      if (!hasPrev && key) {
	        _this2.keysToEnter.push(key);
	      }
	    });
	
	    currentChildren.forEach(function (c) {
	      if (!c) {
	        return;
	      }
	      var key = c.key;
	      var hasNext = (0, _util.findChildInChildrenByKey)(nextChildren, key);
	      if (!hasNext && key) {
	        _this2.keysToLeave.push(key);
	      }
	    });
	    this.setState({
	      children: newChildren
	    });
	  };
	
	  TweenOneGroup.prototype.render = function render() {
	    var childrenToRender = this.getChildrenToRender(this.state.children);
	    if (!this.props.component) {
	      return childrenToRender[0] || null;
	    }
	    var componentProps = (0, _extends3.default)({}, this.props);
	    ['component', 'appear', 'enter', 'leave', 'animatingClassName', 'onEnd', 'resetStyleBool', 'willChange'].forEach(function (key) {
	      return delete componentProps[key];
	    });
	    return (0, _react.createElement)(this.props.component, componentProps, childrenToRender);
	  };
	
	  return TweenOneGroup;
	}(_react.Component);
	
	var _initialiseProps = function _initialiseProps() {
	  var _this3 = this;
	
	  this.onChange = function (animation, key, type, obj) {
	    var length = (0, _util.dataToArray)(animation).length;
	    var animatingClassName = _this3.props.animatingClassName;
	    var tag = obj.target;
	    var isEnter = type === 'enter' || type === 'appear';
	    if (obj.mode === 'onStart') {
	      tag.className = tag.className.replace(animatingClassName[isEnter ? 1 : 0], '').trim();
	      if (tag.className.indexOf(animatingClassName[isEnter ? 0 : 1]) === -1) {
	        tag.className = (tag.className + ' ' + animatingClassName[isEnter ? 0 : 1]).trim();
	      }
	    } else if (obj.index === length - 1 && obj.mode === 'onComplete') {
	      var children = _this3.state.children;
	      if (type === 'enter') {
	        _this3.keysToEnter.splice(_this3.keysToEnter.indexOf(key), 1);
	      } else if (type === 'leave') {
	        children = _this3.state.children.filter(function (child) {
	          return key !== child.key;
	        });
	        _this3.keysToLeave.splice(_this3.keysToLeave.indexOf(key), 1);
	      }
	      tag.className = tag.className.replace(animatingClassName[isEnter ? 0 : 1], '').trim();
	      delete _this3.isTween[key];
	      _this3.setState({
	        children: children
	      });
	      var _obj = { key: key, type: type };
	      _this3.props.onEnd(_obj);
	    }
	  };
	
	  this.getCoverAnimation = function (child, i, type) {
	    var animation = void 0;
	    var onChange = void 0;
	    animation = type === 'leave' ? _this3.props.leave : _this3.props.enter;
	    if (type === 'appear') {
	      var appear = (0, _util.transformArguments)(_this3.props.appear, child.key, i);
	      animation = appear && _this3.props.enter || null;
	    }
	    onChange = _this3.onChange.bind(_this3, animation, child.key, type);
	    var children = _react2.default.createElement(_TweenOne2.default, (0, _extends3.default)({}, child.props, {
	      willChange: _this3.props.willChange,
	      key: child.key,
	      component: child.type,
	      animation: (0, _util.transformArguments)(animation, child.key, i),
	      onChange: onChange,
	      resetStyleBool: _this3.props.resetStyleBool
	    }));
	    if (_this3.keysToEnter.concat(_this3.keysToLeave).indexOf(child.key) >= 0 || !_this3.onEnterBool && animation) {
	      _this3.isTween[child.key] = type;
	    }
	    return children;
	  };
	
	  this.getChildrenToRender = function (children) {
	    return children.map(function (child, i) {
	      if (!child || !child.key) {
	        return child;
	      }
	      var key = child.key;
	      if (_this3.keysToLeave.indexOf(key) >= 0) {
	        return _this3.getCoverAnimation(child, i, 'leave');
	      } else if (_this3.keysToEnter.indexOf(key) >= 0 || _this3.isTween[child.key] && _this3.keysToLeave.indexOf(key) === -1) {
	        return _this3.getCoverAnimation(child, i, 'enter');
	      } else if (!_this3.onEnterBool) {
	        return _this3.getCoverAnimation(child, i, 'appear');
	      }
	      return _this3.isTween[child.key] && _this3.getCoverAnimation(child, i, _this3.isTween[child.key]) || _react2.default.createElement(_TweenOne2.default, (0, _extends3.default)({}, child.props, { component: child.type, key: child.key }));
	    });
	  };
	};
	
	var objectOrArray = _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.array]);
	var objectOrArrayOrFunc = _react.PropTypes.oneOfType([objectOrArray, _react.PropTypes.func]);
	
	TweenOneGroup.propTypes = {
	  component: _react.PropTypes.any,
	  children: _react.PropTypes.any,
	  style: _react.PropTypes.object,
	  appear: _react.PropTypes.bool,
	  enter: objectOrArrayOrFunc,
	  leave: objectOrArrayOrFunc,
	  animatingClassName: _react.PropTypes.array,
	  onEnd: _react.PropTypes.func,
	  willChange: _react.PropTypes.bool,
	  resetStyleBool: _react.PropTypes.bool
	};
	
	TweenOneGroup.defaultProps = {
	  component: 'div',
	  appear: true,
	  animatingClassName: ['tween-one-entering', 'tween-one-leaving'],
	  enter: { x: 50, opacity: 0, type: 'from' },
	  leave: { x: -50, opacity: 0 },
	  onEnd: noop,
	  willChange: true,
	  resetStyleBool: true
	};
	exports.default = TweenOneGroup;
	module.exports = exports['default'];

/***/ },
/* 102 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ])
});
;
//# sourceMappingURL=rc-tween-one.js.map