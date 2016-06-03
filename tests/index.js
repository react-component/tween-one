const req = require.context('.', false, /\.spec\.jsx?$/);
req.keys().forEach(req);
