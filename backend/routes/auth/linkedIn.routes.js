const { getProfile } = require("../../controllers/linkedInAuth");

module.exports = function(app){
    app.get('/getUserCredentials/:code', getProfile);
    }
    