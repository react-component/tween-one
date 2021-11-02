import type { ReactElement } from 'react';
import React from 'react';

import type { IObject } from '../type';

export { dataToArray } from './';

export const windowIsUndefined = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export function toArrayChildren(children: any) {
  const ret: any[] = [];
  React.Children.forEach(children, (c) => {
    ret.push(c);
  });
  return ret;
}

export function findChildInChildrenByKey(children: ReactElement[], key: string | number | null) {
  let ret: any = null;
  if (children) {
    children.forEach((c) => {
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

export function mergeChildren(prev: ReactElement[], next: ReactElement[]) {
  let ret: any[] = [];
  // For each key of `next`, the list of keys to insert before that key in
  // the combined list
  const nextChildrenPending: any = {};
  let pendingChildren: any[] = [];
  let followChildrenKey: string | number | null = null;
  prev.forEach((c) => {
    if (!c) {
      return;
    }
    if (c.key && findChildInChildrenByKey(next, c.key)) {
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

  next.forEach((c) => {
    if (!c) {
      return;
    }
    if (c.key && nextChildrenPending.hasOwnProperty(c.key)) {
      // eslint-disable-line no-prototype-builtins
      ret = ret.concat(nextChildrenPending[c.key]);
    }
    ret.push(c);
    if (c.key === followChildrenKey) {
      ret = ret.concat(pendingChildren);
    }
  });

  return ret;
}

export function transformArguments(arg: any, key: string | number | null, i: number) {
  let result;
  if (typeof arg === 'function') {
    result = arg({
      key,
      index: i,
    });
  } else {
    result = arg;
  }
  return result;
}

export function getChildrenFromProps(props: IObject) {
  return props && props.children;
}
