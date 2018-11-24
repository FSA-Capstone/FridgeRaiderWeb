import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { login, checkForLoggedInGoogleUser, logout, authenticatedUserReducer, exchangeTokenForAuth } from './reducers/authenticatedUser';
import { recipeReducer, getRecipesForIngredients, getRecipe } from './reducers/recipe';

const reducer = combineReducers({
  authenticatedUser: authenticatedUserReducer,
  recipes: recipeReducer
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export {
  login,
  logout,
  checkForLoggedInGoogleUser,
  exchangeTokenForAuth,
  getRecipesForIngredients,
  getRecipe
};
