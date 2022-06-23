import {expoToken as expoTokenUrl} from '../router/routes';
import axios from "axios";

export default function setExpoToken(userId, expoToken) {
    return axios.patch(`${expoTokenUrl}${userId}`, {expoToken}, {
        credential: true
    });
}
