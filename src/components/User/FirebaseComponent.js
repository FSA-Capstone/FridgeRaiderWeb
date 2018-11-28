import firebase from 'firebase';

let config = {
  apiKey: 'AIzaSyCUhwd0yHTe5XnpNLN_mdz-S4XOWymTrfI',
  authDomain: 'fridgeraider-d65aa.firebaseapp.com',
  projectId: 'fridgeraider-d65aa'
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
