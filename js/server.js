// /GET GetNextBattle : idBattle, catIdA, catIdB
// /POST FinishBattle(idBattle, catIdWinner)
// /GET GetRankings() : Array [ rank, idCat, urlImage]

// Le but de cet exercice est de développer une mini application web qui permet de trouver
// le chat le plus mignon.
// En se basant sur l'UX de Facemash et les données de https://latelier.co/data/cats.json.
// L'application devra donc être composée de deux pages :
// Une page pour voter
// Une page pour voir tous les chats avec leur score
// La technologie est libre.
// L’application doit pouvoir être utilisable depuis Google Chrome.
// Le projet devra être publié sur un GitHub public.
// Le projet devra être hébergé pour être accessible publiquement.
// Pendant la review de votre code, une attention toute particulière sera portée à la qualité
// du code (structure, organisation, noms des variables et méthodes, etc...), la fréquence et
// description des commits, ainsi qu’à l’expérience globale que propose l’application.
// Il n’est pas grave que le projet ne soit pas entièrement terminé.
// https://latelier.co/data/cats.json

var express = require('express');
var app = express();
var port = 9090;
var fs = require('fs');

app.use(express.static('assets'));
var Tournament = require('./tournament');
var tournament;

var catsJson = JSON.parse(fs.readFileSync('data/cats.json'));

app.get('/', (req, res) =>{
    tournament = new Tournament(catsJson.images.map(x => x.id));
    tournament.init();
    var nextRound = tournament.getNextRound();
    res.render('../views/tournament.ejs', 
    {currentRound:nextRound, catsJson : catsJson});
});

app.get('/getnextbattle', (req, res) => {
    var nextRound = tournament.getNextRound();
    res.json({currentRound:nextRound});
});

app.get('/getrankings', (req, res) => {
    res.render('../views/rankings.ejs');
});






// Start server
app.listen(port);
console.log('start Cat Mash server on port ' + port);


module.exports = app;