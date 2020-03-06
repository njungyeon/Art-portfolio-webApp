import {
    GET_ALL_PORTFOLIO,
    GET_ONE_PORTFOLIO,
    UPLOAD_PORTFOLIO,
} from './actionTypes'
import axios from 'axios'
import { PORTFOLIO_SERVER } from '../components/Config';

export function uploadPort(portfoiloInfo){
    const request = axios.post(`${PORTFOLIO_SERVER}/upload`, portfoiloInfo)
        .then(response => response.data);
    return {
        type: UPLOAD_PORTFOLIO,
        payload: request
    }
}

export function showOnePort(portfoiloId){
    const request = axios.get(`${PORTFOLIO_SERVER}/upload`, { params: { id: portfoiloId } })
        .then(response => response.data);
    return {
        type: UPLOAD_PORTFOLIO,
        payload: request
    }
}

export function showAllPort(studentId){
    const request = axios.get(`${PORTFOLIO_SERVER}/upload`, { params: { id: studentId } })
        .then(response => response.data);
    return {
        type: UPLOAD_PORTFOLIO,
        payload: request
    }
}