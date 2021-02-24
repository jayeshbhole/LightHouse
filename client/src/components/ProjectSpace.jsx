import { useEffect, useState, useContext } from "react";
import { Route, useParams } from "react-router-dom";
import { DataStore } from "../context/DataStore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Kanban from "./Kanban";

const ProjectSpace = () => {
	const { projectID } = useParams();
	const { userData } = useContext(DataStore);
	const [projRef, setProjRef] = useState();

	const [project, projLoading, projError] = useDocumentData(projRef);

	useEffect(() => {
		setProjRef(
			userData?.projects.find(({ id }) => id === projectID)?.reference
		);
	}, [projectID, userData]);

	// Debug
	useEffect(() => console.log(project), [project]);

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
