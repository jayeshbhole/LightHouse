import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import "../assets/scss/kanban.scss";

const Kanban = ({ project, db }) => {
	const [cols, setCols] = useState({ todo: [], inpro: [], done: [] });
	const placeHolders = [
		{ key: "todo", name: "To Do" },
		{ key: "inpro", name: "In Progress" },
		{ key: "done", name: "Done" },
	];
	useEffect(() => {
		const cards = Object.values(project?.cards || {});
		if (cards) {
			const columns = { todo: [], inpro: [], done: [] };
			cards.forEach((card) => columns[card.status].push(card));
			setCols(columns);
		}
	}, [project?.cards]);

	const toDate = (deadline) => {
		const date = deadline?.toDate().toString().split(" ");
		return `${date[2]} ${date[1]} ${date[3]}`;
	};
	const handleDragEnd = (result) => {
		if (result.destination === result.source || !result.destination) return;

		const tempCard = {};
		tempCard[`cards.${result.draggableId}.status`] =
			result.destination.droppableId;
		const tempCols = cols;
		// Col -> colName -> index -> remove
		const droppedCard =
			tempCols[`${result.source.droppableId}`][`${result.source.index}`];

		tempCols[`${result.source.droppableId}`].splice(result.source.index);
		tempCols[`${result.destination.droppableId}`].splice(
			result.destination.index,
			result.destination.index - 1,
			droppedCard
		);
		setCols(tempCols);
		db.doc(`projects/${project.id}`).update({
			...tempCard,
		});
	};

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<div className="kanban page">
				{placeHolders.map(({ key, name }) => {
					return (
						<Droppable droppableId={`${key}`} key={key}>
							{(provided) => (
								<div
									className="col"
									{...provided.droppableProps}
									ref={provided.innerRef}>
									<h3>{name}</h3>
									{provided.placeholder}

									{cols[key].map(
										({ id, title, priority, desc, deadline }, index) => {
											return (
												<Draggable draggableId={id} key={id} index={index}>
													{(provided) => {
														return (
															<div
																className={`card ${priority}`}
																{...provided.draggableProps}
																ref={provided.innerRef}
																{...provided.dragHandleProps}>
																<h4>{title}</h4>
																<div className="desc">{desc}</div>
																<span className="date">{toDate(deadline)}</span>
															</div>
														);
													}}
												</Draggable>
											);
										}
									)}
								</div>
							)}
						</Droppable>
					);
				})}
				<div className="add-card">
					<i className="gg-add-r"></i>
				</div>
			</div>
		</DragDropContext>
	);
};

export default Kanban;
