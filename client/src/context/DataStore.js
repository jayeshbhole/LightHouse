import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase, { auth, db } from "../firebase";

const DataStore = createContext({
	auth: auth,
	authUser: null,
	userData: null,
	projects: null,
	project: null,
	getProject: () => {},
	getAuthUser: () => {},
});

const DataStoreProvider = (props) => {
	const authUser = useAuthState(auth);

	const [userData, setUserData] = useState();
	const [projectID, setProjectID] = useState();
	const [project, setProject] = useState();

	useEffect(() => {
		const unsub = db.doc(`projects/${projectID}`).onSnapshot((doc) => {
			if (doc.exists) setProject(doc);
		});

		// Unsubscribe listener
		return () => unsub && unsub();
	}, [projectID]);

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
				getProject: setProjectID,
				project,
			}}>
			{props.children}
		</DataStore.Provider>
	);
};

export { DataStoreProvider, DataStore };
