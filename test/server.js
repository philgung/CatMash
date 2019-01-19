var server = require('../js/server');
var chai = require('chai');
var expect = chai.expect;

describe('getNextBattle', () => {
    it('Contacte serveur', (done) => {
        chai.request(server)
            .get('/GetNextBattle')
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                done();
            });
    });
});