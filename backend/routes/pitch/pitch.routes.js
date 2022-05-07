const {createPitch, fetchPitches, savePitch, getSavedPitches, getDevelopmentPitch, getPitch, publishPitch} = require('../../controllers/pitch');


module.exports = function(app){
app.post('/pitch/:id', createPitch);
app.get('/developmentPitch/:id', getDevelopmentPitch);
app.get('/pitches/:id', fetchPitches);
app.post('/publish/:id', publishPitch);
app.get('/pitch/:id',getPitch);
app.post('/savePitch/:pitchID/:investorID', savePitch);
app.get('/getSavedPitches/:id', getSavedPitches);
}

