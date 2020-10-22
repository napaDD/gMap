import firebase from 'firebase'





const firebaseConfig = {
    apiKey: "AIzaSyCCRJe4gtaS_npTKWt4D7jBkejrnoSDiR0",
  authDomain: "gmap-7bb7f.firebaseapp.com",
  databaseURL: "https://gmap-7bb7f.firebaseio.com",
  projectId: "gmap-7bb7f",
  storageBucket: "gmap-7bb7f.appspot.com",
  messagingSenderId: "128197104625",
  appId: "1:128197104625:web:e803bb5ca3bda5ff9d2a50"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();

  export default db;

