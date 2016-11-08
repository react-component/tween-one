import easingTypes from 'tween-functions';
import { parsePath } from './util';

easingTypes.path = (_path, _param) => {
  const param = _param || {};
  const pathNode = parsePath(_path);
  const pathLength = pathNode.getTotalLength();
  const rect = param.rect || 100;// path 的大小，100 * 100，
  const lengthPixel = param.lengthPixel || 1500; // 线上取点像素，默认分为 1500 段。。
  const points = [];
  for (let i = 0; i < lengthPixel; i++) {
    points.push(pathNode.getPointAtLength((pathLength / lengthPixel) * i));
  }
  return function path(t, b, _c, d) {
    const p = easingTypes.linear(t, b, _c, d);
    const timePointX = rect * p; // X 轴的百分比;
    // 取出 x 轴百分比上的点;
    const point = points.filter((item) =>
        item.x >= timePointX
      )[0] || pathNode.getPointAtLength(p * pathLength);
    return 1 - (point.y / rect);
  };
};

export default easingTypes;
