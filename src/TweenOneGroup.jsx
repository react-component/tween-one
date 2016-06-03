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
    // 第一进入，appear 为 true 时默认用 enter 或 tween-one 上的效果
    const children = toArrayChildren(getChildrenFromProps(this.props));
    children.forEach(child => {
      if (!child || !child.key) {
        return;
      }
      this.keysToEnter.push(child.key);
    });
    this.originalChildren = children;
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
    const currentChildren = this.originalChildren;
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

  componentDidUpdate() {
    this.originalChildren = toArrayChildren(getChildrenFromProps(this.props));
  }

  onChange(animation, key, type, obj) {
    const length = dataToArray(animation).length;
    if (obj.index === length - 1 && obj.mode === 'onComplete') {
      if (type === 'leave') {
        const children = this.state.children.filter(child =>
          child.key !== key
        );
        this.setState({
          children,
        });
      }
      const _obj = { key, type };
      this.props.onEnd(_obj);
    }
  }

  getCoverAnimation(child, i, type) {
    const animation = type === 'leave' ? this.props.leave : this.props.enter;
    const onChange = this.onChange.bind(this, animation, child.key, type);
    return (<TweenOne
      {...child.props}
      key={child.key}
      component={child.type}
      animation={transformArguments(animation, child.key, i)}
      onChange={onChange}
    />);
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
      const appear = transformArguments(this.props.appear, key, i);
      if (appear || this.onEnterBool) {
        return this.getCoverAnimation(child, i, 'enter');
      }
      return child.type === TweenOne
        ? createElement(child.props.component, { ...child.props, key: child.key })
        : child;
    });
  }

  render() {
    const childrenToRender = this.getChildrenToRender(this.state.children);
    return createElement(this.props.component, this.props, childrenToRender);
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
  onEnd: PropTypes.func,
};

TweenOneGroup.defaultProps = {
  component: 'div',
  appear: true,
  enter: { x: 50, opacity: 0, type: 'from' },
  leave: { x: -50, opacity: 0 },
  onEnd: noop,
};
export default TweenOneGroup;
