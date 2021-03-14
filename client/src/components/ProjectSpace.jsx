import { useContext, useState, useEffect } from "react";
import {
	Route,
	useParams,
	Switch,
	useRouteMatch,
	useHistory,
} from "react-router-dom";
import { DataStore } from "../context/DataStore";
import Kanban from "./Kanban";
import "../assets/scss/projectspace.scss";
import Chat from "./chat";

const ProjectSpace = () => {
	const { projectID } = useParams();
	const { projects, project, setProject, db } = useContext(DataStore);
	const { url } = useRouteMatch();
	const [toggle, setToggle] = useState(false);

	useEffect(() => {
		if (projects && project !== projects[projectID])
			setProject(projects[projectID]);
	}, [projects]);

	return (
		<Switch>
			<Route
				exact
				path={`${url}/kanban`}
				component={() =>
					project ? <Kanban project={project} db={db} /> : "Loading Project!"
				}
			/>
			<Route
				exact
				path={`${url}/chat`}
				component={() =>
					project ? <Chat project={project} /> : "Loading Project!"
				}
			/>
			<Route
				exact
				path=""
				component={() =>
					project ? (
						<ProjectTab
							project={project}
							toggle={toggle}
							setToggle={setToggle}
						/>
					) : (
						"Loading Project!"
					)
				}
			/>
		</Switch>
	);
};

const ProjectTab = ({ project, toggle, setToggle }) => {
	const { name, description, users, cards } = project;
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
								{users?.map((member, id) => {
									return member.name ? (
										<li key={id}>
											<p className="body">{member.name}</p>
											<img src={member.photoURL} alt={member.name} />
										</li>
									) : null;
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
									{Object.values(cards)?.map(({ title, deadline }, index) => {
										return (
											<li key={index}>
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

const TaskCard = ({ title, deadline }) => {
	return (
		<div className="card">
			<h5 className="title">{title}</h5>
			<span className="date">{deadline}</span>
		</div>
	);
};

// const UpcomingTasks = () => {};

const OptionMenu = ({ project }) => {
	const { projectID } = useParams();
	const { db, userData } = useContext(DataStore);
	const { name, description, users } = project;
	const [data, setData] = useState({
		name: name,
		description: description,
	});
	const [invite, setInvite] = useState(false);

	const isowner = project.owner == userData.email;
	const history = useHistory();

	const handleSave = (e) => {
		e.preventDefault();
		db.doc(`projects/${projectID}`).update({
			name: data.name,
			description: data.description,
		});
	};

	const handledeleteproject = () => {
		db.doc("projects/" + project.id).delete();
		history.push("/projects");
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
					disabled={!isowner}
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
					disabled={!isowner}
					defaultValue={data.description}
					onChange={(e) => setData({ ...data, description: e.target.value })}
					rows={3}></textarea>
			</div>
			{isowner ? (
				<div className="btnholder">
					<button
						onClick={handleSave}
						disabled={
							data.name === name && data.description === description
								? true
								: false
						}>
						Save
					</button>
				</div>
			) : null}
			<div className="menu-row collaborators-option">
				{isowner ? (
					<button onClick={() => setInvite(true)} href="">
						+ Invite
					</button>
				) : null}
				{users?.map((user, index) => (
					<Collaborator
						user={user}
						key={index}
						project={project}
						isowner={isowner}
					/>
				))}
				{invite ? <NewCollaborator cancel={() => setInvite(false)} /> : null}
			</div>
			{isowner ? (
				<div className="btnholder">
					<button onClick={handledeleteproject} className="danger">
						Delete Project
					</button>
				</div>
			) : null}
		</div>
	);
};

const Collaborator = ({ user, project, isowner }) => {
	const { db, firebase, userData } = useContext(DataStore);
	const handledelete = () => {
		db.doc("projects/" + project.id).update({
			users: firebase.firestore.FieldValue.arrayRemove(user),
			usersemail: firebase.firestore.FieldValue.arrayRemove(user.email),
		});
	};
	return (
		<div className="collaborator">
			<div className="profile">
				{user.photoURL ? (
					<img src={user.photoURL} alt="" />
				) : (
					<i className="gg-user"></i>
				)}
				<span>{user.name ? user.name : user.email}</span>
				<span>({user.status})</span>
			</div>
			<div className="status">
				{user.status !== "owner" &&
				(isowner || user.email === userData.email) ? (
					<button className="danger" onClick={handledelete}>
						<i className="gg-close"></i>
					</button>
				) : null}
			</div>
		</div>
	);
};

const NewCollaborator = ({ cancel }) => {
	const { firebase, db, userData, project } = useContext(DataStore);
	const [email, setEmail] = useState("");
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
				<i className="gg-user-add"></i>
				<span>
					<input
						type="email"
						name="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<button onClick={handleInvite} disabled={email === ""}>
						Invite
					</button>
					<button className="danger" onClick={cancel}>
						<i className="gg-close"></i>
					</button>
				</span>
			</div>
		</div>
	);
};

export default ProjectSpace;
