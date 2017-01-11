(function () {
  'use strict';
  var request = require('request'),
      cheerio = require('cheerio'),
      Promise = require('bluebird'),
      debug   = require('debug')('sabesp:crawler'),
      Helper  = require('./Helper');

  Helper.dams = {
    'sistemaCantareira': 'Cantareira',
    'sistemaAltoTiete': 'Alto Tietê',
    'sistemaGuarapiranga': 'Guarapiranga',
    'sistemaCotia': 'Alto Cotia',
    'sistemaRioGrande': 'Rio Grande',
    'sistemaRioClaro': 'Rio Claro'
  };

  var url = 'http://www2.sabesp.com.br/mananciais/DivulgacaoSiteSabesp.aspx';

  var Sabesp = {};
  Sabesp.fetch = function(date, token) {
    return new Promise(function(resolve, reject) {
      var data = Helper.buildData(date, token);

      request({
          'url': url,
          'method': 'GET',
          'headers': {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*-/*;q=0.8',
            'Host': 'www2.sabesp.com.br',
            'Origin': 'http://www2.sabesp.com.br',
            'Referer': url,
            'User-Agent': 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.114 Safari/537.36',
          },
          'jar': true,
          'form': data,
        }, function(error, response, html){
          if (error) {
            reject(error)
          } else {
            resolve(Helper.parserHTML(html, date));
          }
        }
      );

    });
  };

  Sabesp.getToken = function() {
    return new Promise(function(resolve, reject) {
      request(url, function (error, response, html) {
        if (error) {
          reject(error);
        } else {
          var $ = cheerio.load(html),
              ret = {
                state: $('#__VIEWSTATE').val(),
                validation: $('#__EVENTVALIDATION').val()
              };
          resolve(ret);
        }
      });
    });
  };

  module.exports = Sabesp;
})();
