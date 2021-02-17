import React, { useContext } from "react";
import { Container } from "react-bulma-components/lib/components/container";
import ProjectCard from "./Projectcard";
import { DataStore } from "../context/DataStore";

const Projects = () => {
	const { userData } = useContext(DataStore);

	return (
		<div className="page">
			Your Projects:
			<br />
			{userData &&
				userData.projects.map((project, index) => {
					return <ProjectCard key={index} project={project} />;
				})}
		</div>
	);
};

export default Projects;
