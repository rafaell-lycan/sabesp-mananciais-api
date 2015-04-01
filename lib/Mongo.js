var MongoClient = require('mongodb').MongoClient,
    config      = require('config');

/* istanbul ignore next */
var Mongo = (function() {
  'use strict';

  var module = {
    _init: function(callback) {
      var url = 'mongodb://' + config.get('mongo.server') + ':' + config.get('mongo.port') + '/' + config.get('mongo.database');

      MongoClient.connect(url, callback);
    },

    findOne: function(collection, query, callback) {
      module._init(function(err, db) {
        if (db) {
          db.collection(collection).findOne(query, callback);
        } else {
          callback(err);
        }
      });
    },

    insert: function(collection, data, callback) {
      module._init(function(err, db) {
        if (db) {
          db.collection(collection).insert(data, callback);
        } else {
          callback(err);
        }
      });
    }
  };

  return module;
}());

module.exports = Mongo;
