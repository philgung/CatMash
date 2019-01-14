// createBattle, nextBattle, getRankings


function Battle(players) {


    // this.createBattle = function(){

    // };

    this.nextBattle = function(){
        if (players.length == 1)
        {
            return { isFinished : true, winnerId : players[0]};
        }

        return {isFinished:false, firstPlayerId:players[0], secondPlayerId:players[1]};        

    };

    this.getRankings = function(){

    };
}


module.exports = Battle;