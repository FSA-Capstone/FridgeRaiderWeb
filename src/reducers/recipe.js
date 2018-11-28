import axios from 'axios';

// action constants
const GET_RECIPES = 'GET_RECIPES';
const GET_RECIPE = 'GET_RECIPE';

// action creators
const _getRecipes = recipes => {
  return {
    type: GET_RECIPES,
    recipes
  }
}

const _getRecipe = recipe => {
  return {
    type: GET_RECIPE,
    recipe
  }
}

// thunks
const getRecipesForIngredients = (ingredients) => {
  return (dispatch) => {
    //TO DO: This needs to be changed and ingredients need to be passed (once DB is set)
    return axios.get(`${process.env.API_URL}/api/recipes?ingredients=${encodeURI(ingredients.join(','))}`)
      .then(res => res.data)
      .then(recipes => dispatch(_getRecipes(recipes)))
      .catch(error => console.log(error))
  };
};

const getRecipe = (id) => {
  return (dispatch) => {
    //TO DO: This needs to be changed and ingredients need to be passed (once DB is set)
    return axios.get(`${process.env.API_URL}/api/recipes/${id}`)
      .then(res => res.data)
      .then(recipe => dispatch(_getRecipe(recipe)))
      .catch(error => console.log(error))
  };
}

// reducer
const recipeReducer = (state = [], action) => {

  switch(action.type) {
    case GET_RECIPES:
      state = action.recipes
      break;
    case GET_RECIPE:
      const newState = state.filter( recipe => recipe.id !== action.recipe.id)
      newState.push(action.recipe)
      state = newState
      break;
  }
  return state;
}

export { recipeReducer, getRecipesForIngredients, getRecipe }
