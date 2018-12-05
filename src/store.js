import { createStore, combineReducers, compose } from 'redux'
import firebase from 'firebase'
import 'firebase/firestore'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
import { connect } from 'react-redux'
import notifyReducer from './reducers/notifyReducer'


// Reducers
// @todo

const firebaseConfig = {
    apiKey: "AIzaSyDspoxRqFVOfK4Dt7fBy41oMp-sYRx7eJo",
    authDomain: "reactclientpanel-6135b.firebaseapp.com",
    databaseURL: "https://reactclientpanel-6135b.firebaseio.com",
    projectId: "reactclientpanel-6135b",
    storageBucket: "reactclientpanel-6135b.appspot.com",
    messagingSenderId: "824845114923"
};

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true 
}

// Initialize Firebase instance

firebase.initializeApp(firebaseConfig)

// Initialize Firestore

const firestore= firebase.firestore()

const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase) 
  )(createStore)
  
  // Add firebase to reducers
  const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    notify: notifyReducer
  })

  // Create initial state

  const initialState = {};

  // Create store

  const store= createStoreWithFirebase(rootReducer, initialState, compose(
      reactReduxFirebase(firebase),
      window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()
  ));  

  export default store;