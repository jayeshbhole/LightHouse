import "../assets/scss/projects.scss";

import { useContext, useState } from "react";
import ProjectCard from "./Projectcard";
import CreateProject from "./CreateProject";
import { DataStore } from "../context/DataStore";

const Projects = () => {
	const { userData } = useContext(DataStore);
	const [toggle, settoggle] = useState(false);

	return (
		<div className="page">
			<div className="projects">
				<div
					className="projectcard"
					id="create-project"
					onClick={() => settoggle(!toggle)}>
					<div className="body">
						<div>
							<h3 className="title ">New Project</h3>
						</div>
						<div className="subtitle">Create A new project</div>
					</div>
				</div>
				{toggle ? <CreateProject close={() => settoggle(false)} /> : null}
				{userData &&
					userData.projects.map((project, index) => {
						return <ProjectCard key={index} project={project} />;
					})}
			</div>
		</div>
	);
};

export default Projects;
