import firebase from 'firebase';
import  {firebaseApiKey}  from '../../../config.js';

console.log(firebaseApiKey)


let config = {
  apiKey: firebaseApiKey,
  authDomain: 'fridgeraider-d65aa.firebaseapp.com',
  projectId: 'fridgeraider-d65aa'
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
