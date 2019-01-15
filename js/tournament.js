// createBattle, nextBattle, getRankings


function Tournament() {
    function Battle(id, firstPlayerId, secondPlayerId){
        this.id = id,
        this.firstPlayerId = firstPlayerId,
        this.secondPlayerId = secondPlayerId
    }
    

    // this.createBattle = function(){

    // };
    // images.map(x => x.id)
    this.getNextRound = function(players){
        // TODO : return les battles de la ronde
        var battles = [];
        if (players.length == 1)
        {
            return { isFinished : true, winnerId : players[0], battles:battles};
        }

        battles.push(new Battle(1, players[0], players[1]));

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