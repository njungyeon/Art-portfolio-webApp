import {
    LOGIN_USER,
    LOGOUT_USER,
    AUTH_USER,
    REGISTER_USER,
    GET_USERLIST
} from '../_actions/actionTypes';

export default function(state={},action){
    switch(action.type){
        case LOGIN_USER:
            return { ...state, userData: action.payload }
        case AUTH_USER:
            return { ...state, userData: action.payload }
        case REGISTER_USER:
            return { ...state, studentDatas: action.payload }
        case LOGOUT_USER:
            return { ...state, userData: action.payload }
        case GET_USERLIST:
            return { ...state, studentData: action.payload }
        default:
            return state;
    }
}