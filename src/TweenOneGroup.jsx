import React, { PropTypes, Component, createElement } from 'react';
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
    this.onEnterBool = false;
    this.isTween = {};
    // 第一进入，appear 为 true 时默认用 enter 或 tween-one 上的效果
    const children = toArrayChildren(getChildrenFromProps(this.props));
    children.forEach(child => {
      if (!child || !child.key) {
        return;
      }
      this.keysToEnter.push(child.key);
    });
    this.state = {
      children,
    };
    [
      'getChildrenToRender',
      'getCoverAnimation',
      'onChange',
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  componentDidMount() {
    this.onEnterBool = true;
  }

  componentWillReceiveProps(nextProps) {
    const nextChildren = toArrayChildren(nextProps.children);
    const currentChildren = this.state.children;
    const newChildren = mergeChildren(currentChildren, nextChildren);

    this.keysToEnter = [];
    this.keysToLeave = [];
    nextChildren.forEach((c) => {
      if (!c) {
        return;
      }
      const key = c.key;
      const hasPrev = findChildInChildrenByKey(currentChildren, key);
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
      }
    });
    this.setState({
      children: newChildren,
    });
  }

  onChange(animation, key, type, obj) {
    const length = dataToArray(animation).length;
    const animatingClassName = this.props.animatingClassName;
    const tag = obj.target;
    if (obj.mode === 'onStart') {
      tag.className = tag.className
        .replace(animatingClassName[type === 'enter' ? 1 : 0], '').trim();
      if (tag.className.indexOf(animatingClassName[type === 'enter' ? 0 : 1]) === -1) {
        tag.className = `${tag.className} ${animatingClassName[type === 'enter' ? 0 : 1]}`.trim();
      }
    } else if (obj.index === length - 1 && obj.mode === 'onComplete') {
      let children;
      if (type === 'enter') {
        children = this.state.children;
        this.keysToEnter.splice(this.keysToEnter.indexOf(key), 1);
      } else {
        children = this.state.children.filter(child => key !== child.key);
        this.keysToLeave.splice(this.keysToLeave.indexOf(key), 1);
      }
      tag.className = tag.className
        .replace(animatingClassName[type === 'enter' ? 0 : 1], '').trim();
      this.setState({
        children,
      });
      const _obj = { key, type };
      delete this.isTween[key];
      this.props.onEnd(_obj);
    }
  }

  getCoverAnimation(child, i, type) {
    let animation;
    let onChange;
    const appear = transformArguments(this.props.appear, child.key, i);
    if (appear || this.onEnterBool) {
      animation = type === 'leave' ? this.props.leave : this.props.enter;
      onChange = this.onChange.bind(this, animation, child.key, type);
    }
    if (child.key in this.isTween && this.isTween[child.key].type === type) {
      return React.cloneElement(this.isTween[child.key].children,
        { ...child.props, key: child.key });
    }
    const children = (<TweenOne
      {...child.props}
      key={child.key}
      component={child.type}
      animation={transformArguments(animation, child.key, i)}
      onChange={onChange}
      resetStyleBool={child.key in this.isTween}
    />);
    this.isTween[child.key] = this.isTween[child.key] || {};
    this.isTween[child.key].type = type;
    this.isTween[child.key].children = children;
    return children;
  }

  getChildrenToRender(children) {
    return children.map((child, i) => {
      if (!child || !child.key) {
        return child;
      }
      const key = child.key;
      if (this.keysToLeave.indexOf(key) >= 0) {
        return this.getCoverAnimation(child, i, 'leave');
      }
      return this.getCoverAnimation(child, i, 'enter');
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
    ].forEach(key => delete componentProps[key]);
    return createElement(this.props.component, componentProps, childrenToRender);
  }
}

const objectOrArray = PropTypes.oneOfType([PropTypes.object, PropTypes.array]);
const objectOrArrayOrFunc = PropTypes.oneOfType([objectOrArray, PropTypes.func]);

TweenOneGroup.propTypes = {
  component: PropTypes.any,
  children: PropTypes.any,
  style: PropTypes.object,
  appear: PropTypes.bool,
  enter: objectOrArrayOrFunc,
  leave: objectOrArrayOrFunc,
  animatingClassName: PropTypes.array,
  onEnd: PropTypes.func,
};

TweenOneGroup.defaultProps = {
  component: 'div',
  appear: true,
  animatingClassName: ['tween-one-entering', 'tween-one-leaving'],
  enter: { x: 50, opacity: 0, type: 'from' },
  leave: { x: -50, opacity: 0 },
  onEnd: noop,
};
export default TweenOneGroup;
