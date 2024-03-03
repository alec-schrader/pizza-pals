import { initializeApp } from 'firebase/app';

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCo6TaxHC6SJBpzbhop4N10ltMWV6SN5aU",
    authDomain: "pizza-pals-b86a2.firebaseapp.com",
    projectId: "pizza-pals-b86a2",
    storageBucket: "pizza-pals-b86a2.appspot.com",
    messagingSenderId: "607227593035",
    appId: "1:607227593035:web:8501d3b61c628f9ffaa8ce",
    measurementId: "G-MTR2MZMPW2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export {app , auth}
