(function () {
  'use strict';
  var express = require('express'),
      app     = express();

  // Heroku port settings
  app.set('port', (process.env.PORT || 8080));
  app.use(express.static(__dirname));

  app.use('/', require('./routes'));

  app.listen(app.get('port'), function () {
    console.log('Magic happens on port: ' + app.get('port'));
  });


  module.exports = app;

})();
