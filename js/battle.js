// createBattle, nextBattle, getRankings


function Battle(players) {


    // this.createBattle = function(){

    // };

    this.nextBattle = function(){
        if (players.length == 1)
        {
            return { isFinished : true, winnerId : players[0]};
        }

        return {
            id:1,
            isFinished:false, 
            firstPlayerId:players[0], 
            secondPlayerId:players[1]};        

    };

    this.winnerIs = function(battleId, winnerPlayerId){

    }

    this.getRankings = function(){

    };
}


module.exports = Battle;