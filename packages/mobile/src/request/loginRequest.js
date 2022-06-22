import {login} from '../router/routes';
import axios from "axios";

export default function loginRequest(email,password) {
    console.log(login);
    return axios.post(login,{email, password, device: 'mobile'},{
        credential: true
    });
}
