import Axios from 'axios';

const initialState ={
    user: {username: 'AutoDave'},
    // user: {},
    username: '',
    password: '',
    campaign: '',
    data: [
        {campaign: 'sw5e1', img: 'https://cdn.discordapp.com/attachments/316704555154800642/630934544375349248/Grayjedithetermgrayjediorgrayhadtwo_324b74_5788445.jpg', player: 'Wonsnot', name: 'Geoff', class: 'Consular', lvl: 4, max_hp: 11, ac: 13, current_hp: 11, temp_hp: 3, str: 12, dex: 16, con: 10, int: 11, wis: 10, cha: 16}, 
        {campaign: 'sw5e1', img: 'https://i.pinimg.com/originals/11/56/d3/1156d37d76f884da477279fed684080b.jpg', player: 'AutoDave', name: 'O-yasha', class: 'Guardian', lvl: 4, max_hp: 20, ac: 15, current_hp: 18, temp_hp: 0, str: 15, dex: 10, con: 14, int: 11, wis: 17, cha: 10}, 
        {campaign: 'sw5e1', img: '', player: 'NantanLupan', name: 'Gadget', class: 'Engineer', lvl: 4, max_hp: 35, ac: 0, current_hp: 0, temp_hp: 0, str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0}, 
        {campaign: 'sw5e1', img: '', player: 'StormReavan', name: 'Vulcan', class: 'Operative', lvl: 4, max_hp: 0, ac: 0, current_hp: 0, temp_hp: 0, str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0},
        {campaign: 'LnD', img: '', player: 'test', name: 'test', class: 'test', lvl: 0, max_hp: 0, ac: 0, current_hp: 0, temp_hp: 0, str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0}
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