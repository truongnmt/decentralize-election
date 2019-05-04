import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import dappReducer from './reducers/dapp';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(dappReducer, composeEnhancers(
    applyMiddleware(thunk)
));

export default store;