var assert  = require('assert'),
    Helper  = require('../../lib/Helper');

describe('Helper', function () {
  it('Translate image name from water system name', function() {
    var odd = Helper.dams;
    Helper.dams = {
      'dummySystem' : 'Dummy'
    };
    var name = Helper.getDamName('imagens/dummySystem.jpg');

    assert.equal(name, 'dummySystem');
    assert.equal(Helper.dams[name], 'Dummy');

    Helper.dams = odd;
  });

  it("Expect the data be the same of mock", function() {
    var token = {
      state : 'xpto',
      validation : 'lorem'
    },
        mock  = {
      "__VIEWSTATE": token.state,
      "__EVENTVALIDATION": token.validation,
      "Imagebutton1.x": 8,
      "Imagebutton1.y": 6,
      "cmbDia": 1,
      "cmbMes": 1,
      "cmbAno": 2003
    };

    assert.deepEqual(Helper.buildData('2003-01-01', token), mock);
  });

  it("#today returns today data on yyyy-mm-dd format", function() {
    assert.ok(/\d{4}-\d{2}-\d{2}/.test(Helper.today()));
  });
});
