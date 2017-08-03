webpackJsonp([10],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(296);


/***/ }),

/***/ 296:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(3);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(72);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _rcTweenOne = __webpack_require__(80);
	
	var _react = __webpack_require__(88);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(126);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rcQueueAnim = __webpack_require__(297);
	
	var _rcQueueAnim2 = _interopRequireDefault(_rcQueueAnim);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Demo = function (_React$Component) {
	  (0, _inherits3.default)(Demo, _React$Component);
	
	  function Demo() {
	    (0, _classCallCheck3.default)(this, Demo);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));
	
	    _this.state = {
	      children: [_react2.default.createElement(
	        _rcQueueAnim2.default,
	        {
	          style: {
	            opacity: 1,
	            backgroundColor: '#000fff',
	            float: 'left',
	            height: 200,
	            width: 100
	          },
	          key: 'aa',
	          delay: 1000
	        },
	        _react2.default.createElement(
	          'div',
	          { key: '1' },
	          '\u6267\u884C\u52A8\u6548'
	        ),
	        _react2.default.createElement(
	          'div',
	          { key: '2' },
	          '\u6267\u884C\u52A8\u6548'
	        )
	      ), _react2.default.createElement(
	        'div',
	        { key: 'a',
	          style: {
	            opacity: 1,
	            backgroundColor: '#000',
	            float: 'left',
	            height: 200
	          }
	        },
	        _react2.default.createElement(
	          'div',
	          null,
	          '\u6267\u884C\u52A8\u6548'
	        )
	      )]
	    };
	    ['onClick', 'enterType', 'onEnd'].forEach(function (method) {
	      return _this[method] = _this[method].bind(_this);
	    });
	    return _this;
	  }
	
	  Demo.prototype.onClick = function onClick() {
	    var children = !this.state.children ? [_react2.default.createElement(
	      _rcQueueAnim2.default,
	      {
	        style: {
	          opacity: 1,
	          backgroundColor: '#000fff',
	          float: 'left',
	          height: 200,
	          width: 100
	        },
	        key: 'aa',
	        delay: 1000
	      },
	      _react2.default.createElement(
	        'div',
	        { key: '1' },
	        '\u6267\u884C\u52A8\u6548'
	      ),
	      _react2.default.createElement(
	        'div',
	        { key: '2' },
	        '\u6267\u884C\u52A8\u6548'
	      )
	    ), _react2.default.createElement(
	      'div',
	      { key: 'a',
	        style: {
	          opacity: 1,
	          backgroundColor: '#000',
	          float: 'left',
	          height: 200
	        }
	      },
	      _react2.default.createElement(
	        'div',
	        null,
	        '\u6267\u884C\u52A8\u6548'
	      )
	    )] : null;
	    this.setState({
	      children: children
	    });
	  };
	
	  Demo.prototype.onEnd = function onEnd(e) {
	    console.log(e); // eslint-disable-line no-console
	  };
	
	  Demo.prototype.enterType = function enterType(e) {
	    if (e.key === 'a') {
	      return { x: 100, opacity: 0, type: 'from' };
	    }
	    return { y: 80, opacity: 0, type: 'from' };
	  };
	
	  Demo.prototype.render = function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'button',
	        { onClick: this.onClick },
	        '\u5207\u6362'
	      ),
	      _react2.default.createElement(
	        _rcTweenOne.TweenOneGroup,
	        {
	          style: { height: 300 },
	          enter: this.enterType,
	          leave: [{ y: 90 }, { x: 100, opacity: 0 }],
	          onEnd: this.onEnd
	        },
	        this.state.children
	      )
	    );
	  };
	
	  return Demo;
	}(_react2.default.Component);
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }),

/***/ 297:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _QueueAnim = __webpack_require__(298);
	
	var _QueueAnim2 = _interopRequireDefault(_QueueAnim);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	_QueueAnim2["default"].isQueueAnim = true; // export this package's api
	exports["default"] = _QueueAnim2["default"];
	module.exports = exports['default'];

/***/ }),

