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
		<div className="page project-space">
			<div className="tab">
				<div className="top-bar">
					<h1 className="title">{name}</h1>
					<button>
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
					</div>
					<div className="right-bar">
						<h2 className="title">Upcoming Tasks</h2>
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
