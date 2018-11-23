import firebase from 'firebase';
import keys from '../../../env.js';

let config = {
  apiKey: keys.firebaseApiKey,
  authDomain: 'fridgeraider-d65aa.firebaseapp.com',
  projectId: 'fridgeraider-d65aa'
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