/***/ 298:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(83);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(299);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _toConsumableArray2 = __webpack_require__(300);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(3);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(72);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(88);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(124);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _rcTweenOne = __webpack_require__(80);
	
	var _rcTweenOne2 = _interopRequireDefault(_rcTweenOne);
	
	var _utils = __webpack_require__(310);
	
	var _animTypes = __webpack_require__(311);
	
	var _animTypes2 = _interopRequireDefault(_animTypes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var noop = function noop() {};
	
	var typeDefault = ['displayName', 'propTypes', 'getDefaultProps', 'defaultProps'];
	
	var QueueAnim = function (_React$Component) {
	  (0, _inherits3["default"])(QueueAnim, _React$Component);
	
	  function QueueAnim(props) {
	    (0, _classCallCheck3["default"])(this, QueueAnim);
	
	    var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call(this, props));
	
	    _initialiseProps.call(_this);
	
	    _this.oneEnter = false;
	    _this.tweenKeyType = {};
	    _this.keysToEnter = [];
	    _this.keysToLeave = [];
	    _this.saveTweenAnim = {};
	    _this.keysToEnterPaused = {};
	    _this.placeholderTimeoutIds = {};
	    // 第一次进入，默认进场
	    var children = (0, _utils.toArrayChildren)((0, _utils.getChildrenFromProps)(props));
	    var childrenShow = {};
	    children.forEach(function (child) {
	      if (!child || !child.key) {
	        return;
	      }
	      if (_this.props.appear) {
	        _this.keysToEnter.push(child.key);
	      } else {
	        childrenShow[child.key] = true;
	      }
	    });
	    _this.keysToEnterToCallback = [].concat((0, _toConsumableArray3["default"])(_this.keysToEnter));
	    _this.originalChildren = (0, _utils.toArrayChildren)((0, _utils.getChildrenFromProps)(props));
	    _this.state = {
	      children: children,
	      childrenShow: childrenShow
	    };
	    return _this;
	  }
	
	  QueueAnim.prototype.componentDidMount = function componentDidMount() {
	    if (this.props.appear) {
	      this.componentDidUpdate();
	    }
	    this.oneEnter = true;
	  };
	
	  QueueAnim.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    var _this2 = this;
	
	    var nextChildren = (0, _utils.toArrayChildren)(nextProps.children);
	    var currentChildren = this.originalChildren;
	    if (!nextChildren.length && !currentChildren.length && this.state.children.length) {
	      /**
	       * 多次刷新空子级处理
	       * 如果 state.children 里还有元素，元素还在动画，当前子级设回 state.children;
	       */
	      currentChildren = this.state.children;
	    }
	    var newChildren = (0, _utils.mergeChildren)(currentChildren, nextChildren);
	
	    var childrenShow = !newChildren.length ? {} : this.state.childrenShow;
	    this.keysToEnterPaused = {};
	    // 在出场没结束时，childrenShow 里的值将不会清除。再触发进场时， childrenShow 里的值是保留着的, 设置了 enterForcedRePlay 将重新播放进场。
	    this.keysToLeave.forEach(function (key) {
	      // 将所有在出场里的停止掉。避免间隔性出现
	      _this2.keysToEnterPaused[key] = true;
	      if (nextProps.enterForcedRePlay) {
	        // 清掉所有出场的。
	        delete childrenShow[key];
	      }
	    });
	
	    this.keysToEnter = [];
	    this.keysToLeave = [];
	
	    // need render to avoid update
	    this.setState({
	      childrenShow: childrenShow,
	      children: newChildren
	    });
	
	    nextChildren.forEach(function (c) {
	      if (!c) {
	        return;
	      }
	      var key = c.key;
	      var hasPrev = (0, _utils.findChildInChildrenByKey)(currentChildren, key);
	      if (!hasPrev && key) {
	        _this2.keysToEnter.push(key);
	      }
	    });
	
	    currentChildren.forEach(function (c) {
	      if (!c) {
	        return;
	      }
	      var key = c.key;
	      var hasNext = (0, _utils.findChildInChildrenByKey)(nextChildren, key);
	      if (!hasNext && key) {
	        _this2.keysToLeave.push(key);
	      }
	    });
	    this.keysToEnterToCallback = [].concat((0, _toConsumableArray3["default"])(this.keysToEnter));
	  };
	
	  QueueAnim.prototype.componentDidUpdate = function componentDidUpdate() {
	    this.originalChildren = (0, _utils.toArrayChildren)((0, _utils.getChildrenFromProps)(this.props));
	    var keysToEnter = [].concat((0, _toConsumableArray3["default"])(this.keysToEnter));
	    var keysToLeave = [].concat((0, _toConsumableArray3["default"])(this.keysToLeave));
	    keysToEnter.forEach(this.performEnter);
	    keysToLeave.forEach(this.performLeave);
	  };
	
	  QueueAnim.prototype.componentWillUnmount = function componentWillUnmount() {
	    var _this3 = this;
	
	    Object.keys(this.placeholderTimeoutIds).forEach(function (key) {
	      _rcTweenOne.ticker.clear(_this3.placeholderTimeoutIds[key]);
	    });
	    this.keysToEnter = [];
	    this.keysToLeave = [];
	  };
	
	  QueueAnim.prototype.getTweenType = function getTweenType(type, num) {
	    var data = _animTypes2["default"][type];
	    return this.getTweenAnimConfig(data, num);
	  };
	
	  QueueAnim.prototype.getTweenSingleConfig = function getTweenSingleConfig(data, num, enterOrLeave) {
	    var obj = {};
	    Object.keys(data).forEach(function (key) {
	      if (Array.isArray(data[key])) {
	        obj[key] = data[key][num];
	      } else if (!enterOrLeave && !num || enterOrLeave && num) {
	        obj[key] = data[key];
	      }
	    });
	    return obj;
	  };
	
	  QueueAnim.prototype.getTweenAnimConfig = function getTweenAnimConfig(data, num, enterOrLeave) {
	    var _this4 = this;
	
	    if (Array.isArray(data)) {
	      return data.map(function (item) {
	        return _this4.getTweenSingleConfig(item, num, enterOrLeave);
	      });
	    }
	    return this.getTweenSingleConfig(data, num, enterOrLeave);
	  };
	
	  QueueAnim.prototype.render = function render() {
	    var tagProps = (0, _objectWithoutProperties3["default"])(this.props, []);
	
	    ['component', 'componentProps', 'interval', 'duration', 'delay', 'type', 'animConfig', 'ease', 'leaveReverse', 'animatingClassName', 'enterForcedRePlay', 'onEnd', 'appear'].forEach(function (key) {
	      return delete tagProps[key];
	    });
	    var childrenToRender = (0, _utils.toArrayChildren)(this.state.children).map(this.getChildrenToRender);
	    var props = (0, _extends3["default"])({}, tagProps, this.props.componentProps);
	    return (0, _react.createElement)(this.props.component, props, childrenToRender);
	  };
	
	  return QueueAnim;
	}(_react2["default"].Component);
	
	QueueAnim.propTypes = {
	  component: _propTypes2["default"].any,
	  componentProps: _propTypes2["default"].object,
	  interval: _propTypes2["default"].any,
	  duration: _propTypes2["default"].any,
	  delay: _propTypes2["default"].any,
	  type: _propTypes2["default"].any,
	  animConfig: _propTypes2["default"].any,
	  ease: _propTypes2["default"].any,
	  leaveReverse: _propTypes2["default"].bool,
	  enterForcedRePlay: _propTypes2["default"].bool,
	  animatingClassName: _propTypes2["default"].array,
	  onEnd: _propTypes2["default"].func,
	  appear: _propTypes2["default"].bool
	};
	QueueAnim.defaultProps = {
	  component: 'div',
	  componentProps: {},
	  interval: 100,
	  duration: 450,
	  delay: 0,
	  type: 'right',
	  animConfig: null,
	  ease: 'easeOutQuart',
	  leaveReverse: false,
	  enterForcedRePlay: false,
	  animatingClassName: ['queue-anim-entering', 'queue-anim-leaving'],
	  onEnd: noop,
	  appear: true
	};
	
	var _initialiseProps = function _initialiseProps() {
	  var _this5 = this;
	
	  this.getTweenData = function (key, i, type) {
	    var props = _this5.props;
	    var enterOrLeave = type === 'enter' ? 0 : 1;
	    var start = type === 'enter' ? 1 : 0;
	    var end = type === 'enter' ? 0 : 1;
	    var startAnim = _this5.getAnimData(props, key, i, enterOrLeave, start);
	    var animate = _this5.getAnimData(props, key, i, enterOrLeave, end);
	    /**
	     * 如果 this.tweenKeyType[key] 为空时，为第一次触发，需要设置开始。
	     * 如果 this.tweenKeyType[key] 有值时，说明正在动画，此时切换不需要开始。
	     */
	    startAnim = props.enterForcedRePlay || !_this5.tweenKeyType[key] || !_this5.saveTweenAnim[key] ? startAnim : {};
	    var ease = (0, _utils.transformArguments)(props.ease, key, i)[enterOrLeave];
	    var duration = (0, _utils.transformArguments)(props.duration, key, i)[enterOrLeave];
	    if (Array.isArray(ease)) {
	      ease = ease.map(function (num) {
	        return num * 100;
	      });
	      ease = _rcTweenOne2["default"].easing.path('M0,100C' + ease[0] + ',' + (100 - ease[1]) + ',' + ease[2] + ',' + (100 - ease[3]) + ',100,0', { lengthPixel: duration / 16.6667 });
	    }
	    return { startAnim: startAnim, animate: animate, ease: ease, duration: duration, isArray: Array.isArray(animate) };
	  };
	
	  this.getTweenSingleData = function (key, startAnim, animate, ease, duration, delay, onStart, onComplete) {
	    var startLength = Object.keys(startAnim || {}).length;
	    var animation = (0, _extends3["default"])({
	      onStart: onStart,
	      onComplete: onComplete,
	      duration: duration,
	      delay: delay,
	      ease: ease
	    }, animate);
	    var startAnimate = startLength ? (0, _extends3["default"])({ duration: 0 }, startAnim) : null;
	    return { animation: animation, startAnimate: startAnimate };
	  };
	
	  this.getTweenEnterOrLeaveData = function (key, i, delay, type) {
	    var animateData = _this5.getTweenData(key, i, type);
	    var startAnim = animateData.startAnim;
	    var animate = animateData.animate;
	    var onStart = (type === 'enter' ? _this5.enterBegin : _this5.leaveBegin).bind(_this5, key);
	    var onComplete = (type === 'enter' ? _this5.enterComplete : _this5.leaveComplete).bind(_this5, key);
	    if (animateData.isArray) {
	      var length = animate.length - 1;
	      var animation = [];
	      var startArray = [];
	      animate.forEach(function (leave, ii) {
	        var start = startAnim[ii];
	        var animObj = _this5.getTweenSingleData(key, start, leave, animateData.ease, animateData.duration / length, !ii ? delay : 0, !ii ? onStart : null, ii === length ? onComplete : null);
	        animation.push(animObj.animation);
	        if (animObj.startAnimate) {
	          startArray.push(animObj.startAnimate);
	        }
	      });
	      return startArray.concat(animation);
	    }
	    animateData = _this5.getTweenSingleData(key, startAnim, animate, animateData.ease, animateData.duration, delay, onStart, onComplete);
	    return [animateData.startAnimate, animateData.animation].filter(function (item) {
	      return item;
	    });
	  };
	
	  this.getTweenAppearData = function (key, i) {
	    return (0, _extends3["default"])({}, _this5.getAnimData(_this5.props, key, i, 0, 0), {
	      duration: 0
	    });
	  };
	
	  this.getAnimData = function (props, key, i, enterOrLeave, startOrEnd) {
	    /**
	     * transformArguments 第一个为 enter, 第二个为 leave；
	     * getTweenAnimConfig or getTweenType 第一个为到达的位置， 第二个为开始的位置。
	     * 用 tween-one 的数组来实现老的动画逻辑。。。
	     */
	    return props.animConfig ? _this5.getTweenAnimConfig((0, _utils.transformArguments)(props.animConfig, key, i)[enterOrLeave], startOrEnd, enterOrLeave) : _this5.getTweenType((0, _utils.transformArguments)(props.type, key, i)[enterOrLeave], startOrEnd);
	  };
	
	  this.getChildrenToRender = function (child) {
	    if (!child || !child.key) {
	      return child;
	    }
	    var key = child.key;
	    var i = _this5.keysToLeave.indexOf(key);
	    if (i >= 0 && _this5.state.childrenShow[key] || _this5.state.childrenShow[key]) {
	      var animation = void 0;
	      if (i >= 0) {
	        if (_this5.tweenKeyType[key] === 'leave' && _this5.saveTweenAnim[key]) {
	          animation = _this5.saveTweenAnim[key];
	        } else {
	          var interval = (0, _utils.transformArguments)(_this5.props.interval, key, i)[1];
	          var delay = (0, _utils.transformArguments)(_this5.props.delay, key, i)[1];
	          var order = _this5.props.leaveReverse ? _this5.keysToLeave.length - i - 1 : i;
	          delay = interval * order + delay;
	          animation = _this5.getTweenEnterOrLeaveData(key, i, delay, 'leave');
	          _this5.saveTweenAnim[key] = animation;
	        }
	      } else {
	        i = _this5.keysToEnterToCallback.indexOf(key);
	        if (!_this5.oneEnter && !_this5.props.appear) {
	          animation = _this5.getTweenAppearData(key, i);
	        } else if (_this5.tweenKeyType[key] === 'enter' && _this5.saveTweenAnim[key]) {
	          animation = _this5.saveTweenAnim[key];
	        } else {
	          animation = _this5.getTweenEnterOrLeaveData(key, i, 0, 'enter');
	          _this5.saveTweenAnim[key] = animation;
	        }
	      }
	      var paused = _this5.keysToEnterPaused[key] && !(_this5.keysToLeave.indexOf(key) >= 0 && _this5.state.childrenShow[key]);
	      animation = paused ? null : animation;
	      var isFunc = typeof child.type === 'function';
	      var forcedJudg = isFunc ? {} : null;
	      if (isFunc) {
	        Object.keys(child.type).forEach(function (name) {
	          if (typeDefault.indexOf(name) === -1) {
	            forcedJudg[name] = child.type[name];
	          }
	        });
	      }
	      return (0, _react.createElement)(_rcTweenOne2["default"], { key: key, component: child.type, componentProps: child.props, forcedJudg: forcedJudg, animation: animation });
	    }
	    return null;
	  };
	
	  this.performEnter = function (key, i) {
	    var interval = (0, _utils.transformArguments)(_this5.props.interval, key, i)[0];
	    var delay = (0, _utils.transformArguments)(_this5.props.delay, key, i)[0];
	    _this5.placeholderTimeoutIds[key] = _rcTweenOne.ticker.timeout(_this5.performEnterBegin.bind(_this5, key), interval * i + delay);
	    if (_this5.keysToEnter.indexOf(key) >= 0) {
	      _this5.keysToEnter.splice(_this5.keysToEnter.indexOf(key), 1);
	    }
	    _this5.tweenKeyType[key] = 'enter';
	  };
	
	  this.performEnterBegin = function (key) {
	    var childrenShow = _this5.state.childrenShow;
	    childrenShow[key] = true;
	    delete _this5.keysToEnterPaused[key];
	    _rcTweenOne.ticker.clear(_this5.placeholderTimeoutIds[key]);
	    delete _this5.placeholderTimeoutIds[key];
	    _this5.setState({ childrenShow: childrenShow });
	  };
	
	  this.performLeave = function (key) {
	    _rcTweenOne.ticker.clear(_this5.placeholderTimeoutIds[key]);
	    delete _this5.placeholderTimeoutIds[key];
	    _this5.tweenKeyType[key] = 'leave';
	  };
	
	  this.enterBegin = function (key, e) {
	    var elem = e.target;
	    var animatingClassName = _this5.props.animatingClassName;
	    elem.className = elem.className.replace(animatingClassName[1], '');
	    if (elem.className.indexOf(animatingClassName[0]) === -1) {
	      elem.className += '' + (elem.className ? ' ' : '') + animatingClassName[0];
	    }
	  };
	
	  this.enterComplete = function (key, e) {
	    if (_this5.keysToEnterPaused[key]) {
	      return;
	    }
	    var elem = e.target;
	    elem.className = elem.className.replace(_this5.props.animatingClassName[0], '').trim();
	    _this5.props.onEnd({ key: key, type: 'enter' });
	    delete _this5.tweenKeyType[key];
	  };
	
	  this.leaveBegin = function (key, e) {
	    var elem = e.target;
	    var animatingClassName = _this5.props.animatingClassName;
	    elem.className = elem.className.replace(animatingClassName[0], '');
	    if (elem.className.indexOf(animatingClassName[1]) === -1) {
	      elem.className += ' ' + animatingClassName[1];
	    }
	  };
	
	  this.leaveComplete = function (key, e) {
	    // 切换时同时触发 onComplete。 手动跳出。。。
	    if (_this5.keysToEnterToCallback.indexOf(key) >= 0) {
	      return;
	    }
	    var childrenShow = _this5.state.childrenShow;
	    delete childrenShow[key];
	    if (_this5.keysToLeave.indexOf(key) >= 0) {
	      _this5.keysToLeave.splice(_this5.keysToLeave.indexOf(key), 1);
	      delete _this5.saveTweenAnim[key];
	      delete _this5.tweenKeyType[key];
	    }
	    var needLeave = _this5.keysToLeave.some(function (c) {
	      return childrenShow[c];
	    });
	    if (!needLeave) {
	      var currentChildren = (0, _utils.toArrayChildren)((0, _utils.getChildrenFromProps)(_this5.props));
	      _this5.setState({
	        children: currentChildren,
	        childrenShow: childrenShow
	      });
	    }
	    var elem = e.target;
	    elem.className = elem.className.replace(_this5.props.animatingClassName[1], '').trim();
	    _this5.props.onEnd({ key: key, type: 'leave' });
	  };
	};
	
	exports["default"] = QueueAnim;
	module.exports = exports['default'];

