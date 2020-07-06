function addCampaign(req, res){
    // allows user to add a campaign
    // receives campaign name
    // use add_campaign.sql
}
function addCharacter(req, res){
    // allows user to add their character to an existing campaign
    // receives all stats including campaign
    // use add_character.sql
}
function editCharacter(req, res){
    // use edit_character.sql
    let {campaign, target, effect, hp_change} = req.body
    let adventurer = characters.find(({name}) => name === target)
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
    res.json(party)
}
async function getParty(req, res){
    const db = req.app.get('db');
    let campaignID = await db.get_campaign([req.query.campaign])
    let campaign = campaignID[0].campaign_id
    db.get_party(campaign)
        .then(response => {res.status(200).json(response);
        })
        .catch(()=>{res.sendStatus(500)})
}
async function longRest(req, res){
    const db = req.app.get('db');
    let {campaign_id} = req.body
    db.long_rest(campaign_id)
        .then(db.get_party(campaign_id)
            .then(response => res.status(200).json(response))
            .catch(()=>{res.sendStatus(500)}))
        .catch(()=> res.sendStatus(500))
}
async function userCharacters(req, res){
    const db = req.app.get('db');
    let {user} = req.query;
    db.get_characters(user)
        .then(response => res.status(200).json(response))
        .catch(()=> res.sendStatus(500))
}

module.exports = {
    addCampaign,
    addCharacter,
    getParty,
    editCharacter,
    longRest,
    userCharacters
}