import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBjFajON9sNyOCH_SR36wz1i7eiDA-mvSA",
  authDomain: "crud-app-react-native-6c738.firebaseapp.com",
  projectId: "crud-app-react-native-6c738",
  storageBucket: "crud-app-react-native-6c738.appspot.com",
  messagingSenderId: "724236823759",
  appId: "1:724236823759:web:172a0ee92ddb0f1cbb5bba"
};

const app = initializeApp(firebaseConfig);
export { app }