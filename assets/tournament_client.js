// onclick => send thewinnerIs
// hide currentDiv
// show nextDiv
// si nextDiv == null => afficher bouton continue

// Si click sur bouton continue => /getnextbattle
function winnerIs(battleId, winnerId){
    $.ajax({
        type:'POST',
        url:'http://localhost:9090/thewinneris',
        data:{battleId: battleId, winnerId:winnerId},
        success:() => {
            $('#div_battles_' + battleId).hide();
            $('#div_battles_' + (parseInt(battleId) + 1)).show();
        }
    });


}