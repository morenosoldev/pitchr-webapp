const { createPitchDeck, getPitchDecks, getPitchDeck } = require('../../controllers/pitchdeck');
const {auth} = require('../../middleware/auth');


module.exports = function(app){
app.post('/deck/:id',createPitchDeck);
app.get('/deck/:id', getPitchDeck);
app.get('/decks/:id',getPitchDecks);
}

