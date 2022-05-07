const { addMember, deleteMember, getTeamMembers } = require('../../controllers/team');

module.exports = function(app){
app.post('/member/:id',addMember)
app.delete('/member/:id',deleteMember)
app.get('/members/:id',getTeamMembers)
}