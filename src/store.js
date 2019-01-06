import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { ingredientReducer, getIngredients, setIngredients, addIngredient, removeIngredient } from './reducers/ingredients';
import {
  recipeReducer,
  createNewRecipe,
  getRecipesForIngredients,
  postReview
} from './reducers/recipe';
import {
  login,
  checkForLoggedInGoogleUser,
  logout,
  authenticatedUserReducer,
  setAuthenticatedUserOnRefresh,
  exchangeTokenForAuth,
  unSaveRecipe,
  _startSpinner,
  _stopSpinner,
  spinnerReducer,
  registerNewUser,
  saveRecipe
} from './reducers/authenticatedUser';
import { getCategories, categoryReducer } from './reducers/category';
import { cuisineReducer } from './reducers/cuisine';
import { singleRecipeReducer, getRecipe } from './reducers/singleRecipe';


const reducer = combineReducers({
  authenticatedUser: authenticatedUserReducer,
  recipes: recipeReducer,
  spinner: spinnerReducer,
  recipe: singleRecipeReducer,
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
  saveRecipe,
  getCategories,
  exchangeTokenForAuth,
  getRecipesForIngredients,
  getRecipe,
  postReview,
  unSaveRecipe,
  _startSpinner,
  _stopSpinner,
  createNewRecipe,
  getIngredients,
  setIngredients,
  addIngredient,
  removeIngredient,
};
