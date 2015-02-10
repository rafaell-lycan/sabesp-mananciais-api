(function () {
  'use strict';
  var express = require('express'),
      app     = express(),
      Sabesp  = require('./lib/Sabesp');

  // Heroku port settings
  app.set('port', (process.env.PORT || 8080));
  app.use(express.static(__dirname));

  app.get('/', function (req, res) {
    Sabesp.fetch().then(function(resolve, reject) {
      res.json(resolve);
    });
  });

  app.listen(app.get('port'), function () {
    console.log('Magic happens on port: ' + app.get('port'));
  });

})();
