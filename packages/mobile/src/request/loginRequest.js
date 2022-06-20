import {login} from '../router/routes';
import axios from "axios";

export default function loginRequest(email,password) {
    return axios({
        method: 'POST',
        url: login,
        data: {email,password},
        headers: {
            'Content-Type': 'application/json'
        },
        credential: true
    })
}