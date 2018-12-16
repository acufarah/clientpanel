import { createStore, combineReducers, compose } from 'redux'
import firebase from 'firebase'
import 'firebase/firestore'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
import { connect } from 'react-redux'
import notifyReducer from './reducers/notifyReducer'
import settingsReducer from './reducers/settingsReducer'

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
    notify: notifyReducer,
    settings: settingsReducer
  })

  //Check for settings in localStorage

  if(localStorage.getItem('settings')===null){
      // Set the default settings
      const defaultSettings = {
        disableBalanceOnAdd: true,
        disableBalanceOnEdit: false,
        allowRegistration: false
      }
      // Set to localStorage
      localStorage.setItem('settings', JSON.stringify(defaultSettings));
  }

  // Create initial state

  const initialState = {settings: JSON.parse(localStorage.getItem('settings'))};

  // Create store

  const store= createStoreWithFirebase(rootReducer, initialState, compose(
      reactReduxFirebase(firebase),
      window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()
  ));  

  export default store;