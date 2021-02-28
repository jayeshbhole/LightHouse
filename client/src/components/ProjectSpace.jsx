import { useContext } from "react";
import { Route, useParams, Switch, useRouteMatch } from "react-router-dom";
import { DataStore } from "../context/DataStore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Kanban from "./Kanban";

const ProjectSpace = () => {
	const { projectID } = useParams();
	const { userData, db } = useContext(DataStore);
	const { path, url } = useRouteMatch();

	const [project, projLoading, projError] = useDocumentData(
		db.doc(`projects/${projectID}`)
	);

	return (
		<Switch>
			<Route
				exact
				path={`${path}/kanban`}
				component={() => <Kanban project={project} />}
			/>
			<Route exact path="" component={() => <ProjPage project={project} />} />
		</Switch>
	);
};

const ProjPage = ({ project }) => {
	return (
		<div className="meta">
			Project Work Space
			<br />
			<h2>{project?.name}</h2>
			<br />
			<br />
			<p>{project?.description}</p>
		</div>
	);
};
export default ProjectSpace;
