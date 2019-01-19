var server = require('../js/server');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;

describe('server', () => {
    it('Affiche la page daccueil', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                done();
            });
    });

    it('Affiche la page de classement', (done) => {
        chai.request(server)
            .get('/getrankings')
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                done();
            });
    });

    it('Retourne les prochaines battle', (done) => {
        chai.request(server)
            .get('/getnextbattle')
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                done();
            });
    });
});