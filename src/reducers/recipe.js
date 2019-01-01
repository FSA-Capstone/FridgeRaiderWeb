import axios from 'axios';
import { setAuthenticatedUser } from './authenticatedUser.js';
import { getRecipe } from './singleRecipe';

// action constants
const GET_RECIPES = 'GET_RECIPES';
const ADD_RECIPE = 'ADD_RECIPE';
const GET_RECIPE = 'GET_RECIPE';

// action creators
const _addRecipe = recipe => {
  return {
    type: ADD_RECIPE,
    recipe
  };
};

const _getRecipes = recipes => {
  return {
    type: GET_RECIPES,
    recipes
  };
};

// thunks


const createNewRecipe = recipe => {
  return (dispatch, getState) => {
    console.log(recipe);
    const data = new FormData()

    data.set('name', recipe.name)
    data.set('instructions', recipe.instructions)
    data.set('cuisineName', recipe.cuisineName)
    data.set('categoryName', recipe.categoryName)
    data.set('ingredients', recipe.ingredients)
    data.set('imageUrl', recipe.imageUrl)
    data.set('image', recipe.image)
    data.set('postedByUserId', recipe.postedByUserId)

    return axios
      .post(`${process.env.API_URL}/api/recipes/`, data)
      .then(response => {

        if (getState().authenticatedUser.name) {
          dispatch(setAuthenticatedUser(response.data));
        }
        
        return
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

const postReview = (recipeId, userId, review) => {
  return dispatch => {
    return axios
      .put(
        `${process.env.API_URL}/api/recipes/${recipeId}/review/${userId}`,
        review
      )
      .then(res => res.data)
      .then(recipe => dispatch(getRecipe(recipe.id)))
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
  }
  return state;
};

export {
  createNewRecipe,
  recipeReducer,
  getRecipesForIngredients,
  postReview
};
