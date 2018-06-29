import React from 'react';
import deepEql from 'deep-eql';

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
  if (obj1 === obj2 || deepEql(obj1, obj2)) {
    return true;
  }
  if (!obj1 || !obj2) {
    return false;
  }
  // animation 写在标签上的进行判断是否相等， 判断每个参数有没有 function;
  let equalBool = true;
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) {
      return false;
    }
    for (let i = 0; i < obj1.length; i++) {
      const currentObj = obj1[i];
      const nextObj = obj2[i];
      for (const p in currentObj) { // eslint-disable-line no-restricted-syntax
        if (currentObj[p] !== nextObj[p]) {
          if (typeof currentObj[p] === 'object' && typeof nextObj[p] === 'object') {
            equalBool = objectEqual(currentObj[p], nextObj[p]);
          } else if (typeof currentObj[p] === 'function' && typeof nextObj[p] === 'function') {
            if (currentObj[p].name !== nextObj[p].name) {
              equalBool = false;
            }
          } else {
            equalBool = false;
            return false;
          }
        }
      }
    }
  }

  const setEqualBool = (objA, objB) => {
    Object.keys(objA).forEach(key => {
      if (!(key in objB)) {
        equalBool = false;
      }

      if (typeof objA[key] === 'object' && typeof objB[key] === 'object') {
        equalBool = objectEqual(objA[key], objB[key]);
      } else if (typeof objA[key] === 'function' && typeof objB[key] === 'function') {
        if (objA[key].name !== objB[key].name) {
          equalBool = false;
        }
      } else if (objA[key] !== objB[key]) {
        equalBool = false;
      }
    });
  };

  setEqualBool(obj1, obj2);
  setEqualBool(obj2, obj1);
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
  let followChildrenKey;
  prev.forEach((c) => {
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

  next.forEach((c) => {
    if (!c) {
      return;
    }
    if (nextChildrenPending.hasOwnProperty(c.key)) { // eslint-disable-line no-prototype-builtins
      ret = ret.concat(nextChildrenPending[c.key]);
    }
    ret.push(c);
    if (c.key === followChildrenKey) {
      ret = ret.concat(pendingChildren);
    }
  });

  return ret;
}

export function transformArguments(arg, key, i) {
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

export function getChildrenFromProps(props) {
  return props && props.children;
}

export function startConvertToEndUnit(
  target, computedStyle, style, num,
  unit, dataUnit, fixed, isOriginWidth
) {
  let horiz = /(?:Left|Right|Width|X)/i.test(style) || isOriginWidth;
  horiz = style === 'padding' || style === 'marign' ? true : horiz;
  let t = style.indexOf('border') !== -1 || style.indexOf('translate') !== -1 ?
    target : target.parentNode || document.body;
  t = fixed ? document.body : t;
  let pix;
  let htmlComputedStyle;
  // transform 在 safari 下会留着单位，chrome 下会全部转换成 px;
  switch (unit) {
    case '%':
      pix = parseFloat(num) / 100 * (horiz ? t.clientWidth : t.clientHeight);
      break;
    case 'vw':
      pix = parseFloat(num) * document.body.clientWidth / 100;
      break;
    case 'vh':
      pix = parseFloat(num) * document.body.clientHeight / 100;
      break;
    case 'em':
      pix = parseFloat(num) * parseFloat(computedStyle.fontSize);
      break;
    case 'rem': {
      htmlComputedStyle = window.getComputedStyle(document.getElementsByTagName('html')[0]);
      pix = parseFloat(num) * parseFloat(htmlComputedStyle.fontSize);
      break;
    }
    default:
      pix = parseFloat(num);
      break;
  }
  switch (dataUnit) {
    case '%':
      pix = pix ? pix * 100 / (horiz ? t.clientWidth : t.clientHeight) : 0;
      break;
    case 'vw':
      pix = parseFloat(num) / document.body.clientWidth * 100;
      break;
    case 'vh':
      pix = parseFloat(num) / document.body.clientHeight * 100;
      break;
    case 'em':
      pix = parseFloat(num) / parseFloat(computedStyle.fontSize);
      break;
    case 'rem': {
      htmlComputedStyle = htmlComputedStyle ||
        window.getComputedStyle(document.getElementsByTagName('html')[0]);
      pix = parseFloat(num) / parseFloat(htmlComputedStyle.fontSize);
      break;
    }
    default:
      break;
  }
  return pix;
}

export function parsePath(path) {
  if (typeof path === 'string') {
    if (path.charAt(0).match(/m/i)) {
      const domPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      domPath.setAttributeNS(null, 'd', path);
      return domPath;
    }
    return document.querySelector(path);
  } else if (path.style) {
    return path;
  }
  throw new Error('Error while parsing the path');
}

export function getTransformValue(t) {
  if (typeof t === 'string') {
    return t;
  }
  const perspective = t.perspective;
  const angle = t.rotate;
  const rotateX = t.rotateX;
  const rotateY = t.rotateY;
  const sx = t.scaleX;
  const sy = t.scaleY;
  const sz = t.scaleZ;
  const skx = t.skewX;
  const sky = t.skewY;
  const translateX = typeof t.translateX === 'string' ? t.translateX : `${t.translateX}px`;
  const translateY = typeof t.translateY === 'string' ? t.translateY : `${t.translateY}px`;
  const translateZ = typeof t.translateZ === 'string' ? t.translateZ : `${t.translateZ}px`;
  const sk = skx || sky ? `skew(${skx}deg,${sky}deg)` : '';
  const an = angle ? `rotate(${angle}deg)` : '';
  const ss = sx !== 1 || sy !== 1 || sz !== 1 ? `scale3d(${sx},${sy},${sz})` : '';
  const rX = rotateX ? `rotateX(${rotateX}deg)` : '';
  const rY = rotateY ? `rotateY(${rotateY}deg)` : '';
  const per = perspective ? `perspective(${perspective}px)` : '';
  const defautlTranslate = (ss || an || rX || rY || sk) ? '' : 'translate(0px, 0px)';
  const translate = t.translateZ ? `translate3d(${translateX},${translateY},${translateZ})` :
    (t.translateX || t.translateY) && `translate(${translateX},${translateY})` || defautlTranslate;
  return `${per} ${translate} ${ss} ${an} ${rX} ${rY} ${sk}`.trim();
}
