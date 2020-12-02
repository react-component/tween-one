// more config: https://d.umijs.org/config
import { defineConfig } from 'dumi';
const path = require('path');

export default defineConfig({
  title: 'rc-tween-one',
  favicon:
    'https://avatars0.githubusercontent.com/u/9441414?s=200&v=4',
  logo:
    'https://avatars0.githubusercontent.com/u/9441414?s=200&v=4',
  outputPath: '.doc',
  alias: {
    'rc-tween-one':path.join(__dirname, 'src'),
    'rc-tween-one/es': path.join(__dirname, 'src'),
    'rc-tween-one/lib': path.join(__dirname, 'src'),
  },
});