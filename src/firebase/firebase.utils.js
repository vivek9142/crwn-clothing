import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useRef } from 'react';

//1- paste the config key from firebase console
const config = {
    apiKey: "AIzaSyB9-NGKf5-8AJ-5-WsAeGixElv_ipy0ZDo",
    authDomain: "crwn-db-559.firebaseapp.com",
    projectId: "crwn-db-559",
    storageBucket: "crwn-db-559.appspot.com",
    messagingSenderId: "95048293493",
    appId: "1:95048293493:web:64052ddaf735963121ec3c",
    measurementId: "G-M6BW20EF08"
  };
  
  //func for saving signedin user in firestore
  export const createUserProfileDocument = async (userAuth , additionalData) => {
    if(!userAuth) return;
    //get the document with uid
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    //get the data from the document
    const snapShot = await userRef.get();

    //we get the snapshot obj from referenceObj using .get() i.e, documentRef.get() or 
    //collectionRef.get(). documentRef returns a documentSnapshot obj 
    //collectionRef returns a querySnapshot obj
    //snashot is for getting the data. for CRUD operations we need to use the 
    //documentRef methods (.set(), .get() , .update() , .delete() )
    
    //the documentSnapshot obj allows us to check if document exists at this query
    //using the .exists property. 
    //we can get the actual data on obj by calling .data() which sends JSON obj of actual data
    
    //there is a property called exists to tell if the doc exists in db or not
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

  export const addCollectionAndDocuments = async(collectionKey,ObjectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    
    //here we r gonna create a ref doc obj n set it using set()
    //in firestore we can only make a set call at a time
    //we cant set the collectionref.set and give an array of values through it
    //since each call is individual they fire it 1 at a time,if for any reason 
    //the calls get failed we r not sure which calls are successfull n which ones are failed
    
    //so batch groups all our calls n make a big request/
    //in batch we can add all set calls n then make a req call
  
    const batch = firestore.batch();
    ObjectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc(); //we want to get doc at a empty string.
      //this will give a new doc ref n randomly generate new id for it.
      //if no param for id is passed here firestore will generate random id
      
      batch.set(newDocRef,obj); 
      //will set the batch adding one 1 value at a time in batch
      //1 param - doc ref 2param-the value we want to set it to
    });

    //this will fire off the batch req.it returns back from calling 
    //commit is promise, if succeeds,it will come back n resolve a void val mean null val
    return await batch.commit()
  }


  export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc=> {
      const {title,items} = doc.data();

    return {
      routeName:encodeURI(title.toLowerCase()),
      id:doc.id,
      title,
      items
    }
    });

    return transformedCollection.reduce((accumulator,collection)=> {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    },{});
  }

//2- initialize firebase with config credentials
  firebase.initializeApp(config);
//for auth use 
  export const auth = firebase.auth();
  //for firestore db
  export const firestore = firebase.firestore();

  //google auth provider
  const provider = new firebase.auth.GoogleAuthProvider();
  //this will ask for google sign in with prompt window
  provider.setCustomParameters({prompt:'select_account'});

  //attaching auth to provider
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;