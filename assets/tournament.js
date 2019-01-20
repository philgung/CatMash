// onclick => send thewinnerIs
// hide currentDiv
// show nextDiv
// si nextDiv == null => afficher bouton continue

// Si click sur bouton continue => /getnextbattle
function winnerIs(battleId, winnerId){
    $.ajax({
        type:'POST',
        url:'http://localhost:9090/thewinneris',
        data:new {battleId: battleId, winnerId:winnerId},
        success:() => {

        }
    });


}