import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";

const DataStore = createContext({
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
		return () => {
			unsub();
		};
	}, [projectID]);

	useEffect(() => {
		if (authUser && !userData)
			db.doc(`users/${authUser.uid}`).onSnapshot((doc) => {
				if (!doc.exists)
					db.doc("users/" + authUser.uid).set({
						name: authUser.displayName,
						email: authUser.email,
						projects: [],
					});
				setUserData(doc.data());
			});
	}, []);

	const getUser = () => {};

	return (
		<DataStore.Provider
			value={{ authUser, getUser, getProject: setProjectID, project }}>
			{props.children}
		</DataStore.Provider>
	);
};

export { DataStoreProvider, DataStore };
