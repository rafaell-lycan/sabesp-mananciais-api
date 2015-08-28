var express = require('express'),
    router  = express.Router(),
    Promise = require('bluebird'),
    debug   = require('debug')('sabesp:routes'),
    moment  = require('moment'),
    Mongo   = require('../lib/Mongo'),
    Helper  = require('../lib/Helper'),
    Sabesp  = require('../lib/Sabesp'),
    api     = require('../lib/APIVersions'),
    token;

Sabesp.getToken()
  .then(function(resolve) {
    token = resolve;
  });


router.use(function(request, response, next) {
  var date = request.url.replace(/(.*)(\d{4}-\d{2}-\d{2})/, '$2');

  if (!date || Helper._isValidDateFormat(date) || /(\/v2|\/v1)?\//.test(date)) {
    return next();
  }

  var err = new Error('Invalid date format');
  err.statusCode = 400;
  next(err);
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
  var isNotValidDate = req.params.date !== undefined && !Helper._isValidDateFormat(req.params.date);
  if (isNotValidDate) {
    return next();
  }
  var date = req.params.date || Helper.today();
  _isCached(date)
    .then(function(resolve) {
      api.v0(resolve, res);
    })
    .catch(next);
});

router.get('/loaderio-deb75e3581d893735fd6e5050757bdb2', function (req, res, next) {
  res.send('loaderio-deb75e3581d893735fd6e5050757bdb2');
});

function _isCached (date) {
  return new Promise(function(resolve, reject) {
    Mongo.collection('dams').findOne({ date: date }, function(err, result) {
      if (result) {
        resolve(result);
      } else {
        Sabesp.fetch(date, token).then(function(result) {
          if (_isAcceptableDate(result, date)) {
            Mongo.collection('dams').insert(result, function(err, result) {
              if (err) { debug('err', err); }
            });
          }
          resolve(result);
        })
        .catch(function(err) {
          reject(err);
        });
      }
    });
  });
}

function _isAcceptableDate(result, date) {
  debug(date, moment(date).toString(), moment(Helper.today()).toString());
  return (date !== '') && (moment(date) < moment(Helper.today())) && (result.date !== '');
}

module.exports = router;
