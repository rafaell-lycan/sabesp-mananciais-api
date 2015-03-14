var expect  = require('chai').expect,
    Helper  = require('../lib/Helper');

describe('Helper', function () {
  it('Translate image name from water system name', function(done) {
    var odd = Helper.dams;
    Helper.dams = {
      'dummySystem' : 'Dummy'
    };
    var name = Helper.getDamName('imagens/dummySystem.jpg');

    expect(name).to.be.equal('dummySystem');
    expect(Helper.dams[name]).to.be.equal('Dummy');

    Helper.dams = odd;
    done();
  });

  it("Expect the data be the same of mock", function(done) {
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

    expect(Helper.buildData('2003-01-01', token)).to.eql(mock);
    done();
  });
});
