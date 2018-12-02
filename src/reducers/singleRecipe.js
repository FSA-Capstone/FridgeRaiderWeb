import axios from 'axios';

// action constants
const GET_RECIPE = 'GET_RECIPE';

// action creators
const _getRecipe = recipe => {
  return {
    type: GET_RECIPE,
    recipe
  };
};

// thunks

const getRecipe = id => {
  return dispatch => {
    return axios
      .get(`${process.env.API_URL}/api/recipes/${id}`)
      .then(res => res.data)
      .then(review => dispatch(_getRecipe(review)))
      .catch(error => console.log(error));
  };
};

// reducer
const singleRecipeReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_RECIPE:
      state = action.recipe;
      break;
  }
  return state;
};

export {
  singleRecipeReducer,
  getRecipe
};
