import { useState, useContext } from "react";
import { DataStore } from "../context/DataStore";
import "../assets/scss/CreateProject.scss";

const CreateProject = ({ close }) => {
	const { userData, firebase, db } = useContext(DataStore);

	const [data, setData] = useState({
		name: "",
		description: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		if (data.name.length === 0) {
			return;
		}

		db.collection("projects").add({
			name: data.name,
			description: data.description,
			createdOn: firebase.firestore.FieldValue.serverTimestamp(),
			cards: {},
			usersemail: [userData.email],
			owner: userData.email,
			users: [
				{
					name: userData.name,
					email: userData.email,
					photoURL: userData.photoURL,
					status: "owner",
				},
			],
		});
		close();
	};

	return (
		<div className="createproject">
			<form onSubmit={handleSubmit}>
				<button onClick={close} className="close">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24">
						<path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z" />
					</svg>
				</button>
				<div className="content">
					<h4>Create New Project</h4>
					<div className="title">
						<label htmlFor="name">Title</label>
						<input
							type="text"
							name="name"
							id="name"
							placeholder="Title of the Project"
							onChange={(e) => setData({ ...data, name: e.target.value })}
							required
						/>
					</div>
					<div className="desc">
						<label htmlFor="description">Description</label>
						<textarea
							name="description"
							id="description"
							rows="3"
							onChange={(e) =>
								setData({ ...data, description: e.target.value })
							}></textarea>
					</div>
					<div className="btnholder">
						<button name="submit" type="submit">
							Create
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default CreateProject;
