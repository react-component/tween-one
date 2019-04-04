import { IAnimObject } from './AnimObject';

export default class RcTweenOneGroup {
  constructor(target: Object, animation: IAnimObject | IAnimObject[], attr?: 'style' | 'attr');
  init: () => void;
  frame: (moment?: Number) => void;
  target: Object;
  progressTime: Number;
  totalTime: Number;
}