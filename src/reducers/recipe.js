import axios from 'axios';

// action constants
const GET_RECIPES = 'GET_RECIPES';
const ADD_RECIPE = 'ADD_RECIPE';

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

// thunks

const createNewRecipe = recipe => {
  return dispatch => {
    return axios
      .post('http://localhost:3000/api/recipes/', recipe)
      .then(response => dispatch(_addRecipe(response.data)))
  };
};

const getRecipesForIngredients = ingredients => {
  return dispatch => {
    //TO DO: This needs to be changed and ingredients need to be passed (once DB is set)
    return axios
      .get(
        `${process.env.API_URL}/api/recipes?ingredients=${encodeURI(
          ingredients.join(',')
        )}`
      )
      .then(res => res.data)
      .then(recipes => dispatch(_getRecipes(recipes)))
      .catch(error => console.log(error));
  };
};

const getRecipe = (id, recipes) => {
  return recipes.find(recipe => recipe.id === id);
};

// reducer
const recipeReducer = (state = [], action) => {
  switch (action.type) {
    case GET_RECIPES:
      state = action.recipes;
      break;

    case ADD_RECIPE:
      return [...state, action.recipe];
  }
  return state;
};

export { createNewRecipe, recipeReducer, getRecipesForIngredients, getRecipe };
