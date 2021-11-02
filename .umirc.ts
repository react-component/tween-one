// more config: https://d.umijs.org/config
import { defineConfig } from 'dumi';
const path = require('path');

export default defineConfig({
  title: 'rc-tween-one',
  favicon: 'https://zos.alipayobjects.com/rmsportal/TOXWfHIUGHvZIyb.svg',
  logo: 'https://zos.alipayobjects.com/rmsportal/TOXWfHIUGHvZIyb.svg',
  outputPath: '.doc',
  alias: {
    'rc-tween-one/es': path.join(__dirname, 'src'),
    'rc-tween-one/lib': path.join(__dirname, 'src'),
  },
});