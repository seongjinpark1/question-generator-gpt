// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import { ENV } from '@/config/env';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: ENV.FIREBASE_API_KEY,
  authDomain: ENV.AUTHDOMAIN,
  projectId: ENV.PROJECTID,
  storageBucket: ENV.STORAGEBUCKET,
  messagingSenderId: ENV.MESSAGING_SENDER_ID,
  appId: ENV.APP_ID,
  measurementId: ENV.MEASUREMENT_ID,
};

// Initialize Firebase
const firebaseDb = initializeApp(firebaseConfig);

export default firebaseDb;
