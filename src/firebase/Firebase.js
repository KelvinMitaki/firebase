import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyBDajGX4Ke9agUHMnbwPygwPuRTc5AICvo",
  authDomain: "fir-5d63f.firebaseapp.com",
  databaseURL: "https://fir-5d63f.firebaseio.com",
  projectId: "fir-5d63f",
  storageBucket: "fir-5d63f.appspot.com",
  messagingSenderId: "779688546327",
  appId: "1:779688546327:web:5d744f917b8af79efd0c52",
  measurementId: "G-77HKFWWPT6",
};
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return null;
  }

  const userRef = firestore.doc(`/users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  console.log(snapShot);
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
