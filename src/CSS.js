const IE = (() => {
  if (document.documentMode) {
    return document.documentMode;
  }
  for (let i = 7; i > 4; i--) {
    let div = document.createElement('div');
    div.innerHTML = '<!--[if IE ' + i + ']><span class="is-ie"></span><![endif]-->';
    if (div.getElementsByClassName('is-ie').length) {
      div = null;
      return i;
    }
  }
  return undefined;
})();

const colorLookup = {
  aqua: [0, 255, 255],
  lime: [0, 255, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, 255],
  navy: [0, 0, 128],
  white: [255, 255, 255],
  fuchsia: [255, 0, 255],
  olive: [128, 128, 0],
  yellow: [255, 255, 0],
  orange: [255, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [255, 0, 0],
  pink: [255, 192, 203],
  cyan: [0, 255, 255],
  transparent: [255, 255, 255, 0],
};
const _hue = (hh, m1, m2)=> {
  let h = (hh > 1) ? hh - 1 : hh;
  h = (hh < 0) ? hh + 1 : h;
  const a = (h * 3 < 2) ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1;
  const b = (h < 0.5) ? m2 : a;
  const c = (h * 6 < 1) ? m1 + (m2 - m1) * h * 6 : b;
  return (c * 255 + 0.5) | 0;
};


const CSS = {
  DEG2RAD: Math.PI / 180,
  RAD2DEG: 180 / Math.PI,
  _lists: {
    transformsBase: ['translate', 'translateX', 'translateY', 'scale', 'scaleX', 'scaleY', 'skewX', 'skewY', 'rotateZ', 'rotate'],
    transforms3D: ['translate3d', 'translateZ', 'scaleZ', 'rotateX', 'rotateY', 'perspective'],
  },
  filter: ['grayScale', 'sepia', 'hueRotate', 'invert', 'brightness', 'contrast', 'blur'],
  filterConvert: { grayScale: 'grayscale', hueRotate: 'hue-rotate' },
  transformGroup: { translate: 1, translate3d: 1, scale: 1, scale3d: 1, rotate: 1, rotate3d: 1 },

  createMatrix(style) {
    return (window.WebKitCSSMatrix && new window.WebKitCSSMatrix(style)) ||
      (window.MozCSSMatrix && new window.MozCSSMatrix(style)) ||
      (window.DOMMatrix && new window.DOMMatrix(style)) ||
      (window.MsCSSMatrix && new window.MsCSSMatrix(style)) ||
      (window.OCSSMatrix && new window.OCSSMatrix(style)) ||
      (window.CSSMatrix && new window.CSSMatrix(style)) || {};
  },

  checkStyleName(p) {
    const a = ['O', 'Moz', 'ms', 'Ms', 'Webkit'];
    if (p !== 'filter' && p in document.body.style) {
      return p;
    }
    const _p = p.charAt(0).toUpperCase() + p.substr(1);
    return `${a.filter(key => `${key}${_p}` in document.body.style)[0] || ''}${_p}`;
  },

  getGsapType(_p) {
    let p = _p;
    p = p === 'x' ? 'translateX' : p;
    p = p === 'y' ? 'translateY' : p;
    p = p === 'z' ? 'translateZ' : p;
    p = p === 'r' ? 'rotate' : p;
    return p;
  },

  parseShadow(v) {
    if (!v) {
      return [0, 0, 0, 0, 0, 0, 0];
    }
    if (v.indexOf('rgb') >= 0) {
      const t = v.match(/rgb+(?:a)?\((.*)\)/);
      const s = v.replace(t[0], '').trim().split(' ');
      const c = t[1].replace(/\s/g, '').split(',');
      if (c.length === 3) {
        c.push(1);
      }
      return s.concat(c);
    }
    let vArr = v.split(' ');
    const color = this.parseColor(vArr[3]);
    color[3] = typeof color[3] === 'number' ? color[3] : 1;
    vArr = vArr.splice(0, 3);
    return vArr.concat(color);
  },
  getColor(v) {
    const rgba = v.length === 4 ? 'rgba' : 'rgb';
    const _vars = v.map((d, i) => i < 3 ? Math.round(d) : d);
    return `${rgba}(${_vars.join(',')})`;
  },
  parseColor(_v) {
    let a;
    let r;
    let g;
    let b;
    let h;
    let s;
    let l;
    let v = _v;
    const _numExp = /(?:\d|\-\d|\.\d|\-\.\d)+/g;
    if (!v) {
      a = colorLookup.black;
    } else if (typeof v === 'number') {
      a = [v >> 16, (v >> 8) & 255, v & 255];
    } else {
      if (v.charAt(v.length - 1) === ',') {
        v = v.substr(0, v.length - 1);
      }
      if (colorLookup[v]) {
        a = colorLookup[v];
      } else if (v.charAt(0) === '#') {
        // is #FFF
        if (v.length === 4) {
          r = v.charAt(1);
          g = v.charAt(2);
          b = v.charAt(3);
          v = '#' + r + r + g + g + b + b;
        }
        v = parseInt(v.substr(1), 16);
        a = [v >> 16, (v >> 8) & 255, v & 255];
      } else if (v.substr(0, 3) === 'hsl') {
        a = v.match(_numExp);
        h = (Number(a[0]) % 360) / 360;
        s = Number(a[1]) / 100;
        l = Number(a[2]) / 100;
        g = (l <= 0.5) ? l * (s + 1) : l + s - l * s;
        r = l * 2 - g;
        if (a.length > 3) {
          a[3] = Number(a[3]);
        }
        a[0] = _hue(h + 1 / 3, r, g);
        a[1] = _hue(h, r, g);
        a[2] = _hue(h - 1 / 3, r, g);
      } else {
        a = v.match(_numExp) || colorLookup.transparent;
      }
      a[0] = Number(a[0]);
      a[1] = Number(a[1]);
      a[2] = Number(a[2]);

      if (a.length > 3) {
        a[3] = Number(a[3]);
      }
    }
    return a;
  },

  getArrayToColor(arr) {
    const color = 'rgba(';
    const _arr = arr.map((item, i)=> {
      if (i < 3) {
        return parseInt(item, 10);
      }
      return item;
    });
    return color + _arr.join(',') + ')';
  },

  isTransform(p) {
    return this._lists.transformsBase.indexOf(p) >= 0 ? 'transform' : p;
  },

  isConvert(p) {
    const cssName = this.isTransform(p);
    return this.filter.indexOf(cssName) >= 0 ? 'filter' : cssName;
  },

  splitFilterToObject(data) {
    if (data === 'none' || !data || data === '') {
      return null;
    }
    const filter = data.replace(' ', '').split(')').filter(item => item);
    const startData = {};
    filter.forEach(item => {
      const dataArr = item.split('(');
      startData[dataArr[0]] = dataArr[1];
    });
    return startData;
  },

  getTweenData(_key, vars) {
    const data = {
      data: {},
      dataType: {},
      dataUnit: {},
      dataCount: {},
    };
    const key = this.getGsapType(_key);
    if (key.indexOf('color') >= 0 || key.indexOf('Color') >= 0) {
      data.data[key] = this.parseColor(vars);
      data.dataType[key] = 'color';
    } else if (key.indexOf('shadow') >= 0 || key.indexOf('Shadow') >= 0) {
      data.data[key] = this.parseShadow(vars);
      data.dataType[key] = 'shadow';
    } else if (key === 'bezier') {
      data.data[key] = vars;
    } else if (key === 'scale') {
      data.data.scaleX = vars;
      data.data.scaleY = vars;
      data.dataType.scaleX = data.dataType.scaleY = 'other';
    } else {
      data.data[key] = vars;
      data.dataType[key] = 'other';
    }
    if (key !== 'bezier') {
      if (Array.isArray(data.data[key])) {
        data.dataUnit[key] = data.data[key]
          .map(_item => _item.toString().replace(/[^a-z|%]/g, ''));
        data.dataCount[key] = data.data[key]
          .map(_item => _item.toString().replace(/[^+|=|-]/g, ''));
        data.data[key] = data.data[key].map(_item => parseFloat(_item));
      } else if (key === 'scale') {
        data.dataUnit.scaleX = data.data.scaleX.toString().replace(/[^a-z|%]/g, '');
        data.dataCount.scaleX = data.data.scaleX.toString().replace(/[^+|=|-]/g, '');
        data.data.scaleX = parseFloat(data.data.scaleX);
        data.dataUnit.scaleY = data.data.scaleY.toString().replace(/[^a-z|%]/g, '');
        data.dataCount.scaleY = data.data.scaleY.toString().replace(/[^+|=|-]/g, '');
        data.data.scaleY = parseFloat(data.data.scaleY);
      } else {
        data.dataUnit[key] = data.data[key].toString().replace(/[^a-z|%]/g, '');
        data.dataCount[key] = data.data[key].toString().replace(/[^+|=|-]/g, '');
        data.data[key] = parseFloat(data.data[key]);
      }
    }
    return data;
  },

  getTransform(transform) {
    const m = this.createMatrix(transform === 'none' ? '' : transform);
    let m11 = m.m11;
    let m12 = m.m12;
    let m13 = m.m13;
    const m14 = m.m14;
    let m21 = m.m21;
    let m22 = m.m22;
    let m23 = m.m23;
    const m24 = m.m24;
    let m31 = m.m31;
    let m32 = m.m32;
    let m33 = m.m33;
    let m34 = m.m34;
    const m43 = m.m43;
    let t1;
    let t2;
    let t3;
    const tm = {};
    tm.perspective = m34 ? parseFloat((m33 / (m34 < 0 ? -m34 : m34)).toFixed(3)) : 0;
    tm.rotateX = parseFloat((Math.asin(m23) * this.RAD2DEG).toFixed(3));
    let angle = tm.rotateX * this.DEG2RAD;
    const skewX = Math.tan(m.c);
    const skewY = Math.tan(m.b);
    let cos = m34 * tm.perspective;
    let sin;
    // rotateX
    if (angle) {
      cos = Math.cos(-angle);
      sin = Math.sin(-angle);
      t1 = m21 * cos + m31 * sin;
      t2 = m22 * cos + m32 * sin;
      t3 = m23 * cos + m33 * sin;
      m31 = m21 * -sin + m31 * cos;
      m32 = m22 * -sin + m32 * cos;
      m33 = m23 * -sin + m33 * cos;
      m34 = m24 * -sin + m34 * cos;
      m21 = t1;
      m22 = t2;
      m23 = t3;
    }
    // rotateY
    angle = Math.atan2(m31, m33);
    tm.rotateY = angle * this.RAD2DEG;
    if (angle) {
      cos = Math.cos(-angle);
      sin = Math.sin(-angle);
      t1 = m11 * cos - m31 * sin;
      t2 = m12 * cos - m32 * sin;
      t3 = m13 * cos - m33 * sin;
      m32 = m12 * sin + m32 * cos;
      m33 = m13 * sin + m33 * cos;
      m34 = m14 * sin + m34 * cos;
      m11 = t1;
      m12 = t2;
      m13 = t3;
    }
    // rotateZ
    angle = Math.atan2(m12, m11);
    tm.rotate = angle * this.RAD2DEG;
    if (angle) {
      cos = Math.cos(-angle);
      sin = Math.sin(-angle);
      m11 = m11 * cos + m21 * sin;
      t2 = m12 * cos + m22 * sin;
      m22 = m12 * -sin + m22 * cos;
      m23 = m13 * -sin + m23 * cos;
      m12 = t2;
    }

    if (tm.rotateX && Math.abs(tm.rotateX) + Math.abs(tm.rotate) > 359.9) {
      tm.rotateX = tm.rotate = 0;
      tm.rotateY += 180;
    }
    const rnd = 100000;
    tm.scaleX = ((Math.sqrt(m11 * m11 + m12 * m12) * rnd + 0.5) | 0) / rnd;
    tm.scaleY = ((Math.sqrt(m22 * m22 + m32 * m32) * rnd + 0.5) | 0) / rnd;
    tm.scaleZ = ((Math.sqrt(m23 * m23 + m33 * m33) * rnd + 0.5) | 0) / rnd;
    // 不管 skewX skewY了；
    tm.skewX = skewX === -skewY ? 0 : skewX;
    tm.skewY = skewY === -skewX ? 0 : skewY;
    tm.perspective = m34 ? 1 / ((m34 < 0) ? -m34 : m34) : 0;
    tm.translateX = m.m41;
    tm.translateY = m.m42;
    tm.translateZ = m43;
    return tm;
  },
};
CSS._lists.transformsBase = !(IE <= 9) ? CSS._lists.transformsBase.concat(CSS._lists.transforms3D) : CSS._lists.transformsBase;
export default CSS;
