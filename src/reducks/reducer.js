import Axios from 'axios';

const initialState ={
    user: {username: 'AutoDave'},
    // user: {},
    username: '',
    password: '',
    campaign: '',
    data: [
        {campaign: 'sw5e1', img: 'https://cdn.discordapp.com/attachments/316704555154800642/630934544375349248/Grayjedithetermgrayjediorgrayhadtwo_324b74_5788445.jpg', player: 'Wonsnot', name: 'Geoff', class: 'Consular', lvl: 4, max_hp: 18, ac: 13, current_hp: 18, temp_hp: 0, str: 12, dex: 16, con: 10, int: 11, wis: 10, cha: 16}, 
        {campaign: 'sw5e1', img: 'https://i.pinimg.com/originals/11/56/d3/1156d37d76f884da477279fed684080b.jpg', player: 'AutoDave', name: 'O-yasha', class: 'Guardian', lvl: 4, max_hp: 32, ac: 15, current_hp: 32, temp_hp: 0, str: 15, dex: 10, con: 14, int: 11, wis: 17, cha: 10}, 
        {campaign: 'sw5e1', img: 'http://www.swagonline.net/sites/default/files/images/Mercy/2008/Nov/Twi%27lek%20beauty%201.3.jpg', player: 'NantanLupan', name: 'Gadget', class: 'Engineer', lvl: 4, max_hp: 35, ac: 0, current_hp: 35, temp_hp: 0, str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0}, 
        {campaign: 'sw5e1', img: 'https://i.pinimg.com/originals/a1/b1/9b/a1b19b276722710a7444fcb42cd222b5.jpg', player: 'StormReavan', name: 'Vulcan', class: 'Operative', lvl: 4, max_hp: 0, ac: 0, current_hp: 0, temp_hp: 0, str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0},
        {campaign: 'LnD', img: '', player: 'test', name: 'test', class: 'test', lvl: 0, max_hp: 0, ac: 0, current_hp: 0, temp_hp: 0, str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0},
        {campaign: 'TOA', img: 'https://i.redd.it/spb1m2ah02w31.jpg', player: 'AutoDave', name: 'Belrann', class: 'Life Cleric', lvl: 2, max_hp: 14, ac: 18, current_hp: 14, temp_hp: 0, str: 13, dex: 10, con: 14, int: 8, wis: 16, cha: 14},
        {campaign: 'TOA', img: 'https://cdn.discordapp.com/attachments/444293281002815499/678451390162403328/T.jpg', player: 'Wonsnot', name: 'Shroom', class: 'Wild Magic Sorcerer', lvl: 2, max_hp: 14, ac: 11, current_hp: 14, temp_hp: 0, str: 10, dex: 13, con: 15, int: 8, wis: 12, cha: 17},
        {campaign: 'TOA', img: 'https://i.pinimg.com/originals/f8/6d/12/f86d122d8f6b82931a0fe445f9053cc9.png', player: 'SwordsaintIIV', name: 'Blackstone', class: 'Paladin', lvl: 2, max_hp: 18, ac: 18, current_hp: 18, temp_hp: 0, str: 16, dex: 14, con: 12, int: 8, wis: 10, cha: 14},
        {campaign: 'TOA', img: 'https://external-preview.redd.it/h8iD8AA-eN_hgj4obnZF0bpvtL30EPYgXwwFaYG2xgU.jpg?auto=webp&s=e5381181026c902374081416b9c2068ca72d9d6d', player: 'CodyNo', name: 'T______', class: 'Barbarian', lvl: 2, max_hp: 14, ac: 15, current_hp: 14, temp_hp: 0, str: 15, dex: 14, con: 15, int: 8, wis: 11, cha: 12},
        {campaign: 'TOA', img: 'https://i.pinimg.com/originals/63/f6/9a/63f69a75216603622a8e270524f0ea29.jpg', player: 'Baum', name: 'Elaana', class: 'Ranged Fighter', lvl: 1, max_hp: 12, ac: 16, current_hp: 12, temp_hp: 0, str: 8, dex: 17, con: 14, int: 11, wis: 13, cha: 12}
    ]
}

// const GET_USER = 'GET_USER';
// const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const SET_USERNAME = 'SET_USERNAME';
const SET_ADMIN = 'SET_ADMIN';
// const SET_OPTION = 'SET_OPTION';

// export const getUser = () => {
//     return{
//         type: GET_USER,
//         payload: Axios.get('/auth/user')
//     }
// }
// export const login = (username, password) => {
//     return{
//         type: LOGIN,
//         payload: Axios.post('/auth/login', {username, password})
//     }
// }
export const logout = () => {
    return{
        type: LOGOUT,
        payload: Axios.get('/auth/logout')
    }
}

function reducer(state = initialState, action){
    switch(action.type){
        // case `${GET_USER}_PENDING`:
        // case `${GET_USER}_FULFILLED`:
        //     return {...state, user: action.payload}
        case `${SET_USERNAME}_FULFILLED`:
                return {...state, username: action.payload};
        case `${SET_ADMIN}_FULFILLED`:
            return {...state, admin: action.payload};
        // case `${LOGIN}_PENDING`:
        // case `${LOGIN}_FULFILLED`:
        //     return {...state, user: action.payload};
        case `${LOGOUT}_FULFILLED`:
            return {
                user: {},
                username: '',
                password: ''
            }
        default: return state;
    }
}

export default reducer