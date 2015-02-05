(function () {
  'use strict';
  var express = require('express'),
  request = require('request'),
  cheerio = require('cheerio'),
  app     = express();

  // Heroku port settings
  app.set('port', (process.env.PORT || 8080));
  app.use(express.static(__dirname));

  app.get('/', function (req, res) {

    // Our Sabesp url
    var url = 'http://www2.sabesp.com.br/mananciais/DivulgacaoSiteSabesp.aspx';

    // TODO: Improve this mess
    function getSistemaName(name) {
      name = name.split(/[./]+/)[1];

      switch (name) {
        case 'sistemaCantareira':
          return 'Cantareira';
        case 'sistemaAltoTiete':
          return 'Alto Tietê';
        case 'sistemaGuarapiranga':
          return 'Guarapiranga';
        case 'sistemaCotia':
          return 'Alto Cotia';
        case 'sistemaRioGrande':
          return 'Rio Grande';
        case 'sistemaRioClaro':
          return 'Rio Claro';
      }
    }

    request(url, function (error, response, html) {
      if (!error) {
        var $ = cheerio.load(html);

        var json = [];

        $('#tabDados').filter(function () {

          var data = $(this);

          /*===========================
          * TODO: Improve this loops
          ===========================*/

          // Fetch each images on context
          data.find('img').each(function (i, elem) {
            json[i] = {
              name : getSistemaName(elem.attribs.src)
            };
          });

          // Fetch each td with content "volume armazenado"
          data.find('td:contains(volume armazenado)').each(function (i, elem) {
            json[i].vol = {
              desc : 'volume armazenado',
              val : $(elem).next().text()
            };
          });

          // Fetch each td with content "pluviometria do dia"
          data.find('td:contains(pluviometria do dia)').each(function (i, elem) {
            json[i].pluvD = {
              desc : 'pluviometria do dia',
              val : $(elem).next().text()
            };
          });

          // Fetch each td with content "pluviometria acumulada no mês"
          data.find('td:contains(pluviometria acumulada no mês)').each(function (i, elem) {
            json[i].pluvM = {
              desc : 'pluviometria acumulada no mês',
              val : $(elem).next().text()
            };
          });

          // Fetch each td with content "média histórica do mês"
          data.find('td:contains(média histórica do mês)').each(function (i, elem) {
            json[i].avg = {
              desc : 'média histórica do mês',
              val : $(elem).next().text()
            };
          });

        });

        res.json(json);
      }
    });
  });

  app.listen(app.get('port'), function () {
    console.log('Magic happens on port: ' + app.get('port'));
  });

})();