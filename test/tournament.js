// battle.js
// Mode ronde suisse ??
// Première round : Tous les adversaires s’affrontent
// Deuxième round : Ceux qui ont 1 point s’affrontent (pas de conflit), ceux qui ont 0 point s’affrontent (pas de conflit)
// etc ...

var Tournament = require('../js/tournament');
var chai = require('chai');
var expect = chai.expect;

function theWinnerIs(currentRound, winnerId){
  expect(currentRound.winnerId).to.be.equal(winnerId);
}
function battlesCountIs(currentRound, expectedCount){
  expect(currentRound.battles.length).to.be.equal(expectedCount);
}
function playerPointIs(tournament, playerId, expectedPoint){
  expect(tournament.getRanking(playerId)).to.be.equal(expectedPoint);
}
function battleOpponentWas(battle, firstPlayerId, secondPlayerId){
  expect(battle.firstPlayerId).to.be.eql(firstPlayerId);
  expect(battle.secondPlayerId).to.be.eql(secondPlayerId);
}
function battleIsFinished(battle){
  expect(battle.isFinished).to.be.true;
}
function playersAre(players, expectedPlayers){
  expect(players).to.be.eql(expectedPlayers);
}
function playersCountIs(tournament, expectedCount){
  expect(tournament.getPlayers().length).to.be.equal(expectedCount);
}
function battleIdIs(battle, expectedBattleId){
  expect(battle.id).to.be.equal(expectedBattleId);
}

