import { useContext } from "react";
import { Route, useParams, Switch, useRouteMatch } from "react-router-dom";
import { DataStore } from "../context/DataStore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Kanban from "./Kanban";
import "../assets/scss/projectspace.scss";

const ProjectSpace = () => {
	const { projectID } = useParams();
	const { userData, db } = useContext(DataStore);
	const { url } = useRouteMatch();

	const [project, projLoading, projError] = useDocumentData(
		db.doc(`projects/${projectID}`)
	);

	return (
		<Switch>
			<Route
				exact
				path={`${url}/kanban`}
				component={() => <Kanban project={project} />}
			/>
			<Route
				exact
				path=""
				component={() =>
					project ? <ProjectTab project={project} /> : "loading project"
				}
			/>
		</Switch>
	);
};

const ProjectTab = ({ project: { name, description, users, cards } }) => {
	return (
		<div className="tab">
			<div className="top-bar">
				<h2 className="title">{name}</h2>
			</div>

			<div className="left-bar">
				<div className="desc">
					<h6 className="title">Description</h6>
					<p className="desc-body">{description}</p>
				</div>

				<div className="deadline">
					<h6 className="title">Upcoming Deadline</h6>
					<p className="body">{/* Deadline */}</p>
				</div>

				<div className="team">
					<h6 className="title">Team Members</h6>
					<ul>
						{users.map((member, id) => {
							return (
								<li key={id}>
									<p className="body">{member.name}</p>
									<img src={member.photoURL} alt="" />
								</li>
							);
						})}
					</ul>
				</div>

				<div className="right-bar">
					<h3 className="title">Upcoming Tasks</h3>
					<ul>
						{cards.map((title, deadline, id) => {
							return (
								<li key={id}>
									<TaskCard name={title} date={deadline} />
								</li>
							);
						})}
					</ul>
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
export default ProjectSpace;
