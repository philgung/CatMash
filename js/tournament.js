// createBattle, nextBattle, getRankings


function Tournament(allPlayers) {
    function Battle(id, firstPlayerId, secondPlayerId){
        this.id = id,
        this.firstPlayerId = firstPlayerId,
        this.secondPlayerId = secondPlayerId
    }

    var players = [];
    var battles = [];
    var rankings = new Object();
    this.init = function(){
        players = allPlayers;
        allPlayers.forEach(player => {
            rankings[player] = 0;
        });
    }
    
    var battleId = 1;

    // images.map(x => x.id)
    this.getNextRound = function(){
        if (players.length == 1)
        {
            return { isFinished : true, winnerId : players[0], battles:battles};
        }
        else
        {
            if (players.length % 2 == 1){
                rankings[players[players.length - 1]] += 1;
            }
            var subGroupCount = Math.floor(isNaN(players % 2) ? (players.length / 2) : (players.length - 1) / 2);
            for(var index = 0; index < subGroupCount; index++)
            {
                battles.push(new Battle(battleId, players[index], players[index + subGroupCount]));
                battleId ++;
            }            
        }

        return {
            isFinished:false,             
            battles:battles};        

    }

    this.winnerIs = function(battleId, winnerPlayerId){
        // players = uniquement les vainqueurs, supprimer les perdants
        var currentBattle = battles.find((battle) => {
            return battle.id == battleId;
        });
        var loserPlayerId;
        if (currentBattle.firstPlayerId == winnerPlayerId){
            loserPlayerId = currentBattle.secondPlayerId;

        }
        else{
            loserPlayerId = currentBattle.firstPlayerId;

        }
        delete players[loserPlayerId];
    }

    this.getRanking= function(playerId){
        return rankings[playerId];
    }

    this.getRankings = function(){

    };
}


module.exports = Tournament;