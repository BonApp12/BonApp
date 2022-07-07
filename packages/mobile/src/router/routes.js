import {BACKEND_URL} from "react-native-dotenv";

module.exports = {
    //login: 'https://apiv2.bonapp.ninja/auth/login',
    login: BACKEND_URL + 'auth/login',
    logout: BACKEND_URL + 'auth/logout',
    restaurant: BACKEND_URL + 'restaurant/',
    orders: BACKEND_URL + 'orders/',
    expoToken: BACKEND_URL + 'user/update-expoToken/',
};
