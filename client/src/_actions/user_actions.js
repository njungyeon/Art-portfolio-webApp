import {
    LOGIN_USER,
    LOGOUT_USER,
    AUTH_USER
} from './actionTypes';
import axios from 'axios'
import { USER_SERVER } from '../components/Config';

export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
        .then(response => response.data); //이게 어떤 역할일까?
    return {
        type: LOGIN_USER, //이거 types 라고 써서 Actions may not have an undefined "type" property. Have you misspelled a constant? 이런 오류났었다.
        payload: request
    }
}

export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}