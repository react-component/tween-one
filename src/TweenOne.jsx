import React, {PropTypes,Component} from 'react';
import ReactDom from 'react-dom';
import assign from 'object-assign';
import easingTypes from 'tween-functions';
import requestAnimationFrame from 'raf';
import Css from './Css';
import Bezier from './BezierPlugin';

const DEFAULT_EASING = 'easeInOutQuad';
const DEFAULT_DURATION = 450;
const DEFAULT_DELAY = 0;

function noop() {
}

function DataToArray(vars) {
  if (!vars && vars !== 0) {
    return []
  }
  if (Array.isArray(vars)) {
    return vars;
  }
  return [vars];
}


function DefaultData(vars, now) {
  return {
    duration: vars.duration || vars.duration === 0 ? vars.duration : DEFAULT_DURATION,
    delay: vars.delay || DEFAULT_DELAY,
    ease: vars.ease || DEFAULT_EASING,
    onUpdate: vars.onUpdate || noop,
    onComplete: vars.onComplete || noop,
    onStart: vars.onStart || noop,
    onRepeat: vars.onRepeat || noop,
    repeat: vars.repeat || 0,
    repeatDelay: vars.repeatDelay || 0,
    repeatAnnal: 1,
    yoyo: vars.yoyo || false,
    initTime: now,
  }
}

class TweenOne extends Component {
  setDefaultData(_vars) {
    const vars = DataToArray(_vars);
    this.defaultData = [];
    this.tweenStart = {};
    let now = Date.now();
    vars.forEach((item)=> {
      now += (item.delay || 0);//加上延时
      const tweenData = DefaultData(item, now);
      tweenData.tween = {};
      for (let p in item) {
        if (!(p in tweenData)) {
          tweenData.tween[p] = item[p];
        }
      }
      if (tweenData.yoyo && !tweenData.repeat) {
        console.warn('Warning: yoyo must be used together with repeat;')
      }
      now += (item.duration || DEFAULT_DURATION );//加上此时用的时间，遍历下个时要用
      this.defaultData.push(tweenData);
    });
  }

  constructor() {
    super(...arguments);
    this.rafID = null;
    this.style = this.props.style || {};
    this.setDefaultData(this.props.vars || {});
    this.state = {
      style: this.props.style || {}
    };
    [
      'raf'
    ].forEach((method) => this[method] = this[method].bind(this));
  }


