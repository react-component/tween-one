import React, { useRef, createElement, useLayoutEffect, useEffect } from 'react';
import { findDOMNode } from 'react-dom';
import TweenOneJS, { Tween } from 'tween-one';
import { toStyleUpperCase, stylesToCss } from 'style-utils';

import { IAnimProps, IAnimObject, TweenOneRef } from './type';
import { objectEqual } from './utils';

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

    useLayoutEffect(() => {
      commonFunc('paused', paused);
    }, [paused]);
    //  yoyo, moment, reverse, repeat, repeatDelay
    useLayoutEffect(() => {
      commonFunc('moment', moment);
    }, [moment]);

    useLayoutEffect(() => {
      commonFunc('reverse', reverse);
    }, [reverse]);
    useLayoutEffect(() => {
      if (!domRef.current) {
        return console.warn('Warning: TweenOne domRef is error.');
      }
      // 动画写在标签上，手动对比；
      if (!objectEqual(animation, prevAnim.current)) {
        console.log('update animation');
        const dom =
          domRef.current instanceof Element ? domRef.current : findDOMNode(domRef.current);

        if (!(dom instanceof Element)) {
          // dom instanceof Text || !dom.tagName ||
          return console.error('Error: TweenOne tag is not dom.');
        }
        if (animRef.current && killPrevAnim) {
          animRef.current.kill();
        }
        if (resetStyle && animRef.current) {
          const styleStr = Object.keys(style)
            .map((key: string) => `${toStyleUpperCase(key)}:${stylesToCss(key, style[key])}`)
            .join(';');
          dom.setAttribute('style', styleStr);
          // dom.style.cssText = styleStr;
          delete dom._tweenOneVars; // eslint-disable-line no-underscore-dangle
        }
        animRef.current =
          animation &&
          TweenOneJS(dom, {
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
      return;
    }, [animation]);
    useEffect(
      () => () => {
        if (animRef.current) {
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
        className: newClassName,
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
