import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { ingredientReducer, getIngredients, setIngredients, addIngredient, removeIngredient } from './reducers/ingredients';
import {
  recipeReducer,
  createNewRecipe,
  getRecipesForIngredients,
  getRecipe,
  postReview
} from './reducers/recipe';
import {
  login,
  checkForLoggedInGoogleUser,
  logout,
  authenticatedUserReducer,
  setAuthenticatedUserOnRefresh,
  exchangeTokenForAuth,
  registerNewUser
} from './reducers/authenticatedUser';
import { getCategories, categoryReducer } from './reducers/category';
import { cuisineReducer } from './reducers/cuisine';


const reducer = combineReducers({
  authenticatedUser: authenticatedUserReducer,
  recipes: recipeReducer,
  ingredients: ingredientReducer,
  cuisines: cuisineReducer,
  categories: categoryReducer
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export {
  login,
  logout,
  checkForLoggedInGoogleUser,
  registerNewUser,
  getCategories,
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
