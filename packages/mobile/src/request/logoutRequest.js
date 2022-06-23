import {logout} from "../router/routes";
import axios from "axios";

export default function logoutRequest() {
    return axios.post(logout,{},{
        credential: true
    });
}