import createDataContext from './createDataContext';
import loginRequest from "../request/loginRequest";
import toast from "../help/toast";

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
                    if(data.user.role === 'CLIENT') {
                        toast('error', 'Erreur', 'Une erreur est survenue. Réessayez plus tard ⏳');
                    }else{
                        dispatch({
                            type: 'login',
                            payload: {user: data.user},
                        });
                        toast('success','Connexion réussie','Vous êtes désormais connecté 🎉');
                    }
                }
            })
            .catch(e => {
                toast('error','Connexion échouée',e.response.data.message + ' 😭');
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