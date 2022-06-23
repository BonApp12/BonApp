import {createContext, useReducer} from 'react';

export default ( reducer, action, defaultValue ) => {
    const Context = createContext();

    const Provider = ({ children }) => {
        const [ state, dispatch ] = useReducer(reducer, defaultValue);

        const boundActions = {};

        for (let key in action){
            boundActions[key] = action[key](dispatch);
        }

        return(
            <Context.Provider value={{ state, ...boundActions }}>
                { children }
            </Context.Provider>
        )
    };

    return { AuthContext: Context, AuthProvider: Provider };
};