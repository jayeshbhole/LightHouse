import React, { createContext, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase, { auth, db } from "../firebase";

const DataStore = createContext({
	auth: auth,
	authUser: null,
	userData: null,
	projects: null,
	getProject: () => {},
	getAuthUser: () => {},
});

const DataStoreProvider = (props) => {
	const authUser = useAuthState(auth);
	const [userData, setUserData] = useState();
	const [projects, setProjects] = useState();

	useEffect(() => {
		let unsub = null;
		if (authUser[0] && !userData)
			unsub = db.doc(`users/${authUser[0].uid}`).onSnapshot((doc) => {
				if (!doc.exists)
					db.doc("users/" + authUser.uid).set({
						name: authUser[0].displayName,
						email: authUser[0].email,
						projects: [],
					});
				setUserData(doc.data());
				setProjects(doc.data().projects);
			});
		// Unsubscribe firestore listener
		return () => unsub && unsub();
	}, [authUser[0]]);

	return (
		<DataStore.Provider
			value={{
				firebase,
				auth,
				authUser,
				userData,
				projects,
			}}>
			{props.children}
		</DataStore.Provider>
	);
};

export { DataStoreProvider, DataStore };
