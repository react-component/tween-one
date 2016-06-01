/* eslint-disable */

/*
 * Useful things from Adobe's Snap.svg adopted to the library needs
 * source: https://github.com/alexk111/SVG-Morpheus
 */

const spaces = '\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029';
const pathCommand = new RegExp(`([a-z])[${spaces},]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?[${spaces}]*,?[${spaces}]*)+)`, 'ig');
const pathValues = new RegExp(`(-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?)[${spaces}]*,?[${spaces}]*`, 'ig');

// Parses given path string into an array of arrays of path segments
const parsePathString = function(pathString) {
  if (!pathString) {
    return null;
  }

  if (typeof pathString === typeof []) {
    return pathString;
  }
  const paramCounts = { a: 7, c: 6, o: 2, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, u: 3, z: 0 };
  const data = [];
  String(pathString).replace(pathCommand, function(a, b, c) {
    const params = [];
    let name = b.toLowerCase();
    c.replace(pathValues, function(a, b) {
      b && params.push(+b);
    });
    if (name === 'm' && params.length > 2) {
      data.push([b].concat(params.splice(0, 2)));
      name = 'l';
      b = b === 'm' ? 'l' : 'L';
    }
    if (name === 'o' && params.length === 1) {
      data.push([b, params[0]]);
    }
    if (name === 'r') {
      data.push([b].concat(params));
    } else while (params.length >= paramCounts[name]) {
      data.push([b].concat(params.splice(0, paramCounts[name])));
      if (!paramCounts[name]) {
        break;
      }
    }
  });
  return data;
};


// http://schepers.cc/getting-to-the-point
const catmullRom2bezier = function(crp, z) {
  const d = [];
  for (let i = 0, iLen = crp.length; iLen - 2 * !z > i; i += 2) {
    const p = [
      { x: +crp[i - 2], y: +crp[i - 1] },
      { x: +crp[i], y: +crp[i + 1] },
      { x: +crp[i + 2], y: +crp[i + 3] },
      { x: +crp[i + 4], y: +crp[i + 5] },
    ];
    if (z) {
      if (!i) {
        p[0] = { x: +crp[iLen - 2], y: +crp[iLen - 1] };
      } else if (iLen - 4 === i) {
        p[3] = { x: +crp[0], y: +crp[1] };
      } else if (iLen - 2 === i) {
        p[2] = { x: +crp[0], y: +crp[1] };
        p[3] = { x: +crp[2], y: +crp[3] };
      }
    } else {
      if (iLen - 4 === i) {
        p[3] = p[2];
      } else if (!i) {
        p[0] = { x: +crp[i], y: +crp[i + 1] };
      }
    }
    d.push(['C',
      (-p[0].x + 6 * p[1].x + p[2].x) / 6,
      (-p[0].y + 6 * p[1].y + p[2].y) / 6,
      (p[1].x + 6 * p[2].x - p[3].x) / 6,
      (p[1].y + 6 * p[2].y - p[3].y) / 6,
      p[2].x,
      p[2].y,
    ]);
  }
  return d;
};

const ellipsePath = function(_x, _y, _rx, _ry, a) {
  const x = +_x;
  const y = +_y;
  const rx = +_rx;
  const ry = a === null && _ry === null ? _rx : +_ry;
  let res;
  if (a !== null) {
    const rad = Math.PI / 180;
    const x1 = x + rx * Math.cos(-ry * rad);
    const x2 = x + rx * Math.cos(-a * rad);
    const y1 = y + rx * Math.sin(-ry * rad);
    const y2 = y + rx * Math.sin(-a * rad);
    res = [['M', x1, y1], ['A', rx, rx, 0, +(a - ry > 180), 0, x2, y2]];
  } else {
    res = [
      ['M', x, y],
      ['m', 0, -ry],
      ['a', rx, ry, 0, 1, 1, 0, 2 * ry],
      ['a', rx, ry, 0, 1, 1, 0, -2 * ry],
      ['z'],
    ];
  }
  return res;
};

