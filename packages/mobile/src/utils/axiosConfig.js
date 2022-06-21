import axios from "axios";
import logoutRequest from "../request/logoutRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {login} from "../router/routes";
import toast from "./toast";

export default function (setState){
    axios.interceptors.response.use(function(response){
        return response;
    }, async function (error){
        if ([401,400].includes(error.response.status) && error.response.config.url !== login) {
            logoutRequest().then(async () => {
                await AsyncStorage.removeItem('user');
                setState(null);
                toast('error','Déconnexion','Vous avez été déconnecté');
            })
        }
        return Promise.resolve(error.response);
    });

    axios.interceptors.request.use(
        config => {
            config.headers['Content-Type'] = 'application/json';
            config.headers.Accept = 'application/json';
            return config;
        },
        error => {
            return Promise.reject(error);
        });
}