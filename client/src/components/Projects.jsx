import { useContext, useState } from "react";
import ProjectCard from "./Projectcard";
import CreateProject from "./CreateProject";
import { DataStore } from "../context/DataStore";
import Button from "react-bulma-components/lib/components/button";

const Projects = () => {
	const { userData } = useContext(DataStore);
	const [toggle, settoggle] = useState(false);

	return (
		<div className="page">
			<h4 className="title is-3 ">Projects</h4>
			<Button onClick={() => settoggle(!toggle)}>New Project</Button>
			<div className="projects">
				{toggle ? <CreateProject close={() => settoggle(false)} /> : null}
				<br />
				{userData &&
					userData.projects.map((project, index) => {
						return <ProjectCard key={index} project={project} />;
					})}
			</div>
		</div>
	);
};

export default Projects;