  raf() {
    if (this.rafID === -1) {
      return;
    }
    const newStyle = this.style;
    this.defaultData.forEach((item, i)=> {
      if (!item) {
        return;
      }
      const now = Date.now();
      const progressTime = now - item.initTime > item.duration ? item.duration : now - item.initTime;
      let start, end, startData, perspective;
      if (item.tween && progressTime >= 0) {
        if (!item.onStart.only) {
          item.onStart();
          item.onStart.only = true;
        }
        item.onUpdate(easingTypes[item.ease](progressTime, 0, 1, item.duration));
        // 生成start
        for (let p in item.tween) {
          if (p !== 'start') {
            const _value = item.tween[p];
            p = p === 'x' ? 'translateX' : p;
            p = p === 'y' ? 'translateY' : p;
            p = p === 'r' ? 'rotate' : p;
            const cssName = Css.isTransform(p);
            this.tweenStart[i] = this.tweenStart[i] || {};
            this.tweenStart.end = this.tweenStart.end || {};
            this.tweenStart[i][p] = this.tweenStart[i][p] || this.computedStyle[p] || 0;
            // 开始设置；
            if (cssName === 'transform' || cssName === 'filter') {
              if (!this.tweenStart.end[p + 'Bool' + i]) {
                let array;
                if (newStyle && newStyle[cssName]) {
                  const cssStyleArr = newStyle[cssName].split(' ');
                  if (cssName === 'transform') {
                    cssStyleArr.forEach(item=> {
                      array = item.replace(/[(|)]/ig, '$').split('$');
                      this.tweenStart[i][array[0]] = array[1];
                    });
                    this.tweenStart[i][p] = Css.mergeTransformName(cssStyleArr, p) || this.tweenStart[i][p];
                  } else {
                    this.tweenStart[i][p] = cssStyleArr.length ? cssStyleArr.join(' ') : 0;
                  }
                }
                this.tweenStart.end[p + 'Bool' + i] = true;
              }
            }

            // 设置start与end的值
            startData = this.tweenStart[i][p];
            end = DataToArray(parseFloat(_value));
            if (typeof _value === 'string' && _value.charAt(1) === '=') {
              end = DataToArray(parseFloat(this.tweenStart[i][p]) + parseFloat(_value.charAt(0) + 1) * parseFloat(_value.substr(2)));
            }
            let easeValue = [];
            if (cssName.indexOf('color') >= 0 || cssName.indexOf('Color') >= 0) {
              start = Css.parseColor(startData);
              end = Css.parseColor(_value);
              start[3] = start[3] || 1;
              end[3] = end[3] || 1;
            } else if (cssName.indexOf('shadow') >= 0 || cssName.indexOf('Shadow') >= 0) {
              startData = startData === 'none' ? '0 0 0 transparent' : startData;
              start = Css.parseShadow(startData);
              end = Css.parseShadow(_value);
            } else if (cssName === 'bezier' || cssName === 'filter') {
              start = [0];
              end = [1]
            } else {
              start = DataToArray(parseFloat(this.tweenStart[i][p]));
            }


            // 转成Array可对多个操作；
            start.forEach((startItem, i)=> {
              const endItem = end [i];
              easeValue[i] = easingTypes[item.ease](progressTime, parseFloat(startItem), parseFloat(endItem), item.duration);
              if (item.yoyo && !(item.repeatAnnal % 2)) {
                easeValue[i] = easingTypes[item.ease](progressTime, parseFloat(endItem), parseFloat(startItem), item.duration);
              }
            });
            easeValue = item.duration === 0 ? end : easeValue;
            this.tweenStart.end[p] = easeValue;

            // 生成样式
            if (cssName === 'transform') {
              const m = this.computedStyle[cssName].replace(/matrix|3d|[(|)]/ig, '').split(',').map(item=> {
                return parseFloat(item)
              });
              perspective = m[11] ? Math.round((m[10] < 0 ? -m[10] : m[10]) / (m[11] < 0 ? -m[11] : m[11])) : 0;
              this.tweenStart.end[p] = Css.getParam(p, _value, easeValue);
              let str = perspective ? 'perspective(' + perspective + 'px)' : '';
              for (let p in newStyle) {
                if (Css.isTransform(p) === 'transform') {
                  str = Css.mergeStyle(newStyle['transform'], str);
                }
              }
              for (let p in this.tweenStart.end) {
                if (Css.isTransform(p) === 'transform') {
                  str = Css.mergeStyle(str, this.tweenStart.end[p]);
                }
              }
              newStyle[cssName] = str;
            } else if (cssName === 'bezier') {
              const bezier = this.tweenStart['bezier' + i] = this.tweenStart['bezier' + i] || new Bezier(this.computedStyle['transform'], _value);
              newStyle['transform'] = Css.mergeStyle(newStyle['transform'] || '', bezier.set(easeValue[0]));
            } else if (cssName === 'filter') {
              newStyle[cssName] = Css.mergeStyle(newStyle[cssName] || '', Css.getFilterParam(this.tweenStart[i][p], _value, easeValue[0]))
            } else {
              newStyle[cssName] = Css.getParam(p, _value, easeValue);
            }
          }
        }
      }

      if (progressTime === item.duration) {
        if (item.repeat && item.repeatAnnal !== item.repeat) {
          item.repeatAnnal++;
          item.initTime = item.initTime + item.duration + item.repeatDelay;
          item.onRepeat();
          this.componentWillUnmount();
        } else {

          this.defaultData[i] = null;
          if (!item.onComplete.only) {
            item.onComplete();
            item.onComplete.only = true;
          }
        }
      }
    });
    this.setState({
      style: newStyle
    });
    if (this.defaultData.every(c=>!c)) {
      this.componentWillUnmount();
    } else {
      this.rafID = requestAnimationFrame(this.raf);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.vars !== nextProps.vars) {
      // 数组情况不全等；
      if (Array.isArray(this.props.vars) && Array.isArray(nextProps.vars)) {
        let equalBool = true;
        for (let i = 0; i < this.props.vars.length; i++) {
          const currentObj = this.props.vars[i];
          const nextObj = nextProps.vars[i];
          for (let p in currentObj) {
            if (currentObj[p] !== nextObj[p]) {
              equalBool = false;
              break;
            }
          }
          if (!equalBool) {
            this.setDefaultData(nextProps.vars || {});
            this.componentWillUnmount();
            this.rafID = requestAnimationFrame(this.raf);
            break;
          }
        }
      } else {
        this.setDefaultData(nextProps.vars || {});
        this.componentWillUnmount();
        this.rafID = requestAnimationFrame(this.raf);
      }
    }
  }

  componentDidMount() {
    const dom = ReactDom.findDOMNode(this);
    this.computedStyle = document.defaultView.getComputedStyle(dom);
    if (this.computedStyle['transform'])
      if (this.defaultData.length) {
        this.rafID = requestAnimationFrame(this.raf);
      }
  }

  componentWillUnmount() {
    requestAnimationFrame.cancel(this._rafID);
    this._rafID = -1;
  }

  render() {
    const style = assign({}, this.state.style);
    for (let p in style) {
      if (p.indexOf('filter') >= 0 || p.indexOf('Filter') >= 0) {
        ['Webkit', 'Moz', 'Ms', 'ms'].forEach((prefix)=> {
          style[`${prefix}Filter`] = style[p];
        });
      }
    }
    return React.createElement(this.props.component, {style: style}, this.props.children);

  }
}

const objectOrArray = React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]);

TweenOne.propTypes = {
  component: PropTypes.string,
  vars: objectOrArray,
};

TweenOne.defaultProps = {
  component: 'div',
  vars: null,
};
export default TweenOne;