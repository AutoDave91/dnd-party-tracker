import Axios from 'axios';

const initialState ={
    user: {username: 'AutoDave'},
    // user: {},
    username: '',
    password: '',
    campaign: '',
    data: [
        // {campaign: 'sw5e1', player: 'Wonsnot', name: 'Geoff', class: 'Consular', lvl: 4, max_hp: 18, ac: 13, current_hp: 18, temp_hp: 0, str: 12, dex: 16, con: 10, int: 11, wis: 10, cha: 16, health: 'ok'}, 
        // {campaign: 'sw5e1', player: 'AutoDave', name: 'O-yasha', class: 'Guardian', lvl: 4, max_hp: 32, ac: 15, current_hp: 32, temp_hp: 0, str: 15, dex: 10, con: 14, int: 11, wis: 17, cha: 10, health: 'ok'}, 
        // {campaign: 'sw5e1', player: 'NantanLupan', name: 'Gadget', class: 'Engineer', lvl: 4, max_hp: 35, ac: 0, current_hp: 35, temp_hp: 0, str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0, health: 'ok'}, 
        // {campaign: 'sw5e1', player: 'StormReavan', name: 'Vulcan', class: 'Operative', lvl: 4, max_hp: 0, ac: 0, current_hp: 0, temp_hp: 0, str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0, health: 'ok'},

        {campaign: 'TOA', player: 'AutoDave', name: 'Belrann', class: 'Life Cleric', role: 'Healer', lvl: 2, max_hp: 14, ac: 18, current_hp: 14, temp_hp: 0, str: 13, dex: 10, con: 14, int: 8, wis: 16, cha: 14, health: 'ok'},
        {campaign: 'TOA', player: 'Wonsnot', name: 'Shroom', class: 'Wild Magic Sorcerer', role: 'Damage', lvl: 2, max_hp: 14, ac: 11, current_hp: 14, temp_hp: 0, str: 10, dex: 13, con: 15, int: 8, wis: 12, cha: 17, health: 'ok'},
        {campaign: 'TOA', player: 'SwordsaintIIV', name: 'Blackstone', class: 'Paladin', role: 'Tank', lvl: 2, max_hp: 18, ac: 18, current_hp: 18, temp_hp: 0, str: 16, dex: 14, con: 12, int: 8, wis: 10, cha: 14, health: 'ok'},
        {campaign: 'TOA', player: 'CodyNo', name: 'Jasdof', class: 'Barbarian', role: 'Tank', lvl: 2, max_hp: 14, ac: 15, current_hp: 14, temp_hp: 0, str: 15, dex: 14, con: 15, int: 8, wis: 11, cha: 12, health: 'ok'},
        {campaign: 'TOA', player: 'Baum', name: 'Elaana', class: 'Ranged Fighter', role: 'Damage', lvl: 1, max_hp: 12, ac: 16, current_hp: 12, temp_hp: 0, str: 8, dex: 17, con: 14, int: 11, wis: 13, cha: 12, health: 'ok'}
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