import React from "react";
import Card from "react-bulma-components/lib/components/card";
import Dropdown from "react-bulma-components/lib/components/dropdown";
import "../assets/scss/projectcard.scss";

const ProjectCard = ({ project }) => {
	const [drop, setDrop] = React.useState(false);
	return (
		<Card className="projectcard">
			<Card.Content>
				<div class="is-flex">
					<div className="title is-3">{project.name}</div>
					<Dropdown
						value={drop}
						onChange={() => setDrop(!drop)}
						label={
							<span class="icon is-big">
								<i class="rbc rbc-bars"></i>
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

				<div className="subtitle is-5">{project.description}</div>
			</Card.Content>
			<Card.Footer>
				<Card.Footer.Item>Yes</Card.Footer.Item>
			</Card.Footer>
		</Card>
	);
};

export default ProjectCard;
