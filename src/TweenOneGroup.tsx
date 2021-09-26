import type { ReactElement, ReactText } from 'react';
import { cloneElement } from 'react';
import React, { useRef, useEffect, useLayoutEffect, useState, createElement } from 'react';
import type { IGroupProps, IAnimObject, TweenOneGroupRef, ICallBack, IObject } from './type';
import {
  dataToArray,
  getChildrenFromProps,
  toArrayChildren,
  transformArguments,
  mergeChildren,
  findChildInChildrenByKey,
  windowIsUndefined,
} from './utils/group';

import TweenOne from './TweenOne';

const TweenOneGroup: TweenOneGroupRef = React.forwardRef<any, IGroupProps>((props, ref) => {
  const {
    component = 'div',
    componentProps = {},
    leave: leaveAnim = { x: -50, opacity: 0 },
    enter: enterAnim = { x: 50, opacity: 0, type: 'from' },
    appear: appearBool = true,
    resetStyle = true,
    animatingClassName = ['tween-one-entering', 'tween-one-leaving'],
    onEnd = () => {},
    exclusive = false,
    ...tagProps
  } = props;
  const keysToEnter = useRef<ReactText[]>([]);
  const keysToLeave = useRef<ReactText[]>([]);
  const saveTweenTag = useRef<IObject>({});
  const oneEnter = useRef<boolean>(false);
  const animQueue = useRef<any[]>([]);
  const isTween = useRef<IObject>({});
  const cChild = toArrayChildren(getChildrenFromProps(props));
  const currentChildren = useRef(cChild);
  const [children, setChild] = useState(cChild);

  const getTweenChild = (child: ReactElement, p = {}) => {
    const key: string | number = child.key as string;
    saveTweenTag.current[key] = React.createElement(
      TweenOne,
      {
        ...p,
        key,
        component: null,
      },
      child,
    );
    return saveTweenTag.current[key];
  };
  const setClassName = (name: string, isEnter: boolean) => {
    let className = name.replace(animatingClassName[isEnter ? 1 : 0], '').trim();
    if (className.indexOf(animatingClassName[isEnter ? 0 : 1]) === -1) {
      className = `${className} ${animatingClassName[isEnter ? 0 : 1]}`.trim();
    }
    return className;
  };
  const changeChildren = (nextChildren: ReactElement[], currentChild: ReactElement[]) => {
    const newChildren: ReactElement[] = mergeChildren(currentChild, nextChildren);
    keysToEnter.current = [];
    keysToLeave.current = [];
    nextChildren.forEach((c) => {
      if (!c) {
        return;
      }
      const { key } = c;
      const hasPrev = findChildInChildrenByKey(currentChild, key);
      // 如果当前 key 已存在 saveTweenTag 里，，刷新 child;
      if (key && saveTweenTag.current[key]) {
        saveTweenTag.current[key] = React.cloneElement(saveTweenTag.current[key], {}, c);
      }
      if (!hasPrev && key) {
        keysToEnter.current.push(key);
      }
    });

    currentChild.forEach((c) => {
      if (!c) {
        return;
      }
      const { key } = c;
      const hasNext = findChildInChildrenByKey(nextChildren, key);
      if (!hasNext && key) {
        keysToLeave.current.push(key);
        delete saveTweenTag.current[key];
      }
    });
    return newChildren;
  };

  const reAnimQueue = () => {
    if (!Object.keys(isTween.current).length && animQueue.current.length) {
      // 取最后一个继续动画；
      const child = changeChildren(
        animQueue.current[animQueue.current.length - 1],
        currentChildren.current,
      );
      setChild(child);
      animQueue.current = [];
    }
  };

  const onChange = (
    animation: IAnimObject,
    key: string | number | null,
    type: string,
    obj: ICallBack,
  ) => {
    const { length } = dataToArray(animation);
    const tag = obj.targets as IObject;
    const classIsSvg = typeof tag!.className === 'object' && 'baseVal' in tag!.className;
    const isEnter = type === 'enter' || type === 'appear';
    if (key && obj.index === length - 1 && obj.mode === 'onComplete') {
      delete isTween.current[key];
      if (classIsSvg) {
        tag.className.baseVal = tag.className.baseVal
          .replace(animatingClassName[isEnter ? 0 : 1], '')
          .trim();
      } else {
        tag.className = tag.className.replace(animatingClassName[isEnter ? 0 : 1], '').trim();
      }
      if (type === 'enter') {
        keysToEnter.current.splice(keysToEnter.current.indexOf(key), 1);
        if (!keysToEnter.current.length) {
          // enter 不会触发 did update, 手动触发一次；
          reAnimQueue();
        }
      } else if (type === 'leave') {
        keysToLeave.current.splice(keysToLeave.current.indexOf(key), 1);
        currentChildren.current = currentChildren.current.filter((child) => key !== child.key);
        if (!keysToLeave.current.length) {
          const currentChildrenKeys = currentChildren.current.map((item) => item.key);
          Object.keys(saveTweenTag.current).forEach(($key) => {
            if (currentChildrenKeys.indexOf($key) === -1) {
              delete saveTweenTag.current[$key];
            }
          });

          setChild(currentChildren.current);
        }
      }
      onEnd({ key, type });
    }
  };
  const getCoverAnimation = (child: ReactElement, i: number, type: string) => {
    let animation: IAnimObject = type === 'leave' ? leaveAnim : enterAnim;
    if (type === 'appear') {
      const appear = transformArguments(appearBool, child.key, i);
      animation = (appear && enterAnim) || null;
    }
    const animate = transformArguments(animation, child.key, i);
    const onChangeCb = (obj: ICallBack) => {
      onChange(animate, child.key, type, obj);
    };
    const className =
      type === 'appear' && !appearBool
        ? child.props.className
        : setClassName(child.props.className || '', type === 'enter' || type === 'appear') || '';

    const p = {
      key: child.key,
      animation: animate,
      onChange: onChangeCb,
      resetStyle,
      className,
    };
    if (
      (child.key && keysToEnter.current.concat(keysToLeave.current).indexOf(child.key) >= 0) ||
      (!oneEnter.current && animation)
    ) {
      if (child.key && !saveTweenTag.current[child.key]) {
        isTween.current[child.key] = type;
      }
    }

    return getTweenChild(child, p);
  };
  useLayoutEffect(() => {
    if (oneEnter.current) {
      const nextChild = toArrayChildren(props.children);
      const currentChild = toArrayChildren(currentChildren.current);
      // 不计入正在进场的元素又进场；
      const newNextChild = nextChild.filter(
        (c) =>
          c &&
          !(
            currentChild.find((d) => d && d.key === c.key) &&
            keysToEnter.current.indexOf(c.key) >= 0
          ),
      );
      // 如果还在动画，暂存动画队列里，等前一次动画结束后再启动最后次的更新动画
      if (Object.keys(isTween.current).length && !exclusive) {
        // animQueue.current.push(nextChild);
        if (nextChild.length && newNextChild.length) {
          animQueue.current.push(newNextChild);
        }
      } else {
        setChild(changeChildren(nextChild, currentChild));
      }
    }
  }, [props.children]);
  useLayoutEffect(() => {
    reAnimQueue();
  });
  useEffect(() => {
    oneEnter.current = true;
  }, []);

  currentChildren.current = children;

  const childrenToRender = children.map((child: ReactElement, i: number) => {
    if (!child || !child.key) {
      return child;
    }
    const { key } = child;
    if (keysToLeave.current.indexOf(key) >= 0) {
      return getCoverAnimation(child, keysToLeave.current.indexOf(key), 'leave');
    }
    if (
      (keysToEnter.current.indexOf(key) >= 0 ||
        (isTween.current[key] && keysToLeave.current.indexOf(key) === -1)) &&
      !(isTween.current[key] === 'enter' && saveTweenTag.current[key])
    ) {
      /**
       * 1. 在 key 在 enter 里。
       * 2. 出场未结束，触发进场, this.isTween[key] 为 leave, key 在 enter 里。
       * 3. 状态为 enter 且 tweenTag 里有值时，不执行重载动画属性，直接调用 tweenTag 里的。
       */
      return getCoverAnimation(child, keysToEnter.current.indexOf(key), 'enter');
    }
    if (!oneEnter.current) {
      return getCoverAnimation(child, i, 'appear');
    }
    return saveTweenTag.current[key];
  });
  if (windowIsUndefined) {
    if (!component) {
      return <>{props.children}</>;
    }
    return createElement(component, { ...tagProps, ...componentProps, ref }, props.children);
  }
  if (!component) {
    return childrenToRender[0] ? cloneElement(childrenToRender[0], { ref }) : null;
  }
  return createElement(component, { ...tagProps, ...componentProps, ref }, childrenToRender);
});

TweenOneGroup.displayName = 'TweenOneGroup';
TweenOneGroup.isTweenOneGroup = true;

export default TweenOneGroup;
