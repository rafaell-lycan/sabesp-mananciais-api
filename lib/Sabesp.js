(function () {
  'use strict';
  var request = require('request'),
      cheerio = require('cheerio'),
      Promise = require('promise');

  // Our Sabesp url
  var token;

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

  function _buildData(date, token) {
    date = date.split('-');

    return {
      "__VIEWSTATE": token.state,
      "__EVENTVALIDATION": token.validation,
      "Imagebutton1.x": 8,
      "Imagebutton1.y": 6,
      "cmbDia": parseInt(date[2], 10),
      "cmbMes": parseInt(date[1], 10),
      "cmbAno": parseInt(date[0], 10)
    };
  }


  var Sabesp = {};
  Sabesp.fetch = function(date) {
    if (date) {
      return new Promise(function(resolve, reject) {
        var data = _buildData(date, token);

        request({
            'url': url,
            'method': 'POST',
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
            resolve(_parserHTML(html));
          }
        );

      });
    } else {
      return new Promise(Sabesp.today);
    }
  };
  Sabesp.today = function(resolve, reject) {
    request(url, function (error, response, html) {
      if (error) {
        reject(error);
      } else {
        resolve(_parserHTML(html));
      }
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

  Sabesp.getToken().then(function(resolve, reject) {
    token = resolve;
  });

  module.exports = Sabesp;
})();
