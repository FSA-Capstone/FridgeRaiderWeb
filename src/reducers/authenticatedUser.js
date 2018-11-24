import firebase, { auth, provider } from '../components/User/firebase.js';

const axios = require('axios');

const SET_AUTHENTICATED_USER = 'SET_AUTHENTICATED_USER';
const _setAuthenticatedUser = authenticatedUser => ({
  type: SET_AUTHENTICATED_USER,
  authenticatedUser
});


const logoutGoogle = () => {
  return dispatch => {
    auth.signOut();
  };
};

const checkForLoggedInGoogleUser = () => {
  return async dispatch => {
    const result = await firebase.auth().getRedirectResult();

    if (result.user) {
      //dispatch(_setAuthenticatedUser(result.user));
      console.log('local user:', this.state.user);
    }

    if (firebase.auth().currentUser) {
      const idToken = firebase
        .auth()
        .currentUser.getIdToken(/* forceRefresh */ true);
      console.log(idToken);
    }

    //todo: send token to backend
    //create user on backend
    //set user to store


    //axios.post('/firebase', {token: idToken});
    //.catch(function(error) {
    //console.log(error);
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
        dispatch(_setAuthenticatedUser(auth));
      })
      .catch(ex => window.localStorage.removeItem('token'));
  };
};

const logout = () => {
  return dispatch => {
    window.localStorage.removeItem('token');
    dispatch(logoutGoogle());
    dispatch(_setAuthenticatedUser({}));
  };
};

const authenticatedUserReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED_USER:
      return action.authenticatedUser;
    default:
      return state;
  }
};

export {
  logoutGoogle,
  checkForLoggedInGoogleUser,
  login,
  logout,
  exchangeTokenForAuth,
  authenticatedUserReducer
};
