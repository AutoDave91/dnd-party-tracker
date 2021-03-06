let initiative = []

function getInit(req, res){
    res.json(initiative)
}
function rolledInit(req, res){
    let {target, hp_change} = req.body
    let name = target
    let value = +hp_change

    if(initiative[0]){
        let rolled = initiative.find(character => character.name == name)
        if(rolled == undefined){
            initiative.push({name, value})
            initiative.sort((a, b)=>(a.value > b.value) ? -1 : 1)
        }
    } else {
        initiative.push({name, value})
        initiative.sort((a, b)=>(a.value > b.value) ? -1 : 1)
    }
    res.json(initiative)
}
function newInit(req, res){
    // add init replacement
}
function resetInit(){
    initiative = []
}

module.exports = {
    getInit,
    rolledInit,
    newInit,
    resetInit
}