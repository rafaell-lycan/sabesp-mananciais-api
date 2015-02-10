(function () {
  'use strict';
  var request = require('request'),
      cheerio = require('cheerio'),
      Promise = require('promise');

  // Our Sabesp url
  var url = 'http://www2.sabesp.com.br/mananciais/DivulgacaoSiteSabesp.aspx';

  var dams = {
    "sistemaCantareira": "Cantareira",
    "sistemaAltoTiete": "Alto Tietê",
    "sistemaGuarapiranga": "Guarapiranga",
    "sistemaCotia": "Alto Cotia",
    "sistemaRioGrande": "Rio Grande",
    "sistemaRioClaro": "Rio Claro"
  };

  function _getDamName(str) {
    var name = str.split(/[./]+/)[1];
    return dams[name];
  }

  function _buildJSON(json, data, $, cssSelector, key) {
    data.find(cssSelector).each(function (i, elem) {
      json[i].data.push({
        key : key,
        value : $(elem).next().text()
      });
    });
  }

  function _parserHTML(html) {
    var json = [],
        $    = cheerio.load(html);

    $('#tabDados').filter(function () {
      var data = $(this);

      // Fetch each images on context
      data.find('img').each(function (i, elem) {
        json[i] = {
          name : _getDamName(elem.attribs.src),
          data : []
        };
      });

      // Fetch each td with content "volume armazenado"
      _buildJSON(json, data, $, 'td:contains(volume armazenado)', 'volume armazenado');

      // Fetch each td with content "pluviometria do dia"
      _buildJSON(json, data, $, 'td:contains(pluviometria do dia)', 'pluviometria do dia');

      // Fetch each td with content "pluviometria acumulada no mês"
      _buildJSON(json, data, $, 'td:contains(pluviometria acumulada no mês)', 'pluviometria acumulada no mês');

      // Fetch each td with content "média histórica do mês"
      _buildJSON(json, data, $, 'td:contains(média histórica do mês)', 'média histórica do mês');
    });

    return json;
  }

  var Sabesp = {};
  Sabesp.fetch = function() {
    return new Promise(function(resolve, reject) {
      request(url, function (error, response, html) {
        if (error) {
          reject(error);
        } else {
          resolve(_parserHTML(html));
        }
      });
    });
  };

  module.exports = Sabesp;
})();
