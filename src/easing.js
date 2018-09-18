import easingTypes from 'tween-functions';
import { windowIsUndefined, parsePath } from './util';

easingTypes.path = (_path, _param) => {
  const param = _param || {};
  if (windowIsUndefined) {
    return 'linear';
  }
  const pathNode = parsePath(_path);
  const pathLength = pathNode.getTotalLength();
  const rect = param.rect || 100;// path 的大小，100 * 100，
  const lengthPixel = param.lengthPixel || 200; // 线上取点像素，默认分为 200 段。。
  const points = [];
  for (let i = 0; i < lengthPixel - 1; i++) {
    points.push(pathNode.getPointAtLength((pathLength / (lengthPixel - 1)) * i));
  }
  points.push(pathNode.getPointAtLength(lengthPixel));
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
