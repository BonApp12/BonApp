import {login} from '../router/routes';
import axios from "axios";

export default function loginRequest(email,password) {
    console.log(process.env.BACKEND_SOCKET);
    return axios.post(login,{email, password, device: 'mobile', requestFrom: 'R_SERVER'},{
        credential: true
    });
}
