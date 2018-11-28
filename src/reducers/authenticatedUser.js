import firebase, { auth, provider } from '../components/User/FirebaseComponent.js';

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

const registerNewUser = user => {
  return dispatch => {
    axios
      .post(`${process.env.API_URL}/api/users`, user)
      .then(response => dispatch(_setAuthenticatedUser(response.data)));
  };
};

const checkForLoggedInGoogleUser = () => {
  return async dispatch => {
    const firebaseRedirectResult = await firebase.auth().getRedirectResult();

    if (firebaseRedirectResult.user) {
      console.log('local user:', firebaseRedirectResult.user);

      var idToken = await firebase.auth().currentUser.getIdToken(true);

      const response = await axios.post(
        `${process.env.API_URL}/api/users/firebase-auth/
        `,
        { idToken }
      );

      if (response.data.name) {
        dispatch(_setAuthenticatedUser(response.data));
      } else {
        const newUser = {
          name: firebaseRedirectResult.user.displayName,
          email: firebaseRedirectResult.user.email,
          password: firebaseRedirectResult.user.uid,
          userName: firebaseRedirectResult.user.email
        };

        let newUserResponse = await axios.post(
          `${process.env.API_URL}/api/users`,
          newUser
        );

        dispatch(_setAuthenticatedUser(newUserResponse.data));
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
  registerNewUser,
  checkForLoggedInGoogleUser,
  login,
  logout,
  exchangeTokenForAuth,
  authenticatedUserReducer
};
