import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

console.log();
const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_M_SENDER_ID,
	appId: process.env.REACT_APP_APPID,
	measurementId: process.env.REACT_APP_M_ID,
};

firebase.initializeApp(firebaseConfig);

firebase
	.firestore()
	.enablePersistence({ synchronizeTabs: true })
	.catch(console.log);

export default firebase;
export const auth = firebase.auth();
export const db = firebase.firestore();
// const msg = firebase.messaging();


//dank shit bruh