const ADD_ITEM = 'ADD_ITEM';
const ADD_HELP = 'ADD_HELP';
const REMOVE_HELP = 'REMOVE_HELP';
const ADD_ORDER = 'ADD_ORDER';
const REMOVE_ORDER = 'REMOVE_ORDER';

export const addItem = (item) => ({
    type: {actionOnState: ADD_ITEM, item},
});


/**
 *
 * @param item: {idTable: number, libelleTable: string, message: string}
 * @returns {{type: {item, actionOnState: string}}}
 * Elle permet d'ajouter une demande d'aide à la liste des demandes
 */
export const addHelp = (item) => (
    {
        type: {actionOnState: ADD_HELP, item}
    });

/**
 *
 * @param item: {idTable: number, libelleTable: string, message: string}
 * @returns {{type: {item, actionOnState: string}}}
 * permet de supprimer une demande d'aide de la liste des demandes
 */
export const removeHelp = (item) => ({
    type: {actionOnState: REMOVE_HELP, item},
});


export const addOrder = (item) => ({
    type: {actionOnState: ADD_ORDER, item},
});

const initialState = {
    messages: [],
    helpNeededs: [],
    orders: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type.actionOnState) {
        case ADD_ITEM:
            return {
                ...state,
                messages: [...state.messages, action.type.item],
            };
        case ADD_HELP:
            return {
                ...state,
                helpNeededs: [...state.helpNeededs, action.type.item]
            };
        case REMOVE_HELP:
            return {
                helpNeededs: state.helpNeededs.filter(item => item.libelleTable !== action.type.item.libelleTable)
            };
        case ADD_ORDER:
            return {
                ...state,
                orders: [...state.orders, action.type.item]
            };
        case REMOVE_ORDER:
            return {
                ...state,
                orders: state.orders.filter(item => item.id !== action.type.item.id)
            };
        default:
            return state;
    }
};
export default rootReducer;
