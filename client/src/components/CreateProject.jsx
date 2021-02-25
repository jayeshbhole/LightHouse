import { useState, useContext } from "react";
import { DataStore } from "../context/DataStore";
import "../assets/scss/CreateProject.scss";

const CreateProject = ({ close }) => {
	const { userData, authUser, firebase, db } = useContext(DataStore);

	const [data, setData] = useState({
		name: "",
		description: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(authUser);
		db.collection("projects")
			.add({
				name: data.name,
				description: data.description,
				createdOn: firebase.firestore.FieldValue.serverTimestamp(),
				cards: [],
				users: [
					{
						name: userData.name,
						email: userData.email,
						status: "owner",
					},
				],
			})
			.then((docRef) => {
				console.log(docRef);
				db.doc("users/" + authUser[0].uid).update({
					projects: firebase.firestore.FieldValue.arrayUnion({
						name: data.name,
						description: data.description,
						id: docRef.id,
						users: [
							{
								name: userData.name,
								email: userData.email,
								status: "owner",
								img: "",
							},
						],
					}),
				});
			});

		close();
	};

	return (
		<div className="createproject">
			<form onSubmit={handleSubmit}>
				<button onClick={close} className="close">
					X
				</button>
				<h4>Create New Project</h4>
				<hr />
				<label htmlFor="name">Name :</label>
				<br />
				<input
					type="text"
					name="name"
					id="name"
					placeholder="Name of New Project"
					onChange={(e) => (data.name = e.target.value)}
				/>
				<br />
				<br />
				<label htmlFor="description">Description :</label>
				<br />
				<textarea
					name="description"
					id="description"
					rows="3"
					onChange={(e) => (data.description = e.target.value)}></textarea>
				<br />
				<div className="btnholder">
					<button name="submit" type="submit">
						Create
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateProject;
