import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAS9c_DqlA35KLLmkmGJrBiAz6tymgv5Z8',
  authDomain: 'authorization-app-5f440.firebaseapp.com',
  databaseURL: 'https://authorization-app-5f440-default-rtdb.firebaseio.com',
  projectId: 'authorization-app-5f440',
  storageBucket: 'authorization-app-5f440.appspot.com',
  messagingSenderId: '889651249590',
  appId: '1:889651249590:web:7dcfd4de13f1b2fbc58117',
};

const app = firebase.initializeApp(firebaseConfig);

export const database = app.database();

export const auth = app.auth();
