// createBattle, nextBattle, getRankings


function Tournament(allPlayers) {
    function Battle(id, firstPlayerId, secondPlayerId){
        this.id = id,
        this.firstPlayerId = firstPlayerId,
        this.secondPlayerId = secondPlayerId
    }
    
    var battleId = 1;
    
    // images.map(x => x.id)
    this.getNextRound = function(players){
        var battles = [];
        if (players.length == 1)
        {
            return { isFinished : true, winnerId : players[0], battles:battles};
        }
        else if (players.length == 2)
        {
            battles.push(new Battle(battleId, players[0], players[1]));
            battleId ++;
        }
        else
        {
            var totalPlayers = 0;
            if (players % 2){
                totalPlayers = players.length / 2;
            }
            else{
                totalPlayers = (players.length - 1) / 2;
            }
            for(var index = 0; index < totalPlayers; index++)
            {
                battles.push(new Battle(battleId, players[index], players[index + totalPlayers]));
                battleId ++;
            }            
        }

        return {
            isFinished:false,             
            battles:battles};        

    }

    this.winnerIs = function(battleId, winnerPlayerId){

    }

    this.getRankings = function(){

    };
}


module.exports = Tournament;