import React, { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import TweenOne from './TweenOne';
import {
  dataToArray,
  toArrayChildren,
  getChildrenFromProps,
  mergeChildren,
  transformArguments,
  findChildInChildrenByKey,
} from './util';

function noop() {
}

class TweenOneGroup extends Component {
  constructor() {
    super(...arguments);
    this.keysToEnter = [];
    this.keysToLeave = [];
    this.saveTweenTag = {};
    this.onEnterBool = false;
    this.isTween = {};
    // 第一进入，appear 为 true 时默认用 enter 或 tween-one 上的效果
    const children = toArrayChildren(getChildrenFromProps(this.props));
    this.state = {
      children,
    };
  }

  componentDidMount() {
    this.onEnterBool = true;
  }

  componentWillReceiveProps(nextProps) {
    const nextChildren = toArrayChildren(nextProps.children);
    const currentChildren = toArrayChildren(this.state.children);
    const newChildren = mergeChildren(currentChildren, nextChildren);

    this.keysToEnter = [];
    this.keysToLeave = [];
    nextChildren.forEach((c) => {
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

    currentChildren.forEach((c) => {
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
    this.setState({
      children: newChildren,
    });
  }

  onChange = (animation, key, type, obj) => {
    const length = dataToArray(animation).length;
    const animatingClassName = this.props.animatingClassName;
    const tag = obj.target;
    const isEnter = type === 'enter' || type === 'appear';
    if (obj.mode === 'onStart') {
      tag.className = tag.className
        .replace(animatingClassName[isEnter ? 1 : 0], '').trim();
      if (tag.className.indexOf(animatingClassName[isEnter ? 0 : 1]) === -1) {
        tag.className = `${tag.className} ${animatingClassName[isEnter ? 0 : 1]}`.trim();
      }
    } else if (obj.index === length - 1 && obj.mode === 'onComplete') {
      if (type === 'enter') {
        this.keysToEnter.splice(this.keysToEnter.indexOf(key), 1);
      } else if (type === 'leave') {
        const children = this.state.children.filter(child => key !== child.key);
        this.keysToLeave.splice(this.keysToLeave.indexOf(key), 1);
        delete this.saveTweenTag[key];
        this.setState({
          children,
        });
      }
      tag.className = tag.className
        .replace(animatingClassName[isEnter ? 0 : 1], '').trim();
      delete this.isTween[key];
      const _obj = { key, type };
      this.props.onEnd(_obj);
    }
  }

  getTweenChild = (child, props = {}) => {
    const key = child.key;
    this.saveTweenTag[key] = React.createElement(TweenOne, {
      ...props,
      key,
      component: null,
    }, child);
    return this.saveTweenTag[key];
  }

  getCoverAnimation = (child, i, type) => {
    let animation;
    let onChange;
    animation = type === 'leave' ? this.props.leave : this.props.enter;
    if (type === 'appear') {
      const appear = transformArguments(this.props.appear, child.key, i);
      animation = appear && this.props.enter || null;
    }
    onChange = this.onChange.bind(this, animation, child.key, type);
    const animate = transformArguments(animation, child.key, i);
    const props = {
      willChange: this.props.willChange,
      key: child.key,
      animation: animate,
      onChange,
      resetStyleBool: this.props.resetStyleBool,
    };
    const children = this.getTweenChild(child, props);
    if (this.keysToEnter.concat(this.keysToLeave).indexOf(child.key) >= 0
      || !this.onEnterBool && animation) {
      this.isTween[child.key] = type;
    }
    return children;
  }

  getChildrenToRender = children => {
    return children.map((child, i) => {
      const key = child.key;
      if (!child || !key) {
        return child;
      }

      if (this.keysToLeave.indexOf(key) >= 0) {
        return this.getCoverAnimation(child, i, 'leave');
      } else if ((this.keysToEnter.indexOf(key) >= 0) ||
        (this.isTween[key] && this.keysToLeave.indexOf(key) === -1)) {
        return this.getCoverAnimation(child, i, 'enter');
      } else if (!this.onEnterBool) {
        return this.getCoverAnimation(child, i, 'appear');
      }
      return this.saveTweenTag[key];
    });
  }

  render() {
    const childrenToRender = this.getChildrenToRender(this.state.children);
    if (!this.props.component) {
      return childrenToRender[0] || null;
    }
    const componentProps = { ...this.props };
    [
      'component',
      'appear',
      'enter',
      'leave',
      'animatingClassName',
      'onEnd',
      'resetStyleBool',
      'willChange',
    ].forEach(key => delete componentProps[key]);
    return createElement(this.props.component, componentProps, childrenToRender);
  }
}

TweenOneGroup.propTypes = {
  component: PropTypes.any,
  children: PropTypes.any,
  style: PropTypes.object,
  appear: PropTypes.bool,
  enter: PropTypes.any,
  leave: PropTypes.any,
  animatingClassName: PropTypes.array,
  onEnd: PropTypes.func,
  willChange: PropTypes.bool,
  resetStyleBool: PropTypes.bool,
};

TweenOneGroup.defaultProps = {
  component: 'div',
  appear: true,
  animatingClassName: ['tween-one-entering', 'tween-one-leaving'],
  enter: { x: 50, opacity: 0, type: 'from' },
  leave: { x: -50, opacity: 0 },
  onEnd: noop,
  willChange: true,
  resetStyleBool: true,
};
TweenOneGroup.isTweenOneGroup = true;
export default TweenOneGroup;
