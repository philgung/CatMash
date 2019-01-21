var server = require('../js/server');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;

describe('server', () => {
    it('/GET Affiche la page daccueil', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                done();
            });
    });

    it('/GET Retourne les prochaines batailles', (done) => {
        chai.request(server)
            .get('/getnextbattle')
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body.currentRound.battles.length).to.be.equal(50);
                done();
            });
    });

    it('/POST Designe un vainqueur', (done) => {
        chai.request(server)
            .get('/')
            .end(() => {
                chai.request(server)
                    .post('/thewinneris')
                    .send({battleId:1, winnerId:'MTgwODA3MA'})
                    .end((err, res) => {
                        expect(res.status).to.be.equal(200);
                    });
                done();
            });
        
        
    });

    it('/GET Affiche la page de classement', (done) => {
        chai.request(server)
            .get('/')
            .end(() => {
                chai.request(server)
                    .get('/getrankings')
                    .end((err, res) => {
                        expect(res.status).to.be.equal(200);
                    });
                done();    
                });
    });
});