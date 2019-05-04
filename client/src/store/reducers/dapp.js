import * as actionTypes from '../actions/actionTypes';

const initialState = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_WEB3:
            return {
                ...state,
                web3: action.web3
            };
        case actionTypes.SET_ACCOUNTS:
            return {
                ...state,
                accounts: action.accounts
            };
        case actionTypes.SET_CONTRACT:
            return {
                ...state,
                contract: action.contract
            };
        case actionTypes.SET_STORAGE_VALUE:
            return {
                ...state,
                storageValue: action.storageValue
            };
        default:
            return state;
    }
};

export default reducer;