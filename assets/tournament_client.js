function winnerIs(battleId, winnerId, isLast){
    $.ajax({
        type:'POST',
        url:'http://localhost:9090/thewinneris',
        data:{battleId: battleId, winnerId:winnerId},
        success:() => {
            $('#div_battles_' + battleId).hide();
            if (isLast == 'true'){
                getNextBattle();
            }
            else{
                $('#div_battles_' + (parseInt(battleId) + 1)).show();
            }
        }
    });
}

function getNextBattle(){
    $.ajax({
        type:'GET',
        url:'http://localhost:9090/getnextbattle',
        success:(data) => {
            if (data.currentRound.isFinished){
                $('#main_div').html('<h1>Le chat le plus mignon est :</h1><br /><img src=' + data.catsJson.images
                .find(x => x.id == data.currentRound.winnerId).url + ' />');
            }
            else{
                $('#battles').html(displayBattles(data.currentRound.battles, data.catsJson));
            }            
        }
    });
}

function displayBattles(battles, catsJson){
    var html = [];
    var lastElementId = battles[battles.length -1].id;
    for(var index = 0; index < battles.length; index ++){
        var currentBattle =  battles[index];   
        var firstPlayerUrlImg = catsJson.images.find(x => x.id == currentBattle.firstPlayerId).url;
        var secondPlayerUrlImg = catsJson.images.find(x => x.id == currentBattle.secondPlayerId).url;
        html.push("<div id='div_battles_" + currentBattle.id +"'");
        html.push("class=\"row" + (index != 0 ? ' hide' : ' show') + "\">");
        html.push("<div class='column'>");
        html.push("<img src='" + firstPlayerUrlImg + "' style='width:500'");
        html.push("onclick=\"winnerIs('" + currentBattle.id + "','" + currentBattle.firstPlayerId + "','" + 
                (currentBattle.id == lastElementId) + "')\"/>");
        html.push("</div>");
        html.push("<div class='column'>");
        html.push("<img src='" + secondPlayerUrlImg + "' style='width:500'");
        html.push("onclick=\"winnerIs('" + currentBattle.id + "','" + currentBattle.secondPlayerId + "','" + 
                (currentBattle.id == lastElementId) + "')\"/>");
        html.push("</div>");    
        html.push("</div>");
    }
    return html.join("\n");
}