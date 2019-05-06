import * as actionTypes from '../actions/actionTypes';

const initialState = {
    web3: null,
    accounts: null,
    contract: null,
    candidates: [],
    candidatesCount: 0
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
        case actionTypes.SET_CANDIDATES:
            return {
                ...state,
                candidates: action.candidates
            };
        case actionTypes.ADD_CANDIDATE:
            return {
                ...state,
                candidates: [...state.candidates, action.candidate]
            };
        case actionTypes.SET_CANDIDATES_COUNT:
            return {
                ...state,
                candidatesCount: action.candidatesCount
            };
        default:
            return state;
    }
};

export default reducer;