/***/ }),

/***/ 299:
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

/***/ 300:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _from = __webpack_require__(301);
	
	var _from2 = _interopRequireDefault(_from);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }
	
	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};

/***/ }),

/***/ 301:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(302), __esModule: true };

/***/ }),

/***/ 302:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(7);
	__webpack_require__(303);
	module.exports = __webpack_require__(15).Array.from;

/***/ }),

/***/ 303:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(16)
	  , $export        = __webpack_require__(13)
	  , toObject       = __webpack_require__(50)
	  , call           = __webpack_require__(304)
	  , isArrayIter    = __webpack_require__(305)
	  , toLength       = __webpack_require__(40)
	  , createProperty = __webpack_require__(306)
	  , getIterFn      = __webpack_require__(307);
	
	$export($export.S + $export.F * !__webpack_require__(309)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ }),

/***/ 304:
/***/ (function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(20);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ }),

/***/ 305:
/***/ (function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(30)
	  , ITERATOR   = __webpack_require__(48)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ }),

/***/ 306:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(19)
	  , createDesc      = __webpack_require__(27);
	
	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ }),

/***/ 307:
/***/ (function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(308)
	  , ITERATOR  = __webpack_require__(48)('iterator')
	  , Iterators = __webpack_require__(30);
	module.exports = __webpack_require__(15).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ }),

