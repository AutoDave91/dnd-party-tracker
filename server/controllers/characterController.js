// include temp data storage
const data = ['test']

function getAll(req, res){
    res.json(data)
}
// function getParty(req, res){

// }

module.exports = {
    getAll
}