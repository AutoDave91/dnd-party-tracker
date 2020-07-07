let characters = [{campaign: 'Winds of Change', player: 'AutoDave', name: 'Gnaagark', class: 'Barb (Eagle Totem)', role: 'Tank', lvl: 3, max_hp: 25, ac: 15, current_hp: 25, temp_hp: 0, str: 17, dex: 14, con: 16, int: 10, wis: 8, cha: 8, health: 'ok'},
{campaign: 'Winds of Change', player: 'CodyNo', name: 'Throlir', class: 'Fighter (Champion)', role: 'Tank', lvl: 3, max_hp: 28, ac: 18, current_hp: 28, temp_hp: 0, str: 17, dex: 12, con: 14, int: 10, wis: 12, cha: 12, health: 'ok'},
// {campaign: 'Winds of Change', player: 'SwordsaintIIV', name: 'Serr Renn', class: 'Fighter (Battle Master)', role: 'Tank', lvl: 3, max_hp: 25, ac: 19, current_hp: 20, temp_hp: 0, str: 15, dex: 16, con: 13, int: 11, wis: 14, cha: 9, health: 'ok'},
{campaign: 'Winds of Change', player: 'Baum', name: 'Mia', class: 'Fighter (Wild Blade)', role: 'Damage', lvl: 3, max_hp: 23, ac: 16, current_hp: 23, temp_hp: 0, str: 16, dex: 10, con: 14, int: 10, wis: 8, cha: 15, health: 'ok'}, 
{campaign: 'Winds of Change', player: 'Wonsnot', name: 'Thorren', class: 'Wizard (Necromancer)', role: 'Damage', lvl: 3, max_hp: 14, ac: 12, current_hp: 14, temp_hp: 0, str: 8, dex: 14, con: 12, int: 16, wis: 12, cha: 14, health: 'ok'},
// {campaign: 'Winds of Change', player: 'ItsVlad', name: 'Crane', class: 'Bard (CO of Whispers)', role: 'Damage', lvl: 3, max_hp: 18, ac: 14, current_hp: 18, temp_hp: 0, str: 8, dex: 14, con: 10, int: 12, wis: 14, cha: 17, health: 'ok'},
{campaign: 'Winds of Change', player: 'ml1201', name: 'Zealvari', class: 'Cleric (Forge Domain)', role: 'Support', lvl: 3, max_hp: 25, ac: 18, current_hp: 25, temp_hp: 0, str: 14, dex: 8, con: 14, int: 13, wis: 17, cha: 17, health: 'ok'}
]

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
async function editCharacter(req, res){
    // use edit_character.sql
    // 
    let {campaign, target, effect, hp_change, adventurer} = req.body
    // console.log('CC24: ', campaign, target, effect, hp_change)
    // let adventurer = characters.find(({name}) => name === target)
    // console.log(`CC26: ${adventurer.current_hp}`)
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
            if(adventurer.current_hp < 0){
                adventurer.current_hp = 0
            }
        }
    } else if(effect === 'temp_gain'){
        adventurer.temp_hp += +hp_change
    } else if(effect === 'temp_loss'){
        adventurer.temp_hp -= +hp_change
    } else if(effect === 'level'){
        adventurer.lvl += 1
    }
    let character_class = adventurer.class
    let {campaign_id, character_id, ac, active, cha, character_name, con, current_hp, dex, intel, lvl, max_hp, party_role, strength, temp_hp, token, wis} = adventurer
    console.log(`CC48: `, character_name, character_class, party_role, lvl, max_hp, ac, current_hp, temp_hp, strength, dex, con, intel, wis, cha, active, token, character_id)
    const db = req.app.get('db');
    db.edit_character(character_name, character_class, party_role, lvl, max_hp, ac, current_hp, temp_hp, strength, dex, con, intel, wis, cha, active, token, character_id, campaign_id)
    // .then(db.get_party(campaign_id)
        .then(response => res.status(200).json(response))
        .catch(()=>{res.sendStatus(500)})
    // .catch(()=> res.sendStatus(500))

    // let party = characters.filter(character => character.campaign === campaign)
    // res.json(party)
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
        // .then(db.get_party(campaign_id)
            .then(response => res.status(200).json(response))
            .catch(()=>{res.sendStatus(500)})
        // .catch(()=> res.sendStatus(500))
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