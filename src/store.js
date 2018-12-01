import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { recipeReducer, createNewRecipe, getRecipesForIngredients, getRecipe, postReview } from './reducers/recipe';
import { login, checkForLoggedInGoogleUser, logout, authenticatedUserReducer,setAuthenticatedUserOnRefresh, exchangeTokenForAuth, registerNewUser } from './reducers/authenticatedUser';

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
  registerNewUser,
  exchangeTokenForAuth,
  getRecipesForIngredients,
  getRecipe,
  postReview,
  createNewRecipe
};
