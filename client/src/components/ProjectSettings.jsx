import { useContext, useState } from "react";
import { DataStore } from "../context/DataStore";

const ProjectSettings = (project) => {
	const { userData, authUser, firebase, db } = useContext(DataStore);

	const invite = (email) => {
		db.doc("projects/" + project.id).update({
			users: firebase.firestore.FieldValue.arrayUnion({
				email: email,
				status: invited,
			}),
		});
		// db.collection("users").where("email","==",email).get().then(qs => {
		//     qs.forEach(doc => {

		//     })
		// })
		db.doc("notifications/" + email).update({
			notifications: firebase.firestore.FieldValue.arrayUnion({
				type: "invite",
				title: `${userdata.email} invited you to ${project.name}`,
				project: project.id,
			}),
		});
	};
	return <div></div>;
};

export default ProjectSettings;
