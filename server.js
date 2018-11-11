const http = require('http');
const app  = require('./backend/app');
const debug = require('debug')('node-angular');

var port =  process.env.PORT || 3000;

app.set('port', port);

var server = http.createServer(app);
server.listen(port);
