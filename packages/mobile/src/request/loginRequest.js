import {login} from '../router/routes';
import axios from "axios";

export default function loginRequest(email,password) {
    return axios.post(login,{email, password, device: 'mobile'},{
        credential: true
    });
}
