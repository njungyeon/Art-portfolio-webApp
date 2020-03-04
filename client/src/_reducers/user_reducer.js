import {
    LOGIN_USER,
    LOGOUT_USER,
    AUTH_USER,
    REGISTER_USER,
} from '../_actions/actionTypes';

export default function(state={},action){
    switch(action.type){
        case LOGIN_USER:
            return { ...state, userData: action.payload }
        case AUTH_USER:
            return { ...state, userData: action.payload }
        case REGISTER_USER:
            return { ...state, userData: action.payload }
        case LOGOUT_USER:
            return { ...state, userData: action.payload }
        default:
            return state;
    }
}