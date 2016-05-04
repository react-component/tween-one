import requestAnimationFrame from 'raf';


const Ticker = function() {
};
const p = Ticker.prototype = {
  tickFnObject: {},
  id: -1,
  autoSleep: 120,
  frame: 0,
  autoSleepFrame: 2,
};
p.wake = function(key, fn) {
  this.tickFnObject[key] = fn;
  if (this.id === -1) {
    this.tick();
  }
};
p.clear = function(key) {
  delete this.tickFnObject[key];
};
p.sleep = function() {
  requestAnimationFrame.cancel(this.id);
  this.id = -1;
};
const ticker = new Ticker;
p.tick = function(a) {
  const obj = ticker.tickFnObject;
  Object.keys(obj).forEach(key => {
    if (obj[key]) {
      obj[key](a);
    }
  });
  // 如果 object 里没对象了，两秒种后自动睡眠；
  if (!Object.keys(obj).length) {
    if (ticker.frame >= ticker.autoSleepFrame) {
      return ticker.sleep();
    }
  } else {
    ticker.autoSleepFrame = ticker.frame + ticker.autoSleep;
  }
  ticker.frame++;
  ticker.id = requestAnimationFrame(ticker.tick);
};
export default ticker;
