import React from "react";
import Card from "react-bulma-components/lib/components/card";
import Dropdown from "react-bulma-components/lib/components/dropdown";
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
					<div className="title is-3">{name}</div>
					<Dropdown
						label={
							<span className="icon is-big">
								<i className="rbc rbc-bars"></i>
							</span>
						}>
						<Dropdown.Item value="item">Dropdown item</Dropdown.Item>
						<Dropdown.Item value="other">Other Dropdown item</Dropdown.Item>
						<Dropdown.Item value="active">Active Dropdown item</Dropdown.Item>
						<Dropdown.Item value="other 2">Other Dropdown item</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Item value="divider">With divider</Dropdown.Item>
					</Dropdown>
				</div>

				<div className="subtitle is-5">{description}</div>
			</Card.Content>
			<Card.Footer>
				<Card.Footer.Item>Yes</Card.Footer.Item>
			</Card.Footer>
		</Card>
	);
};

export default ProjectCard;
