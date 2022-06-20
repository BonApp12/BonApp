import createDataContext from './createDataContext';
import loginRequest from "../request/loginRequest";
import Toast from "react-native-toast-message";

const authReducer = (state, action) => {
    switch (action.type) {
        case 'logout':
            return {user: null};
        case 'login':
            return {user: action.payload.user};
        default:
            return state;
    }
};

const login = dispatch => {
    return ({email, password}) => {
        loginRequest(email, password)
            .then(res => res.data)
            .then(data => {
                if(data.statusCode === 200){
                    dispatch({
                        type: 'login',
                        payload: {user: data.user},
                    });
                    Toast.show({
                        type: 'success',
                        text1: 'Connexion réussie',
                        text2: 'Vous êtes désormais connecté 🎉',
                        position: 'bottom'
                    });
                }
            })
            .catch(e => {
                Toast.show({
                    type: 'error',
                    text1: 'Connexion échouée',
                    text2: e.response.data.message + '😭',
                    position: 'bottom'
                });
            });
    };
};

const logout = dispatch => {
    return () => {
        dispatch({type: 'logout'});
    };
};

export const {AuthContext, AuthProvider} = createDataContext(
    authReducer,
    {login, logout},
    {user: null},
);