import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { login, logout, authenticatedUserReducer, exchangeTokenForAuth } from './reducers/authenticatedUser';

const reducer = combineReducers({
  authenticatedUser: authenticatedUserReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export {
  login,
  logout,
  exchangeTokenForAuth,
};
