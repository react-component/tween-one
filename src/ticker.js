/* eslint-disable func-names */
import requestAnimationFrame from 'raf';

const getTime = Date.now || (() => new Date().getTime());
const sortObj = {
  interval: 1,
  timeout: 1,
  TweenOneTicker: 2,
}
const tickObjToArray = (obj) => (
  Object.keys(obj).map(k => ({
    key: k,
    func: obj[k],
  })).sort((a, b) => {
    const aa = a.key.split('_')[0];
    const bb = b.key.split('_')[0];
    return sortObj[bb] - sortObj[aa];
  })
);
const Ticker = function () {
};
Ticker.prototype = {
  tickFnArray: [],
  tickKeyObject: {},
  id: -1,
  tweenId: 0,
  frame: 0,
  perFrame: Math.round(1000 / 60),
  elapsed: 0,
  lastUpdate: getTime(),
  startTime: getTime(),// 开始时间，不计算 react 渲染时间；
  nextTime: 0,
  time: 0,
};
const p = Ticker.prototype;
p.add = function (fn) {
  const key = `TweenOneTicker_${this.tweenId}`;
  this.tweenId++;
  this.wake(key, fn);
  return key;
};
p.wake = function (key, fn) {
  this.tickKeyObject[key] = fn;
  this.tickFnArray = tickObjToArray(this.tickKeyObject);
  if (this.id === -1) {
    this.id = requestAnimationFrame(this.tick);
  }
};
p.clear = function (key) {
  delete this.tickKeyObject[key];
  this.tickFnArray = tickObjToArray(this.tickKeyObject);
};
p.sleep = function () {
  requestAnimationFrame.cancel(this.id);
  this.id = -1;
  this.frame = 0;
};
const ticker = new Ticker;
p.tick = function (a) {
  ticker.elapsed = getTime() - ticker.lastUpdate;
  // 离开当前时设值 300；大于 300 则为离开。
  if (ticker.elapsed > 300) {
    ticker.startTime += ticker.elapsed - ticker.perFrame;
  }
  ticker.lastUpdate += ticker.elapsed;
  ticker.time = ticker.lastUpdate - ticker.startTime;
  const overlap = ticker.time - ticker.nextTime;
  if (overlap > 0 || !ticker.frame) {
    ticker.frame++;
    ticker.nextTime += overlap;
  }
  // console.log(ticker.frame, ticker.nextTime, ticker.time)
  ticker.tickFnArray.forEach(item => item.func(a));
  // 如果 object 里没对象了，自动杀掉；
  if (!ticker.tickFnArray.length) {
    ticker.sleep();
    return;
  }
  ticker.id = requestAnimationFrame(ticker.tick);
};
let timeoutIdNumber = 0;
p.timeout = function (fn, time) {
  if (!(typeof fn === 'function')) {
    return console.warn('not function');// eslint-disable-line
  }
  const timeoutID = `timeout_${Date.now()}-${timeoutIdNumber}`;
  const startTime = this.time;
  this.wake(timeoutID, () => {
    const moment = this.time - startTime;
    if (moment >= (time || 0)) {
      this.clear(timeoutID);
      fn();
    }
  });
  timeoutIdNumber++;
  return timeoutID;
};
let intervalIdNumber = 0;
p.interval = function (fn, time) {
  if (!(typeof fn === 'function')) {
    console.warn('not function');// eslint-disable-line
    return null;
  }
  const intervalID = `interval_${Date.now()}-${intervalIdNumber}`;
  let starTime = this.time;
  this.wake(intervalID, () => {
    const moment = this.time - starTime;
    if (moment >= (time || 0)) {
      starTime = this.time;
      fn();
    }
  });
  intervalIdNumber++;
  return intervalID;
};
export default ticker;
