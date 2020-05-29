import React, { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { polyfill } from 'react-lifecycles-compat';

import TweenOne from './TweenOne';
import {
  dataToArray,
  toArrayChildren,
  getChildrenFromProps,
  mergeChildren,
  transformArguments,
  findChildInChildrenByKey,
} from './util';

function noop() {}

class TweenOneGroup extends Component {
  static getDerivedStateFromProps(props, { prevProps, $self }) {
    const nextState = {
      prevProps: props,
    };
    if (prevProps && props !== prevProps) {
      const nextChildren = toArrayChildren(props.children);
      if (Object.keys($self.isTween).length && !props.exclusive) {
        $self.animQueue.push(nextChildren);
        return nextState;
      }
      const currentChildren = toArrayChildren($self.currentChildren);
      nextState.children = $self.changeChildren(nextChildren, currentChildren);
    }
    return nextState; // eslint-disable-line
  }

  constructor(props) {
    super(props);
    this.keysToEnter = [];
    this.keysToLeave = [];
    this.saveTweenTag = {};
    this.onEnterBool = false;
    this.animQueue = [];
    this.isTween = {};
    // 第一进入，appear 为 true 时默认用 enter 或 tween-one 上的效果
    const children = toArrayChildren(getChildrenFromProps(this.props));
    this.currentChildren = toArrayChildren(getChildrenFromProps(this.props));
    this.state = {
      children,
      $self: this,
    };
  }

  componentDidMount() {
    this.onEnterBool = true;
  }

  onChange = (animation, key, type, obj) => {
    const length = dataToArray(animation).length;
    const tag = obj.target;
    const classIsSvg = typeof tag.className === 'object' && 'baseVal' in tag.className;
    const isEnter = type === 'enter' || type === 'appear';
    if (obj.mode === 'onStart') {
      if (classIsSvg) {
        tag.className.baseVal = this.setClassName(tag.className.baseVal, isEnter);
      } else {
        tag.className = this.setClassName(tag.className, isEnter);
      }
    } else if (obj.index === length - 1 && obj.mode === 'onComplete') {
      delete this.isTween[key];
      if (classIsSvg) {
        tag.className.baseVal = tag.className.baseVal
          .replace(this.props.animatingClassName[isEnter ? 0 : 1], '')
          .trim();
      } else {
        tag.className = tag.className
          .replace(this.props.animatingClassName[isEnter ? 0 : 1], '')
          .trim();
      }
      if (type === 'enter') {
        this.keysToEnter.splice(this.keysToEnter.indexOf(key), 1);
        if (!this.keysToEnter.length) {
          this.reAnimQueue();
        }
      } else if (type === 'leave') {
        this.keysToLeave.splice(this.keysToLeave.indexOf(key), 1);
        this.currentChildren = this.currentChildren.filter(child => key !== child.key);
        if (!this.keysToLeave.length) {
          const currentChildrenKeys = this.currentChildren.map(item => item.key);
          Object.keys(this.saveTweenTag).forEach($key => {
            if (currentChildrenKeys.indexOf($key) === -1) {
              delete this.saveTweenTag[$key];
            }
          });
          this.setState(
            {
              children: this.currentChildren,
            },
            this.reAnimQueue,
          );
        }
      }
      const _obj = { key, type };
      this.props.onEnd(_obj);
    }
  };

  setClassName = (name, isEnter) => {
    let className = name.replace(this.props.animatingClassName[isEnter ? 1 : 0], '').trim();
    if (className.indexOf(this.props.animatingClassName[isEnter ? 0 : 1]) === -1) {
      className = `${className} ${this.props.animatingClassName[isEnter ? 0 : 1]}`.trim();
    }
    return className;
  };

  getTweenChild = (child, props = {}) => {
    const key = child.key;
    this.saveTweenTag[key] = React.createElement(
      TweenOne,
      {
        ...props,
        key,
        component: null,
      },
      child,
    );
    return this.saveTweenTag[key];
  };

  getCoverAnimation = (child, i, type) => {
    let animation;
    animation = type === 'leave' ? this.props.leave : this.props.enter;
    if (type === 'appear') {
      const appear = transformArguments(this.props.appear, child.key, i);
      animation = (appear && this.props.enter) || null;
    }
    const animate = transformArguments(animation, child.key, i);
    const onChange = this.onChange.bind(this, animate, child.key, type);
    const props = {
      key: child.key,
      animation: animate,
      onChange,
      resetStyle: this.props.resetStyle,
    };
    if (
      this.keysToEnter.concat(this.keysToLeave).indexOf(child.key) >= 0 ||
      (!this.onEnterBool && animation)
    ) {
      if (!this.saveTweenTag[child.key]) {
        this.isTween[child.key] = type;
      }
    }
    const children = this.getTweenChild(child, props);
    return children;
  };

  getChildrenToRender = children => {
    return children.map((child, i) => {
      if (!child || !child.key) {
        return child;
      }
      const key = child.key;
      if (this.keysToLeave.indexOf(key) >= 0) {
        return this.getCoverAnimation(child, i, 'leave');
      } else if (
        (this.keysToEnter.indexOf(key) >= 0 ||
          (this.isTween[key] && this.keysToLeave.indexOf(key) === -1)) &&
        !(this.isTween[key] === 'enter' && this.saveTweenTag[key])
      ) {
        /**
         * 1. 在 key 在 enter 里。
         * 2. 出场未结束，触发进场, this.isTween[key] 为 leave, key 在 enter 里。
         * 3. 状态为 enter 且 tweenTag 里有值时，不执行重载动画属性，直接调用 tweenTag 里的。
         */
        return this.getCoverAnimation(child, i, 'enter');
      } else if (!this.onEnterBool) {
        return this.getCoverAnimation(child, i, 'appear');
      }
      return this.saveTweenTag[key];
    });
  };

  reAnimQueue = () => {
    if (!Object.keys(this.isTween).length && this.animQueue.length) {
      const children = this.changeChildren(
        this.animQueue[this.animQueue.length - 1],
        this.state.children,
      );
      this.setState({
        children,
      });
      this.animQueue = [];
    }
  };

  changeChildren(nextChildren, currentChildren) {
    const newChildren = mergeChildren(currentChildren, nextChildren);
    this.keysToEnter = [];
    this.keysToLeave = [];
    nextChildren.forEach(c => {
      if (!c) {
        return;
      }
      const key = c.key;
      const hasPrev = findChildInChildrenByKey(currentChildren, key);
      // 如果当前 key 已存在 saveTweenTag 里，，刷新 child;
      if (this.saveTweenTag[key]) {
        this.saveTweenTag[key] = React.cloneElement(this.saveTweenTag[key], {}, c);
      }
      if (!hasPrev && key) {
        this.keysToEnter.push(key);
      }
    });

    currentChildren.forEach(c => {
      if (!c) {
        return;
      }
      const key = c.key;
      const hasNext = findChildInChildrenByKey(nextChildren, key);
      if (!hasNext && key) {
        this.keysToLeave.push(key);
        delete this.saveTweenTag[key];
      }
    });
    return newChildren;
  }

  render() {
    const { children } = this.state;
    // fix in strict mode https://github.com/ant-design/ant-motion/issues/323;
    this.currentChildren = children;
    const childrenToRender = this.getChildrenToRender(children);
    const {
      component,
      componentProps,
      appear,
      enter,
      leave,
      animatingClassName,
      onEnd,
      exclusive,
      resetStyle,
      ...props
    } = this.props;
    if (!component) {
      return childrenToRender[0] || null;
    }
    return createElement(component, { ...props, ...componentProps }, childrenToRender);
  }
}

TweenOneGroup.propTypes = {
  component: PropTypes.any,
  componentProps: PropTypes.object,
  children: PropTypes.any,
  style: PropTypes.object,
  appear: PropTypes.bool,
  enter: PropTypes.any,
  leave: PropTypes.any,
  animatingClassName: PropTypes.array,
  onEnd: PropTypes.func,
  resetStyle: PropTypes.bool,
  exclusive: PropTypes.bool,
};

TweenOneGroup.defaultProps = {
  component: 'div',
  componentProps: {},
  appear: true,
  animatingClassName: ['tween-one-entering', 'tween-one-leaving'],
  enter: { x: 50, opacity: 0, type: 'from' },
  leave: { x: -50, opacity: 0 },
  onEnd: noop,
  resetStyle: true,
  exclusive: false,
};
TweenOneGroup.isTweenOneGroup = true;
export default polyfill(TweenOneGroup);
