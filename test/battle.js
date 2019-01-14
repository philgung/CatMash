// battle.js
// Mode ronde suisse ??
// Première round : Tous les adversaires s’affrontent
// Deuxième round : Ceux qui ont 1 point s’affrontent (pas de conflit), ceux qui ont 0 point s’affrontent (pas de conflit)
// etc ...


// createBattle, nextBattle, getRankings
describe('battle', () => {
    // beforeEach((done) => { 
                        
    // });
    describe('First Round', () => {
        it('Players are divided en two sub groups. A sub group S1 composed from players 1 to n/2, and another sub group s2 composed from players (n/2)+1 to n. The first of S1 play against the first of S2, the second of S1 against the second of S2, etc.', (done) => {
          
        });
        it('En cas de nombre impair de participants le dernier est exempté et marque un point', (done) => {

        });
        
    });
    describe('Others Rounds', () => {        
        it('Après chaque ronde, on regroupe les participants ayant le même nombre de points et on recommence le processus décrit ci-dessus en veillant à ne jamais faire se rencontrer deux fois les mêmes adversaires', (done) => {

        });
        it('Lorsquun participant ne peut être apparié dans son groupe de points (sil est seul ou sil a déjà rencontré tous les autres) il est apparié dans le groupe de points le plus proche.', (done) => {

        });
        it('aucun joueur ne rencontre deux fois le même adversaire', (done) => {

        });
        it('Les joueurs qui gagnent reçoivent un point et les perdants ne reçoivent aucun point', (done) => {

        });
        it('Après le premier tour, les joueurs affrontent des adversaires qui comptent le même nombre de points (ou à peu près). ', (done) => {

        });
        it('On ne garde que les vainqueurs', (done) => {

        });
    });
  
  });






