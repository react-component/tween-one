import React from 'react';
import CSSProperty from 'react/lib/CSSProperty';
const isUnitlessNumber = CSSProperty.isUnitlessNumber;
const unquotedContentValueRegex = /^(normal|none|(\b(url\([^)]*\)|chapter_counter|attr\([^)]*\)|(no-)?(open|close)-quote|inherit)((\b\s*)|$|\s+))+)$/;

export function toArrayChildren(children) {
  const ret = [];
  React.Children.forEach(children, (c) => {
    ret.push(c);
  });
  return ret;
}

export function dataToArray(vars) {
  if (!vars && vars !== 0) {
    return [];
  }
  if (Array.isArray(vars)) {
    return vars;
  }
  return [vars];
}

export function objectEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }
  if (!obj1 || !obj2) {
    return false;
  }
  let equalBool = true;
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    for (let i = 0; i < obj1.length; i++) {
      const currentObj = obj1[i];
      const nextObj = obj2[i];
      for (const p in currentObj) {
        if (currentObj[p] !== nextObj[p]) {
          if (typeof currentObj[p] === 'object' && typeof nextObj[p] === 'object') {
            equalBool = objectEqual(currentObj[p], nextObj[p]);
          } else {
            equalBool = false;
            return false;
          }
        }
      }
    }
  }

  Object.keys(obj1).forEach(key=> {
    if (!(key in obj2)) {
      equalBool = false;
      return false;
    }

    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      equalBool = objectEqual(obj1[key], obj2[key]);
    } else if (typeof obj1[key] === 'function' && typeof obj2[key] === 'function') {
      if (obj1[key].name !== obj2[key].name) {
        equalBool = false;
      }
    } else if (obj1[key] !== obj2[key]) {
      equalBool = false;
    }
  });

  Object.keys(obj2).forEach(key=> {
    if (!(key in obj1)) {
      equalBool = false;
      return false;
    }
    if (typeof obj2[key] === 'object' && typeof obj1[key] === 'object') {
      equalBool = objectEqual(obj2[key], obj1[key]);
    } else if (typeof obj1[key] === 'function' && typeof obj2[key] === 'function') {
      if (obj1[key].name !== obj2[key].name) {
        equalBool = false;
      }
    } else if (obj2[key] !== obj1[key]) {
      equalBool = false;
    }
  });

  return equalBool;
}

export function findChildInChildrenByKey(children, key) {
  let ret = null;
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

export function mergeChildren(prev, next) {
  let ret = [];
  // For each key of `next`, the list of keys to insert before that key in
  // the combined list
  const nextChildrenPending = {};
  let pendingChildren = [];
  prev.forEach((c) => {
    if (!c) {
      return;
    }
    if (findChildInChildrenByKey(next, c.key)) {
      if (pendingChildren.length) {
        nextChildrenPending[c.key] = pendingChildren;
        pendingChildren = [];
      }
    } else if (c.key) {
      pendingChildren.push(c);
    }
  });

  next.forEach((c) => {
    if (!c) {
      return;
    }
    if (nextChildrenPending.hasOwnProperty(c.key)) {
      ret = ret.concat(nextChildrenPending[c.key]);
    }
    ret.push(c);
  });

  // 保持原有的顺序
  pendingChildren.forEach((c) => {
    const originIndex = prev.indexOf(c);
    if (originIndex >= 0) {
      ret.splice(originIndex, 0, c);
    }
  });

  return ret;
}

export function transformArguments(arg, key, i) {
  let result;
  if (typeof arg === 'function') {
    result = arg({
      key: key,
      index: i,
    });
  } else {
    result = arg;
  }
  return result;
}

export function getChildrenFromProps(props) {
  return props && props.children;
}

export function stylesToCss(key, value) {
  let _value;
  if (!isUnitlessNumber[key] && typeof value === 'number') {
    _value = ` ${value}px`;
  } else if (key === 'content' && !unquotedContentValueRegex.test(value)) {
    _value = `'${value.replace(/'/g, "\\'")}'`;
  }
  return _value || value;
}
