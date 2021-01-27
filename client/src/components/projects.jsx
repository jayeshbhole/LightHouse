import React from "react";
import { Container } from "react-bulma-components/lib/components/container";
import ProjectCard from "./projectcard";

const Projects = ({ userdata }) => {
	if (!userdata) {
		return null;
	}
	return (
		<div>
			{userdata.projects.map((project, index) => {
				return <ProjectCard key={index} project={project} />;
			})}
		</div>
	);
};

export default Projects;
