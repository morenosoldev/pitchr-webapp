const { getAllUsers, updateDescription, updateCapitalGoal, updateDevelopmentStage, updateCompetences,updateMarkets,updatePreviousInvestments, updateIndustrys, updateInvestmentInterest, updateInvestorCompetences, updateCapital, updateCalendly, getUser, updateProfilePicture, getChatProfile, updateBusinessIndustrys, updateBusinessMarkets, getInvestor, getBusiness, updateLocation } = require('../../controllers/users');

module.exports = function(app){
app.get('/getAllUsers',getAllUsers);
app.get('/getUser/:id', getUser);
app.get('/getInvestor/:id', getInvestor);
app.get('/getChatProfile/:id', getChatProfile);
app.get('/business/:id',getBusiness);

app.put('/updateMarkets/:id', updateMarkets);
app.put('/updateBusinessMarkets/:id', updateBusinessMarkets);
app.put('/competences/:id', updateCompetences);
app.put('/updateDescription/:id', updateDescription);
app.post('/updateProfilePicture/:id', updateProfilePicture);
app.put('/updateCapital/:id', updateCapital);
app.put('/location/:id', updateLocation);

app.put('/updateGoal/:id', updateCapitalGoal);
app.put('/updateStage/:id', updateDevelopmentStage);
app.put('/updatePreviousInvestments/:id',updatePreviousInvestments);
app.put('/updateIndustrys/:id',updateIndustrys);
app.put('/updateBusinessIndustry/:id',updateBusinessIndustrys);
app.put('/updateInvestmentInterests/:id',updateInvestmentInterest);
app.put('/updateInvestorCompetences/:id',updateInvestorCompetences);
app.put('/updateCalendly/:id', updateCalendly);
}

