import { DragDropContext } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import "../assets/scss/kanban.scss";

const Kanban = ({ project }) => {
	const [cols, setCols] = useState({ todo: [], inpro: [], done: [] });

	useEffect(() => {
		const cards = Object.values(project?.cards || {});
		if (cards) {
			const columns = { todo: [], inpro: [], done: [] };
			cards.forEach((card) => columns[card.status].push(card));
			setCols(columns);
		}
	}, [project?.cards]);

	useEffect(() => {
		console.log(cols);
	}, [cols]);

	const toDate = (deadline) => {
		const date = deadline?.toDate().toString().split(" ");
		return `${date[2]} ${date[1]} ${date[3]}`;
	};
	return (
		<DragDropContext>
			<div className="kanban page">
				<div className="col">
					<h3>To Do</h3>
					<div className="cards">
						{cols.todo.map((card, id) => {
							return (
								<div key={id} className={`card ${card.priority}`}>
									<h4>{card.title}</h4>
									<div className="desc">{card.desc}</div>
									<span className="date">{toDate(card.deadline)}</span>
								</div>
							);
						})}
					</div>
				</div>
				<div className="col">
					<h3>In Progress</h3>
					<div className="cards">
						{cols.inpro.map((card, id) => {
							return (
								<div key={id} className={`card ${card.priority}`}>
									<h4>{card.title}</h4>
									<div className="desc">{card.desc}</div>
									<span className="date">{toDate(card.deadline)}</span>
								</div>
							);
						})}
					</div>
				</div>
				<div className="col">
					<h3>Done</h3>
					<div className="cards">
						{cols.done.map((card, id) => {
							return (
								<div key={id} className={`card ${card.priority}`}>
									<h4>{card.title}</h4>
									<div className="desc">{card.desc}</div>
									<span className="date">{toDate(card.deadline)}</span>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</DragDropContext>
	);
};

export default Kanban;
