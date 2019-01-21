var express = require('express');
var app = express();
var port = 9090;
var fs = require('fs');
var bodyparser = require('body-parser');

app.use(express.static('assets'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

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
    res.json({currentRound:nextRound, catsJson : catsJson});
});

app.get('/getrankings', (req, res) => {
    res.render('../views/rankings.ejs');
});

app.post('/thewinneris', (req, res) => {
    tournament.winnerIs(req.body.battleId, req.body.winnerId);
    res.sendStatus(200);
});


app.listen(port);
console.log('start Cat Mash server on port ' + port);


module.exports = app;