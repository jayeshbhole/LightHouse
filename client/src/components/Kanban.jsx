import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import "../assets/scss/kanban.scss";

const Kanban = ({ project, db }) => {
	const [cols, setCols] = useState({ todo: [], inpro: [], done: [] });
	const [toggle, settoggle] = useState(false);
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
				<div className="add-card" onClick = {() => settoggle(true)}>
					<div >
						<i className="gg-add-r">
							
						</i>
					</div>
				</div>
				{toggle ? <CreateCard close={() => settoggle(false)} /> : null}
			</div>
		</DragDropContext>
	);
};

const CreateCard = ({ close }) => {
	return (
		<div className="createcard">
			<form>
				<button onClick={close} className="close">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24">
						<path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z" />
					</svg>
				</button>
				<div className="content">
					<h4>Create New Project</h4>
					<div className="title">
						<label htmlFor="name">Title</label>
						<input
							type="text"
							name="name"
							id="name"
							placeholder="Title of the Project"
							required
						/>
					</div>
					<div className="desc">
						<label htmlFor="description">Description</label>
						<textarea name="description" id="description" rows="3"></textarea>
					</div>
					<div className="priority">
						<label htmlFor="priority-type">Priority</label>
						<select name="priority-type" id="priority-type">
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
						</select>
					</div>
					<div className="deadline">
						<label htmlFor="date">Deadline</label>
						<input type="date"/>
					</div>
					<div className="btnholder">
						<button name="submit" type="submit">
							Create
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};
export default Kanban;
