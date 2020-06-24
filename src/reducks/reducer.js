import Axios from 'axios';

const initialState ={
    // user: {username: 'AutoDave', password: '123'},
    user: {},
    username: '',
    password: '',
    campaign: ''
}

const GET_USER = 'GET_USER';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const SET_USERNAME = 'SET_USERNAME';
const SET_ADMIN = 'SET_ADMIN';
// const SET_OPTION = 'SET_OPTION';

export const getUser = () => {
    return{
        type: GET_USER,
        payload: Axios.get('/auth/user')
    }
}
export const login = (username, password) => {
    return{
        type: LOGIN,
        payload: Axios.post('/auth/login', {username, password})
    }
}
export const setUsername = (username) => {
    return{
        type:SET_USERNAME,
        payload: username
    }
}
export const setAdmin = (admin) => {
    return{
        type: SET_ADMIN,
        payload: admin
    }
}
export const logout = () => {
    return{
        type: LOGOUT,
        payload: Axios.get('/auth/logout')
    }
}

function reducer(state = initialState, action){
    // console.log(action.payload)
    switch(action.type){
        case `${GET_USER}_PENDING`:
            return {...state, loading: true};
        case `${GET_USER}_FULFILLED`:
            return {...state, user: action.payload.data, loading: false}
        case `${SET_USERNAME}_FULFILLED`:
                return {...state, username: action.payload};
        case `${SET_ADMIN}_FULFILLED`:
            return {...state, admin: action.payload};
        case `${LOGIN}_PENDING`:
            return {...state, loading: true};
        case `${LOGIN}_FULFILLED`:
            return {...state, user: action.payload.data, loading: false};
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