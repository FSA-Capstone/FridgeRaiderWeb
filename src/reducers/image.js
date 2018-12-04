import Clarifai from 'clarifai';

// action constants
const GET_INGREDIENTS_FROM_IMAGE = 'GET_INGREDIENTS_FROM_IMAGE';

const clarifai = new Clarifai.App({
  // apiKey: process.env.CLARIFAI_KEY
  apiKey: '095d1c89d41144cb9676fb396efdb266'
 });

// action creators
const _getIFI = recipe => {
  return {
    type: GET_INGREDIENTS_FROM_IMAGE,
    recipe
  };
};

// thunks

const getIFI = image => {
  return dispatch => {
    return clarifai.models.predict("bd367be194cf45149e75f01d59f77ba7", "https://samples.clarifai.com/food.jpg").then(
      function(response) {
        console.log(response)
      },
      function(err) {
        console.log(`Error:  ${err}`)
      }
    );
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
  getIFI
};
