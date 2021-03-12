import { useContext, useState } from "react";
import ProjectCard from "./Projectcard";
import CreateProject from "./CreateProject";
import { DataStore } from "../context/DataStore";
import "../assets/scss/projects.scss";

const Projects = () => {
	const { userData } = useContext(DataStore);
	const [toggle, settoggle] = useState(false);

	return (
		<div className="page">
			<h4 className="title is-3 ">Projects</h4>
			<div className="projects">
				<div className="projectcard">
					<div className="body">
						<div className="is-flex">
							<h3 className="title is-4">New Project</h3>
						</div>
						<div className="subtitle is-6">Create A new project</div>
					</div>
					<div className="footer">
						<span>Say YES to productivity</span>
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
