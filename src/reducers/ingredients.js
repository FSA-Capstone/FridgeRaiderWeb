import axios from 'axios';

// action constants
const GET_INGREDIENTS = 'GET_INGREDIENTS';
const SET_INGREDIENTS = 'SET_INGREDIENTS';
const ADD_INGREDIENT = 'ADD_INGREDIENT';
const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

// action creators
const _getIngredients = (ingredients) => {
	return {
		type: GET_INGREDIENTS,
		ingredients
	};
};

const _setIngredients = (ingredients) => {
	return {
		type: SET_INGREDIENTS,
		ingredients
	};
};

const _addIngredient = (ingredient) => {
	return {
		type: ADD_INGREDIENT,
		ingredient
	};
};

const _removeIngredient = (ingredient) => {
	return {
		type: REMOVE_INGREDIENT,
		ingredient
	};
};

// thunks

const getIngredients = () => {
	return (dispatch) => {
		return axios
			.get(`${process.env.API_URL}/api/ingredients`)
			.then((res) => res.data)
			.then((ingredients) => dispatch(_getIngredients(ingredients)))
			.catch((error) => console.log(error));
	};
};

const setIngredients = (ingredients, history) => {
	return (dispatch) => {
    history.push('/recipes')
		return (dispatch(_setIngredients(ingredients)))
	};
};

const addIngredient = (ingredient) => {
	_addIngredient(ingredient)
};

const removeIngredient = (ingredient) => {
	dispatch(_removeIngredient(ingredient))
};

// reducer
const ingredientReducer = (state = {allIngredients:[], userIngredients: []}, action) => {
  const newState = state;
  switch (action.type) {
    case GET_INGREDIENTS:
      newState.allIngredients = action.ingredients
      return newState;
      
    case SET_INGREDIENTS:
      newState.userIngredients = action.ingredients
      return newState;

    case REMOVE_INGREDIENT:
      newState.userIngredients = newState.userIngredients.filter( ingredient => ingredient !== action.ingredient)
      return newState;

    case ADD_INGREDIENT:
      newState.userIngredients.push(action.ingredient)
      return newState;
  }
  return state;
};

export { ingredientReducer, getIngredients, setIngredients, addIngredient, removeIngredient };
