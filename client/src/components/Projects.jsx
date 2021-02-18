import { useContext, useState } from "react";
import ProjectCard from "./Projectcard";
import CreateProject from "./CreateProject";
import { DataStore } from "../context/DataStore";

const Projects = () => {
	const { userData } = useContext(DataStore);
	const [toggle, settoggle] = useState(false);

	return (
		<div className="page">
			Your Projects:
			<br />
			<button onClick={() => settoggle(!toggle)}>New Project</button>
			{toggle ? <CreateProject close={() => settoggle(false)} /> : null}
			<br />
			{userData &&
				userData.projects.map((project, index) => {
					return <ProjectCard key={index} project={project} />;
				})}
		</div>
	);
};

export default Projects;
