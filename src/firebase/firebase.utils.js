import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useRef } from 'react';

const config = {
    apiKey: "AIzaSyB9-NGKf5-8AJ-5-WsAeGixElv_ipy0ZDo",
    authDomain: "crwn-db-559.firebaseapp.com",
    projectId: "crwn-db-559",
    storageBucket: "crwn-db-559.appspot.com",
    messagingSenderId: "95048293493",
    appId: "1:95048293493:web:64052ddaf735963121ec3c",
    measurementId: "G-M6BW20EF08"
  };

  export const createUserProfileDocument = async (userAuth , additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const {displayName , email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch(err) {
        console.log('error creating user',err.message);
      }

    }
    return userRef;
  }
  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;