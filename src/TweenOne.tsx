import React, { useRef, createElement, useEffect } from 'react';
import { findDOMNode } from 'react-dom';
import type { Tween } from 'tween-one';
import TweenOneJS from 'tween-one';
import { toStyleUpperCase, stylesToCss } from 'style-utils';

import type { IAnimProps, IAnimObject, TweenOneRef } from './type';
import { objectEqual, dataToArray } from './utils';
import { useIsomorphicLayoutEffect } from './utils/common';

const TweenOne: TweenOneRef = React.forwardRef<any, IAnimProps>(
  (
    {
      component = 'div',
      componentProps,
      animation,
      attr,
      paused,
      reverse,
      repeat,
      repeatDelay,
      yoyo,
      moment,
      onChange,
      onChangeTimeline,
      resetStyle,
      killPrevAnim = true,
      ...props
    },
    ref,
  ) => {
    const { children, className, style = {} } = props || {};

    const domRef = useRef<Element | React.Component>();
    const prevAnim = useRef<IAnimObject | IAnimObject[]>();
    const animRef = useRef<Tween>();
    const commonFunc = (
      key: 'paused' | 'moment' | 'reverse',
      value: boolean | number | undefined,
    ) => {
      const tween: Tween = animRef.current!;
      if (tween) {
        if (key === 'moment') {
          if (typeof value === 'number') {
            tween.goto(value, paused);
          }
          return;
        }
        tween[key] = !!value;
      }
    };
    useIsomorphicLayoutEffect(() => {
      commonFunc('paused', paused);
    }, [paused]);
    //  yoyo, moment, reverse, repeat, repeatDelay
    useIsomorphicLayoutEffect(() => {
      commonFunc('moment', moment);
    }, [moment]);

    useIsomorphicLayoutEffect(() => {
      commonFunc('reverse', reverse);
    }, [reverse]);
    useIsomorphicLayoutEffect(() => {
      if (!domRef.current) {
        return console.warn('Warning: TweenOne domRef is error.');
      }
      // 动画写在标签上，手动对比；
      if (!objectEqual(animation, prevAnim.current)) {
        const doms: any[] = dataToArray(domRef.current)
          .map((item) =>
            item instanceof Element || !(item instanceof React.Component)
              ? item
              : findDOMNode(item),
          )
          .filter((item, i) => {
            if (!(item instanceof Element)) {
              console.warn(`Warning: TweenOne tag[${i}] is not dom.`);
              return false;
            }
            return item;
          });

        if (animRef.current && killPrevAnim) {
          animRef.current.kill();
        }
        if (resetStyle && animRef.current) {
          const s = !component ? { ...style, ...children.props.style } : style
          const styleStr = Object.keys(s)
            .map((key: string) => `${toStyleUpperCase(key)}:${stylesToCss(key, s[key])}`)
            .join(';');
          doms.forEach((item: Element) => {
            item.setAttribute('style', styleStr);
            // dom.style.cssText = styleStr;
            delete item._tweenOneVars; // eslint-disable-line no-underscore-dangle
          });
        }
        animRef.current =
          animation &&
          TweenOneJS(doms, {
            animation,
            attr,
            yoyo,
            moment,
            repeat,
            reverse,
            paused,
            repeatDelay,
            onChange,
            onChangeTimeline,
          });
        prevAnim.current = animation;
      }
    }, [animation]);
    useEffect(
      () => () => {
        if (animRef.current && animRef.current.kill) {
          animRef.current.kill();
        }
      },
      [],
    );

    const refFunc = (c: any) => {
      domRef.current = c;
      if (ref && 'current' in ref) {
        ref.current = c;
      } else if (typeof ref === 'function') {
        ref(c);
      }
    };

    if (
      !component &&
      children &&
      typeof children !== 'string' &&
      typeof children !== 'boolean' &&
      typeof children !== 'number'
    ) {
      const childrenProps = children.props;
      const { style: childStyle, className: childClass = '' } = childrenProps || {};
      // 合并 style 与 className。
      const newStyle = { ...childStyle, ...style };
      const newClassName = className ? `${className} ${childClass}`.trim() : childClass;
      return React.cloneElement(children, {
        style: newStyle,
        ref: refFunc,
        className: [...new Set(newClassName.split(/\s+/))].join(' ').trim() || undefined,
      });
    }
    if (!component) {
      console.warn('Warning: component is null, children must be ReactElement.');
      return children;
    }
    return createElement(component, {
      ref: refFunc,
      ...props,
      ...componentProps,
    });
  },
);
TweenOne.isTweenOne = true;
TweenOne.displayName = 'TweenOne';

export default TweenOne;
