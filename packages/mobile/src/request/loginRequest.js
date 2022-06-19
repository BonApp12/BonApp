import {login} from '../router/routes';
import axios from "axios";

export default function loginRequest(email,password) {
    return axios({
        crossDomain: true,
        method: 'POST',
        url: login,
        data: {email,password},
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        credential: true
    })
}