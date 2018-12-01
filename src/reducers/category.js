import axios from 'axios';

const ADD_CATEGORIES = 'ADD_CATEGORIES';

const _addCategories = categories => {
  return {
    type: ADD_CATEGORIES,
    categories
  };
};

const getCategories = categories => {
  return dispatch => {
    axios
      .get(`${process.env.API_URL}/api/categories/names`)
      .then(response => dispatch(_addCategories(response.data)));
  };
};

const categoryReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_CATEGORIES:
      return [...state, action.categories];

    default:
      return state;
  }
};

export { getCategories, categoryReducer };
