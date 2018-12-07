import firebase, {
  auth,
  provider
} from '../components/User/FirebaseComponent.js';

const axios = require('axios');

const SET_AUTHENTICATED_USER = 'SET_AUTHENTICATED_USER';
const LOGOUT = 'LOGOUT';

const _logout = () => {
  return {
    type: LOGOUT
  };
};

const _setAuthenticatedUser = authenticatedUser => ({
  type: SET_AUTHENTICATED_USER,
  authenticatedUser
});

const saveRecipe = (recipe, userId) => {
  const newRecipe = {};
  newRecipe['properties'] = {
    id: recipe.id,
    imageUrl: recipe.imageUrl,
    instructions: recipe.instructions,
    name: recipe.name,
    videoUrl: recipe.videoUrl
  };
  return (dispatch, getState) => {
    return axios
      .put(`${process.env.API_URL}/api/users/${userId}/saveRecipe/${recipe.id}`)
      .then(() => {
        const updatedUser = getState().authenticatedUser;

        updatedUser.savedRecipes.push(newRecipe);

        dispatch(_setAuthenticatedUser(updatedUser));
      });
  };
};

const unSaveRecipe = (recipe, userId) => {
  return (dispatch, getState) => {
    return axios
      .put(
        `${process.env.API_URL}/api/users/${userId}/unSaveRecipe/${recipe.id}`
      )
      .then(() => {
        const updatedUser = getState().authenticatedUser;

        updatedUser.savedRecipes = updatedUser.savedRecipes.filter(
          userRecipe => userRecipe.properties.id !== recipe.id
        );

        dispatch(_setAuthenticatedUser(updatedUser));
      });
  };
};

const logoutGoogle = () => {
  return dispatch => {
    auth.signOut();
  };
};

const registerNewUser = user => {
  return dispatch => {
    axios
      .post(`${process.env.API_URL}/api/users`, user)
      .then(response => dispatch(_setAuthenticatedUser(response.data)));
  };
};

const setAuthenticatedUser = user => {
  return dispatch => {
    dispatch(_setAuthenticatedUser(user));
  };
};

const checkForLoggedInGoogleUser = user => {
  return async dispatch => {
    const firebaseRedirectResult = await firebase.auth().getRedirectResult();

    if (firebaseRedirectResult.user || user.email) {
      var idToken = await firebase.auth().currentUser.getIdToken(true);

      const response = await axios.post(
        `${process.env.API_URL}/api/users/firebase-auth/
        `,
        { idToken }
      );

      if (response.data.name) {
        dispatch(_setAuthenticatedUser(response.data));
      } else {
        let finalUser;
        if (firebaseRedirectResult.user) {
          finalUser = firebaseRedirectResult.user;
        } else {
          finalUser = user;
        }

        const newUser = {
          name: finalUser.displayName,
          email: finalUser.email,
          password: finalUser.uid,
          userName: finalUser.email,
          isAdmin: false
        };

        let newUserResponse = await axios.post(
          `${process.env.API_URL}/api/users`,
          newUser
        );

        return dispatch(_setAuthenticatedUser(newUserResponse.data));
      }
    }
  };
};
const login = credentials => {
  return dispatch => {
    return axios
      .post(`${process.env.API_URL}/api/auth`, credentials)
      .then(response => response.data)
      .then(data => {
        window.localStorage.setItem('token', data.token);
        dispatch(exchangeTokenForAuth());
      })
      .catch(error => {
        throw error;
      });
  };
};

const exchangeTokenForAuth = () => {
  return dispatch => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      return;
    }
    return axios
      .get(`${process.env.API_URL}/api/auth`, {
        headers: {
          authorization: token
        }
      })
      .then(response => response.data)
      .then(auth => {
        return axios.get(`${process.env.API_URL}/api/users/${auth.id}`);
      })
      .then(response => response.data)
      .then(user => {
        dispatch(_setAuthenticatedUser(user));
      })
      .catch(ex => window.localStorage.removeItem('token'));
  };
};

const logout = () => {
  return dispatch => {
    window.localStorage.removeItem('token');
    dispatch(logoutGoogle());
    dispatch(_logout());
  };
};

const authenticatedUserReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED_USER:
      return Object.assign(
        {},
        state,
        action.authenticatedUser,
        { postedRecipes: action.authenticatedUser.postedRecipes },
        { savedRecipes: action.authenticatedUser.savedRecipes }
      );
    case LOGOUT:
      return {};

    default:
      return state;
  }
};

export {
  logoutGoogle,
  registerNewUser,
  checkForLoggedInGoogleUser,
  login,
  logout,
  saveRecipe,
  exchangeTokenForAuth,
  unSaveRecipe,
  setAuthenticatedUser,
  authenticatedUserReducer
};
