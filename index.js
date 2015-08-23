'use strict';
require('newrelic'); // Don't move from here if your use New Relic APM

var express = require('express'),
    cors    = require('cors'),
    debug   = require('debug')('sabesp:app'),
    ga      = require('./middleware/analytics'),
    Helper  = require('./lib/Helper'),
    app     = express();

app.set('port', (process.env.PORT || 8080));

app.use(cors());
app.use(express.static(__dirname));
app.use(function (req, res, next) {
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'});
    res.end('');
  } else {
    next();
  }
});

app.use(ga.track);

app.use('/', require('./middleware/routes'));

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  debug(err);
  res.status(err.statusCode || 500).json({ err: err.message });
});

app.listen(app.get('port'), function () {
  debug('Magic happens on port: ' + app.get('port'));
});

module.exports = app;

