

function getAll(req, res){
    res.json(characters)
}
async function getParty(req, res){
    // console.log(`CC21: ${req.query}`)
    const db = req.app.get('db');
    let campaignID = await db.get_campaign([req.query.campaign])
    let campaign = campaignID[0].campaign_id
    console.log(campaign)
    db.get_party(campaign)
        .then(response => {res.status(200).json(response); console.log(response)})
        .catch(()=>{res.sendStatus(500)})
}
function editCharacter(req, res){
    let {campaign, target, effect, hp_change} = req.body
    let adventurer = characters.find(({name}) => name === target)
    // console.log(adventurer)
    if(effect === 'heal'){
        if(adventurer.current_hp + +hp_change > adventurer.max_hp){
            adventurer.current_hp = adventurer.max_hp
        } else {adventurer.current_hp += +hp_change}
    } else if(effect === 'damage'){
        if(adventurer.temp_hp >= +hp_change){
            adventurer.temp_hp -= +hp_change
        } else {
            let rollOver = +hp_change - adventurer.temp_hp
            adventurer.current_hp -= +rollOver
            adventurer.temp_hp = 0
        }
    } else if(effect === 'temp_gain'){
        adventurer.temp_hp += +hp_change
    } else if(effect === 'temp_loss'){
        adventurer.temp_hp -= +hp_change
    } else if(effect === 'level'){
        adventurer.lvl += 1
    }
    let party = characters.filter(character => character.campaign === campaign)
    // console.log(party)
    res.json(party)
}
function longRest(req, res){
    let party = characters.filter(character => character.campaign === req.body.campaign)
    party.forEach( character => {
        character.current_hp = character.max_hp
    })
    res.json(party)
}

module.exports = {
    getAll,
    getParty,
    editCharacter,
    longRest
}