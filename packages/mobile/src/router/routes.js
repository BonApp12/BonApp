import {BACKEND_URL} from "react-native-dotenv";

module.exports = {
    login: BACKEND_URL + '/auth/login',
    logout: BACKEND_URL + '/auth/logout',
    restaurant: BACKEND_URL + '/restaurant/'
}