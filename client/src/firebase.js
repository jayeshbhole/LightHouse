import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// import "firebase/messaging";
import env from "react-dotenv";

const firebaseConfig = {
	apiKey: env.API_KEY,
	authDomain: env.AUTH_DOMAIN,
	projectId: env.PROJECT_ID,
	storageBucket: env.STORAGE_BUCKET,
	messagingSenderId: env.M_SENDER_ID,
	appId: env.APPID,
	measurementId: env.M_ID,
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
