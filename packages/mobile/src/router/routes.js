import {BACKEND_URL} from "react-native-dotenv";

module.exports = {
    // login: 'http://192.168.1.180:4000/auth/login',
    login: BACKEND_URL + '/auth/login',
    logout: BACKEND_URL + '/auth/logout',
    restaurant: BACKEND_URL + '/restaurant/'
};
