import createDataContext from './createDataContext';
import loginRequest from "../request/loginRequest";
import toast from "../utils/toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logoutRequest from "../request/logoutRequest";

const authReducer = (state, action) => {
    switch (action.type) {
        case 'logout':
            return {user: null};
        case 'login':
        case 'setState':
            return {user: action.payload.user};
        default:
            return state;
    }
};

const login = dispatch => {
    return ({email, password}) => {
        loginRequest(email, password)
            .then(res => res.data)
            .then(async (data) => {
                if (data.statusCode === 200) {
                    if (data.user.role === 'CLIENT') {
                        toast('error', 'Erreur', 'Une erreur est survenue. Réessayez plus tard ⏳');
                    } else {
                        await AsyncStorage.setItem('user', JSON.stringify({...data.user}));
                        dispatch({
                            type: 'login',
                            payload: {user: data.user},
                        });
                        toast('success', 'Connexion réussie', 'Vous êtes désormais connecté 🎉');
                    }
                } else if (data.statusCode === 400) {
                    toast('error', 'Connexion échouée', data.message + ' 😭');
                }
            })
            .catch(() => {
                toast('error', 'Erreur', 'Une erreur est survenue 😭');
            });
    };
};

const logout = dispatch => {
    return () => {
        logoutRequest().then(async () => {
            dispatch({type: 'logout', payload: {user: null}});
            await AsyncStorage.removeItem('user');
            toast('success', 'Déconnexion réussie', 'Vous êtes désormais déconnecté 🎉');
        });
    };
};

const setState = dispatch => {
    return (state) => {
        dispatch({type: 'setState', payload: {user: state}});
    };
};

export const {AuthContext, AuthProvider} = createDataContext(
    authReducer,
    {login, logout, setState},
    {user: null},
);
