import axios from 'axios';

const ADD_CATEGORIES = 'ADD_CATEGORIES';

const _addCategories = categories => {
  return {
    type: ADD_CATEGORIES,
    categories
  };
};

const getCategories = () => {
  return dispatch => {
    axios
      .get(`${process.env.API_URL}/api/categories`)
      .then(response => response.data.map(category => category.name ))
      .then(categories => dispatch(_addCategories(categories)));
  };
};

const categoryReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_CATEGORIES:
      return [...state, ...action.categories];

    default:
      return state;
  }
};

export { getCategories, categoryReducer };
