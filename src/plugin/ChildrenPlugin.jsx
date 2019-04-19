/* eslint-disable func-names */

const ChildrenPlugin = function (target, vars) {
  this.target = target;
  this.vars = vars;
};

ChildrenPlugin.prototype = {
  name: 'Children',
  getAnimStart() {
    const { formatMoney } = this.vars;
    const opts = {
      thousand: formatMoney && formatMoney.thousand || ',',
      decimal: formatMoney && formatMoney.decimal || '.',
    };
    const rep = new RegExp(`\\${opts.thousand}`, 'g');
    this.start = this.vars.startAt || {
      value: parseFloat(this.target.innerHTML.replace(rep, '').replace(opts.decimal, '.')) || 0
    };
  },
  toMoney(v, _opts) {
    const opts = {
      thousand: _opts.thousand || ',',
      decimal: _opts.decimal || '.',
    };
    const negative = parseFloat(v) < 0 ? '-' : '';
    const numberArray = v.toString().split('.');
    const base = Math.abs(parseInt(numberArray[0], 10)).toString();
    const mod = base.length > 3 ? base.length % 3 : 0;
    const decimal = numberArray[1];
    return `${negative}${mod ? `${base.substr(0, mod)}${opts.thousand}` : ''}${
      base.substr(mod).replace(/(\d{3})(?=\d)/g, `$1${opts.thousand}`)}${
      decimal ? `${opts.decimal}${decimal}` : ''
    }`;
  },
  setRatio(ratio) {
    const { value, floatLength, formatMoney } = this.vars;
    let v = (value - this.start.value) * ratio + this.start.value;
    if (typeof floatLength === 'number') {
      if (floatLength) {
        v = v.toFixed(floatLength);
        const numberArray = v.toString().split('.');
        let decimal = numberArray[1] || '';
        decimal = decimal.length > floatLength ? decimal.substring(0, floatLength) : decimal;
        const l = floatLength - decimal.length;
        if (l) {
          Array(l).fill(0).forEach(num => {
            decimal += `${num}`;
          });
        }
        v = `${numberArray[0]}.${decimal}`;
      } else {
        v = Math.round(v);
      }
    }
    v = formatMoney ? this.toMoney(v, formatMoney) : v;
    this.target.innerHTML = v;
  },
};

export default ChildrenPlugin;
