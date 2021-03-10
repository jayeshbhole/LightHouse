import React from "react";
import Card from "react-bulma-components/lib/components/card";
// import Dropdown from "react-bulma-components/lib/components/dropdown";
import { useHistory } from "react-router-dom";

import "../assets/scss/projectcard.scss";

const ProjectCard = ({ project }) => {
	const { name, description } = project;
	const history = useHistory();
	const handleProjectClick = (projectID) => {
		history.push(`/p/${projectID}`);
	};
	return (
		<Card className="projectcard">
			<Card.Content onClick={() => handleProjectClick(project.id)}>
				<div className="is-flex">
					<div className="title is-4">{name}</div>
					<span></span>
				</div>

				<div className="subtitle is-6">{description}</div>
			</Card.Content>
			<Card.Footer>
				<Card.Footer.Item>Yes</Card.Footer.Item>
			</Card.Footer>
		</Card>
	);
};

export default ProjectCard;
