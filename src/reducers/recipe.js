import axios from 'axios';
import { setAuthenticatedUser } from './authenticatedUser.js';

// action constants
const GET_RECIPES = 'GET_RECIPES';
const ADD_RECIPE = 'ADD_RECIPE';
const GET_RECIPE = 'GET_RECIPE';

const _addRecipe = recipe => {
  return {
    type: ADD_RECIPE,
    recipe
  };
};

// action creators
const _getRecipes = recipes => {
  return {
    type: GET_RECIPES,
    recipes
  };
};

const _getRecipe = recipe => {
  return {
    type: GET_RECIPE,
    recipe
  };
};

// thunks

const createNewRecipe = recipe => {
  return (dispatch, getState) => {
    console.log(recipe);
    return axios
      .post(`${process.env.API_URL}/api/recipes/`, recipe)
      .then(response => {
        dispatch(_addRecipe(response.data));

        if (getState().authenticatedUser.name) {
          const updatedUser = getState().authenticatedUser;
          updatedUser.postedRecipes.push(response.data);
          console.log(updatedUser);
          dispatch(setAuthenticatedUser(updatedUser));
        }
      });
  };
};

const getRecipesForIngredients = ingredients => {
  return dispatch => {
    return axios
      .get(
        `${process.env.API_URL}/api/recipes?ingredients=${encodeURI(
          ingredients
        )}`
      )
      .then(res => res.data)
      .then(recipes => dispatch(_getRecipes(recipes)))
      .catch(error => console.log(error));
  };
};

const getRecipe = id => {
  return dispatch => {
    return axios
      .get(`${process.env.API_URL}/api/recipes/${id}`)
      .then(res => res.data)
      .then(review => dispatch(_getRecipe(review)))
      .catch(error => console.log(error));
  };
};

const postReview = (recipeId, userId, review) => {
  return dispatch => {
    return axios
      .put(
        `${process.env.API_URL}/api/recipes/${recipeId}/review/${userId}`,
        review
      )
      .then(res => res.data)
      .then(recipe => dispatch(_getRecipe(recipe)))
      .catch(error => console.log(error));
  };
};

// reducer
const recipeReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_RECIPE:
      return [...state, action.recipe];

    case GET_RECIPES:
      state = action.recipes;
      break;

    case GET_RECIPE:
      const newState = state.filter(recipe => recipe.id !== action.recipe.id);
      newState.push(action.recipe);
      state = newState;
      break;
  }
  return state;
};

export {
  createNewRecipe,
  recipeReducer,
  getRecipesForIngredients,
  getRecipe,
  postReview
};
