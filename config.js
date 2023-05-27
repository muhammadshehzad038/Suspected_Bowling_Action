//firebase configuration  

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//firebase app configuration

const firebaseConfig={
    apiKey: "AIzaSyDw7dM8ursMkGDSMpVYgpKBQaJm9kAUACg",
  authDomain: "test-4b615.firebaseapp.com",
  projectId: "test-4b615",
  storageBucket: "test-4b615.appspot.com",
  messagingSenderId: "493078760026",
  appId: "1:493078760026:web:1798ac651ec71bb0a96663",
  measurementId: "G-QLKCWM32EB"
}

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export { firebase } ;
