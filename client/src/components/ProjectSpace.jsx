import { useContext, useState } from "react";
import { Route, useParams, Switch, useRouteMatch } from "react-router-dom";
import { DataStore } from "../context/DataStore";
import Kanban from "./Kanban";
import "../assets/scss/projectspace.scss";

const ProjectSpace = () => {
	const { projectID } = useParams();
	const { projects, project, setProject } = useContext(DataStore);
	const { url } = useRouteMatch();

	if (!projects) return <div>loading project</div>;
	if (project != projects[projectID]) setProject(projects[projectID]);
	if (!project) return <div>loading project</div>;
	return (
		<Switch>
			<Route
				exact
				path={`${url}/kanban`}
				component={() => <Kanban project={project} />}
			/>
			<Route exact path="" component={() => <ProjectTab project={project} />} />
		</Switch>
	);
};

const ProjectTab = ({ project }) => {
	const { name, description, users, cards } = project;
	const [toggle, setToggle] = useState(false);
	return (
		<div className="page project-space">
			<div className="tab">
				<div className="top-bar">
					<h1 className="title">{name}</h1>
					<button onClick={() => setToggle(!toggle)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="30"
							height="30"
							viewBox="0 0 24 24">
							<path d="M19 18c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2zm-14-3c-1.654 0-3 1.346-3 3s1.346 3 3 3h14c1.654 0 3-1.346 3-3s-1.346-3-3-3h-14zm19 3c0 2.761-2.239 5-5 5h-14c-2.761 0-5-2.239-5-5s2.239-5 5-5h14c2.761 0 5 2.239 5 5zm0-12c0 2.761-2.239 5-5 5h-14c-2.761 0-5-2.239-5-5s2.239-5 5-5h14c2.761 0 5 2.239 5 5zm-15 0c0-1.104-.896-2-2-2s-2 .896-2 2 .896 2 2 2 2-.896 2-2z" />
						</svg>
					</button>
				</div>

				<div className="bod">
					<div className="left-bar">
						<div className="desc">
							<h4 className="title">Description</h4>
							<p className="body">{description}</p>
						</div>

						<div className="deadline">
							<h4 className="title">Upcoming Deadline</h4>
							<p className="body">Some deadline{/* Deadline */}</p>
						</div>

						<div className="team">
							<h4 className="title">Team Members</h4>
							<ul>
								{users &&
									Object.values(users).map((member, id) => {
										return (
											<li key={id}>
												<p className="body">{member.name}</p>
												<img src={member.photoURL} alt={member.name} />
											</li>
										);
									})}
							</ul>
						</div>
					</div>
					<div className="right-bar">
						{toggle ? (
							<OptionMenu project={project} />
						) : (
							<>
								<h2 className="title">Upcoming Tasks</h2>
								<ul>
									{cards &&
										Object.values(cards).map(({ title, deadline, id }) => {
											return (
												<li key={id}>
													<TaskCard name={title} date={deadline} />
												</li>
											);
										})}
								</ul>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

const TaskCard = (name, date) => {
	return (
		<div className="card">
			<h5 className="title">{name}</h5>
			<span className="date">{date}</span>
		</div>
	);
};

const UpcomingTasks = () => {};

const OptionMenu = ({ project }) => {
	const { projectID } = useParams();
	const { db } = useContext(DataStore);
	const { name, description, users } = project;
	const [data, setData] = useState({
		name: name,
		description: description,
	});
	const [invite, setInvite] = useState(false);

	const handleSave = (e) => {
		e.preventDefault();
		db.doc(`projects/${projectID}`).update({
			name: data.name,
			description: data.description,
		});
	};

	return (
		<div className="menu">
			<div className="menu-row rename-option">
				<label htmlFor="rename">Rename Project</label>
				<br />
				<input
					type="text"
					id="rename"
					name="name"
					defaultValue={data.name}
					onChange={(e) => setData({ ...data, name: e.target.value })}
				/>
			</div>
			<div className="menu-row desc-option">
				<label htmlFor="edit-desc">Edit Description</label>
				<br />
				<textarea
					type="text"
					id="edit-desc"
					name="desc"
					defaultValue={data.description}
					onChange={(e) => setData({ ...data, description: e.target.value })}
					rows={3}></textarea>
			</div>
			<div className="btnholder">
				<button
					onClick={handleSave}
					disabled={
						data.name == name && data.description == description ? true : false
					}>
					Save
				</button>
			</div>
			<div className="menu-row collaborators-option">
				<a onClick={() => setInvite(true)}>+ Invite</a>
				{Object.values(users)?.map((user, index) => (
					<Collaborator user={user} key={index} index={index} />
				))}
				{invite ? <NewCollaborator cancel={() => setInvite(false)} /> : null}
			</div>
		</div>
	);
};

const Collaborator = ({ user, cancel }) => {
	return (
		<div className="collaborator">
			<div className="profile">
				{user.photoURL ? (
					<img src={user.photoURL} />
				) : (
					<i className="gg-user"></i>
				)}
				<span>{user.name ? user.name : user.email}</span>
				<span>({user.status})</span>
			</div>
			<div className="status"></div>
		</div>
	);
};

const NewCollaborator = ({ cancel }) => {
	const { firebase, db, userData, project } = useContext(DataStore);
	const [email, setEmail] = useState();
	const handleInvite = () => {
		db.doc("projects/" + project.id).update({
			users: firebase.firestore.FieldValue.arrayUnion({
				email: email,
				status: "invited",
			}),
		});
		db.doc("notifications/" + email).update({
			notifications: firebase.firestore.FieldValue.arrayUnion({
				type: "invite",
				title: `${userData.name} invited you to ${project.name}`,
				project: project.id,
			}),
		});
	};
	return (
		<div className="collaborator">
			<div className="profile">
				<i class="gg-user-add"></i>
				<span>
					<input
						type="text"
						name="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<button onClick={handleInvite}>Invite</button>
					<button className="danger" onClick={cancel}>
						<i className="gg-close"></i>
					</button>
				</span>
			</div>
		</div>
	);
};

export default ProjectSpace;
