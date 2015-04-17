(function () {
  'use strict';
  var express = require('express'),
      debug   = require('debug')('sabesp:app'),
      app     = express();

  // Heroku port settings
  app.set('port', (process.env.port || 8080));
  app.use(express.static(__dirname));
  app.use(function(req, res, next){
    if (req.url === '/favicon.ico') {
      res.writeHead(200, {'Content-Type': 'image/x-icon'} );
      res.end('');
    } else {
      next();
    }
  });

  app.use('/', require('./routes'));

  app.listen(app.get('port'), function () {
    debug('Magic happens on port: ' + app.get('port'));
  });

  module.exports = app;

})();
