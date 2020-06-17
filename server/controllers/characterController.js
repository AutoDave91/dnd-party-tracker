// include temp data storage
const characters = [
{campaign: 'TOA', player: 'AutoDave', name: 'Nortle', class: 'Druid', role: 'Healer', lvl: 1, max_hp: 10, ac: 19, current_hp: 10, temp_hp: 0, str: 12, dex: 12, con: 14, int: 13, wis: 16, cha: 8, health: 'ok'},
{campaign: 'TOA', player: 'CodyNo', name: 'Jasdof', class: 'Barbarian', role: 'Tank', lvl: 2, max_hp: 14, ac: 15, current_hp: 14, temp_hp: 0, str: 15, dex: 14, con: 15, int: 8, wis: 11, cha: 12, health: 'ok'},
{campaign: 'TOA', player: 'SwordsaintIIV', name: 'Lou', class: 'Fighter', role: 'Tank', lvl: 1, max_hp: 11, ac: 19, current_hp: 11, temp_hp: 0, str: 16, dex: 15, con: 12, int: 8, wis: 12, cha: 14, health: 'ok'},
{campaign: 'TOA', player: 'Wonsnot', name: 'Shroom', class: 'Wild Magic Sorcerer', role: 'Damage', lvl: 2, max_hp: 14, ac: 11, current_hp: 14, temp_hp: 0, str: 10, dex: 13, con: 15, int: 8, wis: 12, cha: 17, health: 'ok'},
{campaign: 'TOA', player: 'Baum', name: 'Elaana', class: 'Fighter', role: 'Damage', lvl: 1, max_hp: 12, ac: 16, current_hp: 12, temp_hp: 0, str: 8, dex: 17, con: 14, int: 11, wis: 13, cha: 12, health: 'ok'}, 
{campaign: 'TOA', player: 'ItsVlad', name: 'Thwip', class: 'Rogue', role: 'Damage', lvl: 1, max_hp: 10, ac: 14, current_hp: 10, temp_hp: 0, str: 10, dex: 17, con: 14, int: 13, wis: 13, cha: 8, health: 'ok'}, {campaign: 'Winds of Change', player: 'AutoDave', name: 'Gnaagark', class: 'Barbarian', role: 'Tank', lvl: 3, max_hp: 25, ac: 15, current_hp: 11, temp_hp: 0, str: 17, dex: 14, con: 16, int: 10, wis: 8, cha: 8, health: 'ok'},
{campaign: 'Winds of Change', player: 'CodyNo', name: 'Throfir', class: 'Fighter', role: 'Tank', lvl: 2, max_hp: 20, ac: 18, current_hp: 19, temp_hp: 0, str: 17, dex: 12, con: 14, int: 10, wis: 12, cha: 12, health: 'ok'},
{campaign: 'Winds of Change', player: 'SwordsaintIIV', name: 'Serr', class: 'Fighter', role: 'Tank', lvl: 3, max_hp: 25, ac: 19, current_hp: 20, temp_hp: 0, str: 15, dex: 16, con: 13, int: 11, wis: 14, cha: 9, health: 'ok'},
{campaign: 'Winds of Change', player: 'Wonsnot', name: 'Thorren', class: 'Wizard', role: 'Damage', lvl: 3, max_hp: 14, ac: 12, current_hp: 14, temp_hp: 0, str: 8, dex: 14, con: 12, int: 16, wis: 12, cha: 14, health: 'ok'},
{campaign: 'Winds of Change', player: 'Baum', name: 'Mia', class: 'Fighter', role: 'Damage', lvl: 3, max_hp: 23, ac: 16, current_hp: 23, temp_hp: 0, str: 16, dex: 10, con: 14, int: 10, wis: 8, cha: 15, health: 'ok'}, 
{campaign: 'Winds of Change', player: 'ItsVlad', name: 'Crane', class: 'Bard', role: 'Damage', lvl: 3, max_hp: 18, ac: 14, current_hp: 18, temp_hp: 0, str: 8, dex: 14, con: 10, int: 12, wis: 14, cha: 17, health: 'ok'},
{campaign: 'Winds of Change', player: 'ml1201', name: 'Zealvari', class: 'Cleric', role: 'Healer', lvl: 2, max_hp: 18, ac: 18, current_hp: 10, temp_hp: 0, str: 14, dex: 8, con: 14, int: 13, wis: 17, cha: 17, health: 'ok'}
]

function getAll(req, res){
    res.json(characters)
}
function getParty(req, res){
    let party = characters.filter(character => character.campaign === req.body.campaign)
    res.json(party)
}
// function to alter a character's stats.
    // receive: campaign name, character name, stat name
    // alter: targeted stat's value
    // return: new party info
function editCharacter(req, res){
    let {target, campaign, effect, hp_change} = req.body
    let party = characters.filter(character => character.campaign === campaign)
    // console.log('CC30:', party)
    // let adventurer = party.filter(character => {
    //     console.log('CC31:', party, character.name, target);
    //     character.name === target})
    for(let i=0; i < party.length; i++){
        if(party[i].name === target){
            let member = party[i]
            if(effect === 'level'){
                console.log(member.name, 'leveled up')
                member.lvl += 1
            } else if (effect === 'damage'){
                console.log('Ouch')
                member.current_hp -= +hp_change
            } else if (effect === 'heal'){
                // need cap to keep over healing
                console.log('That feels better')
                member.current_hp += +hp_change
            } else if (effect === 'temp_gain'){
                console.log('That might help')
                member.temp_hp += +hp_change
            } else if (effect === 'temp_loss'){
                console.log('Oh dear...')
                member.temp_hp -= +hp_change
            }
        }
    }
    // console.log('CC45:',party, effect, hp_change, req.body)
    party = characters.filter(character => character.campaign === campaign)
    res.json(party)
}

module.exports = {
    getAll, getParty, editCharacter
}