describe('tournament', () => {
    describe('getNextRound', () => {
        describe('Les participants sont divisés en deux sous groupes. Un sous groupe S1 composé de participants 1 à n/2, et un sous groupe s2 composé de participants (n/2)+1 à n. Le premier participant de S1 affronte le premier de S2, le second de S1 affronte le second de S2, etc.', () => {
          it('Pour 1 seul participant, il est déclaré vainqueur.', () => {
            var players = ['firstPlayerId'];  
            var tournament = new Tournament(players);
            tournament.init();
            var nextRound = tournament.getNextRound();
            expect(nextRound.isFinished).to.be.true;
            expect(nextRound.battles).to.be.undefined;
            theWinnerIs(nextRound, 'firstPlayerId');
          });
          it('Pour 2 participants, les deux saffrontent.', () => {
            var players = ['firstPlayerId', 'secondPlayerId'];
            var tournament = new Tournament(players);
            tournament.init();
            var nextRound = tournament.getNextRound();
            expect(nextRound.isFinished).to.be.false;
            battlesCountIs(nextRound, 1);
            expect(nextRound.winnerId).to.be.undefined;
            battleOpponentWas(nextRound.battles[0], 'firstPlayerId', 'secondPlayerId');
            battleIdIs(nextRound.battles[0], 1);
          });
          it('Pour 3 participants, les deux premiers saffrontent, le dernier naffronte personne, mais il gagne 1 point.', () => {
            var players = ['firstPlayerId', 'secondPlayerId', 'thirdPlayerId'];
            var tournament = new Tournament(players);
            tournament.init();
            var nextRound = tournament.getNextRound();
            expect(nextRound.isFinished).to.be.false;
            battlesCountIs(nextRound, 1);
            expect(nextRound.winnerId).to.be.undefined;
            battleOpponentWas(nextRound.battles[0], 'firstPlayerId', 'secondPlayerId');
            battleIdIs(nextRound.battles[0], 1);
          });
          it('Pour 4 participants, les quatres premiers saffrontent.', () => {
            var players = ['firstPlayerId', 'secondPlayerId', 'thirdPlayerId', 'fourthPlayerId'];
            var tournament = new Tournament(players);
            tournament.init();
            var nextRound = tournament.getNextRound();
            expect(nextRound.isFinished).to.be.false;
            battlesCountIs(nextRound, 2);
            expect(nextRound.winnerId).to.be.undefined;
            battleOpponentWas(nextRound.battles[0], 'firstPlayerId', 'thirdPlayerId');
            battleIdIs(nextRound.battles[0], 1);
            battleOpponentWas(nextRound.battles[1], 'secondPlayerId', 'fourthPlayerId');
            battleIdIs(nextRound.battles[1], 2);
          });
          it('Pour 11 participants, les dix premiers saffrontent, le dernier naffronte personne, mais il gagne 1 point.', () => {
            var players = ['firstPlayerId', 'secondPlayerId', 'thirdPlayerId','fourthPlayerId', 'fifthPlayerId', 
            'sixthPlayerId', 'seventhPlayerId', 'heighthPlayerId', 'ninthPlayerId','tenthPlayerId', 'eleventhPlayerId'];
            var tournament = new Tournament(players);
            tournament.init();
            var nextRound = tournament.getNextRound();
            expect(nextRound.isFinished).to.be.false;
            battlesCountIs(nextRound, 5);
            expect(nextRound.winnerId).to.be.undefined;
            battleOpponentWas(nextRound.battles[0], 'firstPlayerId', 'sixthPlayerId');
            battleIdIs(nextRound.battles[0], 1);
            battleOpponentWas(nextRound.battles[1], 'secondPlayerId', 'seventhPlayerId');
            battleIdIs(nextRound.battles[1], 2);
            battleOpponentWas(nextRound.battles[2], 'thirdPlayerId', 'heighthPlayerId');
            battleIdIs(nextRound.battles[2], 3);
            battleOpponentWas(nextRound.battles[3], 'fourthPlayerId', 'ninthPlayerId');
            battleIdIs(nextRound.battles[3], 4);
            battleOpponentWas(nextRound.battles[4], 'fifthPlayerId', 'tenthPlayerId');
            battleIdIs(nextRound.battles[4], 5);
          });

        });
        it('En cas de nombre impair (3) de participants le dernier est exempté et marque un point',() => {
          var players = ['firstPlayerId', 'secondPlayerId', 'thirdPlayerId'];
            var tournament = new Tournament(players);
            tournament.init();
            playerPointIs(tournament, 'firstPlayerId', 0);
            playerPointIs(tournament, 'secondPlayerId', 0);
            playerPointIs(tournament, 'thirdPlayerId', 0);
            var nextRound = tournament.getNextRound();
            playerPointIs(tournament, 'thirdPlayerId', 1);
        });        
        it('En cas de nombre impair (11) de participants le dernier est exempté et marque un point', () => {
          var players = ['firstPlayerId', 'secondPlayerId', 'thirdPlayerId','fourthPlayerId', 'fifthPlayerId', 
            'sixthPlayerId', 'seventhPlayerId', 'heighthPlayerId', 'ninthPlayerId','tenthPlayerId', 'eleventhPlayerId'];
            var tournament = new Tournament(players);
            tournament.init();
            var nextRound = tournament.getNextRound();
            playerPointIs(tournament, 'eleventhPlayerId', 1);
        });

        it('Les identifiants des battles sont uniques.', () =>{

        });
        
    });
    describe('Les Autres rondes', () => {    
        it('On ne peut lancer une nouvelle ronde, si la précédente ne sest pas terminé.',() =>{
          var players = ['firstPlayerId', 'secondPlayerId', 'thirdPlayerId'];
            var tournament = new Tournament(players);
            tournament.init();
            var currentRound = tournament.getNextRound();
            expect(currentRound.isFinished).to.be.false;
            expect(currentRound.winnerId).to.be.undefined;
            battlesCountIs(currentRound, 1);
            var nextRound = tournament.getNextRound();
            expect(currentRound.firstPlayerId).to.be.eql(nextRound.firstPlayerId);
            expect(currentRound.secondPlayerId).to.be.eql(nextRound.secondPlayerId);
            expect(currentRound.isFinished).to.be.eql(nextRound.isFinished);
        });    
        it('Après chaque ronde, on regroupe les vainqueurs et on recommence le processus décrit ci-dessus. Cas de joueurs impair (5), le dernier joueur devient le premier sur la ronde suivante. Aucun adversaire ne peut se rencontrer deux fois;', () => {
            var players = ['firstPlayerId', 'secondPlayerId', 'thirdPlayerId','fourthPlayerId', 'fifthPlayerId'];
            var tournament = new Tournament(players);
            tournament.init();
            var nextRound = tournament.getNextRound();
            playersAre(players, ['fifthPlayerId','firstPlayerId', 'secondPlayerId', 'thirdPlayerId','fourthPlayerId']);
            tournament.winnerIs(nextRound.battles[0].id, 'firstPlayerId');
            playersCountIs(tournament, 4);
            battleIsFinished(nextRound.battles[nextRound.battles[0].id - 1]);
            tournament.winnerIs(nextRound.battles[1].id, 'secondPlayerId');
            playersCountIs(tournament, 3);
            battleIsFinished(nextRound.battles[nextRound.battles[1].id - 1]);
            var secondRound = tournament.getNextRound();
            playersAre(players, ['secondPlayerId', 'fifthPlayerId', 'firstPlayerId']);
            tournament.winnerIs(secondRound.battles[0].id, 'secondPlayerId');
            playersCountIs(tournament, 2);
            battleIsFinished(secondRound.battles[0]);
            var thirdRound = tournament.getNextRound();
            playersAre(players, ['secondPlayerId', 'firstPlayerId']);
            tournament.winnerIs(thirdRound.battles[0].id, 'secondPlayerId');
            playersCountIs(tournament, 1);
            playersAre(players, ['secondPlayerId']);
            expect(thirdRound.battles[0].isFinished).to.be.true;
            var finalRound = tournament.getNextRound();
            expect(finalRound.isFinished).to.be.true;
            expect(finalRound.winnerId).to.be.equal('secondPlayerId');
            expect(finalRound.battles).to.be.undefined;
        });
        it('Après chaque ronde, on regroupe les vainqueurs et on recommence le processus décrit ci-dessus. Cas de joueurs pair (4).', () => {
          var players = ['firstPlayerId', 'secondPlayerId', 'thirdPlayerId','fourthPlayerId'];
          var tournament = new Tournament(players);
          tournament.init();
          var nextRound = tournament.getNextRound();
          playersAre(players, ['firstPlayerId', 'secondPlayerId', 'thirdPlayerId','fourthPlayerId']);
          tournament.winnerIs(nextRound.battles[0].id, 'firstPlayerId');
          playersCountIs(tournament, 3);
          battleIsFinished(nextRound.battles[nextRound.battles[0].id - 1]);
          tournament.winnerIs(nextRound.battles[1].id, 'secondPlayerId');
          playersCountIs(tournament, 2);
          battleIsFinished(nextRound.battles[nextRound.battles[1].id - 1])
          var secondRound = tournament.getNextRound();
          playersAre(players, ['firstPlayerId', 'secondPlayerId']);
          tournament.winnerIs(secondRound.battles[0].id, 'secondPlayerId');
          playersCountIs(tournament, 1);
          battleIsFinished(secondRound.battles[0]);
          var finalRound = tournament.getNextRound();
          expect(finalRound.isFinished).to.be.true;
          theWinnerIs(finalRound, 'secondPlayerId');
          expect(finalRound.battles).to.be.undefined;
      });
        it('Les joueurs qui gagnent reçoivent un point et les perdants ne reçoivent aucun point', () => {
          var players = ['firstPlayerId', 'secondPlayerId', 'thirdPlayerId','fourthPlayerId', 'fifthPlayerId'];
          var tournament = new Tournament(players);
          tournament.init();
          playerPointIs(tournament, 'firstPlayerId', 0);
          playerPointIs(tournament, 'secondPlayerId', 0);
          playerPointIs(tournament, 'thirdPlayerId', 0);
          playerPointIs(tournament, 'fourthPlayerId', 0);
          playerPointIs(tournament, 'fifthPlayerId', 0);
          
          var nextRound = tournament.getNextRound();
          tournament.winnerIs(nextRound.battles[0].id, 'firstPlayerId');
          playerPointIs(tournament, 'firstPlayerId', 1);
          playerPointIs(tournament, 'thirdPlayerId', 0);
          tournament.winnerIs(nextRound.battles[1].id, 'secondPlayerId');
          playerPointIs(tournament, 'secondPlayerId', 1);
          playerPointIs(tournament, 'fourthPlayerId', 0);
          var secondRound = tournament.getNextRound();
          tournament.winnerIs(secondRound.battles[0].id, 'firstPlayerId');
          playerPointIs(tournament, 'firstPlayerId', 2);
          playerPointIs(tournament, 'fifthPlayerId', 1);
          var thirdRound = tournament.getNextRound();
          tournament.winnerIs(thirdRound.battles[0].id, 'secondPlayerId');
          playerPointIs(tournament, 'firstPlayerId', 2);
          playerPointIs(tournament, 'secondPlayerId', 3);
          var finalRound = tournament.getNextRound();

          playerPointIs(tournament, 'firstPlayerId', 2);
          playerPointIs(tournament, 'secondPlayerId', 3);
          playerPointIs(tournament, 'thirdPlayerId', 0);
          playerPointIs(tournament, 'fourthPlayerId', 0);
          playerPointIs(tournament, 'fifthPlayerId', 1);
        });
       
    });
  
  });






