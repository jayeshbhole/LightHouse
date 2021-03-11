import { useContext, useState } from "react";
import ProjectCard from "./Projectcard";
import CreateProject from "./CreateProject";
import { DataStore } from "../context/DataStore";
import Card from "react-bulma-components/lib/components/card";

const Projects = () => {
	const { userData } = useContext(DataStore);
	const [toggle, settoggle] = useState(false);
	console.log(userData);

	return (
		<div className="page">
			<h4 className="title is-3 ">Projects</h4>
			<div className="projects">
				<Card className="projectcard">
					<Card.Content onClick={() => settoggle(!toggle)}>
						<div className="is-flex">
							<div className="title is-4">New Project</div>
							<span className="icon is-big icon-plus">+</span>
						</div>

						<div className="subtitle is-6">Create A new project</div>
					</Card.Content>
				</Card>
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
