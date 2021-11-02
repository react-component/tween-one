export function dataToArray(vars: any) {
  if (!vars && vars !== 0) {
    return [];
  }
  if (Array.isArray(vars)) {
    return vars;
  }
  return [vars];
}

function deepEql(a: any, b: any) {
  if (!a || !b) {
    return false;
  }
  const $a = Object.keys(a);
  const $b = Object.keys(b);
  if ($a.length && $b.length && $a.length === $b.length) {
    return !$a.some((key) => {
      let aa = a[key];
      let bb = b[key];
      if (Array.isArray(aa) && Array.isArray(bb)) {
        const aaa = aa.join();
        const bbb = bb.join();
        if (aaa === bbb && !aaa.match(/\[object object\]/gi)) {
          aa = aaa;
          bb = bbb;
        }
      }
      return aa !== bb;
    });
  }
  return false;
}

export function objectEqual(obj1: any, obj2: any) {
  if (obj1 === obj2 || deepEql(obj1, obj2)) {
    return true;
  }
  if (!obj1 || !obj2 || Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }
  // animation 写在标签上的进行判断是否相等， 判断每个参数有没有 function;
  let equalBool = true;
  const setEqualBool = ($a: any, $b: any) => {
    const objA = Object.keys($a).length > Object.keys($b).length ? $a : $b;
    const objB = Object.keys($a).length > Object.keys($b).length ? $b : $a;
    Object.keys(objA).forEach((key) => {
      // 如果前面有参数匹配不相同则直接返回；
      if (!equalBool) {
        return;
      }
      if (!(key in objB)) {
        equalBool = false;
      }

      if (typeof objA[key] === 'object' && typeof objB[key] === 'object') {
        equalBool = objectEqual(objA[key], objB[key]);
      } else if (typeof objA[key] === 'function' && typeof objB[key] === 'function') {
        if (objA[key].toString().replace(/\s+/g, '') !== objB[key].toString().replace(/\s+/g, '')) {
          equalBool = false;
        }
      } else if (objA[key] !== objB[key]) {
        equalBool = false;
      }
    });
  };

  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    obj1.forEach((item, i) => {
      setEqualBool(item, obj2[i]);
    });
  } else {
    setEqualBool(obj1, obj2);
  }
  return equalBool;
}
