// battle.js
// Mode ronde suisse ??
// Première round : Tous les adversaires s’affrontent
// Deuxième round : Ceux qui ont 1 point s’affrontent (pas de conflit), ceux qui ont 0 point s’affrontent (pas de conflit)
// etc ...

var Tournament = require('../js/tournament');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;

describe('battle', () => {
    describe('getNextRound', () => {
        describe('Les participants sont divisés en deux sous groupes. Un sous groupe S1 composé de participants 1 à n/2, et un sous groupe s2 composé de participants (n/2)+1 à n. Le premier participant de S1 affronte le premier de S2, le second de S1 affronte le second de S2, etc.', () => {
          it('Pour 1 seul participant, il est déclaré vainqueur.', () => {
            var players = ['firstPlayerId'];  
            var tournament = new Tournament(players);
            tournament.init();
            var nextRound = tournament.getNextRound();
            expect(nextRound.isFinished).to.be.true;
            expect(nextRound.battles.length).to.be.equal(0);
            expect(nextRound.winnerId).to.be.equal('firstPlayerId');
          });
          it('Pour 2 participants, les deux saffrontent.', () => {
            var players = ['firstPlayerId', 'secondPlayerId'];
            var tournament = new Tournament(players);
            tournament.init();
            var nextRound = tournament.getNextRound();
            expect(nextRound.isFinished).to.be.false;
            expect(nextRound.battles.length).to.be.equal(1);
            expect(nextRound.winnerId).to.be.undefined;
            expect(nextRound.battles[0].firstPlayerId).to.be.eql('firstPlayerId');
            expect(nextRound.battles[0].secondPlayerId).to.be.eql('secondPlayerId');
            expect(nextRound.battles[0].id).to.be.equal(1);
          });
          it('Pour 3 participants, les deux premiers saffrontent, le dernier naffronte personne, mais il gagne 1 point.', () => {
            var players = ['firstPlayerId', 'secondPlayerId', 'thirdPlayerId'];
            var tournament = new Tournament(players);
            tournament.init();
            var nextRound = tournament.getNextRound();
            expect(nextRound.isFinished).to.be.false;
            expect(nextRound.battles.length).to.be.equal(1);
            expect(nextRound.winnerId).to.be.undefined;
            expect(nextRound.battles[0].firstPlayerId).to.be.eql('firstPlayerId');
            expect(nextRound.battles[0].secondPlayerId).to.be.eql('secondPlayerId');
            expect(nextRound.battles[0].id).to.be.equal(1);
            // third possède 1 point supplémentaire
            expect(tournament.getRanking('thirdPlayerId').points).to.be.equal(1);
          });
          it('Pour 4 participants, les quatres premiers saffrontent.', () => {
            var players = ['firstPlayerId', 'secondPlayerId', 'thirdPlayerId', 'fourthPlayerId'];
            var tournament = new Tournament(players);
            tournament.init();
            var nextRound = tournament.getNextRound();
            expect(nextRound.isFinished).to.be.false;
            expect(nextRound.battles.length).to.be.equal(2);
            expect(nextRound.winnerId).to.be.undefined;
            expect(nextRound.battles[0].firstPlayerId).to.be.eql('firstPlayerId');
            expect(nextRound.battles[0].secondPlayerId).to.be.eql('thirdPlayerId');
            expect(nextRound.battles[0].id).to.be.equal(1);
            expect(nextRound.battles[1].firstPlayerId).to.be.eql('secondPlayerId');
            expect(nextRound.battles[1].secondPlayerId).to.be.eql('fourthPlayerId');
            expect(nextRound.battles[1].id).to.be.equal(2);
          });
          it('Pour 11 participants, les dix premiers saffrontent, le dernier naffronte personne, mais il gagne 1 point.', () => {
            var players = ['firstPlayerId', 'secondPlayerId', 'thirdPlayerId','fourthPlayerId', 'fifthPlayerId', 
            'sixthPlayerId', 'seventhPlayerId', 'heighthPlayerId', 'ninthPlayerId','tenthPlayerId', 'eleventhPlayerId'];
            var tournament = new Tournament(players);
            tournament.init();
            var nextRound = tournament.getNextRound();
            expect(nextRound.isFinished).to.be.false;
            expect(nextRound.battles.length).to.be.equal(5);
            expect(nextRound.winnerId).to.be.undefined;
            expect(nextRound.battles[0].firstPlayerId).to.be.eql('firstPlayerId');
            expect(nextRound.battles[0].secondPlayerId).to.be.eql('sixthPlayerId');
            expect(nextRound.battles[0].id).to.be.equal(1);
            expect(nextRound.battles[1].firstPlayerId).to.be.eql('secondPlayerId');
            expect(nextRound.battles[1].secondPlayerId).to.be.eql('seventhPlayerId');
            expect(nextRound.battles[1].id).to.be.equal(2);
            expect(nextRound.battles[2].firstPlayerId).to.be.eql('thirdPlayerId');
            expect(nextRound.battles[2].secondPlayerId).to.be.eql('heighthPlayerId');
            expect(nextRound.battles[2].id).to.be.equal(3);
            expect(nextRound.battles[3].firstPlayerId).to.be.eql('fourthPlayerId');
            expect(nextRound.battles[3].secondPlayerId).to.be.eql('ninthPlayerId');
            expect(nextRound.battles[3].id).to.be.equal(4);
            expect(nextRound.battles[4].firstPlayerId).to.be.eql('fifthPlayerId');
            expect(nextRound.battles[4].secondPlayerId).to.be.eql('tenthPlayerId');
            expect(nextRound.battles[4].id).to.be.equal(5);
            // eleventh possède 1 point supplémentaire
          });

        });        
        it('En cas de nombre impair de participants le dernier est exempté et marque un point', () => {

        });
        it('Les identifiants des battles sont uniques.', () =>{

        });
        
    });
    describe('Les Autres rondes', () => {        
        it('Après chaque ronde, on regroupe les participants ayant le même nombre de points et on recommence le processus décrit ci-dessus en veillant à ne jamais faire se rencontrer deux fois les mêmes adversaires', () => {

        });
        it('Lorsquun participant ne peut être apparié dans son groupe de points (sil est seul ou sil a déjà rencontré tous les autres) il est apparié dans le groupe de points le plus proche.', () => {

        });
        it('aucun joueur ne rencontre deux fois le même adversaire', () => {

        });
        it('Les joueurs qui gagnent reçoivent un point et les perdants ne reçoivent aucun point', () => {

        });
        it('Après le premier tour, les joueurs affrontent des adversaires qui comptent le même nombre de points (ou à peu près). ', () => {

        });
        it('On ne garde que les vainqueurs', () => {

        });
    });
  
  });






