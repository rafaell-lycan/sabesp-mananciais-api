var debug  = require('debug')('sabesp:api');
var api = {
  v0: function(resolve, res) {
    res.json(resolve.dams || []);
  },
  v1: function(resolve, res) {
    res.json(resolve);
  },
  v2: function(resolve, res) {
    var ret = [];
    resolve.dams.forEach(function(each) {
      var data = {};

      each.data.forEach(function(d) {
        data[d.key.replace(/\s+/g, '_').replace('ê', 'e').replace('é', 'e').replace('ó', 'o')] = d.value
      })
      ret.push({ name: each.name, data: data });
    });
    res.json(ret);
  }
};

api.reject = function(reject, res) {
  res.json(reject);
};

module.exports = api;
