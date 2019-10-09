import Axios from 'axios';

const initialState ={
    // user: {username: 'AutoDave'},
    user: {},
    username: '',
    password: '',
    campaign: ''
}

// const GET_USER = 'GET_USER';
// const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const SET_USERNAME = 'SET_USERNAME';
const SET_ADMIN = 'SET_ADMIN';
const SET_OPTION = 'SET_OPTION';

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