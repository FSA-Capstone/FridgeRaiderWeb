import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { recipeReducer, createNewRecipe, getRecipesForIngredients, getRecipe, postReview } from './reducers/recipe';
import { ingredientReducer, getIngredients, setIngredients, addIngredient, removeIngredient } from './reducers/ingredients';
import { login, checkForLoggedInGoogleUser, logout, authenticatedUserReducer, exchangeTokenForAuth, registerNewUser } from './reducers/authenticatedUser';

const reducer = combineReducers({
  authenticatedUser: authenticatedUserReducer,
  recipes: recipeReducer,
  ingredients: ingredientReducer
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
  createNewRecipe,
  getIngredients,
  setIngredients,
  addIngredient,
  removeIngredient,
};
