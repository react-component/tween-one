
const IE = (function () {
  if (document.documentMode) {
    return document.documentMode;
  } else {
    for (var i = 7; i > 4; i--) {
      let div = document.createElement('div');
      div.innerHTML = '<!--[if IE ' + i + ']><span class="is-ie"></span><![endif]-->';
      if (div.getElementsByClassName('is-ie').length) {
        div = null;
        return i;
      }
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
const _hue = function (h, m1, m2) {
  h = (h < 0) ? h + 1 : (h > 1) ? h - 1 : h;
  return ((((h * 6 < 1) ? m1 + (m2 - m1) * h * 6 : (h < 0.5) ? m2 : (h * 3 < 2) ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * 255) + 0.5) | 0;
};


const CSS = {
  _lists: {
    transformsBase: ['translateX', 'translateY', 'scale', 'scaleX', 'scaleY', 'skewX', 'skewY', 'rotateZ', 'rotate'],
    transforms3D: ['translateZ', 'scaleZ', 'rotateX', 'rotateY', 'perspective'],
  },

  parseShadow(v){
    let vArr = v.split(' ');
    const color = this.parseColor(vArr[3]);
    color[3] = typeof color[3] === 'number' ? color[3] : 1;
    vArr = vArr.splice(0, 3);
    return vArr.concat(color);
  },

  parseColor(v){
    let a, r, g, b, h, s, l;
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

  getArrayToColor(arr){
    //console.log(v,arr)
    const color = 'rgba(';
    arr = arr.map((item, i)=> {
      if (i < 3) {
        return parseInt(item);
      }
      return item;
    });
    return color + arr.join(',') + ')';
  },

  /*
  getTransformData(matrix, p, value){
    if (p.indexOf('translate') >= 0) {
      switch (p) {
        case 'translateX':
          return matrix.translate(value, 0, 0);
        case 'translateY':
          return matrix.translate(0, value, 0);
        default :
          return matrix.translate(0, 0, value);
      }
    } else if (p.indexOf('scale') >= 0) {
      switch (p) {
        case 'scaleX':
          return matrix.scale(value, 0, 0);
        case 'scaleY':
          return matrix.scale(0, value, 0);
        default:
          return matrix.scale(0, 0, value);
      }
    } else if (p.indexOf('rotate') >= 0) {
      switch (p) {
        case 'rotateX':
          return matrix.rotate(value, 0, 0);
        case 'rotateY':
          return matrix.rotate(0, value, 0);
        default:
          return matrix.rotate(0, 0, value);
      }
    } else if (p.indexOf('skew') >= 0) {
      switch (p) {
        case 'skewX':
          return matrix.skewX(value, 0, 0);
        case 'skewY':
          return matrix.rotate(value, 0, 0);
      }
    }
  },

  createMatrix(style){
    return WebKitCSSMatrix && (new WebKitCSSMatrix(style)) ||
      MozCSSMatrix && (new MozCSSMatrix(style)) ||
      MsCSSMatrix && (new MsCSSMatrix(style)) ||
      OCSSMatrix && (new OCSSMatrix(style)) ||
      CSSMatrix && (new CSSMatrix(style));
  },
  */

  mergeTransform(current, change){
    //console.log(a, 22, b, 11)
    const addArr = [];
    let isCurrent = false;
    //console.log(current);
    current.trim().split(' ').forEach((currentOnly)=> {
      const currentOnlyName = currentOnly.split('(')[0];
      const changeName = change.split('(')[0];
      if (currentOnlyName === changeName) {
        addArr.push(change);
        isCurrent = true;
      } else {
        addArr.push(currentOnly);
      }
    });
    if (!isCurrent) {
      addArr.push(change);
    }
    return addArr.join(' ').trim();
  },

  getValues (p, d, u) {
    return p + '(' + d + u + ')';
  },

  isTransform (p) {
    this._lists.transformsBase = !(IE <= 9) ? this._lists.transformsBase.concat(this._lists.transforms3D) : this._lists.transformsBase;
    return this._lists.transformsBase.indexOf(p) >= 0 ? 'transform' : p;
  },

  getShadowParam(v, d){
    let color = [];
    for (let i = 3; i < d.length; i++) {
      color.push(d[i]);
    }
    color = this.getArrayToColor(color);
    let vArr = v.split(' ');
    const blur = [];
    //获取单位
    vArr.forEach((item, ii)=> {
      if (ii < 3) {
        const unit = item.toString().replace(/[^a-z|%]/ig, '');
        blur.push(d[ii] + unit);
      }
    });
    return blur.join(' ') + ' ' + color;
  },

  getParam (p, v, d) {
    d = d.length == 1 ? d[0] : d;
    if (p.indexOf('color') >= 0 || p.indexOf('Color') >= 0) {
      return this.getArrayToColor(d);
    }
    let unit = '';
    let param = null;
    let invalid = true;
    if (p.indexOf('translate') >= 0 || p.indexOf('perspective') >= 0) {
      invalid = !/(%|px|em|rem|vw|vh|\d)$/i.test(v);
      unit = Number(v) !== 'NaN' ? 'px' : '';
      unit = unit || v.toString().replace(/[^a-z|%]/ig, '');
    } else if (p.indexOf('skew') >= 0 || p.indexOf('rotate') >= 0) {
      invalid = !/(deg|\d)$/i.test(v);
      unit = Number(v) !== 'NaN' ? 'deg' : '';
      unit = unit || v.toString().replace(/[^a-z|%]/ig, '');
    } else if (p.indexOf('scale') >= 0) {
      invalid = !/(\d)$/i.test(v);
    } else if (p.indexOf('Shadow') >= 0) {
      return this.getShadowParam(v, d);
    }
    if (!invalid) {
      param = this.getValues(p, d, unit);
    } else {
      unit = Number(v) !== 'NaN' ? '' : v.toString().replace(/[^a-z|%]/ig, '');
      param = d + unit;
    }
    return param
  }

};


export default CSS;

