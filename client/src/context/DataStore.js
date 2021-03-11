import React, { createContext, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase, { auth, db } from "../firebase";
import { useHistory } from "react-router-dom";

const DataStore = createContext({
	auth: auth,
	authUser: null,
	userData: null,
	projects: null,
	notifications: null,
	db: db,
	getProject: () => {},
	getAuthUser: () => {},
});

const DataStoreProvider = (props) => {
	const authUser = useAuthState(auth);
	const [userData, setUserData] = useState();
	const [projects, setProjects] = useState();
	const [notifications, setNotifications] = useState();
	let history = useHistory();

	const logout = () => {
		setUserData(null);
		setProjects(null);
		setNotifications(null);
		history.push("/");
	};

	useEffect(() => {
		let unsub = null;
		let unsub2 = null;
		if (authUser[0] && !userData) {
			console.log(authUser[0]);
			unsub = db.doc(`users/${authUser[0].uid}`).onSnapshot((doc) => {
				if (!doc.exists) {
					db.doc("users/" + authUser[0].uid).set({
						name: authUser[0].displayName,
						email: authUser[0].email,
						photoURL: authUser[0].photoURL,
						projects: [],
					});
					db.doc("notifications/" + authUser[0].email).set({
						notifications: [],
					});
				} else {
					setUserData(doc.data());
					setProjects(doc.data()?.projects);
				}
			});
			unsub2 = db
				.doc("notifications/" + authUser[0].email)
				.onSnapshot((doc) => {
					if (doc.exists) {
						setNotifications(doc.data().notifications);
					}
				});
		}
		// Unsubscribe firestore listener
		return () => {
			unsub && unsub();
			unsub2 && unsub2();
		};
	}, [authUser[0]]);

	return (
		<DataStore.Provider
			value={{
				firebase,
				auth,
				db,
				authUser,
				userData,
				projects,
				notifications,
				logout,
			}}>
			{props.children}
		</DataStore.Provider>
	);
};

export { DataStoreProvider, DataStore };
