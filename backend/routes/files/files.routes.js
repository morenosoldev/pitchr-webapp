const { getVideoPitchFiles, deleteVideoPitchFile, createFile, getFiles, deleteFile } = require('../../controllers/files');
const {auth} = require('../../middleware/auth');


module.exports = function(app){
app.get('/pitchfiles/:id',[auth],getVideoPitchFiles);
app.delete('/pitchfile/:id',[auth], deleteVideoPitchFile);
app.post('/file/:id',[auth],createFile)
app.get('/files/:id',[auth], getFiles);
app.delete('/file/:id',[auth],deleteFile);
}

