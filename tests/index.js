import 'core-js/es6/map';
import 'core-js/es6/set';

const req = require.context('.', false, /\.spec\.jsx?$/);
req.keys().forEach(req);