const pathToAbsolute = function(_pathArray) {
  const pathArray = parsePathString(_pathArray);

  if (!pathArray || !pathArray.length) {
    return [['M', 0, 0]];
  }
  let res = [];
  let x = 0;
  let y = 0;
  let mx = 0;
  let my = 0;
  let start = 0;
  let pa0;
  let dots;
  if (pathArray[0][0] === 'M') {
    x = +pathArray[0][1];
    y = +pathArray[0][2];
    mx = x;
    my = y;
    start++;
    res[0] = ['M', x, y];
  }
  const crz = pathArray.length === 3 &&
    pathArray[0][0] === 'M' &&
    pathArray[1][0].toUpperCase() === 'R' &&
    pathArray[2][0].toUpperCase() === 'Z';
  let r;
  let pa;
  let j;
  let jj;
  for (let i = start, ii = pathArray.length; i < ii; i++) {
    res.push(r = []);
    pa = pathArray[i];
    pa0 = pa[0];
    if (pa0 !== pa0.toUpperCase()) {
      r[0] = pa0.toUpperCase();
      switch (r[0]) {
        case 'A':
          r[1] = pa[1];
          r[2] = pa[2];
          r[3] = pa[3];
          r[4] = pa[4];
          r[5] = pa[5];
          r[6] = +pa[6] + x;
          r[7] = +pa[7] + y;
          break;
        case 'V':
          r[1] = +pa[1] + y;
          break;
        case 'H':
          r[1] = +pa[1] + x;
          break;
        case 'R':
          dots = [x, y].concat(pa.slice(1));
          for (j = 2, jj = dots.length; j < jj; j++) {
            dots[j] = +dots[j] + x;
            dots[++j] = +dots[j] + y;
          }
          res.pop();
          res = res.concat(catmullRom2bezier(dots, crz));
          break;
        case 'O':
          res.pop();
          dots = ellipsePath(x, y, pa[1], pa[2]);
          dots.push(dots[0]);
          res = res.concat(dots);
          break;
        case 'U':
          res.pop();
          res = res.concat(ellipsePath(x, y, pa[1], pa[2], pa[3]));
          r = ['U'].concat(res[res.length - 1].slice(-2));
          break;
        case 'M':
          mx = +pa[1] + x;
          my = +pa[2] + y;
        default:
          for (j = 1, jj = pa.length; j < jj; j++) {
            r[j] = +pa[j] + ((j % 2) ? x : y);
          }
      }
    } else if (pa0 === 'R') {
      dots = [x, y].concat(pa.slice(1));
      res.pop();
      res = res.concat(catmullRom2bezier(dots, crz));
      r = ['R'].concat(pa.slice(-2));
    } else if (pa0 === 'O') {
      res.pop();
      dots = ellipsePath(x, y, pa[1], pa[2]);
      dots.push(dots[0]);
      res = res.concat(dots);
    } else if (pa0 === 'U') {
      res.pop();
      res = res.concat(ellipsePath(x, y, pa[1], pa[2], pa[3]));
      r = ['U'].concat(res[res.length - 1].slice(-2));
    } else {
      for (let k = 0, kk = pa.length; k < kk; k++) {
        r[k] = pa[k];
      }
    }
    pa0 = pa0.toUpperCase();
    if (pa0 !== 'O') {
      switch (r[0]) {
        case 'Z':
          x = +mx;
          y = +my;
          break;
        case 'H':
          x = r[1];
          break;
        case 'V':
          y = r[1];
          break;
        case 'M':
          mx = r[r.length - 2];
          my = r[r.length - 1];
        default:
          x = r[r.length - 2];
          y = r[r.length - 1];
      }
    }
  }

  return res;
};


