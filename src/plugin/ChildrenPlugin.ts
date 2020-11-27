interface IFormatMoney {
  thousand?: string;
  decimal?: string;
}
interface IVars {
  value: number;
  floatLength: number;
  formatMoney?: IFormatMoney;
}

class ChildrenPlugin {
  static key: string = 'innerHTML';

  static className: string = 'Children';

  start?: IVars;

  startAt?: IObject;

  target?: HTMLElement;

  constructor(public vars: IVars, public key: string) {
    this.vars = vars;
    this.key = key;
  }

  getAnimStart = () => {
    const { target, vars, startAt, key } = this;
    const { formatMoney } = vars;
    const opts = {
      thousand: (formatMoney && formatMoney.thousand) || ',',
      decimal: (formatMoney && formatMoney.decimal) || '.',
    };
    const rep = new RegExp(`\\${opts.thousand}`, 'g');

    this.start = startAt![key] || {
      value: parseFloat(target!.innerHTML.replace(rep, '').replace(opts.decimal, '.')) || 0,
    };
    return this.start;
  };

  toMoney = (v: string, _opts: IFormatMoney) => {
    const opts = {
      thousand: _opts.thousand || ',',
      decimal: _opts.decimal || '.',
    };
    const negative = parseFloat(v) < 0 ? '-' : '';
    const numberArray = v.split('.');
    const base = Math.abs(parseInt(numberArray[0], 10)).toString();
    const mod = base.length > 3 ? base.length % 3 : 0;
    const decimal = numberArray[1];
    return `${negative}${mod ? `${base.substr(0, mod)}${opts.thousand}` : ''}${base
      .substr(mod)
      .replace(/(\d{3})(?=\d)/g, `$1${opts.thousand}`)}${
      decimal ? `${opts.decimal}${decimal}` : ''
    }`;
  };

  render = (ratio: number) => {
    const { value, floatLength, formatMoney } = this.vars;
    let v: number | string = (value - this.start!.value) * ratio + this.start!.value;
    if (typeof floatLength === 'number') {
      if (floatLength) {
        v = v.toFixed(floatLength);
        const numberArray = v.toString().split('.');
        let decimal = numberArray[1] || '';
        decimal = decimal.length > floatLength ? decimal.substring(0, floatLength) : decimal;
        const l = floatLength - decimal.length;
        if (l) {
          Array(l)
            .fill(0)
            .forEach(num => {
              decimal += `${num}`;
            });
        }
        v = `${numberArray[0]}.${decimal}`;
      } else {
        v = Math.round(v);
      }
    }
    v = formatMoney ? this.toMoney(`${v}`, formatMoney) : v;
    return v;
  };
}

export default ChildrenPlugin;
