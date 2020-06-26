// include temp data storage
const characters = [
{campaign: 'TOA', player: 'AutoDave', name: 'Nortle', class: 'Druid', role: 'Support', lvl: 1, max_hp: 10, ac: 19, current_hp: 10, temp_hp: 0, str: 12, dex: 12, con: 14, int: 13, wis: 16, cha: 8, health: 'ok'},
{campaign: 'TOA', player: 'CodyNo', name: 'Jasdof', class: 'Barbarian', role: 'Tank', lvl: 2, max_hp: 14, ac: 15, current_hp: 14, temp_hp: 0, str: 15, dex: 14, con: 15, int: 8, wis: 11, cha: 12, health: 'ok'},
{campaign: 'TOA', player: 'SwordsaintIIV', name: 'Lou', class: 'Fighter', role: 'Tank', lvl: 1, max_hp: 11, ac: 19, current_hp: 11, temp_hp: 0, str: 16, dex: 15, con: 12, int: 8, wis: 12, cha: 14, health: 'ok'},
{campaign: 'TOA', player: 'Wonsnot', name: 'Shroom', class: 'Wild Magic Sorcerer', role: 'Damage', lvl: 2, max_hp: 14, ac: 11, current_hp: 14, temp_hp: 0, str: 10, dex: 13, con: 15, int: 8, wis: 12, cha: 17, health: 'ok'},
{campaign: 'TOA', player: 'Baum', name: 'Elaana', class: 'Fighter', role: 'Damage', lvl: 1, max_hp: 12, ac: 16, current_hp: 12, temp_hp: 0, str: 8, dex: 17, con: 14, int: 11, wis: 13, cha: 12, health: 'ok'}, 
{campaign: 'TOA', player: 'ItsVlad', name: 'Thwip', class: 'Rogue', role: 'Damage', lvl: 1, max_hp: 10, ac: 14, current_hp: 10, temp_hp: 0, str: 10, dex: 17, con: 14, int: 13, wis: 13, cha: 8, health: 'ok'}, {campaign: 'Winds of Change', player: 'AutoDave', name: 'Gnaagark', class: 'Barb (Eagle Totem)', role: 'Tank', lvl: 3, max_hp: 25, ac: 15, current_hp: 11, temp_hp: 0, str: 17, dex: 14, con: 16, int: 10, wis: 8, cha: 8, health: 'ok'},
{campaign: 'Winds of Change', player: 'CodyNo', name: 'Throlir', class: 'Fighter (Champion)', role: 'Tank', lvl: 3, max_hp: 20, ac: 18, current_hp: 19, temp_hp: 0, str: 17, dex: 12, con: 14, int: 10, wis: 12, cha: 12, health: 'ok'},
{campaign: 'Winds of Change', player: 'SwordsaintIIV', name: 'Serr Renn', class: 'Fighter (Battle Master)', role: 'Tank', lvl: 3, max_hp: 25, ac: 19, current_hp: 20, temp_hp: 0, str: 15, dex: 16, con: 13, int: 11, wis: 14, cha: 9, health: 'ok'},
{campaign: 'Winds of Change', player: 'Wonsnot', name: 'Thorren', class: 'Wizard (Necromancer)', role: 'Damage', lvl: 3, max_hp: 14, ac: 12, current_hp: 14, temp_hp: 0, str: 8, dex: 14, con: 12, int: 16, wis: 12, cha: 14, health: 'ok'},
{campaign: 'Winds of Change', player: 'Baum', name: 'Mia', class: 'Fighter (Wild Blade)', role: 'Damage', lvl: 3, max_hp: 23, ac: 16, current_hp: 23, temp_hp: 0, str: 16, dex: 10, con: 14, int: 10, wis: 8, cha: 15, health: 'ok'}, 
{campaign: 'Winds of Change', player: 'ItsVlad', name: 'Crane', class: 'Bard (CO of Whispers)', role: 'Damage', lvl: 3, max_hp: 18, ac: 14, current_hp: 18, temp_hp: 0, str: 8, dex: 14, con: 10, int: 12, wis: 14, cha: 17, health: 'ok'},
{campaign: 'Winds of Change', player: 'ml1201', name: 'Zealvari', class: 'Cleric (Forge Domain)', role: 'Support', lvl: 3, max_hp: 27, ac: 18, current_hp: 10, temp_hp: 0, str: 14, dex: 8, con: 14, int: 13, wis: 17, cha: 17, health: 'ok'}
]

function getAll(req, res){
    res.json(characters)
}
async function getParty(req, res){
    // console.log(`CC21: ${req.query}`)

    // const db = req.app.get('db');
    // let campaignID = await db.get_campaign([req.query.campaign])
    // let campaign = campaignID[0].campaign_id
    // console.log(campaign)
    // db.get_party(campaign)
    //     .then(response => {res.status(200).json(response); console.log(response)})
    //     .catch(()=>{res.sendStatus(500)})

    let party = characters.filter(character => character.campaign === req.query.campaign)
    res.json(party)
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