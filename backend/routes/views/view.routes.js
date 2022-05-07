const { addProfileView, getProfileViews, addPitchView, getPitchViews } = require('../../controllers/views');


module.exports = function(app){
app.post('/profileview/:userID/:visitorID', addProfileView);
app.post('/pitchview/:userID/:visitorID', addPitchView);
//app.post('/deckview/:userID/:visitorID', );
app.get('/profileviews/:id', getProfileViews);
app.get('/pitchviews/:id', getPitchViews);
}

