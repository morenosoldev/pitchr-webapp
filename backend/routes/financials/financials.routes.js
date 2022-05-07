const { insertMRR, getFinancialData, createFinancial, deleteFinancial } = require('../../controllers/financials');


module.exports = function(app){
app.post('/financial/:id',createFinancial);
app.delete('/financial/:id',deleteFinancial);
app.get('/financials/:id',getFinancialData);
}

