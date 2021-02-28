import { useEffect, useState, useContext } from "react";
import { Route, useParams } from "react-router-dom";
import { DataStore } from "../context/DataStore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Kanban from "./Kanban";

const ProjectSpace = () => {
	const { projectID } = useParams();
	const { userData, db } = useContext(DataStore);
	const [projRef, setProjRef] = useState();

	const [project, projLoading, projError] = useDocumentData(
		db.doc(`projects/${projectID}`)
	);
	// Debug
	// useEffect(() => {
	// 	console.log("Project ", project, projectID);
	// }, [project]);

	return (
		<>
			<Route
				exact
				path="/kanban"
				component={() => <Kanban project={project} />}
			/>
			<Route exact path="" component={() => <ProjPage project={project} />} />
		</>
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
