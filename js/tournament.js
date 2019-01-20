
function Tournament(allPlayers) {
    function Battle(id, firstPlayerId, secondPlayerId){
        this.id = id,
        this.firstPlayerId = firstPlayerId,
        this.secondPlayerId = secondPlayerId,
        this.isFinished = false;
    }

    var players = [];
    var battles = [];
    var rankings = {};
    this.init = function(){
        players = allPlayers;
        allPlayers.forEach(player => {
            rankings[player] = 0;
        });
    }
    
    var battleId = 1;

    // images.map(x => x.id)
    this.getNextRound = function(){
        battles = [];
        if (players.length == 1)
        {
            return { isFinished : true, winnerId : players[0], battles:undefined};
        }
        else
        {
            const isOdd = players.length % 2 == 1;
            if (isOdd){
                rankings[players[players.length - 1]] += 1;
            }
            var subGroupCount = Math.floor(isNaN(players % 2) ? (players.length / 2) : (players.length - 1) / 2);
            for(var index = 0; index < subGroupCount; index++)
            {
                battles.push(new Battle(battleId, players[index], players[index + subGroupCount]));
                battleId ++;
            }   
            if (isOdd){
                var lastPlayer = players.pop();
                players.unshift(lastPlayer);
            }         
        }

        return {
            isFinished:false,             
            battles:battles};        

    }

    this.winnerIs = function(battleId, winnerPlayerId){
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
        players.splice(players.indexOf(loserPlayerId), 1);

        rankings[winnerPlayerId] += 1;
        currentBattle.isFinished = true;
    }

    this.getRanking= function(playerId){
        return rankings[playerId];
    }

    this.getRankings = function(){
        var keys = [];
        for(var key in rankings){
            keys.push(key);
        }

        var values = [];
        for(var index = 0; index <keys.length; index++){
            values.push({'playerId': keys[index], 'points' : rankings[keys[index]]});
        }
        return values.sort((a,b) => b.points - a.points);
    };

    this.getPlayers = function(){
        return players;
    }
}


module.exports = Tournament;