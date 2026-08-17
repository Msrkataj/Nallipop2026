import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDv1ZA7gwaT2uHo1jkSZ8WupSf-NtyxmXk",
  authDomain: "nallipop-7d9e4.firebaseapp.com",
  projectId: "nallipop-7d9e4",
  storageBucket: "nallipop-7d9e4.appspot.com",
  messagingSenderId: "829834243946",
  appId: "1:829834243946:web:df72e40549e9605afeff13",
  measurementId: "G-NN5Q100TDG",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
