import axios from 'axios';

// action constants
const GET_CUISINES = 'GET_CUISINES'

// action creators
const _getCuisines = (cuisines) => {
  return {
    type: GET_CUISINES,
    cuisines
  };
};

// thunks
export const getCuisines = () => {
  return (dispatch) => {
    return axios.get(`${process.env.API_URL}/api/cuisine`)
      .then(res => res.data)
      .then(cuisines => dispatch(_getCuisines(cuisines)))
      .catch((error) => console.log(error))
  };
};

// reducer
export const cuisineReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CUISINES:
      return state = action.cuisines.map(elem => elem.name)
  };
  return state
};

// exports
