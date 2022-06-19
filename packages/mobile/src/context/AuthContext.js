import createDataContext from './createDataContext';
import loginRequest from "../request/loginRequest";

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
        loginRequest(email, password).then(res => console.log(res)).catch(e => console.log(e));
        // console.log('login');
        // dispatch({
        //     type: 'login',
        //     payload: {user},
        // });
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