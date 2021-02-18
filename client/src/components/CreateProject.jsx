import "../assets/scss/CreateProject.scss";
const CreateProject = ({ close }) => {
	return (
		<div className="createproject">
			<form>
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
				/>
				<br />
				<br />
				<label htmlFor="description">Description :</label>
				<br />
				<textarea name="description" id="description" rows="3"></textarea>
			</form>
		</div>
	);
};

export default CreateProject;
