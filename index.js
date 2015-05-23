'use strict';
require('newrelic'); // Don't move from here if your use New Relic APM

var express = require('express'),
    cors    = require('cors'),
    debug   = require('debug')('sabesp:app'),
    app     = express(),
    config  = require('config'),
    ua      = require('universal-analytics');

var visitor = ua(process.env.ANALYTICS || config.get('analytics'));

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

app.use(function (req, res, next) {
  debug(req.path);
  visitor.pageview(req.path).send();
  visitor.event('API', 'Fetch Data', req.path).send();
  next();
});
app.use('/', require('./routes'));

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  debug(err);
  res.status(err.status || 500).json({ err: err.message });
});

app.listen(app.get('port'), function () {
  debug('Magic happens on port: ' + app.get('port'));
});

module.exports = app;

