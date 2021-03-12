import React from "react";
import { useHistory } from "react-router-dom";

import "../assets/scss/projectcard.scss";

const ProjectCard = ({ project }) => {
	const { name, description, users } = project;
	const history = useHistory();
	const handleProjectClick = (projectID) => {
		history.push(`/p/${projectID}`);
	};
	return (
		<div className="projectcard" onClick={() => handleProjectClick(project.id)}>
			<div className="body">
				<div className="is-flex">
					<h3 className="title is-4">{name}</h3>
				</div>
				<div className="subtitle is-6">{description}</div>
			</div>
			<div className="footer">
				{users.map(({ photoURL } , index) => (
					<div key={index} className="footer-img">
						<img src={photoURL} alt="" />
					</div>
				))}
			</div>
		</div>
	);
};

export default ProjectCard;
