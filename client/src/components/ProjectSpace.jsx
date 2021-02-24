import { useEffect, useState, useContext } from "react";
import { Route, Switch, useParams } from "react-router-dom";
import { DataStore } from "../context/DataStore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Kanban from "./Kanban";

const ProjectSpace = () => {
	const { projectID } = useParams();
	const { userData } = useContext(DataStore);

	const [projRef, setProjRef] = useState();
	// const [project, setProject] = useState()

	// const [project, setProject] = useState();

	const [project, projLoading, projError] = useDocumentData(projRef);

	useEffect(() => {
		setProjRef(
			userData?.projects.find(({ id }) => id === projectID)?.reference
		);
	}, [projectID, userData]);

	useEffect(() => console.log(project), [project]);

	return (
		<>
			Project Work Space
			<br />
			<h2>{project?.name}</h2>
			<br />
			<br />
			<p>{project?.description}</p>
			<Switch>
				<Route path="/kanban" component={Kanban} project={project} />

				{/* <Route path="/map" component={Mindmap}/> */}
				{/* <Route path="/map"/> */}
			</Switch>
		</>
	);
};

export default ProjectSpace;
