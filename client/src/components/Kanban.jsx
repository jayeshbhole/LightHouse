import { DragDropContext } from "react-beautiful-dnd";
// import { useState, useEffect } from "react";
import "../assets/scss/kanban.scss";

const Kanban = ({ project }) => {
	return (
		<DragDropContext>
			<div className="kanban">
				<div className="col">
					<h3>To Do</h3>

					<div className="card high">
						<h4>Title</h4>
						<span className="date">23-08-2021</span>
						Description
					</div>
					<div className="card mid">
						<h4>Title</h4>
						<span className="date">23-08-2021</span>
						Description
					</div>
				</div>
				<div className="col">
					<h3>In Progress</h3>

					<div className="card">
						<h4>Title</h4>
						<span className="date">23-08-2021</span>
						Description
					</div>
				</div>
				<div className="col">
					<h3>Done</h3>

					<div className="card">
						<h4>Title</h4>
						<span className="date">23-08-2021</span>
						Description
					</div>
				</div>
			</div>
		</DragDropContext>
	);
};

export default Kanban;