const l2c = function(x1, y1, x2, y2) {
  return [x1, y1, x2, y2, x2, y2];
};
const q2c = function(x1, y1, ax, ay, x2, y2) {
  const _13 = 1 / 3;
  const _23 = 2 / 3;
  return [
    _13 * x1 + _23 * ax,
    _13 * y1 + _23 * ay,
    _13 * x2 + _23 * ax,
    _13 * y2 + _23 * ay,
    x2,
    y2,
  ];
};
const a2c = function(_x1, _y1, _rx, _ry, angle, largeArcFlag, sweepFlag, _x2, _y2, recursive) {
  // for more information of where this math came from visit:
  // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
  const _120 = Math.PI * 120 / 180;
  const rad = Math.PI / 180 * (+angle || 0);
  let res = [];
  let xy;
  let x1 = _x1;
  let y1 = _y1;
  let x2 = _x2;
  let y2 = _y2;
  let rx = _rx;
  let ry = _ry;
  let f1;
  let f2;
  let cx;
  let cy;
  const rotate = function(x, y, _rad) {
    const X = x * Math.cos(_rad) - y * Math.sin(_rad);
    const Y = x * Math.sin(_rad) + y * Math.cos(_rad);
    return { x: X, y: Y };
  };
  if (!recursive) {
    xy = rotate(x1, y1, -rad);
    x1 = xy.x;
    y1 = xy.y;
    xy = rotate(x2, y2, -rad);
    x2 = xy.x;
    y2 = xy.y;
    // const cos = Math.cos(Math.PI / 180 * angle);
    // const sin = Math.sin(Math.PI / 180 * angle);
    const x = (x1 - x2) / 2;
    const y = (y1 - y2) / 2;
    let h = (x * x) / (rx * rx) + (y * y) / (ry * ry);
    if (h > 1) {
      h = Math.sqrt(h);
      rx = h * rx;
      ry = h * ry;
    }
    const rx2 = rx * rx;
    const ry2 = ry * ry;
    const k = (largeArcFlag === sweepFlag ? -1 : 1) *
      Math.sqrt(Math.abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x)));
    cx = k * rx * y / ry + (x1 + x2) / 2;
    cy = k * -ry * x / rx + (y1 + y2) / 2;
    f1 = Math.asin(((y1 - cy) / ry).toFixed(9));
    f2 = Math.asin(((y2 - cy) / ry).toFixed(9));

    f1 = x1 < cx ? Math.PI - f1 : f1;
    f2 = x2 < cx ? Math.PI - f2 : f2;
    // f1 < 0 && (f1 = Math.PI * 2 + f1);
    // f2 < 0 && (f2 = Math.PI * 2 + f2);
    f1 = f1 < 0 ? Math.PI * 2 + f1 : f1;
    f2 = f2 < 0 ? Math.PI * 2 + f2 : f2;
    if (sweepFlag && f1 > f2) {
      f1 = f1 - Math.PI * 2;
    }
    if (!sweepFlag && f2 > f1) {
      f2 = f2 - Math.PI * 2;
    }
  } else {
    f1 = recursive[0];
    f2 = recursive[1];
    cx = recursive[2];
    cy = recursive[3];
  }
  let df = f2 - f1;
  if (Math.abs(df) > _120) {
    const f2old = f2;
    const x2old = x2;
    const y2old = y2;
    f2 = f1 + _120 * (sweepFlag && f2 > f1 ? 1 : -1);
    x2 = cx + rx * Math.cos(f2);
    y2 = cy + ry * Math.sin(f2);
    res = a2c(x2, y2, rx, ry, angle, 0, sweepFlag, x2old, y2old, [f2, f2old, cx, cy]);
  }
  df = f2 - f1;
  const c1 = Math.cos(f1);
  const s1 = Math.sin(f1);
  const c2 = Math.cos(f2);
  const s2 = Math.sin(f2);
  const t = Math.tan(df / 4);
  const hx = 4 / 3 * rx * t;
  const hy = 4 / 3 * ry * t;
  const m1 = [x1, y1];
  const m2 = [x1 + hx * s1, y1 - hy * c1];
  const m3 = [x2 + hx * s2, y2 - hy * c2];
  const m4 = [x2, y2];
  m2[0] = 2 * m1[0] - m2[0];
  m2[1] = 2 * m1[1] - m2[1];
  if (recursive) {
    return [m2, m3, m4].concat(res);
  }
  res = [m2, m3, m4].concat(res).join().split(',');
  const newres = [];
  for (let i = 0, ii = res.length; i < ii; i++) {
    newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
  }
  return newres;
};

