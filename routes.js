var express = require('express'),
    router  = express.Router(),
    Promise = require('bluebird'),
    debug   = require('debug')('sabesp:routes'),
    Mongo   = require('./lib/Mongo'),
    Helper  = require('./lib/Helper'),
    Sabesp  = require('./lib/Sabesp'),
    api     = require('./lib/APIVersions'),
    token;

Sabesp.getToken()
  .then(function(resolve) {
    token = resolve;
  });

router.get('/v1/:date?', function (req, res, next) {
  var date = req.params.date || Helper.today();
  _isCached(date)
    .then(function(resolve) {
      api.v1(resolve, res);
    })
    .catch(next);
});

router.get('/v2/:date?', function (req, res, next) {
  var date = req.params.date || Helper.today();
  _isCached(date)
    .then(function(resolve) {
      api.v2(resolve, res);
    })
    .catch(next);
});

router.get('/:date?', function (req, res, next) {
  var date = req.params.date || Helper.today();
  _isCached(date)
    .then(function(resolve) {
      api.v0(resolve, res);
    })
    .catch(next);
});

function _isCached (date) {
  return new Promise(function(resolve, reject) {
    Mongo.findOne('dams', { date: date }, function(err, result) {
      if (result) {
        resolve(result);
      } else {
        Sabesp.fetch(date, token).then(function(data) {
          if ((date !== '') && (data.date !== '') && (date !== Helper.today())) {
            Mongo.insert('dams', data, function(err, result) {
              if (err) { debug('err', err); }
            });
          }
          resolve(data);
        })
        .catch(function(err) {
          reject(err);
        });
      }
    });
  });
}

module.exports = router;
