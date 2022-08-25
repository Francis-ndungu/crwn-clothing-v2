// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCd0FsDFXrs31cSOv6QKxRTOGcbKf2TaEM",
  authDomain: "crown-clothing-db-1972a.firebaseapp.com",
  projectId: "crown-clothing-db-1972a",
  storageBucket: "crown-clothing-db-1972a.appspot.com",
  messagingSenderId: "398822313504",
  appId: "1:398822313504:web:aca117c1dacef5753c3645",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Sign in using a redirect.
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (e) {
      console.log("error creating the user", e.message);
    }
  }
  return userDocRef;
};