export function path2curve(path, path2) {
  const p = pathToAbsolute(path);
  const p2 = path2 && pathToAbsolute(path2);
  const attrs = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null };
  const attrs2 = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null };
  const pcoms1 = []; // path commands of original path p
  const pcoms2 = []; // path commands of original path p2
  let pfirst = ''; // temporary holder for original path command
  let pcom = ''; // holder for previous path command of original path
  let ii;
  const processPath = function(__path, d, _pcom) {
    let nx;
    let ny;
    let _path = __path;
    if (!_path) {
      return ['C', d.x, d.y, d.x, d.y, d.x, d.y];
    }
    // !(_path[0] in { T: 1, Q: 1 }) && (d.qx = d.qy = null);
    if (!(_path[0] in { T: 1, Q: 1 })) {
      d.qx = d.qy = null;
    }
    switch (_path[0]) {
      case 'M':
        d.X = _path[1];
        d.Y = _path[2];
        break;
      case 'A':
        _path = ['C'].concat(a2c.apply(0, [d.x, d.y].concat(_path.slice(1))));
        break;
      case 'S':
        if (_pcom === 'C' || _pcom === 'S') { // In 'S' case we have to take into account, if the previous command is C/S.
          nx = d.x * 2 - d.bx;          // And reflect the previous
          ny = d.y * 2 - d.by;          // command's control point relative to the current point.
        } else {                            // or some else or nothing
          nx = d.x;
          ny = d.y;
        }
        _path = ['C', nx, ny].concat(_path.slice(1));
        break;
      case 'T':
        if (_pcom === 'Q' || _pcom === 'T') { // In 'T' case we have to take into account, if the previous command is Q/T.
          d.qx = d.x * 2 - d.qx;        // And make a reflection similar
          d.qy = d.y * 2 - d.qy;        // to case 'S'.
        } else {                            // or something else or nothing
          d.qx = d.x;
          d.qy = d.y;
        }
        _path = ['C'].concat(q2c(d.x, d.y, d.qx, d.qy, _path[1], _path[2]));
        break;
      case 'Q':
        d.qx = _path[1];
        d.qy = _path[2];
        _path = ['C'].concat(q2c(d.x, d.y, _path[1], _path[2], _path[3], _path[4]));
        break;
      case 'L':
        _path = ['C'].concat(l2c(d.x, d.y, _path[1], _path[2]));
        break;
      case 'H':
        _path = ['C'].concat(l2c(d.x, d.y, _path[1], d.y));
        break;
      case 'V':
        _path = ['C'].concat(l2c(d.x, d.y, d.x, _path[1]));
        break;
      case 'Z':
        _path = ['C'].concat(l2c(d.x, d.y, d.X, d.Y));
        break;
      default:
        break;
    }
    return _path;
  };
  const fixArc = function(pp, _i) {
    let i = _i;
    if (pp[i].length > 7) {
      pp[i].shift();
      const pi = pp[i];
      while (pi.length) {
        pcoms1[i] = 'A'; // if created multiple C:s, their original seg is saved
        // p2 && (pcoms2[i] = 'A'); // the same as above
        if (p2) {
          pcoms2[i] = 'A';
        }
        pp.splice(i++, 0, ['C'].concat(pi.splice(0, 6)));
      }
      pp.splice(i, 1);
      ii = Math.max(p.length, p2 && p2.length || 0);
    }
    return i;
  };
  const fixM = function(path1, _path2, a1, a2, i) {
    if (path1 && _path2 && path1[i][0] === 'M' && _path2[i][0] !== 'M') {
      _path2.splice(i, 0, ['M', a2.x, a2.y]);
      a1.bx = 0;
      a1.by = 0;
      a1.x = path1[i][1];
      a1.y = path1[i][2];
      ii = Math.max(p.length, p2 && p2.length || 0);
    }
  };

  ii = Math.max(p.length, p2 && p2.length || 0);
  for (let i = 0; i < ii; i++) {
    // p[i] && (pfirst = p[i][0]); // save current path command
    if (p[i]) {
      pfirst = p[i][0];
    }
    if (pfirst !== 'C') { // C is not saved yet, because it may be result of conversion
      pcoms1[i] = pfirst; // Save current path command
      // i && ( pcom = pcoms1[i - 1]); // Get previous path command pcom
      if (i) {
        pcom = pcoms1[i - 1];
      }
    }
    p[i] = processPath(p[i], attrs, pcom); // Previous path command is inputted to processPath

    if (pcoms1[i] !== 'A' && pfirst === 'C') {
      pcoms1[i] = 'C'; // A is the only command
    }
    // which may produce multiple C:s
    // so we have to make sure that C is also C in original path
    i = fixArc(p, i); // fixArc adds also the right amount of A:s to pcoms1
    if (p2) { // the same procedures is done to p2
      // p2[i] && (pfirst = p2[i][0]);
      if (p2[i]) {
        pfirst = p2[i][0];
      }
      if (pfirst !== 'C') {
        pcoms2[i] = pfirst;
        if (i) {
          pcom = pcoms2[i - 1];
        }
        // i && (pcom = pcoms2[i - 1]);
      }
      p2[i] = processPath(p2[i], attrs2, pcom);

      if (pcoms2[i] !== 'A' && pfirst === 'C') {
        pcoms2[i] = 'C';
      }
      fixArc(p2, i);
    }
    fixM(p, p2, attrs, attrs2, i);
    fixM(p2, p, attrs2, attrs, i);
    const seg = p[i];
    const seg2 = p2 && p2[i];
    const seglen = seg.length;
    const seg2len = p2 && seg2.length;
    attrs.x = seg[seglen - 2];
    attrs.y = seg[seglen - 1];
    attrs.bx = parseFloat(seg[seglen - 4]) || attrs.x;
    attrs.by = parseFloat(seg[seglen - 3]) || attrs.y;
    attrs2.bx = p2 && (parseFloat(seg2[seg2len - 4]) || attrs2.x);
    attrs2.by = p2 && (parseFloat(seg2[seg2len - 3]) || attrs2.y);
    attrs2.x = p2 && seg2[seg2len - 2];
    attrs2.y = p2 && seg2[seg2len - 1];
  }
  return p2 ? [p, p2] : p;
}
