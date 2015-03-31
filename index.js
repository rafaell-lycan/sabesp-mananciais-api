(function () {
  'use strict';
  var express = require('express'),
      app     = express(),
      Promise = require('promise'),
      Mongo   = require('./lib/Mongo'),
      Helper  = require('./lib/Helper'),
      Sabesp  = require('./lib/Sabesp'),
      token;

  Sabesp.getToken()
    .then(function(resolve) {
      token = resolve;
      done();
    });

  // Heroku port settings
  app.set('port', (process.env.PORT || 8080));
  app.use(express.static(__dirname));

  function isCached (date) {
    return new Promise(function(resolve, reject) {
      Mongo.findOne('dams', { date: date }, function(err, result) {
        if (result) {
          resolve(result);
        } else {
          Sabesp.fetch(date, token).then(function(data, err) {
            Mongo.insert('dams', data, function(err, result) {
              if (err) {
                console.log(err);
              } else {
                console.log('Inserted on mongo ' + result);
              }
            });

            resolve(data);
          });
        }
      });
    });
  }

  app.get('/', function (req, res) {
    isCached(Helper.today()).then(function(resolve, reject) {
      res.json(resolve);
    });
  });

  app.get('/:date', function (req, res) {
    isCached(req.params.date).then(function(resolve, reject) {
      res.json(resolve);
    });
  });

  app.listen(app.get('port'), function () {
    console.log('Magic happens on port: ' + app.get('port'));
  });


  module.exports = app;

})();
