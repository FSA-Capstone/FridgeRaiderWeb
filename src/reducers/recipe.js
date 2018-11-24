import axios from 'axios';

// action constants
const GET_RECIPES = 'GET_RECIPES';

// action creators
const _getRecipes = recipes => {
  return {
    type: GET_RECIPES,
    recipes
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

const getRecipe = (id, recipes) => {
  return recipes.find(recipe => recipe.id === id)
}

// reducer
const recipeReducer = (state = [], action) => {

  switch(action.type) {
    case GET_RECIPES:
      state = action.recipes
      break;
  }
  return state;
}

export { recipeReducer, getRecipesForIngredients, getRecipe }