/***/ 308:
/***/ (function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(38)
	  , TAG = __webpack_require__(48)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ }),

/***/ 309:
/***/ (function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(48)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ }),

/***/ 310:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.toArrayChildren = toArrayChildren;
	exports.findChildInChildrenByKey = findChildInChildrenByKey;
	exports.mergeChildren = mergeChildren;
	exports.transformArguments = transformArguments;
	exports.getChildrenFromProps = getChildrenFromProps;
	
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
	  if (Array.isArray(result)) {
	    if (result.length === 2) {
	      return result;
	    }
	    return [result[0], result[0]];
	  }
	  return [result, result];
	}
	
	function getChildrenFromProps(props) {
	  return props && props.children;
	}

/***/ }),

/***/ 311:
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = {
	  left: {
	    opacity: [1, 0],
	    translateX: [0, -30]
	  },
	  top: {
	    opacity: [1, 0],
	    translateY: [0, -30]
	  },
	  right: {
	    opacity: [1, 0],
	    translateX: [0, 30]
	  },
	  bottom: {
	    opacity: [1, 0],
	    translateY: [0, 30]
	  },
	  alpha: {
	    opacity: [1, 0]
	  },
	  scale: {
	    opacity: [1, 0],
	    scale: [1, 0]
	  },
	  scaleBig: {
	    opacity: [1, 0],
	    scale: [1, 2]
	  },
	  scaleX: {
	    opacity: [1, 0],
	    scaleX: [1, 0]
	  },
	  scaleY: {
	    opacity: [1, 0],
	    scaleY: [1, 0]
	  }
	};
	module.exports = exports['default'];

/***/ })

});
//# sourceMappingURL=group.js.map