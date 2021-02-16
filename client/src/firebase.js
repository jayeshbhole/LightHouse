import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// import "firebase/messaging";
import env from "react-dotenv";

const firebaseConfig = {
	apiKey: env.REACT_APP_API_KEY,
	authDomain: env.REACT_APP_AUTH_DOMAIN,
	projectId: env.REACT_APP_PROJECT_ID,
	storageBucket: env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: env.REACT_APP_M_SENDER_ID,
	appId: env.REACT_APP_APPID,
	measurementId: env.REACT_APP_M_ID,
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
